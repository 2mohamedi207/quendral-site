import { Target, Repeat, Bot, Database, Search, PenTool, Hammer, Rocket, TrendingUp } from "lucide-react";

export const navLinks = [
  { label: "Industries", href: "/#industries" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const services = [
  {
    icon: Target,
    title: "Lead Generation",
    description:
      "We capture leads the moment they come in — from your website, ads, and referrals — so no quote request or inquiry slips through.",
  },
  {
    icon: Repeat,
    title: "Automated Follow-Up",
    description:
      "Text and email sequences follow up on every quote and lead until they book or say no — no more leads going cold.",
  },
  {
    icon: Bot,
    title: "AI Receptionist",
    description:
      "A 24/7 AI receptionist answers every call, qualifies the job, and books it straight to your calendar — even after hours.",
  },
  {
    icon: Database,
    title: "CRM Integration",
    description:
      "We connect everything to a clean CRM — deduped contacts, clear pipeline stages, and automated task handoffs.",
  },
];

export const processSteps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "We review your workflows, tooling, and data to find where automation returns the most time and money.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    description:
      "We architect the system — agents, triggers, integrations — and map it against your existing stack before writing a line of code.",
  },
  {
    icon: Hammer,
    number: "03",
    title: "Build",
    description:
      "Our engineers build and test the automation in a sandboxed environment, iterating with you at every checkpoint.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Deploy",
    description:
      "We ship to production with monitoring and fallbacks in place, so the handoff is invisible to your team and your customers.",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Optimize",
    description:
      "We track performance against the original targets and keep tuning — automation is a living system, not a one-time install.",
  },
];

export const foundingOffer = {
  headline: "Founding client offer",
  description:
    "$499 setup and 50% off your first 3 months on any plan, in exchange for a case study and testimonial once we've delivered results. Limited to our first 5 clients — after that, standard pricing applies.",
  cap: 5,
};

export const websiteAddOn = {
  title: "Website",
  price: "$99/month",
  description:
    "A new site built around lead capture and wired directly into your automation system. Hosting, updates, and content changes included for as long as you're on the plan.",
  note:
    "12-month minimum on the initial build, then month-to-month. Content updates included up to twice a month — bigger redesigns are quoted separately.",
};

export const platformCostsAddOn = {
  title: "Platform costs",
  price: "Billed at cost",
  description:
    "Twilio, voice AI minutes, and automation platform fees are passed straight through, itemized monthly — no markup. These scale with your call volume, so we'll always be upfront about what's driving the number.",
};

export const pricingCommitment = "Month-to-month. No long-term contracts. Cancel anytime.";

export const faqs = [
  {
    question: "How fast can this be live?",
    answer:
      "Most systems go live in 1-2 weeks from kickoff — the landing page, instant response, and CRM setup don't take long to build. The AI receptionist and multi-crew routing can take a little longer depending on how much customization you need.",
  },
  {
    question: "Does it work with the tools I already use?",
    answer:
      "Yes. We build on top of what you already run — your CRM, calendar, phone system — the goal is to plug in, not force you to switch tools.",
  },
  {
    question: "What happens if the AI messes up a call?",
    answer:
      "Every call has a fallback: if the AI can't handle something, it hands off to a human or flags it for you immediately. Nothing gets silently mishandled.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes, anytime. Automation plans are month-to-month with no long-term contract. The website add-on has a 12-month minimum on the initial build, since it takes real time to design and launch — after that, it's month-to-month too.",
  },
  {
    question: "Do I own my website and domain if I leave?",
    answer:
      "Yes. The domain and site are yours. If you cancel the website plan, we hand over full access — we don't hold your site hostage.",
  },
  {
    question: "What are the platform costs on top?",
    answer:
      "Twilio, AI receptionist minutes, and other platform costs are billed at cost, itemized monthly. They scale with your call volume, so we'll always be upfront about what's driving the number.",
  },
];
