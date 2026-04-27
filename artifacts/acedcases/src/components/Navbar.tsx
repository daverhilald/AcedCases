import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: Array<{ href: string; label: string }> = [
    { href: "/library", label: "Library" },
    { href: "/library?category=college", label: "Colleges" },
    { href: "/library?topic=strategy", label: "Topics" },
    { href: "/library?category=corporate", label: "Corporate" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b border-brand backdrop-blur"
      style={{
        background: scrolled ? "rgba(10,17,40,0.98)" : "rgba(10,17,40,0.95)",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s ease",
      }}
      data-testid="navbar"
    >
      <div className="container-acm">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-extrabold text-gradient"
            style={{ fontFamily: "var(--app-font-heading)" }}
            data-testid="link-logo"
          >
            AcedCases
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active =
                (l.href === "/library" && location === "/library") ||
                (l.href === "/about" && location === "/about");
              return (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  className={`relative text-[15px] font-medium transition-colors hover:text-cyan ${
                    active ? "text-cyan" : "text-white"
                  }`}
                  data-testid={`link-nav-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/library"
            className="md:hidden text-sm font-semibold text-cyan"
            data-testid="link-mobile-library"
          >
            Library →
          </Link>
        </div>
      </div>
    </nav>
  );
}
