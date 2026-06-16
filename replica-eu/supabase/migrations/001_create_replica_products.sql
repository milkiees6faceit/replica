create table if not exists public.replica_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  gender text not null,
  country text not null,
  lead_time text not null,
  price numeric(10,2) not null,
  deposit numeric(10,2) not null,
  status text not null,
  badge text not null default 'NEW',
  description text not null,
  estimated_delivery text not null,
  sizes text[] not null default '{}',
  colors jsonb not null default '[]'::jsonb,
  images text[] not null default '{}',
  supplier text not null,
  published_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.replica_products enable row level security;

drop policy if exists "Replica products are public" on public.replica_products;
create policy "Replica products are public"
  on public.replica_products
  for select
  using (true);

drop policy if exists "Replica admins can insert products" on public.replica_products;
create policy "Replica admins can insert products"
  on public.replica_products
  for insert
  to authenticated
  with check ((auth.jwt() ->> 'email') = 'milkiees6faceit@gmail.com');

drop policy if exists "Replica admins can update products" on public.replica_products;
create policy "Replica admins can update products"
  on public.replica_products
  for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'milkiees6faceit@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'milkiees6faceit@gmail.com');

drop policy if exists "Replica admins can delete products" on public.replica_products;
create policy "Replica admins can delete products"
  on public.replica_products
  for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = 'milkiees6faceit@gmail.com');

grant select on public.replica_products to anon, authenticated;
grant insert, update, delete on public.replica_products to authenticated;
