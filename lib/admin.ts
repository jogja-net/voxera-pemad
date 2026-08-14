/**
 * There is no roles table in this codebase — ADMIN_EMAILS is the entire
 * authorization mechanism for the billing admin flow (confirming a
 * project's billable quantity and generating its Xendit invoice). Server-side
 * only; never trust a client-supplied "isAdmin" flag.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return !!email && admins.includes(email.toLowerCase());
}
