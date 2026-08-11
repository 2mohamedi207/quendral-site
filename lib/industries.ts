import {
  Wrench,
  PhoneCall,
  MessageSquare,
  MessageCircle,
  Users,
  Repeat,
  Star,
  BarChart3,
  Receipt,
  type LucideIcon,
} from "lucide-react";

export interface IndustryOffering {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface IndustryPainPoint {
  title: string;
  description: string;
}

export interface IndustryPricingTier {
  name: string;
  setupPrice: string;
  monthlyPrice: string;
  description: string;
  features: string[];
  detailedSteps: string[];
  highlighted: boolean;
}

export interface Industry {
  slug: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  tagline: string;
  audienceNoun: string;
  heroEyebrow: string;
  heroTitleLines: [string, string];
  heroSubtitle: string;
  painPoints: IndustryPainPoint[];
  offerings: IndustryOffering[];
  pricingTiers: IndustryPricingTier[];
  ctaHeadlineLines: [string, string];
  ctaSubtext: string;
}

export const industries: Industry[] = [
  {
    slug: "home-services",
    label: "Home Services & Trades",
    shortLabel: "Home Services",
    icon: Wrench,
    tagline: "Turn more quote requests into booked jobs — automatically.",
    audienceNoun: "home service businesses",
    heroEyebrow: "For Home Services & Trades",
    heroTitleLines: ["Never lose another job", "to a missed call"],
    heroSubtitle:
      "We build AI systems that answer every call and quote request instantly, qualify the job, and follow up on every estimate — built by a team that runs a home services company ourselves.",
    painPoints: [
      {
        title: "Missed calls cost you the job",
        description:
          "You can't answer the phone from under a sink or on a roof. The quote request goes to the next name on Google instead.",
      },
      {
        title: "Estimates go out and go quiet",
        description:
          "An estimate gets sent, then forgotten. The booked job goes to whoever follows up first — and it's rarely you.",
      },
      {
        title: "Growth is capped by your own phone",
        description:
          "Every new lead source or extra crew just means more calls you personally have to take. That ceiling is real.",
      },
    ],
    offerings: [
      {
        icon: PhoneCall,
        title: "Instant Call & Text Response",
        description:
          "Every missed call and quote request gets an AI-driven text back within seconds, 24/7 — even mid-job.",
      },
      {
        icon: MessageSquare,
        title: "Job Qualification",
        description:
          "Automated conversations capture job type, service area, and urgency before it ever hits your schedule.",
      },
      {
        icon: Users,
        title: "CRM & Pipeline Management",
        description:
          "We build and maintain your pipeline — deduped contacts, clean job stages, and automated task assignment across your crews.",
      },
      {
        icon: Repeat,
        title: "Quote Follow-Up",
        description:
          "Automated text and email follow-ups on every estimate you send, until the customer books or says no.",
      },
      {
        icon: Star,
        title: "Review & Referral Automation",
        description:
          "Post-job automations request Google reviews and referrals at the exact moment satisfaction is highest.",
      },
      {
        icon: BarChart3,
        title: "Reporting Dashboards",
        description:
          "See quote requests, booked jobs, and close rate in one live dashboard — no more guessing what's working.",
      },
      {
        icon: MessageCircle,
        title: "Website Chatbot",
        description:
          "An AI chat widget on your site answers visitor questions and captures leads in real time, for people who'd rather type than call.",
      },
      {
        icon: Receipt,
        title: "Automated Invoicing",
        description:
          "Once a job's booked, an invoice goes out automatically — no more chasing paperwork after the work's done.",
      },
    ],
    pricingTiers: [
      {
        name: "Core",
        setupPrice: "$849",
        monthlyPrice: "$597",
        description: "Lead capture, instant response, follow-up, and CRM.",
        features: [
          "Dedicated lead-capture landing page",
          "Instant SMS & email response",
          "Follow-up sequence on every estimate",
          "CRM setup & management",
        ],
        detailedSteps: [
          "We build your dedicated lead-capture landing page, wired to a form that texts and emails you the instant it's submitted.",
          "Every call, text, or form submission gets an automated reply within seconds — day or night.",
          "If a quote goes out and gets no reply, our follow-up sequence texts and emails the customer at set intervals until they book or say no.",
          "We set up and clean your CRM — every lead deduped, tagged, and moved through clear pipeline stages.",
          "Ongoing monitoring is included — if something breaks, we fix it at no extra charge.",
        ],
        highlighted: false,
      },
      {
        name: "Receptionist & Workflows",
        setupPrice: "$1,249",
        monthlyPrice: "$897",
        description: "AI receptionist and automated workflows — for businesses that already have a way to capture leads.",
        features: [
          "AI receptionist — answers calls 24/7",
          "Books straight to your calendar",
          "Instant response & follow-up on leads from your existing site",
          "CRM setup & management",
        ],
        detailedSteps: [
          "We design and deploy a 24/7 AI receptionist that answers your business line, gathers job details, and talks in your tone — no landing page build needed since you've already got a way for people to reach you.",
          "The receptionist books qualified calls straight onto your calendar — no back-and-forth texting.",
          "We wire instant automated replies into your existing site or form, so every lead gets a response within seconds, day or night.",
          "If a lead goes quiet, our follow-up sequence texts and emails them at set intervals until they book or say no.",
          "We set up and clean your CRM — every lead deduped, tagged, and moved through clear pipeline stages.",
        ],
        highlighted: false,
      },
      {
        name: "Plus",
        setupPrice: "$1,749",
        monthlyPrice: "$1,297",
        description: "Everything in Receptionist & Workflows, plus a full business website and monthly strategy check-ins.",
        features: [
          "Everything in Receptionist & Workflows",
          "Full business website — not just a landing page",
          "Monthly strategy check-ins",
        ],
        detailedSteps: [
          "Everything in Receptionist & Workflows, built first.",
          "We build your full business website, wired into the same instant-response and follow-up system, so leads from the new site get the same treatment as everything else — hosting and updates included for as long as you're on the plan.",
          "Monthly strategy check-in where we review call transcripts and lead flow together and refine the system.",
        ],
        highlighted: true,
      },
      {
        name: "Multi-Crew",
        setupPrice: "$2,999",
        monthlyPrice: "$2,297",
        description: "Multiple crews or locations, with custom job routing.",
        features: [
          "Everything in Plus",
          "Multi-crew routing by service area",
          "Custom reporting",
          "Dedicated success manager",
        ],
        detailedSteps: [
          "Everything in Plus, extended across every crew or location you run.",
          "We build routing logic that sends each job to the right crew based on service area, job type, or availability.",
          "Custom reporting shows performance broken out by crew or location, not just company-wide.",
          "You get a dedicated success manager as a single point of contact, instead of general support.",
        ],
        highlighted: false,
      },
    ],
    ctaHeadlineLines: ["Stop losing jobs to", "missed calls"],
    ctaSubtext:
      "Book a free consultation and we'll show you exactly how many calls and quotes are slipping through your current process.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
