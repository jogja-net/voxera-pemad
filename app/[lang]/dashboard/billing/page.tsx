import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";
import {
  BILLABLE_SERVICE_TYPES,
  isBillableServiceType,
  type BillableServiceType,
} from "@/lib/pricing";
import { formatRupiah } from "@/lib/estimate";
import { AdminInvoiceForm } from "@/components/billing/admin-invoice-form";
import { getDictionary, hasLocale, type Dictionary } from "@/lib/i18n";
import type { Database, Json } from "@/types/supabase";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type Project = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "id" | "title" | "service_type" | "created_at" | "metadata"
>;

/** validation/translation submissions carry a client-estimated word count admins can use as a starting point. */
function prefillQuantityFor(
  serviceType: BillableServiceType,
  metadata: Json | null,
): number | undefined {
  if (serviceType !== "validation" && serviceType !== "translation") return undefined;
  const words = (metadata as Record<string, unknown> | null)?.words;
  return typeof words === "number" && words > 0 ? words : undefined;
}

const STATUS_LABEL_KEY = {
  pending: "statusPending",
  paid: "statusPaid",
  expired: "statusExpired",
  failed: "statusFailed",
} as const;

export default async function BillingPage({
  params,
}: PageProps<"/[lang]/dashboard/billing">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict: Dictionary = getDictionary(lang);
  const t = dict.billing;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p>{dict.auth.loginIntro}</p>
      </div>
    );
  }

  const { data: invoices, error: invoicesError } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: ownProjects } = await supabase
    .from("projects")
    .select("id, title, service_type, created_at, metadata")
    .order("created_at", { ascending: false });

  const ownInvoicedProjectIds = new Set((invoices ?? []).map((i) => i.project_id));
  const ownPendingProjects: Project[] = (ownProjects ?? []).filter(
    (project) =>
      isBillableServiceType(project.service_type) &&
      !ownInvoicedProjectIds.has(project.id),
  );

  const admin = isAdminEmail(user.email);
  let adminPendingProjects: (Project & { user_id: string })[] = [];
  let allInvoices: (Invoice & { projects: { title: string } | null })[] = [];

  if (admin) {
    const adminClient = createAdminSupabaseClient();

    const { data: everyInvoice } = await adminClient
      .from("invoices")
      .select("*, projects(title)")
      .order("created_at", { ascending: false });
    allInvoices = everyInvoice ?? [];

    const { data: everyProject } = await adminClient
      .from("projects")
      .select("id, title, service_type, created_at, metadata, user_id")
      .in("service_type", BILLABLE_SERVICE_TYPES)
      .order("created_at", { ascending: false });

    const invoicedProjectIds = new Set(allInvoices.map((i) => i.project_id));
    adminPendingProjects = (everyProject ?? []).filter(
      (project) => !invoicedProjectIds.has(project.id),
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 p-4">
      <div>
        <h1 className="mb-4 text-2xl font-bold">{t.title}</h1>

        {invoicesError && <p>Error loading invoices.</p>}

        {invoices && invoices.length > 0 ? (
          <ul className="space-y-4">
            {invoices.map((invoice) => (
              <li key={invoice.id} className="rounded-lg border p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {formatRupiah(invoice.total_amount, lang)}
                  </h2>
                  <span className="text-sm font-medium">
                    {t[STATUS_LABEL_KEY[invoice.status as keyof typeof STATUS_LABEL_KEY]] ??
                      invoice.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {invoice.service_type} · {invoice.quantity} {invoice.unit}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </p>
                {invoice.status === "pending" && invoice.xendit_invoice_url && (
                  <a
                    href={invoice.xendit_invoice_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-blue-600 underline"
                  >
                    {t.payCta}
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>{t.emptyState}</p>
        )}
      </div>

      {ownPendingProjects.length > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-semibold">{t.pendingProjectsHeading}</h2>
          <ul className="space-y-2">
            {ownPendingProjects.map((project) => (
              <li key={project.id} className="rounded-lg border p-3 text-sm text-gray-600">
                {project.title} — {t.awaitingConfirmation}
              </li>
            ))}
          </ul>
        </div>
      )}

      {admin && (
        <div className="border-t pt-6">
          <h2 className="mb-4 text-lg font-semibold">{t.adminSectionTitle}</h2>
          <ul className="space-y-4">
            {adminPendingProjects.map((project) => (
              <li key={project.id} className="rounded-lg border p-4">
                <p className="font-medium">{project.title}</p>
                <p className="text-xs text-gray-500">
                  {project.service_type} · {project.user_id}
                </p>
                <AdminInvoiceForm
                  projectId={project.id}
                  serviceType={project.service_type as BillableServiceType}
                  lang={lang}
                  dict={dict}
                  prefillQuantity={prefillQuantityFor(
                    project.service_type as BillableServiceType,
                    project.metadata,
                  )}
                />
              </li>
            ))}
            {adminPendingProjects.length === 0 && (
              <p className="text-sm text-gray-500">{t.emptyState}</p>
            )}
          </ul>

          <h3 className="mt-8 mb-2 text-sm font-semibold text-gray-500">
            {t.title}
          </h3>
          <ul className="space-y-2">
            {allInvoices.map((invoice) => (
              <li key={invoice.id} className="text-sm text-gray-600">
                {invoice.projects?.title ?? invoice.project_id} —{" "}
                {formatRupiah(invoice.total_amount, lang)} —{" "}
                {t[STATUS_LABEL_KEY[invoice.status as keyof typeof STATUS_LABEL_KEY]] ??
                  invoice.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
