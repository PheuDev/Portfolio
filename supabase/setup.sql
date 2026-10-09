create table if not exists public.portfolio_content (
  domain text primary key check (
    domain in (
      'identity',
      'projects',
      'skills',
      'services',
      'credentials',
      'experience',
      'explorations'
    )
  ),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

grant select on public.portfolio_content to anon, authenticated;
grant insert, update, delete on public.portfolio_content to authenticated;

drop policy if exists "Public can read portfolio content" on public.portfolio_content;
create policy "Public can read portfolio content"
  on public.portfolio_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can manage portfolio content" on public.portfolio_content;
create policy "Admins can manage portfolio content"
  on public.portfolio_content
  for all
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');