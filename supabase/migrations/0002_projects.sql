
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  service_type text not null, -- e.g., 'validation', 'generation', 'translation', 'interpreter'
  metadata jsonb, -- Store form data or other relevant project details
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Allow authenticated users to select their own projects
create policy projects_select_own on public.projects for select using (auth.uid() = user_id);

-- Allow authenticated users to insert projects
create policy projects_insert_own on public.projects for insert with check (auth.uid() = user_id);

-- Allow authenticated users to update their own projects
create policy projects_update_own on public.projects for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Allow authenticated users to delete their own projects
create policy projects_delete_own on public.projects for delete using (auth.uid() = user_id);
