-- Run this once in your Supabase project: Dashboard -> SQL Editor -> New query -> paste -> Run
-- Safe to run on your existing/live database — every statement is additive
-- (adds columns/tables) and won't touch data you already have.

-- 1. Shipping charge + order total on existing orders
alter table orders add column if not exists shipping_fee integer default 0;
alter table orders add column if not exists total integer;

-- Backfill total for any orders placed before this column existed
update orders set total = subtotal + coalesce(shipping_fee, 0) where total is null;

-- 2. Contact form submissions
create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

alter table contact_messages enable row level security;

-- Lets the public contact form insert a row; nobody can read/update/delete
-- from the browser — view submissions from the Supabase Table Editor,
-- or add a "Public can read" policy yourself if you build an admin view.
drop policy if exists "Public can submit contact messages" on contact_messages;
create policy "Public can submit contact messages" on contact_messages for insert with check (true);
