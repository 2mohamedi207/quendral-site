---
name: Quendral
description: AI automation agency for Calgary trades and real estate businesses — proof over promises, one confident blue on an off-white ground.
colors:
  background: "#fafaf9"
  background-elevated: "#ffffff"
  foreground: "#14171a"
  muted: "#5b6470"
  accent: "#1d4ed8"
  accent-light: "#3b6cf0"
  accent-dark: "#1638a8"
  accent-tint: "#eef3fe"
  border-subtle: "rgba(20, 23, 26, 0.09)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.15em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent-dark}"
  button-secondary:
    backgroundColor: "{colors.background-elevated}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  card:
    backgroundColor: "{colors.background-elevated}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Quendral

## Overview

**Creative North Star: "The Live Dispatch Board"**

Quendral's site is built to prove its own product in real time rather than describe it: a Calgary trades owner should watch a missed call become a booked job happen in front of them in seconds and believe it's a live system, not marketing copy. The visual world is a light, single-accent SaaS grammar — an off-white ground, near-black text, and one confident blue (`#1d4ed8`) that carries every primary action and every "this is happening now" signal, so the accent's rarity is what makes it legible as *live state* rather than decoration. This is a direct, brief-pinned reaction against the site's original dark/gradient/glass identity, which read as generic AI-agency template rather than an operating system for a real business.

Nothing here fabricates results the business doesn't have yet: the signature activity-feed card is explicitly framed as an illustrative walkthrough ("Example walkthrough"), never a real-time claim, per the product's zero-fabrication commitment.

**Key Characteristics:**
- One accent, everywhere: no secondary or tertiary brand colors, no gradients, no dark glow blobs.
- Plus Jakarta Sans at heavy weight (800) and tight negative tracking for display type; the display voice is bold but never a system font.
- Pill-shaped buttons throughout; soft, accent-tinted shadows instead of gray or hard-offset shadows.
- Solid `bg-accent` panels (not gradients) mark the few "act now" Persuade moments (CTABanner, industry page closers).
- Section-number kickers and numbered-step grammar are kept for the Process/how-it-works flow — inherited deliberately from the pinned landearly.com reference, not a default habit.

## Colors

The palette is one accent on a warm-neutral canvas — deliberately not black-on-white, so the whole system feels closer to paper than to a code editor.

### Primary
- **Confident Blue** (`#1d4ed8`): primary buttons, links, active/live-state accents (pulsing "Live" badge, icon fills, section eyebrows), the solid CTA panel background. Used sparingly against a light page so it always reads as "the thing that matters right now."
- **Blue Tint** (`#eef3fe`): icon-container backgrounds, badge pills, and any surface that needs to say "this belongs to the accent system" without competing with it for attention.
- **Blue Light / Blue Dark** (`#3b6cf0` / `#1638a8`): hover and active states for the primary accent only — never used as standalone brand colors.

### Neutral
- **Off-White Ground** (`#fafaf9`): the page background — a paper tone, not pure white, distinguishing background from elevated surfaces.
- **Elevated White** (`#ffffff`): cards, the navbar once scrolled, form fields — anything that should read as "lifted" off the page background.
- **Near-Black Ink** (`#14171a`): all body and heading text. Never pure `#000`.
- **Muted Slate** (`#5b6470`): secondary text — subheads, captions, footer copy.
- **Subtle Border** (`rgba(20, 23, 26, 0.09)`): the only border color in the system; a near-black at 9% opacity so borders read as a whisper, not a line.

### Named Rules
**The One Accent Rule.** There is exactly one brand color. Anything that isn't the accent, off-white, near-black, or muted slate is a scope error — including semantic exceptions (see the amber warning box in Do's and Don'ts).

## Typography

**Display Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Body Font:** Plus Jakarta Sans (same family; weight carries the hierarchy)

**Character:** One typeface doing all the work — weight (500 for body, 700–800 for display) and negative tracking on headlines create the hierarchy instead of a second family. Confident and dense, not editorial.

### Hierarchy
- **Display** (800, `clamp(2.5rem, 5vw, 4.5rem)`, line-height 1.05, tracking -0.04em): hero H1 only.
- **Headline** (800, 2.25rem, line-height 1.1, tracking -0.03em): section H1/H2s (page heads, SectionHeading titles).
- **Body** (500, 1.125rem, line-height 1.6): subheads and lead paragraphs.
- **Label** (700, 0.75rem, tracking 0.15em, uppercase): eyebrows, badges, kickers — always paired with `text-accent` or `text-muted`.

### Named Rules
**The Tight-Tracking Rule.** Every display/headline weight uses negative letter-spacing (-0.03em to -0.04em). A heading that isn't tracked tight reads as unfinished.

## Layout

Standard container is `max-w-7xl` with `px-6` (mobile) / `lg:px-8` (desktop) horizontal padding — consistent across every section and the footer grid. The homepage stacks sections vertically with generous vertical rhythm (`py-16`+ per section); the footer uses a `grid-cols-2` → `sm:grid-cols-4` responsive grid. Hero is the one two-column layout (copy left, activity-feed card right) and collapses to a single column below `lg`.

**Mobile constraint:** any content in a narrow flex/grid column (footer link columns are ~144px wide at 375px viewport) must be allowed to wrap. Long unbreakable strings (email addresses, in particular) need `break-words`, or they silently inflate the browser's layout viewport and misalign every `position: fixed` element on the page — this was a shipped bug, now fixed in Footer's contact email link.

## Elevation & Depth

Flat by default; depth is conveyed through soft, accent-tinted ambient shadows rather than gray drop shadows or hard offsets. No glass, no blur, no backdrop-filter panels.

### Shadow Vocabulary
- **`shadow-card`** (`0 1px 2px rgba(29,78,216,0.04), 0 12px 28px -12px rgba(29,78,216,0.16)`): default resting elevation for cards, buttons, the scrolled navbar.
- **`shadow-card-lg`** (`0 2px 4px rgba(29,78,216,0.05), 0 24px 48px -16px rgba(29,78,216,0.22)`): the Hero activity-feed card, the floating book button, and any highlighted/"most popular" pricing tier.

### Named Rules
**The Tinted Shadow Rule.** Every shadow in the system uses the accent's RGB (`29, 78, 216`) at low opacity, never neutral black. A gray shadow anywhere in this codebase is a regression.

## Shapes

Pills and soft rounded rectangles, no sharp corners anywhere. Buttons and pill badges use `rounded-full`. Cards and panels use `rounded-2xl` (24px) as the default container radius, with `rounded-xl` (12–16px) for nested inner elements (icon containers, inputs). No neobrutalist hard borders, no clipped/angular corners.

## Components

### Buttons
- **Shape:** fully pill (`rounded-full`).
- **Primary:** white text on `bg-accent`, `shadow-card`; hover darkens to `accent-dark`.
- **Secondary:** `foreground` text on `background-elevated` with a `border-subtle` border; hover shifts border to `accent`.
- **Ghost:** `foreground` text, no fill or border; hover shifts text to `accent`.

### Cards / Containers
- **Corner style:** `rounded-2xl` (24px).
- **Background:** `background-elevated` (`#ffffff`) against the page's `background` (`#fafaf9`) — the two off-whites are close enough to feel calm, distinct enough that cards visibly lift.
- **Border:** always `border-border-subtle`, even on elevated cards — the border does the separating, not the shadow alone.
- **Shadow:** `shadow-card` at rest; `shadow-card-lg` for the one or two cards per view that should read as "the important one" (Hero's live card, the highlighted pricing tier).

### Inputs / Fields
- **Style:** `border-border-subtle`, `background` fill, `rounded-xl`.
- **Focus:** border shifts to `accent`.

### Navigation
- **Style:** transparent over the Hero, then `border-b border-border-subtle bg-background-elevated/90 backdrop-blur-sm` once scrolled. Links use `foreground`/`muted` at rest, `accent` on hover/active.
- **Mobile treatment:** hamburger toggle expands a bordered, shadowed dropdown panel in the same elevated-card language as the rest of the system — not a full-screen overlay.

### Persuade Panels (signature pattern)
The CTABanner and each industry page's closing section are solid `bg-accent` panels with white text and a white pill button (`!bg-white !text-accent`) — the one place per page where the accent covers a full surface instead of accenting a neutral one. This is a deliberate exception to the One Accent Rule's usual restraint: it marks the single highest-intent moment on the page.

## Do's and Don'ts

### Do:
- **Do** keep the accent to <10% of any given viewport outside the two dedicated Persuade panels (CTABanner, industry-page closer).
- **Do** use `break-words` (or equivalent) on any user-facing unbroken string — emails, URLs, long SKUs — inside a constrained flex/grid column, especially in the footer.
- **Do** use the amber semantic warning color (`border-amber-500/30 bg-amber-50 text-amber-600`) for the legal-disclaimer box only — it is the one intentional exception to the One Accent Rule, reserved for genuine warnings.
- **Do** frame any illustrative product demo (like the Hero activity feed) explicitly as an example, never as a live/real-time claim.

### Don't:
- **Don't** reintroduce gradients, gradient text, or glass/blur decorative panels — the incumbent dark/gradient identity is the confirmed anti-reference for this world.
- **Don't** use gray or black shadows; every shadow in this system is accent-tinted.
- **Don't** add a second or third brand color. If a new surface seems to need one, it should reuse `accent-tint` or `muted` before inventing a new hue.
- **Don't** let normal-flow content sit in a fixed-width or non-wrapping element inside a narrow responsive column without verifying `document.documentElement.scrollWidth` at 375px — this class of bug silently breaks every `position: fixed` element on the page (see Layout).
