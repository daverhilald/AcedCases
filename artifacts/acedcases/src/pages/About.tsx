import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col surface-paper">
      <Navbar variant="paper" />

      {/* Editorial header */}
      <section
        className="py-20 md:py-28"
        style={{ borderBottom: "1px solid var(--paper-rule)" }}
        data-testid="section-about-header"
      >
        <div className="container-narrow">
          <p className="eyebrow-paper mb-6">About</p>
          <h1
            className="display-1 mb-8"
            style={{ color: "var(--ink)" }}
            data-testid="text-page-title"
          >
            A small library of{" "}
            <span style={{ fontStyle: "italic" }}>good work,</span> kept open.
          </h1>
          <p
            className="lede"
            style={{ color: "var(--paper-muted)" }}
            data-testid="text-about-lede"
          >
            Most case competition decks live on team Google Drives that nobody
            outside the team ever sees. AcedCases is the small public archive of
            the ones we got permission to share.
          </p>
        </div>
      </section>

      {/* Long-form essay */}
      <section className="py-20 md:py-28" data-testid="section-essay">
        <div className="container-narrow">
          <Section eyebrow="Mission" title="Stop gatekeeping good decks.">
            <p>
              Learning from the best shouldn't depend on whether you happen to
              know someone on the winning team. We're building the reference
              library we wish existed when we started competing.
            </p>
            <p>
              Every deck on AcedCases comes with the team's name, their
              college, the competition, and direct links to each member's
              LinkedIn. Recognition stays with the people who did the work.
            </p>
          </Section>

          <Section eyebrow="Origin" title="It started as a personal folder.">
            <p>
              We were collecting winning decks from friends and friends of
              friends &mdash; with permission &mdash; and realised we were
              building something that other students were also looking for.
            </p>
            <p>
              So we put it on the internet. There's no business model and no
              pitch deck behind it. Just a quiet website that grows whenever
              someone says yes to sharing.
            </p>
          </Section>

          <Section eyebrow="How it works" title="No download. No paywall. No noise.">
            <p>
              Decks are rendered through a viewer that disables download, save
              and print &mdash; that's the agreement we make with the teams who
              share them. You can read every page, you just can't take the file
              away.
            </p>
            <p>
              The site is free, will stay free, and has no accounts. If you
              want a deck removed, email us and it's gone within a day.
            </p>
          </Section>
        </div>
      </section>

      {/* Submit */}
      <section
        className="py-20 md:py-28 surface-dark"
        data-testid="section-submit"
      >
        <div className="container-narrow">
          <p className="eyebrow mb-5">Contribute</p>
          <h2
            className="display-2 mb-8 max-w-2xl"
            data-testid="text-submit-title"
          >
            Won something?{" "}
            <span style={{ fontStyle: "italic" }}>Send the deck.</span>
          </h2>
          <p
            className="lede mb-10 max-w-2xl"
            style={{ color: "var(--on-bg-muted)" }}
          >
            We'll publish it with full credit, link your LinkedIn alongside
            your teammates', and send you the live URL when it's up.
          </p>

          <div
            className="grid gap-px max-w-2xl mb-10"
            style={{
              gridTemplateColumns: "1fr",
              background: "var(--rule)",
            }}
          >
            {[
              ["What we need", "PDF of the deck, competition name and year, team and member names, LinkedIn URLs."],
              ["What we'll do", "Render it in the viewer, link the credits, publish in 2–3 days."],
              ["Want it taken down?", "Email us at any point. It comes down within 24 hours."],
            ].map(([k, v]) => (
              <div
                key={k}
                className="grid gap-6 py-6"
                style={{
                  gridTemplateColumns: "minmax(140px, 200px) 1fr",
                  background: "var(--bg)",
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
                data-testid={`row-${k.toLowerCase().replace(/\W+/g, "-")}`}
              >
                <span className="eyebrow-muted">{k}</span>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: 15,
                    color: "var(--on-bg)",
                    lineHeight: 1.65,
                  }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/submit"
            className="link-edit text-[15px]"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 500,
              color: "var(--on-bg)",
            }}
            data-testid="link-submit-page"
          >
            Submit a deck →
          </Link>
        </div>
      </section>

      {/* Quiet contact strip */}
      <section className="surface-paper py-16" data-testid="section-contact">
        <div className="container-narrow flex items-baseline justify-between gap-4 flex-wrap">
          <p
            style={{
              fontFamily: "var(--app-font-serif)",
              fontStyle: "italic",
              fontSize: 18,
              color: "var(--ink)",
            }}
          >
            Questions, corrections, or kind words?
          </p>
          <a
            href="mailto:daverhilald@gmail.com"
            className="link-edit text-[15px]"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 500,
              color: "var(--ink)",
            }}
            data-testid="link-contact-email"
          >
            hello@acedcases.in →
          </a>
        </div>
      </section>

      <Footer variant="paper" />
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid gap-8 md:gap-14 py-12 md:py-16 md:grid-cols-[180px_1fr]"
      style={{ borderTop: "1px solid var(--paper-rule)" }}
      data-testid={`section-${eyebrow.toLowerCase().replace(/\W+/g, "-")}`}
    >
      <div>
        <p className="eyebrow-paper mb-3">{eyebrow}</p>
        <h2
          style={{
            fontFamily: "var(--app-font-heading)",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
          }}
        >
          {title}
        </h2>
      </div>
      <div
        className="space-y-5"
        style={{
          fontFamily: "var(--app-font-serif)",
          fontSize: 18,
          lineHeight: 1.65,
          color: "var(--ink)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
