import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndustryPageContent } from "@/components/industries/IndustryPageContent";
import { industries, getIndustry } from "@/lib/industries";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  const title = `AI Automation for ${industry.label}`;
  const description = industry.heroSubtitle;

  return {
    title,
    description,
    openGraph: { title: `${title} | Quendral`, description },
    twitter: { title: `${title} | Quendral`, description },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <IndustryPageContent slug={slug} />
      </main>
      <Footer />
    </>
  );
}
