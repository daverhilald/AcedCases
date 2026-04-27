import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeckCard } from "@/components/DeckCard";
import { decksData } from "@/data/decks";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true;
            const hasPlus = value.includes("+");
            const hasPercent = value.includes("%");
            const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
            const duration = 1000;
            const start = performance.now();
            const animate = (t: number) => {
              const progress = Math.min(1, (t - start) / duration);
              const current = Math.floor(progress * target);
              let str = String(current);
              if (hasPlus) str += "+";
              if (hasPercent) str += "%";
              setDisplay(str);
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label}`}>
      <div
        className="text-5xl font-extrabold text-gradient mb-2"
        style={{ fontFamily: "var(--app-font-heading)" }}
      >
        {display}
      </div>
      <div className="text-sm uppercase tracking-widest text-secondary-muted">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const featured = decksData.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24" data-testid="section-hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute rounded-full animate-blob"
            style={{
              width: 600,
              height: 600,
              background: "var(--electric-blue)",
              filter: "blur(80px)",
              opacity: 0.18,
              top: -200,
              right: -100,
            }}
          />
          <div
            className="absolute rounded-full animate-blob"
            style={{
              width: 400,
              height: 400,
              background: "var(--bright-cyan)",
              filter: "blur(80px)",
              opacity: 0.15,
              bottom: -150,
              left: -100,
              animationDelay: "5s",
            }}
          />
          <div
            className="absolute rounded-full animate-blob"
            style={{
              width: 320,
              height: 320,
              background: "var(--electric-blue)",
              filter: "blur(80px)",
              opacity: 0.12,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animationDelay: "10s",
            }}
          />
        </div>

        <div className="container-acm relative z-10 text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gradient-light"
            style={{ fontFamily: "var(--app-font-heading)" }}
            data-testid="text-hero-title"
          >
            Decode Winning Strategies
          </h1>
          <p className="text-lg md:text-xl text-secondary-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Access championship case competition decks from top teams worldwide.
            Learn from the best, compete with confidence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/library"
              className="px-8 py-3.5 rounded-lg font-semibold text-base text-white transition-all hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, var(--electric-blue), var(--bright-cyan))",
                boxShadow: "0 10px 30px rgba(59,130,246,0.25)",
              }}
              data-testid="button-explore-decks"
            >
              Explore Decks
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 rounded-lg font-semibold text-base text-white border-2 transition-all hover:bg-[rgba(59,130,246,0.1)]"
              style={{ borderColor: "var(--electric-blue)" }}
              data-testid="button-learn-more"
            >
              Learn More
            </Link>
          </div>
          <div className="flex justify-center gap-12 md:gap-16 flex-wrap">
            <AnimatedStat value="10+" label="Winning Decks" />
            <AnimatedStat value="5+" label="Competitions" />
            <AnimatedStat value="100%" label="Free Access" />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-dark-gray" data-testid="section-featured">
        <div className="container-acm">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--app-font-heading)" }}
              data-testid="text-featured-title"
            >
              Featured Decks
            </h2>
            <Link
              href="/library"
              className="text-cyan font-semibold transition-transform hover:translate-x-1"
              data-testid="link-view-all"
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {featured.map((d, i) => (
              <DeckCard key={d.id} deck={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--electric-blue), var(--bright-cyan))",
        }}
        data-testid="section-cta"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-acm relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--app-font-heading)" }}
          >
            Ready to Level Up Your Case Competition Game?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join hundreds of students learning from championship strategies.
          </p>
          <Link
            href="/library"
            className="inline-block px-10 py-4 rounded-lg font-semibold text-lg bg-navy text-white transition-all hover:-translate-y-0.5"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
            data-testid="button-cta-browse"
          >
            Browse All Decks
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
