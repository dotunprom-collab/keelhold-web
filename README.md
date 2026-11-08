# Keelhold Capital Group — website

Next.js (App Router) + TypeScript, statically generated. Built to the *Website Upgrade Brief 1.0* design handoff.

```bash
npm install
cp .env.example .env.local   # fill in as needed
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Where things live
- `app/globals.css` — design tokens (CSS custom properties) and resets
- `app/page.tsx` — homepage; `app/[business]/page.tsx` — the four business pages; `app/privacy`, `app/terms`
- `lib/businesses.ts` — business data (names, descriptions, status, legal entities, fundCorridor URL)
- `lib/site.ts` — site URL, registered office
- `lib/enquiry.ts` — enquiry types, contact email
- `content/publications.ts` — Letters & reports (empty until genuine publications exist)
- `app/actions/contact.ts` — enquiry submission (validation, honeypot, rate limit, Turnstile)
- `lib/server/mail.ts` — email delivery adapter (**connect a provider before launch**)

## Before launch
- Connect an email provider in `lib/server/mail.ts` and set `ENQUIRY_TO_*` recipients
- Set Turnstile keys (production rejects enquiries without them)
- Fill `[bracketed]` placeholders: legal entity, jurisdiction, company number, regulatory statement, per-business legal entities
- Legal page text, confirmed contact email
- Rate limiting is per-instance in memory; add a shared store or platform firewall rule for serverless hosting
