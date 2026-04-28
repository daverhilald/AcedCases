import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { decksData } from "@/data/decks";

export default function Home() {
  const recent = [...decksData].sort((a, b) => b.year.localeCompare(a.year)).slice(0, 6);
  const collegeCount = decksData.filter((d) => d.category === "college").length;
  const corporateCount = decksData.filter((d) => d.category === "corporate").length;
  const competitions = new Set(decksData.map((d) => d.competition.replace(/\s+\d{4}.*$/, ""))).size;

  return (
    <div className="min-h-screen flex flex-col surface-dark">
      <Navbar />

      {/* Hero */}
      <section
        className="py-24 md:py-36"
        style={{ borderBottom: "1px solid var(--rule)" }}
        data-testid="section-hero"
      >
        <div className="container-acm">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6" data-testid="text-hero-eyebrow">
              A small, opinionated archive
            </p>
            <h1 className="display-1 mb-8 fade-in" data-testid="text-hero-title">
              Winning case competition decks,{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                shared in the open.
              </span>
            </h1>
            <p
              className="lede max-w-2xl mb-10"
              style={{ color: "var(--on-bg-muted)" }}
              data-testid="text-hero-lede"
            >
              Real decks from teams that won. Credited to the people who built
              them. Free to read, never to download.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/library"
                className="link-edit text-[15px]"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  color: "var(--on-bg)",
                }}
                data-testid="button-explore-decks"
              >
                Browse the library →
              </Link>
              <Link
                href="/about"
                className="text-[14px] transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  color: "var(--on-bg-muted)",
                }}
                data-testid="button-learn-more"
              >
                What this is
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent additions */}
      <section className="py-20 md:py-28" data-testid="section-recent">
        <div className="container-acm">
          <div className="grid gap-12 md:grid-cols-[200px_1fr] mb-10">
            <div>
              <p className="eyebrow-muted mb-3">Index</p>
              <h2 className="display-3" data-testid="text-recent-title">
                Recent additions
              </h2>
            </div>
            <div className="self-end">
              <p
                style={{
                  fontFamily: "var(--app-font-serif)",
                  fontSize: 16,
                  color: "var(--on-bg-muted)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                {decksData.length} decks · {competitions} competitions ·{" "}
                {collegeCount} from colleges, {corporateCount} from corporate finals.
              </p>
            </div>
          </div>

          <div data-testid="list-recent-decks">
            {recent.map((deck) => (
              <Link
                key={deck.id}
                href={`/viewer/${deck.id}`}
                className="block py-6 group transition-colors"
                style={{ borderTop: "1px solid var(--rule)" }}
                data-testid={`row-deck-${deck.id}`}
              >
                <article
                  className="grid gap-6 items-baseline"
                  style={{ gridTemplateColumns: "70px 1fr auto" }}
                >
                  <span className="eyebrow-muted">{deck.year}</span>
                  <div>
                    <h3
                      className="mb-1.5 transition-opacity group-hover:opacity-70"
                      style={{
                        fontFamily: "var(--app-font-heading)",
                        fontWeight: 500,
                        fontSize: "clamp(18px, 1.6vw, 22px)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                        color: "var(--on-bg)",
                      }}
                    >
                      {deck.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: 13,
                        color: "var(--on-bg-muted)",
                      }}
                    >
                      {deck.team} · {deck.college} · {deck.competition}
                    </p>
                  </div>
                  <span
                    className="hidden md:inline transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--accent)", fontSize: 14 }}
                  >
                    →
                  </span>
                </article>
              </Link>
            ))}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
          </div>

          <div className="mt-10">
            <Link
              href="/library"
              className="link-edit text-[14px]"
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 500,
                color: "var(--on-bg)",
              }}
              data-testid="link-view-all"
            >
              See all {decksData.length} decks in the library →
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial about strip — paper section for rhythm */}
      <section className="surface-paper py-24 md:py-32" data-testid="section-about-strip">
        <div className="container-narrow">
          <p className="eyebrow-paper mb-6">About</p>
          <p
            className="mb-8"
            style={{
              fontFamily: "var(--app-font-heading)",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.4vw, 30px)",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
            }}
          >
            We collect winning case competition decks from teams that say yes,
            credit them by name and LinkedIn, and put it all behind a viewer
            that respects their work.
          </p>
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--paper-muted)",
            }}
          >
            No subscription. No download button. No "premium tier." Built by
            students, for students. If you won something and want to share,{" "}
            <a
              href="mailto:submit@acedcases.com"
              className="link-edit"
              style={{ color: "var(--ink)" }}
              data-testid="link-submit-email"
            >
              email us your deck
            </a>
            .
          </p>
          <div className="mt-10">
            <Link
              href="/about"
              className="link-edit text-[14px]"
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 500,
                color: "var(--ink)",
              }}
              data-testid="link-read-more-about"
            >
              Read the full story →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
