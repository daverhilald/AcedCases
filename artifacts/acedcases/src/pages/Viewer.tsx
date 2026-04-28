import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getDeckById } from "@/data/decks";

const TOTAL_PAGES = 15;
const MIN_SCALE = 0.5;
const MAX_SCALE = 3.0;
const STEP = 0.25;

export default function Viewer() {
  const params = useParams();
  const id = (params as { id?: string }).id ?? "deck1";
  const deck = getDeckById(id);

  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!deck) return;
    drawPage(canvasRef.current, deck, pageNum, scale);
  }, [deck, pageNum, scale]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        alert("Printing is disabled to respect the team's intellectual property.");
        return;
      }
      if (e.key === "ArrowLeft") setPageNum((p) => Math.max(1, p - 1));
      if (e.key === "ArrowRight") setPageNum((p) => Math.min(TOTAL_PAGES, p + 1));
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(2)));
      if (e.key === "-") setScale((s) => Math.max(MIN_SCALE, +(s - STEP).toFixed(2)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!deck) {
    return (
      <div className="min-h-screen flex flex-col surface-dark">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="text-center">
            <p className="eyebrow-muted mb-4">404</p>
            <h1
              className="display-2 mb-6"
              data-testid="text-not-found"
            >
              That deck isn't here.
            </h1>
            <Link
              href="/library"
              className="link-edit text-[15px]"
              style={{
                fontFamily: "var(--app-font-sans)",
                color: "var(--on-bg)",
              }}
              data-testid="link-back-to-library"
            >
              Back to the library →
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col surface-dark">
      <Navbar />

      <div
        className="grid flex-1"
        style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 380px)" }}
        data-testid="container-viewer"
      >
        {/* PDF area */}
        <div
          className="flex flex-col viewer-pdf-section"
          style={{
            background: "var(--bg-2)",
            borderRight: "1px solid var(--rule)",
          }}
        >
          <div
            className="sticky top-[73px] z-40 flex items-center justify-between gap-4 px-7 py-4 flex-wrap"
            style={{
              background: "var(--bg-2)",
              borderBottom: "1px solid var(--rule)",
            }}
            data-testid="viewer-controls"
          >
            <div className="flex items-center gap-5">
              <ViewerButton
                onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                disabled={pageNum <= 1}
                testId="button-prev"
              >
                ← Prev
              </ViewerButton>
              <span
                className="text-[13px]"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  color: "var(--on-bg-muted)",
                }}
              >
                <span style={{ color: "var(--on-bg)" }} data-testid="text-current-page">
                  {String(pageNum).padStart(2, "0")}
                </span>
                <span> / </span>
                <span data-testid="text-total-pages">{TOTAL_PAGES}</span>
              </span>
              <ViewerButton
                onClick={() => setPageNum((p) => Math.min(TOTAL_PAGES, p + 1))}
                disabled={pageNum >= TOTAL_PAGES}
                testId="button-next"
              >
                Next →
              </ViewerButton>
            </div>

            <div className="flex items-center gap-4">
              <ViewerButton
                onClick={() => setScale((s) => Math.max(MIN_SCALE, +(s - STEP).toFixed(2)))}
                disabled={scale <= MIN_SCALE}
                testId="button-zoom-out"
              >
                −
              </ViewerButton>
              <span
                className="text-[13px] tabular-nums"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  color: "var(--on-bg-muted)",
                  width: 42,
                  textAlign: "center",
                }}
                data-testid="text-zoom-level"
              >
                {Math.round(scale * 100)}%
              </span>
              <ViewerButton
                onClick={() => setScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(2)))}
                disabled={scale >= MAX_SCALE}
                testId="button-zoom-in"
              >
                +
              </ViewerButton>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 md:p-12 overflow-auto">
            <canvas
              ref={canvasRef}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="max-w-full h-auto select-none"
              style={{
                background: "#ffffff",
                boxShadow: "0 1px 0 rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.45)",
              }}
              data-testid="canvas-pdf"
            />
          </div>
        </div>

        {/* Info sidebar */}
        <aside
          className="overflow-y-auto deck-info-section"
          style={{ background: "var(--bg)" }}
          data-testid="aside-deck-info"
        >
          <div className="p-8 md:p-10">
            <p className="eyebrow mb-5">Deck</p>
            <h1
              className="mb-6"
              style={{
                fontFamily: "var(--app-font-heading)",
                fontWeight: 500,
                fontSize: "clamp(24px, 2.4vw, 32px)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "var(--on-bg)",
              }}
              data-testid="text-deck-title"
            >
              {deck.title}
            </h1>
            <p
              className="mb-10"
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: 13,
                color: "var(--on-bg-muted)",
              }}
            >
              {deck.year} · {deck.category === "college" ? "College competitions" : "Corporate competitions"} · {deck.topics.join(" / ")}
            </p>

            <Section title="Competition">
              <p
                style={{
                  fontFamily: "var(--app-font-serif)",
                  fontSize: 16,
                  color: "var(--on-bg)",
                  lineHeight: 1.55,
                }}
                data-testid="text-competition"
              >
                {deck.competition}
              </p>
            </Section>

            <Section title="Team">
              <p
                className="mb-1"
                style={{
                  fontFamily: "var(--app-font-heading)",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: "var(--on-bg)",
                  letterSpacing: "-0.01em",
                }}
                data-testid="text-team-name"
              >
                {deck.team}
              </p>
              <p
                className="mb-5"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: 13,
                  color: "var(--on-bg-muted)",
                }}
                data-testid="text-team-college"
              >
                {deck.college}
              </p>
              <ul className="flex flex-col gap-2.5" data-testid="list-team-members">
                {deck.members.map((m, i) => (
                  <li key={i}>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-edit text-[14px]"
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        color: "var(--on-bg)",
                      }}
                      data-testid={`link-member-${i}`}
                    >
                      {m.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="About this deck">
              <p
                style={{
                  fontFamily: "var(--app-font-serif)",
                  fontSize: 15,
                  color: "var(--on-bg)",
                  lineHeight: 1.65,
                }}
                data-testid="text-deck-description"
              >
                {deck.description}
              </p>
            </Section>

            <div
              className="pt-7"
              style={{ borderTop: "1px solid var(--rule)" }}
            >
              <Link
                href="/library"
                className="link-edit text-[14px]"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  color: "var(--on-bg)",
                }}
                data-testid="button-back-to-library"
              >
                ← Back to the library
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .grid[data-testid="container-viewer"] {
            grid-template-columns: 1fr !important;
          }
          .deck-info-section {
            border-top: 1px solid var(--rule);
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}

function ViewerButton({
  children,
  onClick,
  disabled,
  testId,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  testId: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-[13px] transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
      style={{
        fontFamily: "var(--app-font-sans)",
        fontWeight: 500,
        color: "var(--on-bg)",
      }}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="py-7"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <p className="eyebrow-muted mb-4">{title}</p>
      {children}
    </div>
  );
}

/* ---------- Editorial PDF page renderer (white paper, navy ink) ---------- */
type Deck = ReturnType<typeof getDeckById> extends infer T ? Exclude<T, undefined> : never;

const SLIDE_TEMPLATES: Array<{ kind: "cover" | "content" | "thanks"; title: string; lines: string[] }> = [
  { kind: "cover", title: "Cover", lines: [] },
  { kind: "content", title: "Executive Summary", lines: ["Market opportunity", "Strategic recommendation", "Expected impact"] },
  { kind: "content", title: "Problem Statement", lines: ["Current challenges", "Market gap", "Why now"] },
  { kind: "content", title: "Market Analysis", lines: ["Total addressable market", "Customer segmentation", "Growth drivers"] },
  { kind: "content", title: "Competitive Landscape", lines: ["Key players", "Positioning map", "Differentiators"] },
  { kind: "content", title: "Customer Insights", lines: ["Persona one", "Persona two", "Persona three"] },
  { kind: "content", title: "Strategic Framework", lines: ["Three pillars", "Phased approach", "Capability requirements"] },
  { kind: "content", title: "Recommended Approach", lines: ["Phase one — Foundation", "Phase two — Scale", "Phase three — Expand"] },
  { kind: "content", title: "Go to Market", lines: ["Channel mix", "Pricing model", "Launch sequence"] },
  { kind: "content", title: "Operating Model", lines: ["Org design", "Tech stack", "Partnerships"] },
  { kind: "content", title: "Financial Projections", lines: ["Year one outlook", "Year three trajectory", "Break-even"] },
  { kind: "content", title: "Risk Assessment", lines: ["Market risks", "Operational risks", "Mitigations"] },
  { kind: "content", title: "Implementation Roadmap", lines: ["Q1–Q2 milestones", "Q3–Q4 milestones", "Year two outlook"] },
  { kind: "content", title: "Expected Impact", lines: ["Revenue lift", "Cost savings", "Strategic positioning"] },
  { kind: "thanks", title: "Thank You", lines: [] },
];

const NAVY = "#0A1128";
const ACCENT = "#06B6D4";
const PAPER = "#FFFFFF";
const MUTED = "#6B7280";

function drawPage(
  canvas: HTMLCanvasElement | null,
  deck: Deck,
  pageNum: number,
  scale: number,
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const baseW = 800;
  const baseH = 600;
  const w = Math.floor(baseW * scale);
  const h = Math.floor(baseH * scale);
  canvas.width = w;
  canvas.height = h;

  ctx.scale(scale, scale);

  // White page
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, baseW, baseH);

  const tpl = SLIDE_TEMPLATES[(pageNum - 1) % SLIDE_TEMPLATES.length];

  if (tpl.kind === "cover") {
    // Top eyebrow
    ctx.textAlign = "left";
    ctx.fillStyle = ACCENT;
    ctx.font = "500 11px Inter, sans-serif";
    ctx.fillText(`${deck.competition.toUpperCase()}`, 64, 72);

    // Hairline
    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(64, 90);
    ctx.lineTo(180, 90);
    ctx.stroke();

    // Big serif title
    ctx.fillStyle = NAVY;
    ctx.font = "500 44px Fraunces, Georgia, serif";
    wrapText(ctx, deck.title, 64, 200, baseW - 128, 56);

    // Team
    ctx.fillStyle = NAVY;
    ctx.font = "italic 500 22px Fraunces, Georgia, serif";
    ctx.fillText(deck.team, 64, baseH - 120);

    // Members byline
    ctx.fillStyle = MUTED;
    ctx.font = "400 14px Inter, sans-serif";
    const byline = deck.members.map((m) => m.name).join(" · ");
    ctx.fillText(byline, 64, baseH - 92);

    // Footer hairline + brand
    ctx.strokeStyle = "rgba(10,17,40,0.15)";
    ctx.beginPath();
    ctx.moveTo(64, baseH - 60);
    ctx.lineTo(baseW - 64, baseH - 60);
    ctx.stroke();

    ctx.fillStyle = MUTED;
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText(deck.college.toUpperCase(), 64, baseH - 38);
    ctx.textAlign = "right";
    ctx.fillText(`${deck.year}`, baseW - 64, baseH - 38);
  } else if (tpl.kind === "thanks") {
    ctx.textAlign = "center";
    ctx.fillStyle = NAVY;
    ctx.font = "italic 500 64px Fraunces, Georgia, serif";
    ctx.fillText("Thank you.", baseW / 2, baseH / 2 - 10);

    ctx.fillStyle = MUTED;
    ctx.font = "400 14px Inter, sans-serif";
    ctx.fillText("Questions welcome", baseW / 2, baseH / 2 + 30);

    // Footer
    ctx.textAlign = "left";
    ctx.strokeStyle = "rgba(10,17,40,0.15)";
    ctx.beginPath();
    ctx.moveTo(64, baseH - 60);
    ctx.lineTo(baseW - 64, baseH - 60);
    ctx.stroke();
    ctx.fillStyle = MUTED;
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText(deck.team.toUpperCase(), 64, baseH - 38);
    ctx.textAlign = "right";
    ctx.fillText(`${String(pageNum).padStart(2, "0")} / ${TOTAL_PAGES}`, baseW - 64, baseH - 38);
  } else {
    // Eyebrow
    ctx.textAlign = "left";
    ctx.fillStyle = ACCENT;
    ctx.font = "500 11px Inter, sans-serif";
    ctx.fillText("SECTION", 64, 72);

    // Hairline
    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(64, 90);
    ctx.lineTo(120, 90);
    ctx.stroke();

    // Title
    ctx.fillStyle = NAVY;
    ctx.font = "500 36px Fraunces, Georgia, serif";
    ctx.fillText(tpl.title, 64, 150);

    // Body bullets — numbered, editorial
    let y = 240;
    tpl.lines.forEach((line, i) => {
      const num = String(i + 1).padStart(2, "0");

      ctx.fillStyle = ACCENT;
      ctx.font = "italic 500 14px Fraunces, Georgia, serif";
      ctx.fillText(num, 64, y);

      ctx.fillStyle = NAVY;
      ctx.font = "500 22px Fraunces, Georgia, serif";
      ctx.fillText(line, 100, y);

      y += 56;
    });

    // Footer
    ctx.strokeStyle = "rgba(10,17,40,0.15)";
    ctx.beginPath();
    ctx.moveTo(64, baseH - 60);
    ctx.lineTo(baseW - 64, baseH - 60);
    ctx.stroke();
    ctx.fillStyle = MUTED;
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText(deck.team.toUpperCase(), 64, baseH - 38);
    ctx.textAlign = "right";
    ctx.fillText(`${String(pageNum).padStart(2, "0")} / ${TOTAL_PAGES}`, baseW - 64, baseH - 38);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (let n = 0; n < words.length; n++) {
    const test = line + words[n] + " ";
    const w = ctx.measureText(test).width;
    if (w > maxWidth && n > 0) {
      ctx.fillText(line, x, yy);
      line = words[n] + " ";
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, yy);
}
