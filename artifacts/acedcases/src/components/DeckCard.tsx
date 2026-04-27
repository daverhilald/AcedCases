import { Link } from "wouter";
import type { Deck } from "@/data/decks";

interface Props {
  deck: Deck;
  index?: number;
}

export function DeckCard({ deck, index = 0 }: Props) {
  return (
    <Link
      href={`/viewer/${deck.id}`}
      className="block rounded-2xl overflow-hidden border border-brand bg-medium-gray transition-all duration-300 hover:-translate-y-2 hover:border-[var(--bright-cyan)]"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        animation: `fadeInUp 0.6s ease forwards`,
        animationDelay: `${index * 0.08}s`,
        opacity: 0,
      }}
      data-testid={`card-deck-${deck.id}`}
    >
      <div
        className="h-[200px] relative flex items-center justify-center gradient-primary"
        data-testid={`thumb-deck-${deck.id}`}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative px-4 py-2 rounded-full text-white text-sm font-semibold backdrop-blur"
             style={{ background: "rgba(255,255,255,0.2)" }}>
          {deck.thumbnail}
        </div>
      </div>
      <div className="p-6">
        <h3
          className="text-xl font-bold text-white leading-tight mb-3"
          style={{ fontFamily: "var(--app-font-heading)" }}
          data-testid={`text-deck-title-${deck.id}`}
        >
          {deck.title}
        </h3>
        <p className="text-cyan font-semibold text-sm mb-1">
          {deck.team} • {deck.college}
        </p>
        <p className="text-secondary-muted text-sm mb-4">
          {deck.competition}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {deck.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: "rgba(59, 130, 246, 0.2)",
                color: "var(--bright-cyan)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center text-cyan font-semibold text-sm transition-transform group-hover:translate-x-1">
          View Deck →
        </span>
      </div>
    </Link>
  );
}
