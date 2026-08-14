-- One row per auth.users account, holding the fields Supabase Auth doesn't
-- store natively (name, phone) that the Register form collects.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone_number text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy profiles_select_own
  on public.profiles for select
  using (auth.uid() = id);

create policy profiles_update_own
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Populates profiles atomically with signup, reading the name/phone passed
-- via supabase.auth.signUp({ options: { data: { full_name, phone_number } } }).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone_number)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone_number', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- security definer functions in the public schema are auto-exposed as
-- PostgREST RPCs by default; this one is only meant to run via the trigger.
revoke execute on function public.handle_new_user() from anon, authenticated, public;
