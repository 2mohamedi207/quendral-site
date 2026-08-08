# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: small home-service (trades — window cleaning, gutters, holiday lighting, HVAC, plumbing, electrical, landscaping, etc.) and real estate businesses in Calgary, AB, most with 1-10 people, no in-house marketing or dev capability. They're missing jobs because calls go unanswered while they're on-site, and quote requests get slow or no follow-up. They evaluate Quendral by phone (cold call) or by browsing the site after a call, then book a free 30-minute consultation.

Secondary: the site owner (Mohamed, 17, solo operator) uses the same site as his own sales tool during live consultation calls (screen-sharing pricing and value-prop sections).

## Product Purpose

Quendral builds AI-powered automation for home service and real estate businesses: instant call/text response so no lead goes unanswered, automated follow-up on quotes, an AI receptionist, and CRM setup. Success = a business owner stops losing jobs to missed calls and slow follow-up, and can see that leads are being captured and worked automatically.

## Positioning

Not a generic AI/automation reseller — built specifically for home services and real estate, by someone who cold-calls these exact businesses himself and understands their actual workflow (on a ladder, under a sink, can't answer the phone). Radically honest instead of over-claiming: no fabricated testimonials, client logos, or stats. The business has no long operating history yet and says so directly rather than inventing proof — commitment and hands-on attention are the pitch, not a fake track record.

## Operating Context

- Booking: Calendly (direct link, "Free Consultation")
- Payments: Stripe Checkout (one-time setup fee + monthly subscription, 30-day trial delays the first recurring charge)
- Intake: a form at /intake for new signed clients, triggers welcome + internal notification email (Resend)
- Legal pages: /terms, /privacy — template-based, explicitly marked as not yet lawyer-reviewed
- Cold-calling is the primary current acquisition channel; the site is shown live on calls and browsed after calls
- Founding-client offer: $499 flat setup + 50% off first 3 months, capped at 5 clients, in exchange for a testimonial/case study once delivered
- Two industries only: Home Services and Real Estate (a third, Health & Dental, was deliberately cut earlier)

## Capabilities and Constraints

- Next.js 16 App Router, TypeScript, Tailwind v4, Framer Motion, deployed on Vercel
- Stripe live-mode payouts are not yet enabled (pending business verification) — checkout currently runs in test mode
- No custom domain yet (site is on a *.vercel.app URL)
- No paid ad spend — cold calling and organic social content only
- A daily automated pipeline (separate from this site) generates and emails social content; not part of this redesign

## Brand Commitments

- Name: Quendral (cleared for trademark/domain conflicts earlier)
- Monogram "Q" logo: a ring + diagonal tail forming a Q, currently rendered in a blue→purple→pink gradient — used on favicon, social assets, emailed documents, and the Stripe branding upload. A full visual redesign may retire this specific gradient treatment, but the underlying monogram shape is a real, externally-distributed asset (favicon, Stripe branding, printed/emailed logo file) — changing its colorway has consequences outside this codebase, not just in it.
- Standing rule, non-negotiable regardless of visual direction: never fabricate testimonials, client logos, stats, or claims of past results. If proof doesn't exist yet, say so.
- CTA phrase is always "Free Consultation" — never "book a call" or "audit"

## Evidence on Hand

- Zero real client testimonials, logos, or published results exist yet (one client recently closed via cold-calling; delivery not yet complete). Do not fabricate any in this redesign.
- Real pricing is final and current in `lib/industries.ts` (Home Services: Core $497/749 · Plus $897/1249 · Multi-Crew $1497/1999 monthly/setup; Real Estate: Solo Agent $797/999 · Team $1497/1999 · Brokerage custom) — treat as source of truth, don't invent different numbers.

## Product Principles

1. Never claim proof, history, or results that don't exist — this is a hard constraint the business has already been burned by violating once (a prior "Why Us" section falsely implied the founder had run this on his own business; it was rewritten to be honest).
2. The site must work as a live sales aid on a screen-shared consultation call, not just as a passive marketing page.
3. Built for people evaluating this on a phone between jobs or during a 20-minute call — clarity and speed over cleverness.
4. Two industries, not a generic multi-vertical SaaS pitch — copy and examples should stay specific to trades/real estate workflows, not generic business automation.

## Accessibility & Inclusion

No specific requirement established beyond standard web accessibility practice.
