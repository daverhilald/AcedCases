import { Link, useLocation } from "wouter";

interface Props {
  variant?: "dark" | "paper";
}

export function Navbar({ variant = "dark" }: Props) {
  const [location] = useLocation();
  const onLibrary = location === "/library";
  const onAbout = location === "/about";
  const onSubmit = location === "/submit";

  const isPaper = variant === "paper";
  const textColor = isPaper ? "var(--ink)" : "var(--on-bg)";
  const ruleColor = isPaper ? "var(--paper-rule)" : "var(--rule)";

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: isPaper ? "var(--paper)" : "var(--bg)",
        borderBottom: `1px solid ${ruleColor}`,
      }}
      data-testid="navbar"
    >
      <div className="container-acm">
        <div className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="flex items-baseline gap-1"
            data-testid="link-logo"
          >
            <span
              style={{
                fontFamily: "var(--app-font-heading)",
                fontWeight: 500,
                fontSize: 22,
                letterSpacing: "-0.02em",
                fontStyle: "italic",
                color: textColor,
              }}
            >
              Aced
            </span>
            <span
              style={{
                fontFamily: "var(--app-font-heading)",
                fontWeight: 500,
                fontSize: 22,
                letterSpacing: "-0.02em",
                fontStyle: "italic",
                color: textColor,
              }}
            >
              Cases
            </span>
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                marginLeft: 2,
                alignSelf: "end",
                marginBottom: 6,
              }}
            />
          </Link>

          <div className="flex items-center gap-7 sm:gap-9">
            {!onLibrary && (
              <NavLink href="/library" testId="link-nav-library" color={textColor}>
                Library
              </NavLink>
            )}
            {!onAbout && (
              <NavLink href="/about" testId="link-nav-about" color={textColor}>
                About
              </NavLink>
            )}
            {!onSubmit && (
              <Link
                href="/submit"
                className="text-[14px] tracking-wide link-edit transition-opacity hover:opacity-80"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  color: textColor,
                }}
                data-testid="link-nav-submit"
              >
                Submit
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
  testId,
  color,
}: {
  href: string;
  children: React.ReactNode;
  testId: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="text-[14px] tracking-wide transition-opacity hover:opacity-70"
      style={{
        color,
        fontFamily: "var(--app-font-sans)",
        fontWeight: 500,
      }}
      data-testid={testId}
    >
      {children}
    </Link>
  );
}
