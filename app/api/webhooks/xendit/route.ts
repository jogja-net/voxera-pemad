import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

/**
 * Xendit sends the "Callback Verification Token" from the dashboard back on
 * every webhook call in this header (not an HMAC signature) — see
 * .env.example for where to get XENDIT_WEBHOOK_TOKEN.
 */
export async function POST(request: Request) {
  const token = request.headers.get("x-callback-token");
  if (!token || token !== process.env.XENDIT_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Invalid callback token" }, { status: 401 });
  }

  const payload = await request.json();
  const status =
    payload.status === "PAID" || payload.status === "SETTLED"
      ? "paid"
      : payload.status === "EXPIRED"
        ? "expired"
        : null; // unrecognized/no-op status — ignore rather than corrupt state

  if (!status) {
    return NextResponse.json({ received: true });
  }

  const admin = createAdminSupabaseClient();
  const { error } = await admin
    .from("invoices")
    .update({
      status,
      paid_at: status === "paid" ? (payload.paid_at ?? new Date().toISOString()) : null,
      xendit_payload: payload,
      updated_at: new Date().toISOString(),
    })
    .eq("xendit_invoice_id", payload.id);

  if (error) {
    console.error("Error updating invoice from Xendit webhook:", error);
    // Non-2xx so Xendit retries the callback.
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
