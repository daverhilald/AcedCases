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

  const onLibrary = location === "/library";
  const onAbout = location === "/about";

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

          <div className="flex items-center gap-6 sm:gap-8">
            {!onLibrary && (
              <Link
                href="/library"
                className="text-[15px] font-medium text-white transition-colors hover:text-cyan"
                data-testid="link-nav-library"
              >
                Library
              </Link>
            )}
            {!onAbout && (
              <Link
                href="/about"
                className="text-[15px] font-medium text-white transition-colors hover:text-cyan"
                data-testid="link-nav-about"
              >
                About
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
