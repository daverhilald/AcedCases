import type { Deck } from "@/data/decks";

interface Props {
  deck: Deck;
  width?: number;
  className?: string;
}

const ACCENT = "#06B6D4";
const NAVY = "#0A1128";
const PAPER = "#FFFFFF";
const MUTED = "#6B7280";

function wrapTitle(text: string, maxChars: number, maxLines = 3): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const candidate = current ? current + " " + w : w;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = w;
      if (lines.length >= maxLines) break;
    } else {
      current = candidate;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines && current && lines[lines.length - 1] !== current) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/\s+\S+$/, "") + "…";
  }
  return lines;
}

export function DeckThumbnail({ deck, width = 320, className }: Props) {
  const height = Math.round(width * 0.625);
  const W = 320;
  const H = 200;

  const competition = deck.competition.replace(/\s+\d{4}.*$/, "").toUpperCase();
  const titleLines = wrapTitle(deck.title, 22, 3);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={height}
      className={className}
      style={{
        display: "block",
        background: PAPER,
        boxShadow: "0 1px 0 rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.18)",
      }}
      role="img"
      aria-label={`${deck.title} — ${deck.team}`}
      data-testid={`thumb-${deck.id}`}
    >
      <rect width={W} height={H} fill={PAPER} />

      {/* Big italic year as background watermark */}
      <text
        x={W - 16}
        y={H - 22}
        textAnchor="end"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight={500}
        fontSize={120}
        fill={NAVY}
        opacity={0.05}
        style={{ letterSpacing: "-0.04em" }}
      >
        {deck.year}
      </text>

      {/* Cyan eyebrow */}
      <text
        x={20}
        y={28}
        fontFamily="Inter, sans-serif"
        fontWeight={500}
        fontSize={9}
        fill={ACCENT}
        style={{ letterSpacing: "0.18em" }}
      >
        {competition}
      </text>

      {/* Hairline */}
      <line
        x1={20}
        y1={36}
        x2={56}
        y2={36}
        stroke={NAVY}
        strokeWidth={1}
      />

      {/* Title — serif navy, up to 3 lines */}
      {titleLines.map((line, i) => (
        <text
          key={i}
          x={20}
          y={70 + i * 26}
          fontFamily="Fraunces, Georgia, serif"
          fontWeight={500}
          fontSize={22}
          fill={NAVY}
          style={{ letterSpacing: "-0.01em" }}
        >
          {line}
        </text>
      ))}

      {/* Bottom hairline */}
      <line
        x1={20}
        y1={H - 50}
        x2={W - 20}
        y2={H - 50}
        stroke={NAVY}
        strokeOpacity={0.15}
        strokeWidth={1}
      />

      {/* Italic team name */}
      <text
        x={20}
        y={H - 30}
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight={500}
        fontSize={14}
        fill={NAVY}
        style={{ letterSpacing: "-0.01em" }}
      >
        {deck.team}
      </text>

      {/* College */}
      <text
        x={20}
        y={H - 14}
        fontFamily="Inter, sans-serif"
        fontWeight={400}
        fontSize={9}
        fill={MUTED}
        style={{ letterSpacing: "0.12em" }}
      >
        {deck.college.toUpperCase()}
      </text>

    </svg>
  );
}
