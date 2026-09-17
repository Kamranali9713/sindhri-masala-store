-- =========================================================
-- SINDHRI MASALA STORE - INITIAL SCHEMA
-- =========================================================
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------
-- SITE SETTINGS (singleton row)
-- ---------------------------------------------------------
create table site_settings (
  id uuid primary key default uuid_generate_v4(),
  site_name text not null default 'Sindhri Masala',
  logo_url text,
  favicon_url text,
  whatsapp_number text not null default '923000000000',
  email text,
  phone text,
  address text,
  google_maps_url text,
  default_social_link text default 'https://example.com',
  default_shipping_rate numeric(10,2) not null default 300,
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------
-- SOCIAL LINKS
-- ---------------------------------------------------------
create table social_links (
  id uuid primary key default uuid_generate_v4(),
  platform text not null, -- facebook, instagram, tiktok, youtube, linkedin, twitter
  icon text,
  url text,
  is_active boolean default true,
  sort_order int default 0
);

-- ---------------------------------------------------------
-- CATEGORIES
-- ---------------------------------------------------------
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  is_active boolean default true,
  sort_order int default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------
create table products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  price numeric(10,2) not null,
  sale_price numeric(10,2),
  stock_status text not null default 'in_stock', -- in_stock / out_of_stock
  stock_quantity int default 100,
  is_featured boolean default false,
  is_best_seller boolean default false,
  is_active boolean default true,
  main_image_url text,
  meta_title text,
  meta_description text,
  created_at timestamptz default now()
);

create table product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  image_url text not null,
  sort_order int default 0
);

-- weight / pack size variants, e.g. 50g, 100g, 200g
create table product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  label text not null,        -- e.g. "100g"
  weight_value numeric(10,2),
  weight_unit text default 'g',
  price numeric(10,2) not null,
  sale_price numeric(10,2),
  stock_status text default 'in_stock',
  is_default boolean default false,
  sort_order int default 0
);

-- ---------------------------------------------------------
-- SHIPPING ZONES (dynamic city shipping)
-- ---------------------------------------------------------
create table shipping_zones (
  id uuid primary key default uuid_generate_v4(),
  city_name text not null unique,
  shipping_cost numeric(10,2) not null,
  is_active boolean default true,
  is_default boolean default false, -- "Other Cities" fallback
  sort_order int default 0
);

-- ---------------------------------------------------------
-- ORDERS
-- ---------------------------------------------------------
create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  notes text,
  subtotal numeric(10,2) not null,
  shipping_cost numeric(10,2) not null,
  grand_total numeric(10,2) not null,
  status text default 'pending', -- pending / confirmed / delivered / cancelled
  source text default 'checkout', -- checkout / buy_now / direct_whatsapp
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  variant_id uuid references product_variants(id) on delete set null,
  product_name text not null,
  variant_label text,
  quantity int not null,
  unit_price numeric(10,2) not null,
  line_total numeric(10,2) not null
);

-- ---------------------------------------------------------
-- VIDEOS
-- ---------------------------------------------------------
create table videos (
  id uuid primary key default uuid_generate_v4(),
  title text,
  subtitle text,
  video_url text,
  thumbnail_url text,
  button_text text,
  button_link text,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- HOMEPAGE CMS (unlimited dynamic sections)
-- ---------------------------------------------------------
create table homepage_sections (
  id uuid primary key default uuid_generate_v4(),
  section_type text not null, -- hero, banner_slider, featured_categories, featured_products, best_sellers, promo_video, about_preview, why_choose_us, delivery_info, whatsapp_cta, faq, contact_preview, custom
  title text,
  subtitle text,
  description text,
  button_text text,
  button_link text,
  image_url text,
  video_url text,
  sort_order int default 0,
  is_active boolean default true
);

create table homepage_section_items (
  id uuid primary key default uuid_generate_v4(),
  section_id uuid references homepage_sections(id) on delete cascade,
  title text,
  subtitle text,
  description text,
  image_url text,
  button_text text,
  button_link text,
  sort_order int default 0,
  is_active boolean default true
);

-- ---------------------------------------------------------
-- ABOUT / CONTACT PAGE (singleton rows)
-- ---------------------------------------------------------
create table about_page (
  id uuid primary key default uuid_generate_v4(),
  banner_url text,
  title text,
  description text,
  company_story text,
  vision text,
  mission text,
  image_url text,
  video_url text,
  meta_title text,
  meta_description text
);

create table contact_page (
  id uuid primary key default uuid_generate_v4(),
  address text,
  phone text,
  email text,
  whatsapp text,
  google_map_url text,
  business_hours text,
  meta_title text,
  meta_description text
);

-- ---------------------------------------------------------
-- SEO SETTINGS (per page key)
-- ---------------------------------------------------------
create table seo_settings (
  id uuid primary key default uuid_generate_v4(),
  page_key text unique not null, -- home, products, categories, about, contact
  meta_title text,
  meta_description text,
  keywords text,
  og_image text
);

-- ---------------------------------------------------------
-- MENUS
-- ---------------------------------------------------------
create table menus (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  location text default 'header' -- header / footer
);

create table menu_items (
  id uuid primary key default uuid_generate_v4(),
  menu_id uuid references menus(id) on delete cascade,
  label text not null,
  url text not null,
  sort_order int default 0
);

-- ---------------------------------------------------------
-- ADMIN USERS (linked to Supabase Auth via auth.users)
-- ---------------------------------------------------------
create table admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'admin',
  created_at timestamptz default now()
);

-- =========================================================
-- INDEXES
-- =========================================================
create index idx_products_category on products(category_id);
create index idx_products_slug on products(slug);
create index idx_products_active on products(is_active);
create index idx_product_variants_product on product_variants(product_id);
create index idx_product_images_product on product_images(product_id);
create index idx_orders_created on orders(created_at desc);
create index idx_homepage_items_section on homepage_section_items(section_id);
create index idx_categories_slug on categories(slug);

-- =========================================================
-- RLS POLICIES
-- Public: read-only on published/active content
-- Admin (authenticated + in admin_users): full access
-- =========================================================
alter table site_settings enable row level security;
alter table social_links enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table shipping_zones enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table videos enable row level security;
alter table homepage_sections enable row level security;
alter table homepage_section_items enable row level security;
alter table about_page enable row level security;
alter table contact_page enable row level security;
alter table seo_settings enable row level security;
alter table menus enable row level security;
alter table menu_items enable row level security;
alter table admin_users enable row level security;

-- helper: is the current user an admin?
create or replace function is_admin() returns boolean as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$ language sql security definer;

-- Public read policies
create policy "public read site_settings" on site_settings for select using (true);
create policy "public read social_links" on social_links for select using (is_active = true);
create policy "public read categories" on categories for select using (is_active = true);
create policy "public read products" on products for select using (is_active = true);
create policy "public read product_images" on product_images for select using (true);
create policy "public read product_variants" on product_variants for select using (true);
create policy "public read shipping_zones" on shipping_zones for select using (is_active = true);
create policy "public read videos" on videos for select using (is_active = true);
create policy "public read homepage_sections" on homepage_sections for select using (is_active = true);
create policy "public read homepage_section_items" on homepage_section_items for select using (is_active = true);
create policy "public read about_page" on about_page for select using (true);
create policy "public read contact_page" on contact_page for select using (true);
create policy "public read seo_settings" on seo_settings for select using (true);
create policy "public read menus" on menus for select using (true);
create policy "public read menu_items" on menu_items for select using (true);

-- Public insert on orders/order_items (WhatsApp checkout writes the order)
create policy "public insert orders" on orders for insert with check (true);
create policy "public insert order_items" on order_items for insert with check (true);

-- Admin full access (all tables)
create policy "admin all site_settings" on site_settings for all using (is_admin()) with check (is_admin());
create policy "admin all social_links" on social_links for all using (is_admin()) with check (is_admin());
create policy "admin all categories" on categories for all using (is_admin()) with check (is_admin());
create policy "admin all products" on products for all using (is_admin()) with check (is_admin());
create policy "admin all product_images" on product_images for all using (is_admin()) with check (is_admin());
create policy "admin all product_variants" on product_variants for all using (is_admin()) with check (is_admin());
create policy "admin all shipping_zones" on shipping_zones for all using (is_admin()) with check (is_admin());
create policy "admin all orders" on orders for all using (is_admin()) with check (is_admin());
create policy "admin all order_items" on order_items for all using (is_admin()) with check (is_admin());
create policy "admin all videos" on videos for all using (is_admin()) with check (is_admin());
create policy "admin all homepage_sections" on homepage_sections for all using (is_admin()) with check (is_admin());
create policy "admin all homepage_section_items" on homepage_section_items for all using (is_admin()) with check (is_admin());
create policy "admin all about_page" on about_page for all using (is_admin()) with check (is_admin());
create policy "admin all contact_page" on contact_page for all using (is_admin()) with check (is_admin());
create policy "admin all seo_settings" on seo_settings for all using (is_admin()) with check (is_admin());
create policy "admin all menus" on menus for all using (is_admin()) with check (is_admin());
create policy "admin all menu_items" on menu_items for all using (is_admin()) with check (is_admin());
create policy "admin read self" on admin_users for select using (auth.uid() = id);

-- =========================================================
-- STORAGE BUCKETS
-- =========================================================
insert into storage.buckets (id, name, public) values
  ('products', 'products', true),
  ('categories', 'categories', true),
  ('homepage', 'homepage', true),
  ('videos', 'videos', true),
  ('logos', 'logos', true),
  ('banners', 'banners', true)
on conflict (id) do nothing;

create policy "public read storage" on storage.objects for select using (true);
create policy "admin write storage" on storage.objects for insert with check (is_admin());
create policy "admin update storage" on storage.objects for update using (is_admin());
create policy "admin delete storage" on storage.objects for delete using (is_admin());

-- =========================================================
-- SEED DATA (based on real Sindhri / DT Enterprises product range)
-- =========================================================
insert into site_settings (site_name, whatsapp_number, email, phone, address, default_shipping_rate, default_social_link)
values ('Sindhri Masala', '923001234567', 'info@sindhrimasala.com', '+92 300 1234567', 'Rawalpindi, Punjab, Pakistan', 300, 'https://example.com');

insert into shipping_zones (city_name, shipping_cost, is_active, is_default, sort_order) values
  ('Islamabad', 150, true, false, 1),
  ('Rawalpindi', 150, true, false, 2),
  ('Lahore', 200, true, false, 3),
  ('Karachi', 250, true, false, 4),
  ('Other Cities', 300, true, true, 99);

insert into categories (name, slug, description, is_active, sort_order) values
  ('Masala Mixes', 'masala-mixes', 'Ready-to-cook spice mixes for classic Pakistani dishes', true, 1),
  ('Ground Spices', 'ground-spices', 'Single-ingredient ground spice powders', true, 2);

-- Masala Mixes (category 1)
insert into products (category_id, name, slug, short_description, price, is_featured, is_best_seller, main_image_url)
select id, 'Nehari Masala', 'nehari-masala', 'Authentic spice blend for slow-cooked beef nehari', 150, true, true, '/products/nehari-masala.jpg'
from categories where slug = 'masala-mixes';

insert into products (category_id, name, slug, short_description, price, is_featured, is_best_seller, main_image_url)
select id, 'Biryani Masala', 'biryani-masala', 'Aromatic spice mix for fragrant chicken or mutton biryani', 150, true, true, '/products/biryani-masala.jpg'
from categories where slug = 'masala-mixes';

insert into products (category_id, name, slug, short_description, price, is_featured, main_image_url)
select id, 'Chicken Masala', 'chicken-masala', 'All-purpose masala for everyday chicken curry', 140, true, '/products/chicken-masala.jpg'
from categories where slug = 'masala-mixes';

insert into products (category_id, name, slug, short_description, price, is_featured, main_image_url)
select id, 'Karahi Gosht Masala', 'karahi-gosht-masala', 'Spice blend for restaurant-style mutton/beef karahi', 160, true, '/products/karahi-gosht-masala.jpg'
from categories where slug = 'masala-mixes';

insert into products (category_id, name, slug, short_description, price, main_image_url)
select id, 'Fish Masala', 'fish-masala', 'Spice mix for pan-fried or grilled fish', 140, '/products/fish-masala.jpg'
from categories where slug = 'masala-mixes';

insert into products (category_id, name, slug, short_description, price, main_image_url)
select id, 'Quorma Masala', 'quorma-masala', 'Rich spice blend for creamy chicken or mutton qorma', 145, '/products/quorma-masala.jpg'
from categories where slug = 'masala-mixes';

-- Ground Spices (category 2)
insert into products (category_id, name, slug, short_description, price, is_featured, main_image_url)
select id, 'Black Pepper Powder', 'black-pepper-powder', 'Finely ground black pepper, 100% pure', 180, true, '/products/black-pepper-powder.jpg'
from categories where slug = 'ground-spices';

insert into products (category_id, name, slug, short_description, price, main_image_url)
select id, 'Garam Masala Powder', 'garam-masala-powder', 'Blend of warming whole spices, freshly ground', 170, '/products/garam-masala-powder.jpg'
from categories where slug = 'ground-spices';

-- Variants: 10g / 50g / 100g / 200g for each product, priced off base 'price'
insert into product_variants (product_id, label, weight_value, weight_unit, price, is_default, sort_order)
select id, '10g', 10, 'g', round(price * 0.15, 0), false, 1 from products;
insert into product_variants (product_id, label, weight_value, weight_unit, price, is_default, sort_order)
select id, '50g', 50, 'g', round(price * 0.5, 0), false, 2 from products;
insert into product_variants (product_id, label, weight_value, weight_unit, price, is_default, sort_order)
select id, '100g', 100, 'g', price, true, 3 from products;
insert into product_variants (product_id, label, weight_value, weight_unit, price, is_default, sort_order)
select id, '200g', 200, 'g', round(price * 1.9, 0), false, 4 from products;

insert into homepage_sections (section_type, title, subtitle, sort_order, is_active) values
  ('hero', 'Authentic Pakistani Masala, Straight to Your Kitchen', 'Halal certified spice blends made the traditional way', 1, true),
  ('featured_categories', 'Shop by Category', null, 2, true),
  ('featured_products', 'Featured Products', 'Our most loved spice blends', 3, true),
  ('best_sellers', 'Best Sellers', null, 4, true),
  ('why_choose_us', 'Why Choose Sindhri', null, 5, true),
  ('whatsapp_cta', 'Order Instantly on WhatsApp', 'No account needed — just message us your order', 6, true),
  ('faq', 'Frequently Asked Questions', null, 7, true);

insert into about_page (title, description, company_story, vision, mission) values
  ('About Sindhri Masala', 'Sindhri is a product of DT Enterprises, bringing authentic Pakistani spice blends to every kitchen.',
   'Founded with a passion for authentic flavor, Sindhri has been crafting halal-certified masala blends using traditional recipes.',
   'To become the most trusted masala brand in Pakistan.',
   'To deliver consistent, high-quality, preservative-conscious spice blends to every home.');

insert into contact_page (address, phone, email, whatsapp, business_hours) values
  ('Rawalpindi, Punjab, Pakistan', '+92 300 1234567', 'info@sindhrimasala.com', '923001234567', 'Mon - Sat: 10:00 AM - 8:00 PM');

insert into social_links (platform, url, is_active, sort_order) values
  ('facebook', '', true, 1),
  ('instagram', '', true, 2),
  ('tiktok', '', true, 3),
  ('youtube', '', true, 4);

insert into seo_settings (page_key, meta_title, meta_description) values
  ('home', 'Sindhri Masala | Authentic Pakistani Spice Blends', 'Shop halal-certified Sindhri masala mixes — Biryani, Nehari, Karahi, Chicken, Fish, Qorma and more. Order via WhatsApp.'),
  ('products', 'Shop Masala Online | Sindhri', 'Browse the full range of Sindhri spice blends and ground spices.'),
  ('about', 'About Us | Sindhri Masala', 'Learn about DT Enterprises and the Sindhri masala brand.'),
  ('contact', 'Contact Us | Sindhri Masala', 'Get in touch with Sindhri Masala via phone, email or WhatsApp.');
