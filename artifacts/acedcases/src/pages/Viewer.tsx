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

  // Keyboard shortcuts + block save/print
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        alert("Printing is disabled for copyright protection.");
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
      <div className="min-h-screen flex flex-col bg-navy">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="text-center">
            <h1
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--app-font-heading)" }}
              data-testid="text-not-found"
            >
              Deck not found
            </h1>
            <Link
              href="/library"
              className="inline-block mt-4 px-8 py-3 rounded-lg gradient-primary text-white font-semibold"
              data-testid="link-back-to-library"
            >
              ← Back to Library
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />

      <div
        className="grid flex-1"
        style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 400px)" }}
        data-testid="container-viewer"
      >
        {/* PDF viewer */}
        <div
          className="flex flex-col border-r border-brand viewer-pdf-section"
          style={{ background: "var(--dark-gray)" }}
        >
          <div
            className="sticky top-[72px] z-40 flex items-center justify-between gap-4 px-6 py-5 border-b border-brand bg-medium-gray flex-wrap"
            data-testid="viewer-controls"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                disabled={pageNum <= 1}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy text-white border border-brand-strong text-sm font-medium transition-colors hover:border-[var(--bright-cyan)] disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-prev"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Previous
              </button>
              <span className="text-sm text-secondary-muted font-medium">
                Page <span className="text-white font-semibold" data-testid="text-current-page">{pageNum}</span> of{" "}
                <span className="text-white font-semibold" data-testid="text-total-pages">{TOTAL_PAGES}</span>
              </span>
              <button
                onClick={() => setPageNum((p) => Math.min(TOTAL_PAGES, p + 1))}
                disabled={pageNum >= TOTAL_PAGES}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy text-white border border-brand-strong text-sm font-medium transition-colors hover:border-[var(--bright-cyan)] disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-next"
              >
                Next
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setScale((s) => Math.max(MIN_SCALE, +(s - STEP).toFixed(2)))}
                disabled={scale <= MIN_SCALE}
                className="p-2.5 rounded-lg bg-navy text-white border border-brand-strong transition-colors hover:border-[var(--bright-cyan)] disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out"
                data-testid="button-zoom-out"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 9H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <span className="text-cyan font-semibold text-sm w-14 text-center" data-testid="text-zoom-level">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(2)))}
                disabled={scale >= MAX_SCALE}
                className="p-2.5 rounded-lg bg-navy text-white border border-brand-strong transition-colors hover:border-[var(--bright-cyan)] disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In"
                data-testid="button-zoom-in"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 9H12M9 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-10 overflow-auto">
            <canvas
              ref={canvasRef}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="max-w-full h-auto rounded-lg select-none"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
              data-testid="canvas-pdf"
            />
          </div>
        </div>

        {/* Info sidebar */}
        <aside
          className="bg-medium-gray p-8 overflow-y-auto deck-info-section"
          data-testid="aside-deck-info"
        >
          <div className="bg-navy rounded-2xl p-8 border border-brand">
            <div className="pb-6 mb-8 border-b border-brand">
              <h1
                className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--app-font-heading)" }}
                data-testid="text-deck-title"
              >
                {deck.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge text={deck.thumbnail} testId="badge-category" />
                <Badge text={deck.year} testId="badge-year" />
              </div>
            </div>

            <Section title="Competition">
              <p className="text-secondary-muted text-[15px] leading-relaxed" data-testid="text-competition">
                {deck.competition}
              </p>
            </Section>

            <Section title="Team Credits">
              <div className="mb-4">
                <p className="text-cyan text-lg font-semibold mb-1" data-testid="text-team-name">
                  {deck.team}
                </p>
                <p className="text-secondary-muted text-sm" data-testid="text-team-college">
                  {deck.college}
                </p>
              </div>
              <div className="flex flex-col gap-3" data-testid="list-team-members">
                {deck.members.map((m, i) => (
                  <a
                    key={i}
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-medium-gray border border-brand transition-all hover:translate-x-1 hover:border-[var(--bright-cyan)]"
                    data-testid={`link-member-${i}`}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs gradient-primary"
                    >
                      {m.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-medium flex-1">
                      {m.name}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      style={{ color: "var(--bright-cyan)", opacity: 0.7 }}
                    >
                      <path d="M14 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V2C16 0.9 15.1 0 14 0ZM5 13H3V6H5V13ZM4 5C3.4 5 3 4.6 3 4C3 3.4 3.4 3 4 3C4.6 3 5 3.4 5 4C5 4.6 4.6 5 4 5ZM13 13H11V9.5C11 8.7 10.3 8 9.5 8C8.7 8 8 8.7 8 9.5V13H6V6H8V7C8.5 6.4 9.2 6 10 6C11.7 6 13 7.3 13 9V13Z" />
                    </svg>
                  </a>
                ))}
              </div>
            </Section>

            <Section title="About This Deck">
              <p
                className="text-secondary-muted text-sm leading-relaxed"
                data-testid="text-deck-description"
              >
                {deck.description}
              </p>
            </Section>

            <div className="pt-6 border-t border-brand">
              <Link
                href="/library"
                className="block w-full text-center px-6 py-3 rounded-lg font-semibold text-white border-2 transition-colors hover:bg-[rgba(59,130,246,0.1)] hover:border-[var(--bright-cyan)]"
                style={{ borderColor: "var(--electric-blue)" }}
                data-testid="button-back-to-library"
              >
                ← Back to Library
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
            border-top: 1px solid rgba(59, 130, 246, 0.1);
          }
        }
      `}</style>

      <Footer />
    </div>
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
    <div className="mb-7">
      <h3
        className="text-sm font-bold text-white uppercase tracking-widest mb-3"
        style={{ fontFamily: "var(--app-font-heading)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Badge({ text, testId }: { text: string; testId: string }) {
  return (
    <span
      className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan"
      style={{ background: "rgba(6, 182, 212, 0.2)" }}
      data-testid={testId}
    >
      {text}
    </span>
  );
}

/* ---------- Demo PDF page renderer ---------- */
type Deck = ReturnType<typeof getDeckById> extends infer T ? Exclude<T, undefined> : never;

const SLIDE_TEMPLATES = [
  { title: "Cover", lines: [], cover: true },
  { title: "Executive Summary", lines: ["Market opportunity", "Strategic recommendation", "Expected impact"] },
  { title: "Problem Statement", lines: ["Current challenges", "Market gap", "Why now"] },
  { title: "Market Analysis", lines: ["Total addressable market", "Customer segmentation", "Growth drivers"] },
  { title: "Competitive Landscape", lines: ["Key players", "Positioning map", "Differentiators"] },
  { title: "Customer Insights", lines: ["Persona 1", "Persona 2", "Persona 3"] },
  { title: "Strategic Framework", lines: ["Three pillars", "Phased approach", "Capability requirements"] },
  { title: "Recommended Approach", lines: ["Phase 1: Foundation", "Phase 2: Scale", "Phase 3: Expand"] },
  { title: "Go-to-Market", lines: ["Channel mix", "Pricing model", "Launch sequence"] },
  { title: "Operating Model", lines: ["Org design", "Tech stack", "Partnerships"] },
  { title: "Financial Projections", lines: ["Year 1 outlook", "Year 3 trajectory", "Break-even"] },
  { title: "Risk Assessment", lines: ["Market risks", "Operational risks", "Mitigations"] },
  { title: "Implementation Roadmap", lines: ["Q1–Q2 milestones", "Q3–Q4 milestones", "Year 2 outlook"] },
  { title: "Expected Impact", lines: ["Revenue lift", "Cost savings", "Strategic positioning"] },
  { title: "Thank You", lines: ["Questions?", "", ""], cover: true },
];

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

  // Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, baseW, baseH);

  const tpl = SLIDE_TEMPLATES[(pageNum - 1) % SLIDE_TEMPLATES.length];

  if (tpl.cover) {
    // Gradient cover
    const grad = ctx.createLinearGradient(0, 0, baseW, baseH);
    grad.addColorStop(0, "#0A1128");
    grad.addColorStop(1, "#3B82F6");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, baseW, baseH);

    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 44px Poppins, sans-serif";
    wrapText(ctx, deck.title, baseW / 2, 220, baseW - 120, 56);

    ctx.font = "20px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText(`${deck.team} • ${deck.college}`, baseW / 2, 360);

    ctx.font = "16px Inter, sans-serif";
    ctx.fillStyle = "#06B6D4";
    ctx.fillText(deck.competition, baseW / 2, 395);

    if (tpl.title === "Thank You") {
      ctx.font = "bold 60px Poppins, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("Thank You", baseW / 2, 280);
      ctx.font = "22px Inter, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("Questions?", baseW / 2, 340);
    }
  } else {
    // Header bar
    ctx.fillStyle = "#0A1128";
    ctx.fillRect(0, 0, baseW, 60);
    ctx.fillStyle = "#06B6D4";
    ctx.fillRect(0, 60, baseW, 4);

    ctx.textAlign = "left";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 18px Poppins, sans-serif";
    ctx.fillText(deck.team, 40, 38);

    ctx.textAlign = "right";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(`Page ${pageNum} / ${TOTAL_PAGES}`, baseW - 40, 38);

    // Title
    ctx.textAlign = "left";
    ctx.fillStyle = "#0A1128";
    ctx.font = "bold 36px Poppins, sans-serif";
    ctx.fillText(tpl.title, 60, 140);

    // Underline
    ctx.fillStyle = "#3B82F6";
    ctx.fillRect(60, 158, 80, 4);

    // Bullets
    ctx.font = "20px Inter, sans-serif";
    ctx.fillStyle = "#374151";
    let y = 230;
    tpl.lines.forEach((line, i) => {
      if (!line) return;
      ctx.fillStyle = "#06B6D4";
      ctx.beginPath();
      ctx.arc(80, y - 6, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#374151";
      ctx.fillText(line, 100, y);
      y += 50;
      // Subtle separator
      if (i < tpl.lines.length - 1) {
        ctx.strokeStyle = "rgba(0,0,0,0.05)";
        ctx.beginPath();
        ctx.moveTo(80, y - 22);
        ctx.lineTo(baseW - 80, y - 22);
        ctx.stroke();
      }
    });

    // Footer brand
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("AcedCases — Sample Deck Preview", baseW / 2, baseH - 24);
  }

  // Reset transform so subsequent draws aren't compounded
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
