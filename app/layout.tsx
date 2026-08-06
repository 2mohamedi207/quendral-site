import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { FloatingBookButton } from "@/components/ui/FloatingBookButton";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const siteUrl = "https://quendral.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quendral | AI Automation Agency",
    template: "%s | Quendral",
  },
  description:
    "Quendral designs and builds AI-powered workflows, agents, and integrations that eliminate busywork and scale your operations — without scaling headcount.",
  keywords: [
    "AI automation agency",
    "AI agents",
    "workflow automation",
    "business process automation",
    "AI consulting",
    "RPA",
  ],
  openGraph: {
    title: "Quendral | AI Automation Agency",
    description:
      "We design and build AI-powered workflows, agents, and integrations that eliminate busywork and scale your operations.",
    url: siteUrl,
    siteName: "Quendral",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quendral | AI Automation Agency",
    description:
      "We design and build AI-powered workflows, agents, and integrations that eliminate busywork and scale your operations.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground bg-noise selection:bg-brand-purple">
        {children}
        <FloatingBookButton />
      </body>
    </html>
  );
}
