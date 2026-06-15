# Replica EU

Modern Next.js 14 App Router marketplace for EU fashion preorders.

Positioning: EU fashion preorder marketplace, inspired style, verified suppliers, no counterfeit goods. Replica EU is independent and is not affiliated with luxury brands unless a product listing explicitly says otherwise.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-compatible local components
- Prisma + PostgreSQL
- Stripe Checkout
- NextAuth credentials provider
- Resend email helper
- UploadThing image upload route
- i18n for EN, RO, RU with `next-intl`

## Routes

- `/en`, `/ro`, `/ru` home
- `/[locale]/catalog`
- `/[locale]/product/[slug]`
- `/[locale]/cart`
- `/[locale]/checkout`
- `/[locale]/dashboard`
- `/[locale]/admin`
- `/[locale]/about`, `/contact`, `/faq`, `/terms`, `/privacy`, `/refund`, `/legal`

## Getting Started

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

Open `http://localhost:3000/en`.

## GitHub Pages Static HTML

This project can export static HTML for GitHub Pages. API routes, Stripe webhooks, NextAuth server auth, and other server-side features are disabled in the static export, but the storefront and crypto checkout UI are generated as HTML/CSS/JS.

```bash
npm run build:pages
```

The static site is generated in:

```text
replica-eu/out
```

For the repository `milkiees6faceit/replica`, the export uses the project base path `/replica`, so GitHub Pages can serve it at:

```text
https://milkiees6faceit.github.io/replica/
```

The included GitHub Actions workflow `.github/workflows/pages.yml` builds and deploys `replica-eu/out` automatically from the `main` branch.

Seed admin:

```text
email: admin@replica-eu.example
password: admin12345
```

## Environment

Set the values in `.env`:

- `DATABASE_URL`: PostgreSQL connection string.
- `NEXTAUTH_SECRET`: generate with `openssl rand -base64 32`.
- `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`: Stripe Checkout and webhook.
- `RESEND_API_KEY`: transactional emails for payment and order status updates.
- `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`: admin image uploads.

## Business Logic

- Products can be preordered until their `PreorderBatch.closeAt` date.
- After Stripe payment succeeds, order status should move from `pending` to `paid`.
- Admin can update order status through the admin workflow: `pending`, `paid`, `ordered_from_supplier`, `shipped`, `delivered`, `cancelled`.
- Email notifications are sent after payment and can be reused when admin changes order status.
- VAT is intentionally a placeholder in checkout until tax rules/provider are finalized.

## Legal Notes

Do not use protected brand logos, names, or product images without permission. Listings should avoid confusing customers into believing independent inspired-style items are luxury-branded goods.

Replica EU does not sell counterfeit goods and is not affiliated with luxury brands or third-party trademark owners unless explicitly stated in writing on a product listing.
