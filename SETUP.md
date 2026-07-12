# Bagstuff — Setup & Go-Live Guide

This turns the code into a real, live website taking real orders.
Every step is clicking around a website — no coding required.

## What this costs
| Service | Cost |
|---|---|
| Vercel Pro (hosting) | $20/month — required for commercial/payment-taking sites, their free tier doesn't allow it |
| Supabase (database) | $0 to start (free tier), ~$25/month once you outgrow it |
| Domain name | ~$10–15/year |
| GitHub | Free |
| PayFast (payments) | $0 setup, ~3% + tax per card/wallet transaction (COD has no fee) |

**Total to start: about $20–35/month + 3% on card/wallet sales.**

Total setup time: about 45–60 minutes for Phase 1.

---

## Phase 1: Get the store live with Cash on Delivery

### Step 1 — Create your database (Supabase)
1. Go to **supabase.com** → Sign up (free) → **New Project**
2. Name it (e.g. "bagstuff-store"), set a database password (save it somewhere safe), pick a region close to Pakistan (e.g. Singapore), click **Create**
3. Once ready, open **SQL Editor** (left sidebar) → **New query**
4. Open `supabase/schema.sql` from this project, copy all of it, paste into the SQL editor, click **Run**
   — this creates your tables and adds 10 starter products
5. Go to **Settings → API** (left sidebar) and note down two values:
   - **Project URL**
   - **anon public key**

### Step 2 — Put your code on GitHub
1. Go to **github.com** → sign up if needed → **New repository** → name it `bagstuff-store` → **Create**
2. On the new repo page, click **uploading an existing file**
3. Drag in the entire project folder's contents and commit

### Step 3 — Deploy to Vercel
1. Go to **vercel.com** → sign up using your GitHub account
2. **Add New → Project** → select `bagstuff-store` → **Import**
3. Before deploying, open **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` → your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → your Supabase anon public key
4. Click **Deploy**. You'll get a live URL like `bagstuff-store.vercel.app`.
5. **Upgrade to Pro**: go to your account settings → **Billing** → switch to the **Pro plan ($20/month)**. This is required once the store is taking real orders/payments — Vercel's free Hobby tier is for personal, non-commercial projects only.

### Step 4 — Connect your own domain (optional but recommended)
1. Buy a domain (e.g. Namecheap, GoDaddy) — something like `bagstuff.pk`
2. In Vercel: your project → **Settings → Domains** → add your domain
3. Add the DNS records Vercel shows you at your domain registrar
4. Wait 10–60 minutes for it to activate

**Your store is now live, browsable, and can take Cash on Delivery orders.**

### Step 5 — Add your real products
- Supabase → **Table Editor → products** → **Insert row** for each product
- Changes appear on your live site within about a minute, no redeploy needed
- View incoming orders: **Table Editor → orders** and **order_items**

### Step 6 — Replace placeholder details
Edit these directly on GitHub (pencil icon on any file) before sharing publicly:
- `components/SiteChrome.js` and `app/product/[id]/ProductClient.js` — replace `923000000000` with your real WhatsApp number
- `app/contact/page.js` — real phone/email
- `app/about/page.js` — real about text

Any push to GitHub redeploys automatically within a minute.

---

## Phase 2: Enable card & wallet payments (PayFast)

1. Apply for a merchant account at **payfast.com.pk** (or search "PayFast Pakistan merchant account"). You'll need your CNIC, bank account details, and basic business info. Approval typically takes a few business days. No setup fee — you're charged a Merchant Discount Rate (around 3% + tax) only when a sale goes through.
2. Once approved, you'll get a **Merchant ID** and **Secured Key**.
3. Come back and share those two values with me — I'll write the integration so checkout redirects customers to PayFast's secure payment page and confirms payment automatically.
4. Add the two keys in Vercel: **Settings → Environment Variables**, then redeploy.

Until Phase 2 is live, "Card / JazzCash / EasyPaisa" orders are still recorded — you'll just confirm payment manually with the customer (e.g. via WhatsApp) in the meantime.

---

## Ongoing maintenance
- **Products**: always edited in Supabase's Table Editor — no code.
- **Text/design changes**: edited in code files, pushed to GitHub, auto-deploys.
- **Bugs or new features**: come back here, or bring in a developer — there's no support hotline like Shopify's, since this is your own custom build.
