create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade, -- paying customer
  project_id uuid not null unique references public.projects (id) on delete cascade,
  created_by uuid not null references auth.users (id), -- admin who confirmed the quantity
  service_type text not null check (service_type in ('validation', 'generation', 'translation', 'interpreter')),
  quantity numeric not null check (quantity > 0), -- admin-confirmed billable quantity
  unit text not null check (unit in ('word', 'page', 'hour')),
  unit_price numeric not null, -- rate snapshot at creation time, see lib/pricing.ts
  subtotal numeric not null,
  tax_amount numeric not null, -- PPN 11%
  total_amount numeric not null,
  currency text not null default 'IDR',
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired', 'failed')),
  xendit_invoice_id text unique,
  xendit_external_id text not null unique,
  xendit_invoice_url text,
  xendit_payload jsonb, -- last webhook payload received, for audit
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.invoices enable row level security;

-- Customers may only ever read their own invoice. All writes (creation by an
-- admin, status updates from the Xendit webhook) go through the service-role
-- client server-side (lib/supabase/admin.ts), bypassing RLS entirely — there
-- is intentionally no insert/update/delete policy for authenticated users.
create policy invoices_select_own on public.invoices for select using (auth.uid() = user_id);
