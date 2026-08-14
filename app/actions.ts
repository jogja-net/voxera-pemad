
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";
import { calculateInvoiceAmounts, isBillableServiceType } from "@/lib/pricing";
import type { Locale } from "@/lib/i18n/config";
import type { Json } from "@/types/supabase";

export async function createProject(
  serviceType: string,
  title: string,
  description: string | null,
  metadata: Json,
) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This should ideally be caught client-side, but as a fallback
    redirect("/login"); // Or handle unauthorized access appropriately
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      service_type: serviceType,
      title,
      description,
      metadata,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project.");
  }

  revalidatePath("/dashboard/projects"); // Revalidate the projects page
  return data;
}

/**
 * Admin-only: confirms a project's final billable quantity and creates its
 * Xendit invoice in one step. The quantity comes from the admin, not from
 * the client-side word/page estimates in lib/estimate.ts — those are file-size
 * heuristics, not reliable enough to bill from directly (see CLAUDE.md).
 */
export async function createInvoice(
  projectId: string,
  quantity: number,
  lang: Locale,
) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) {
    throw new Error("Not authorized.");
  }
  if (!(quantity > 0)) {
    throw new Error("Quantity must be greater than zero.");
  }

  const admin = createAdminSupabaseClient();

  const { data: project, error: projectError } = await admin
    .from("projects")
    .select("id, user_id, service_type, title")
    .eq("id", projectId)
    .single();

  if (projectError || !project) {
    throw new Error("Project not found.");
  }
  if (!isBillableServiceType(project.service_type)) {
    // Guards the 'sworn' dead branch (never reaches createProject today) and
    // any other unrecognized service_type.
    throw new Error("This service type is not billable through this flow.");
  }

  const { data: ownerData, error: ownerError } =
    await admin.auth.admin.getUserById(project.user_id);
  const payerEmail = ownerData?.user?.email;
  if (ownerError || !payerEmail) {
    throw new Error("Could not resolve the customer's email.");
  }

  const amounts = calculateInvoiceAmounts(project.service_type, quantity);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  // 1:1 with invoices.project_id's unique constraint — also makes the Xendit
  // invoice idempotent to retry from this action (same project, same call).
  const externalId = project.id;

  const xenditResponse = await fetch("https://api.xendit.co/v2/invoices", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.XENDIT_SECRET_KEY}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      external_id: externalId,
      amount: amounts.totalAmount,
      payer_email: payerEmail,
      description: `${project.title} — ${project.service_type}`,
      currency: "IDR",
      success_redirect_url: `${siteUrl}/${lang}/dashboard/billing`,
      failure_redirect_url: `${siteUrl}/${lang}/dashboard/billing`,
    }),
  });

  const xenditInvoice = await xenditResponse.json();
  if (!xenditResponse.ok) {
    console.error("Error creating Xendit invoice:", xenditInvoice);
    throw new Error("Failed to create invoice.");
  }

  const { data, error } = await admin
    .from("invoices")
    .insert({
      user_id: project.user_id,
      project_id: project.id,
      created_by: user.id,
      service_type: project.service_type,
      quantity,
      unit: amounts.unit,
      unit_price: amounts.unitPrice,
      subtotal: amounts.subtotal,
      tax_amount: amounts.taxAmount,
      total_amount: amounts.totalAmount,
      xendit_invoice_id: xenditInvoice.id,
      xendit_external_id: externalId,
      xendit_invoice_url: xenditInvoice.invoice_url,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving invoice:", error);
    throw new Error("Failed to save invoice.");
  }

  revalidatePath("/dashboard/billing");
  return data;
}
