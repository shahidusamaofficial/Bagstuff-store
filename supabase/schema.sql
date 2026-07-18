-- =========================================================
-- Bagstuff store schema
-- Run this in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run
-- =========================================================

create table categories (
  id text primary key,
  name text not null,
  color text not null,
  icon text not null,
  image_url text,
  featured boolean default false
);

create table products (
  id bigint generated always as identity primary key,
  category_id text references categories(id),
  name text not null,
  sku text unique not null,
  price integer not null,
  old_price integer,
  rating numeric(2,1) default 4.5,
  reviews integer default 0,
  badge text,
  in_stock boolean default true,
  stock_count integer,
  variants text[],
  description text,
  specifications text,
  shipping_info text,
  image_url text,
  images jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table reviews (
  id bigint generated always as identity primary key,
  product_id bigint references products(id) on delete cascade,
  name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  approved boolean default false,
  created_at timestamptz default now()
);
-- If Row Level Security is enabled on this table, also run:
--   create policy "public can insert reviews" on reviews for insert with check (true);
--   create policy "public can read approved reviews" on reviews for select using (approved = true);

create table orders (
  id bigint generated always as identity primary key,
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  payment_method text not null,
  payment_status text default 'pending',
  subtotal integer not null,
  status text default 'received',
  created_at timestamptz default now()
);

create table order_items (
  id bigint generated always as identity primary key,
  order_id bigint references orders(id) on delete cascade,
  product_id bigint references products(id),
  product_name text not null,
  variant text,
  qty integer not null,
  price integer not null
);

alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Public can read categories" on categories for select using (true);
create policy "Public can read products" on products for select using (true);
create policy "Public can create orders" on orders for insert with check (true);
create policy "Public can create order items" on order_items for insert with check (true);

-- Categories
insert into categories (id, name, color, icon) values
  ('handbags', 'Handbags', '#B76E79', 'ShoppingBag'),
  ('totes', 'Totes', '#A98B5D', 'Briefcase'),
  ('crossbody', 'Crossbody Bags', '#7C6A8E', 'Package'),
  ('clutches', 'Clutches & Wallets', '#5E7A73', 'Wallet'),
  ('backpacks', 'Backpacks', '#8C5B4A', 'Backpack'),
  ('bracelets', 'Bracelets', '#C9A24B', 'CircleDot'),
  ('necklaces', 'Necklaces & Pendants', '#9C4F5F', 'Gem'),
  ('jewelsets', 'Jewellery Sets', '#6B5B95', 'Sparkles');

-- Starter products — replace/expand these with your real catalog
insert into products (category_id, name, sku, price, old_price, rating, reviews, badge, in_stock, variants) values
  ('handbags', 'Structured Top-Handle Handbag', 'HB-TH-01', 4800, null, 4.7, 88, 'Bestseller', true, '{"Black","Tan","Camel"}'),
  ('handbags', 'Quilted Chain Handbag', 'HB-QC-02', 5200, null, 4.6, 54, null, true, '{"Black","Beige"}'),
  ('totes', 'Everyday Canvas Tote', 'TT-EC-01', 2800, null, 4.5, 61, null, true, '{"Natural","Black"}'),
  ('totes', 'Structured Work Tote', 'TT-SW-02', 5600, 6200, 4.7, 39, 'Sale', true, '{"Black","Brown"}'),
  ('crossbody', 'Mini Crossbody Bag', 'CB-MC-01', 3200, null, 4.8, 102, 'Bestseller', true, '{"Black","Rose","Tan"}'),
  ('crossbody', 'Woven Strap Crossbody', 'CB-WS-02', 3600, null, 4.4, 27, 'New', true, '{"Beige","Black"}'),
  ('clutches', 'Satin Evening Clutch', 'CL-SE-01', 2600, null, 4.6, 45, null, true, '{"Gold","Silver","Black"}'),
  ('clutches', 'Slim Leather Wallet', 'CL-SL-02', 1800, null, 4.5, 33, null, true, '{"Black","Tan"}'),
  ('backpacks', 'Mini Leather Backpack', 'BP-ML-01', 4200, null, 4.6, 48, null, true, '{"Black","Tan"}'),
  ('backpacks', 'Everyday Nylon Backpack', 'BP-EN-02', 3400, null, 4.4, 29, null, false, '{"Black","Grey"}'),
  ('bracelets', 'Layered Chain Bracelet', 'BR-LC-01', 1400, null, 4.7, 71, 'Bestseller', true, '{"Gold","Silver"}'),
  ('bracelets', 'Beaded Charm Bracelet', 'BR-BC-02', 1100, null, 4.3, 22, null, true, null),
  ('necklaces', 'Delicate Pendant Necklace', 'NK-DP-01', 1900, null, 4.8, 96, 'Bestseller', true, '{"Gold","Silver"}'),
  ('necklaces', 'Layered Chain Necklace', 'NK-LC-02', 2100, 2500, 4.5, 34, 'Sale', true, '{"Gold","Silver"}'),
  ('jewelsets', 'Bridal Jewellery Set', 'JS-BR-01', 8500, null, 4.9, 41, 'Bestseller', true, null),
  ('jewelsets', 'Everyday Jewellery Set (3-Piece)', 'JS-ED-02', 3200, null, 4.6, 28, 'New', true, '{"Gold","Silver"}');
