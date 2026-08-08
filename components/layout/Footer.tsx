import Link from "next/link";
import { navLinks } from "@/lib/data";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { QuendralMark } from "@/components/ui/QuendralMark";

export function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-background-elevated">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <QuendralMark size={30} />
              <span className="text-lg font-extrabold tracking-tight">Quendral</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted">
              AI-powered automation for teams that want their time back.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">
              Navigate
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">
              Company
            </span>
            <Link href="#" className="text-sm text-muted transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="#" className="text-sm text-muted transition-colors hover:text-foreground">
              Careers
            </Link>
            <Link
              href="mailto:info@luminaeautomations.com"
              className="break-words text-sm text-muted transition-colors hover:text-foreground"
            >
              info@luminaeautomations.com
            </Link>
            <Link
              href="tel:+14036882364"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              403-688-2364
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">
              Stay updated
            </span>
            <NewsletterForm />
            <div className="flex items-center gap-4 text-muted">
              <Link
                href="https://instagram.com/quendral.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-foreground"
              >
                <InstagramIcon width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Quendral. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
