import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />

      {/* Hero */}
      <section
        className="text-center py-20 border-b border-brand"
        style={{ background: "var(--dark-gray)" }}
        data-testid="section-about-hero"
      >
        <div className="container-acm">
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-4 text-gradient"
            style={{ fontFamily: "var(--app-font-heading)" }}
            data-testid="text-page-title"
          >
            About AcedCases
          </h1>
          <p className="text-lg text-secondary-muted max-w-2xl mx-auto">
            Democratizing case competition excellence through open knowledge sharing.
          </p>
        </div>
      </section>

      {/* Mission / Story / How It Works */}
      <section className="py-20 bg-navy" data-testid="section-content">
        <div className="container-acm max-w-4xl">
          <ContentBlock
            icon={
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L25 15H35L27.5 21.5L30 32L20 26L10 32L12.5 21.5L5 15H15L20 5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="Our Mission"
            paragraphs={[
              "We believe that learning from the best shouldn't be a privilege. AcedCases exists to give every aspiring case competition participant access to championship-winning strategies, regardless of their network or background.",
              "By showcasing real decks from winning teams, we're creating a transparent learning environment where students can understand what excellence looks like in practice.",
            ]}
          />

          <ContentBlock
            icon={
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M20 10V20L26 26"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            title="The Story"
            paragraphs={[
              "AcedCases was born from a simple observation: students spend countless hours preparing for case competitions, often without knowing what winning solutions actually look like.",
              "As a management student passionate about case competitions, I saw my peers struggle to find quality references. So I started collecting winning decks—with permission from the teams—and decided to share them with everyone.",
              "What started as a personal collection is now a growing platform helping hundreds of students level up their competition game.",
            ]}
          />

          <ContentBlock
            icon={
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="5" y="8" width="30" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M5 14H35M12 20H12.01M18 20H18.01M24 20H24.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            title="How It Works"
            paragraphs={[
              "Every deck on AcedCases is shared with explicit permission from the original team. We properly credit all contributors with their team names and LinkedIn profiles, ensuring recognition stays with the creators.",
              "The platform is completely free to use. No paywalls, no subscriptions—just open access to winning strategies. We use a non-downloadable viewer to respect intellectual property while maximizing learning value.",
            ]}
          />
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-dark-gray" data-testid="section-values">
        <div className="container-acm">
          <h2
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            style={{ fontFamily: "var(--app-font-heading)" }}
          >
            Our Values
          </h2>
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
          >
            <ValueCard
              title="Open Knowledge"
              text="We believe the best learning happens when knowledge is freely shared, not gatekept."
            />
            <ValueCard
              title="Proper Credit"
              text="Every deck credits its creators. Recognition belongs to those who did the work."
            />
            <ValueCard
              title="Quality Over Quantity"
              text="We curate winning decks, not just any decks. Every addition teaches something valuable."
            />
            <ValueCard
              title="Community First"
              text="Built by students, for students. This platform exists to serve the community, not to profit from it."
            />
          </div>
        </div>
      </section>

      {/* Submit */}
      <section className="py-20 bg-navy" data-testid="section-submit">
        <div className="container-acm max-w-3xl text-center">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--app-font-heading)" }}
          >
            Won a Case Competition?
          </h2>
          <p className="text-lg text-secondary-muted mb-10 leading-relaxed">
            Share your winning deck with the community and help others learn from your success.
            We'll feature your team with full credits and LinkedIn links.
          </p>
          <div
            className="bg-medium-gray rounded-2xl p-8 border border-brand text-left mb-8"
            data-testid="card-requirements"
          >
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "var(--app-font-heading)" }}
            >
              What we need
            </h3>
            <ul className="list-none p-0 space-y-2.5">
              {[
                "Your winning deck (PDF format)",
                "Competition name and year",
                "Team name and member details",
                "LinkedIn profiles for credits",
                "Confirmation that you have rights to share",
              ].map((item) => (
                <li
                  key={item}
                  className="text-secondary-muted text-base relative pl-8"
                >
                  <span
                    className="absolute left-0 top-0 text-cyan font-bold text-lg"
                    style={{ color: "var(--bright-cyan)" }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="mailto:submit@acedcases.com"
            className="inline-block px-10 py-4 rounded-lg font-semibold text-lg text-white gradient-primary transition-all hover:-translate-y-0.5"
            style={{ boxShadow: "0 10px 30px rgba(59,130,246,0.25)" }}
            data-testid="link-submit-email"
          >
            Submit Your Deck
          </a>
          <p className="text-sm text-secondary-muted mt-4 italic">
            We'll review your submission and get back to you within 2-3 days.
          </p>
        </div>
      </section>

      {/* Contact + FAQ */}
      <section className="py-20 bg-dark-gray" data-testid="section-contact">
        <div className="container-acm">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--app-font-heading)" }}
              >
                Get in Touch
              </h2>
              <p className="text-base text-secondary-muted mb-8 leading-relaxed">
                Have questions, suggestions, or want to report an issue? We'd love to hear from you.
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:hello@acedcases.com"
                  className="flex items-center gap-3 p-4 rounded-xl bg-medium-gray border border-brand transition-colors hover:border-[var(--bright-cyan)]"
                  data-testid="link-contact-email"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "var(--bright-cyan)" }}>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-white font-medium">hello@acedcases.com</span>
                </a>
              </div>
            </div>
            <div>
              <h3
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--app-font-heading)" }}
              >
                Quick Answers
              </h3>
              <div className="space-y-4">
                <FaqItem
                  q="Is AcedCases really free?"
                  a="Yes! 100% free. No hidden costs, no premium tiers."
                />
                <FaqItem
                  q="Can I download the decks?"
                  a="No. We use a viewer to protect intellectual property while allowing full learning access."
                />
                <FaqItem
                  q="How do I remove my deck?"
                  a="Email us at hello@acedcases.com and we'll remove it within 24 hours, no questions asked."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ContentBlock({
  icon,
  title,
  paragraphs,
}: {
  icon: React.ReactNode;
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="mb-16 last:mb-0">
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 gradient-primary"
        data-testid={`icon-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {icon}
      </div>
      <h2
        className="text-3xl md:text-4xl font-bold text-white mb-5"
        style={{ fontFamily: "var(--app-font-heading)" }}
      >
        {title}
      </h2>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-base text-secondary-muted leading-loose mb-4 last:mb-0"
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="bg-medium-gray p-8 rounded-2xl border border-brand transition-all hover:-translate-y-1 hover:border-[var(--bright-cyan)]"
      data-testid={`card-value-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <h3
        className="text-xl font-bold text-white mb-3"
        style={{ fontFamily: "var(--app-font-heading)" }}
      >
        {title}
      </h3>
      <p className="text-sm text-secondary-muted leading-relaxed">{text}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div
      className="bg-medium-gray p-6 rounded-xl border border-brand"
      data-testid={`faq-${q.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
    >
      <h4
        className="text-base font-semibold text-white mb-2"
        style={{ fontFamily: "var(--app-font-heading)" }}
      >
        {q}
      </h4>
      <p className="text-sm text-secondary-muted leading-relaxed m-0">{a}</p>
    </div>
  );
}
