import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeckThumbnail } from "@/components/DeckThumbnail";
import { decksData } from "@/data/decks";

export default function Home() {
  const recent = [...decksData].sort((a, b) => b.year.localeCompare(a.year)).slice(0, 3);
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

      {/* Just added — three-up grid */}
      <section className="py-20 md:py-28" data-testid="section-recent">
        <div className="container-acm">
          <div
            className="flex items-baseline justify-between gap-6 flex-wrap mb-12 pb-6"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <div>
              <p className="eyebrow mb-3">Just added</p>
              <h2 className="display-3" data-testid="text-recent-title">
                Three new decks{" "}
                <span style={{ fontStyle: "italic" }}>worth your time.</span>
              </h2>
            </div>
            <p
              className="text-[13px]"
              style={{
                fontFamily: "var(--app-font-sans)",
                color: "var(--on-bg-muted)",
              }}
            >
              {decksData.length} decks · {competitions} competitions ·{" "}
              {collegeCount} college, {corporateCount} corporate competitions
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3" data-testid="grid-recent-decks">
            {recent.map((deck) => (
              <Link
                key={deck.id}
                href={`/viewer/${deck.id}`}
                className="group block recent-card"
                data-testid={`card-recent-${deck.id}`}
              >
                <div className="mb-5 overflow-hidden">
                  <DeckThumbnail
                    deck={deck}
                    width={400}
                    className="recent-thumb-svg"
                  />
                </div>
                <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                  <span className="eyebrow-muted">{deck.year}</span>
                  <span
                    style={{
                      color: "var(--on-bg-muted)",
                      fontSize: 11,
                    }}
                  >
                    ·
                  </span>
                  <span className="eyebrow-muted">{deck.topics[0]}</span>
                </div>
                <h3
                  className="mb-2 transition-opacity group-hover:opacity-80"
                  style={{
                    fontFamily: "var(--app-font-heading)",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 1.4vw, 22px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                    color: "var(--on-bg)",
                  }}
                  data-testid={`text-recent-title-${deck.id}`}
                >
                  {deck.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: 13,
                    color: "var(--on-bg-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "var(--on-bg)" }}>{deck.team}</span>
                  <span> · {deck.college}</span>
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14">
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

          <style>{`
            .recent-card .recent-thumb-svg {
              width: 100%;
              height: auto;
              transition: transform 0.3s ease;
            }
            .recent-card:hover .recent-thumb-svg {
              transform: translateY(-3px);
            }
          `}</style>
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
              href="mailto:daverhilald@gmail.com"
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
