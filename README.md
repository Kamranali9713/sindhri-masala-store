# Sindhri Masala — E-Commerce Store (WhatsApp Ordering)

A production-ready storefront built with Next.js App Router + Supabase.
No customer login, no payment gateway — customers order via WhatsApp,
and everything (products, categories, homepage sections, shipping by city,
social links, about/contact content) is editable from the Admin Panel.

> Note on the tech stack: the original spec asked for "Next.js 16.3.5", which
> doesn't exist yet — this project uses **Next.js 14.2.x**, the latest stable
> release with a patched App Router, Server Actions, and Supabase SSR support.
> Upgrading later to Next 15/16 when released is a drop-in change.

## 1. Prerequisites

- Node.js 18.18+ (`node -v`)
- A free Supabase project → https://supabase.com/dashboard

## 2. Set up Supabase

1. Create a new Supabase project.
2. Go to **SQL Editor** → paste the contents of `supabase/migrations/0001_init.sql`
   → Run. This creates every table, RLS policy, index, storage bucket, and
   seeds your real Sindhri product catalog (Nehari, Biryani, Chicken, Karahi
   Gosht, Fish, Qorma masalas, Black Pepper Powder, Garam Masala Powder) with
   10g/50g/100g/200g variants and Islamabad/Rawalpindi/Lahore/Karachi/Other
   Cities shipping zones.
3. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (keep secret — server-only)
4. Create your first admin login: **Authentication → Users → Add User**
   (email + password), then in **SQL Editor** run:
   ```sql
   insert into admin_users (id, full_name, role)
   values ('PASTE-THE-USER-UUID-HERE', 'Admin', 'admin');
   ```
5. Upload real product photos to the `products` storage bucket
   (**Storage → products**) and paste the public URL into each product's
   "Main Image URL" field in `/admin/products`.

## 3. Run locally

```bash
npm install
cp .env.example .env.local
# then fill in .env.local with your Supabase URL + keys
npm run dev
```

Visit:
- Storefront → http://localhost:3000
- Admin panel → http://localhost:3000/admin/login

## 4. What's included

- **Storefront**: dynamic homepage (hero, featured categories, featured
  products, best sellers, why-choose-us, WhatsApp CTA, FAQ — all editable),
  product listing with category filter, product detail page with weight
  variants + qty selector + Add to Cart / Buy Now / Buy via WhatsApp, cart,
  checkout with dynamic city-based shipping that recalculates the grand
  total live, and a floating WhatsApp button on every page.
- **WhatsApp order flow**: checkout saves the order to Supabase (`orders` +
  `order_items`) then opens WhatsApp with a pre-filled message in the exact
  format from the spec (products, subtotal, shipping, grand total, customer
  details).
- **Dynamic shipping**: `shipping_zones` table, managed from
  `/admin/shipping` — add/edit/delete/activate a city and set its cost.
- **Admin panel**: dashboard (order/product counts + recent orders),
  Products CRUD, Categories CRUD, Orders list, Shipping management,
  Homepage CMS (edit title/subtitle/order/active per section). Protected by
  Supabase Auth + middleware redirect.
- **Social icon fallback**: `getSocialLink()` helper in
  `src/lib/helpers/getSocialLink.js` — if a platform's URL is empty, the
  icon falls back to the site's default URL instead of a dead link.
- **Database**: full schema, foreign keys, indexes, RLS policies (public
  read on active content, admin-only writes via an `is_admin()` check,
  public insert on orders) and storage buckets for
  products/categories/homepage/videos/logos/banners.

## 5. What to extend next

This ships a complete, working core. A few admin modules were scaffolded
at reference-implementation depth so you (or Claude, in a follow-up) can
extend them the same way Products/Shipping were built:

- **Video Management** (`videos` table exists; add an `/admin/videos`
  CRUD page + a homepage Promo Video section component)
- **Social Media Settings** admin screen (table + public fallback logic
  already work — just needs an admin CRUD UI like `ShippingManager`)
- **Site Settings / SEO Settings** admin forms (tables exist; wire up a
  single-row edit form same pattern as `HomepageSectionManager`)
- **Product variant editor** inside the product form (variants are seeded
  automatically per product; a dedicated UI to add/remove custom variants
  per product would follow the same server-action pattern as
  `product.actions.js`)
- **Image upload** — currently admin pastes a Supabase Storage URL; wiring
  a direct `<input type="file">` → `supabase.storage.from('products').upload()`
  call is a small addition to `ProductForm.js`

## 6. Deployment

Deploy to Vercel (recommended for Next.js):
```bash
vercel
```
Add the same three env vars (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`NEXT_PUBLIC_SITE_URL`) in your Vercel project settings.

## 7. Folder structure

See the architecture summary shared earlier in this conversation — this
project follows it exactly (`src/app`, `src/components`, `src/lib/actions`,
`src/lib/queries`, `src/lib/helpers`, `src/store`, `src/providers`).
