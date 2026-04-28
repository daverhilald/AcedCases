import { Link } from "wouter";

export function Footer() {
  return (
    <footer
      className="border-t border-brand pt-16 pb-8"
      style={{ background: "var(--dark-gray)" }}
      data-testid="footer"
    >
      <div className="container-acm">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr] mb-10">
          <div>
            <h3
              className="text-2xl font-extrabold text-gradient mb-3"
              style={{ fontFamily: "var(--app-font-heading)" }}
            >
              AcedCases
            </h3>
            <p className="text-secondary-muted text-sm max-w-sm">
              Empowering case competition enthusiasts worldwide.
            </p>
          </div>
          <div>
            <h4
              className="text-base font-bold text-white mb-4"
              style={{ fontFamily: "var(--app-font-heading)" }}
            >
              Platform
            </h4>
            <Link
              href="/library"
              className="block text-secondary-muted text-sm mb-3 hover:text-cyan transition-colors"
              data-testid="link-footer-library"
            >
              Deck Library
            </Link>
            <Link
              href="/about"
              className="block text-secondary-muted text-sm mb-3 hover:text-cyan transition-colors"
              data-testid="link-footer-about"
            >
              About Us
            </Link>
          </div>
          <div>
            <h4
              className="text-base font-bold text-white mb-4"
              style={{ fontFamily: "var(--app-font-heading)" }}
            >
              Categories
            </h4>
            <Link
              href="/library?category=college"
              className="block text-secondary-muted text-sm mb-3 hover:text-cyan transition-colors"
              data-testid="link-footer-colleges"
            >
              Colleges
            </Link>
            <Link
              href="/library?domain=strategy"
              className="block text-secondary-muted text-sm mb-3 hover:text-cyan transition-colors"
              data-testid="link-footer-domain"
            >
              Domain
            </Link>
            <Link
              href="/library?category=corporate"
              className="block text-secondary-muted text-sm mb-3 hover:text-cyan transition-colors"
              data-testid="link-footer-corporate"
            >
              Corporate
            </Link>
          </div>
        </div>
        <div className="pt-8 border-t border-brand text-center">
          <p className="text-secondary-muted text-sm">
            © {new Date().getFullYear()} AcedCases. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
