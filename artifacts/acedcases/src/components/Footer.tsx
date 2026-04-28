interface Props {
  variant?: "dark" | "paper";
}

export function Footer({ variant = "dark" }: Props) {
  const isPaper = variant === "paper";
  return (
    <footer
      className="py-10"
      style={{
        background: isPaper ? "var(--paper)" : "var(--bg)",
        borderTop: `1px solid ${isPaper ? "var(--paper-rule)" : "var(--rule)"}`,
        color: isPaper ? "var(--paper-muted)" : "var(--on-bg-muted)",
      }}
      data-testid="footer"
    >
      <div className="container-acm">
        <div className="flex items-center justify-between gap-4 flex-wrap text-[13px]">
          <span style={{ fontFamily: "var(--app-font-sans)" }}>
            <span style={{ fontFamily: "var(--app-font-heading)", fontStyle: "italic" }}>
              AcedCases
            </span>{" "}
            · Open knowledge for case competition teams
          </span>
          <a
            href="mailto:hello@acedcases.com"
            className="link-edit"
            style={{ color: isPaper ? "var(--ink)" : "var(--on-bg)" }}
            data-testid="link-footer-email"
          >
            hello@acedcases.com
          </a>
        </div>
      </div>
    </footer>
  );
}
