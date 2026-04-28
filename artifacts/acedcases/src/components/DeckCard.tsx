import { Link } from "wouter";
import type { Deck } from "@/data/decks";
import { DeckThumbnail } from "./DeckThumbnail";

interface Props {
  deck: Deck;
  variant?: "dark" | "paper";
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
      className="group block transition-colors deck-card"
      style={{
        background: surface,
        borderTop: `1px solid ${rule}`,
        borderBottom: `1px solid ${rule}`,
        padding: "28px 0",
      }}
      data-testid={`card-deck-${deck.id}`}
    >
      <article className="deck-card-grid">
        <div className="deck-card-thumb">
          <DeckThumbnail deck={deck} width={280} className="deck-thumb-svg" />
        </div>

        <div className="deck-card-meta">
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span className="eyebrow-muted" style={{ color: muted }}>
              {deck.year}
            </span>
            <span style={{ color: muted, fontSize: 11 }}>·</span>
            <span className="eyebrow-muted" style={{ color: muted }}>
              {deck.category === "college" ? "College competitions" : "Corporate competitions"}
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

      <style>{`
        .deck-card-grid {
          display: grid;
          gap: 28px;
          align-items: center;
          grid-template-columns: 280px 1fr;
        }
        .deck-card .deck-thumb-svg {
          transition: transform 0.25s ease;
          width: 100%;
          height: auto;
        }
        .deck-card:hover .deck-thumb-svg {
          transform: translateY(-2px);
        }
        @media (max-width: 720px) {
          .deck-card-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .deck-card-thumb {
            max-width: 360px;
          }
        }
      `}</style>
    </Link>
  );
}
