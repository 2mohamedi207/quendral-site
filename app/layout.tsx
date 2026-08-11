import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FloatingBookButton } from "@/components/ui/FloatingBookButton";
import { SiteChatWidget } from "@/components/ui/SiteChatWidget";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://quendral.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quendral | AI Automation for Calgary Trades",
    template: "%s | Quendral",
  },
  description:
    "Quendral builds AI automation for Calgary home services and trades businesses — instant call and text response, an AI receptionist that never misses a call, and CRM built around your process.",
  keywords: [
    "AI automation Calgary",
    "AI receptionist for contractors",
    "missed call text back",
    "trades CRM",
    "home services automation",
    "instant lead response",
  ],
  openGraph: {
    title: "Quendral | AI Automation for Calgary Trades",
    description:
      "Instant call and text response, an AI receptionist that never misses a call, and CRM built around how Calgary trades businesses actually work.",
    url: siteUrl,
    siteName: "Quendral",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quendral | AI Automation for Calgary Trades",
    description:
      "Instant call and text response, an AI receptionist that never misses a call, and CRM built around how Calgary trades businesses actually work.",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
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
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-white">
        {children}
        <FloatingBookButton />
        <SiteChatWidget />
      </body>
    </html>
  );
}
