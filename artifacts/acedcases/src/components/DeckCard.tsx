import { Link } from "wouter";
import type { Deck } from "@/data/decks";

interface Props {
  deck: Deck;
  variant?: "dark" | "paper";
}

function monogram(team: string): string {
  return team
    .replace(/^Team\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function DeckCard({ deck, variant = "dark" }: Props) {
  const isPaper = variant === "paper";
  const text = isPaper ? "var(--ink)" : "var(--on-bg)";
  const muted = isPaper ? "var(--paper-muted)" : "var(--on-bg-muted)";
  const rule = isPaper ? "var(--paper-rule)" : "var(--rule)";
  const surface = isPaper ? "var(--paper)" : "var(--bg)";

  return (
    <Link
      href={`/viewer/${deck.id}`}
      className="group block transition-colors"
      style={{
        background: surface,
        borderTop: `1px solid ${rule}`,
        borderBottom: `1px solid ${rule}`,
        padding: "28px 0",
      }}
      data-testid={`card-deck-${deck.id}`}
    >
      <article className="grid gap-5" style={{ gridTemplateColumns: "56px 1fr" }}>
        <div
          className="flex items-start justify-center pt-1"
          style={{
            fontFamily: "var(--app-font-heading)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 22,
            color: "var(--accent)",
            letterSpacing: "-0.02em",
          }}
          data-testid={`mono-${deck.id}`}
        >
          {monogram(deck.team)}
        </div>

        <div>
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span className="eyebrow-muted" style={{ color: muted }}>
              {deck.year}
            </span>
            <span style={{ color: muted, fontSize: 11 }}>·</span>
            <span className="eyebrow-muted" style={{ color: muted }}>
              {deck.category === "college" ? "College" : "Corporate"}
            </span>
            <span style={{ color: muted, fontSize: 11 }}>·</span>
            <span className="eyebrow-muted" style={{ color: muted }}>
              {deck.topics[0]}
            </span>
          </div>

          <h3
            className="mb-3 transition-colors group-hover:opacity-80"
            style={{
              fontFamily: "var(--app-font-heading)",
              fontWeight: 500,
              fontSize: "clamp(20px, 2vw, 26px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: text,
            }}
            data-testid={`text-deck-title-${deck.id}`}
          >
            {deck.title}
          </h3>

          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: 14,
              color: muted,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: text }}>{deck.team}</span>
            <span> · {deck.college} · {deck.competition}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}
