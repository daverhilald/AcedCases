import { useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const RECIPIENT = "daverhilald@gmail.com";

interface FormState {
  name: string;
  email: string;
  team: string;
  college: string;
  competition: string;
  year: string;
  title: string;
  deckLink: string;
  linkedins: string;
  description: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  team: "",
  college: "",
  competition: "",
  year: "",
  title: "",
  deckLink: "",
  linkedins: "",
  description: "",
};

export default function Submit() {
  const [form, setForm] = useState<FormState>(EMPTY);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Deck submission — ${form.title || "Untitled"} (${form.team || "Team"})`;
    const lines = [
      `From: ${form.name}${form.email ? `  <${form.email}>` : ""}`,
      ``,
      `Team: ${form.team}`,
      `College / Company: ${form.college}`,
      `Competition: ${form.competition}`,
      `Year: ${form.year}`,
      ``,
      `Deck title: ${form.title}`,
      `Link to the deck: ${form.deckLink}`,
      ``,
      `Team members & LinkedIn URLs:`,
      form.linkedins || "(not provided)",
      ``,
      `About the deck / context:`,
      form.description || "(not provided)",
      ``,
      `—`,
      `Sent from acedcases.in`,
    ];
    const body = lines.join("\n");
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen flex flex-col surface-paper">
      <Navbar variant="paper" />

      {/* Header */}
      <section
        className="py-20 md:py-28"
        style={{ borderBottom: "1px solid var(--paper-rule)" }}
        data-testid="section-submit-header"
      >
        <div className="container-narrow">
          <p className="eyebrow-paper mb-6">Contribute</p>
          <h1
            className="display-1 mb-8"
            style={{ color: "var(--ink)" }}
            data-testid="text-page-title"
          >
            Send us your{" "}
            <span style={{ fontStyle: "italic" }}>winning deck.</span>
          </h1>
          <p
            className="lede"
            style={{ color: "var(--paper-muted)" }}
            data-testid="text-submit-lede"
          >
            Fill in the details below. When you submit, your default email app
            will open with everything pre-filled — review, attach the file if
            you'd rather, and send. We'll publish in 2&ndash;3 days with full
            credit to your team.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-24 flex-1" data-testid="section-form">
        <div className="container-narrow">
          <form onSubmit={handleSubmit} className="flex flex-col" data-testid="form-submit">
            <FieldGroup eyebrow="01" title="About you">
              <Field
                label="Your name"
                placeholder="Aanya Kapoor"
                value={form.name}
                onChange={update("name")}
                testId="input-name"
                required
              />
              <Field
                label="Your email"
                placeholder="aanya@example.com"
                type="email"
                value={form.email}
                onChange={update("email")}
                testId="input-email"
                required
              />
            </FieldGroup>

            <FieldGroup eyebrow="02" title="The team">
              <Field
                label="Team name"
                placeholder="Team Alpha"
                value={form.team}
                onChange={update("team")}
                testId="input-team"
                required
              />
              <Field
                label="College or company"
                placeholder="IIM Ahmedabad"
                value={form.college}
                onChange={update("college")}
                testId="input-college"
                required
              />
              <Textarea
                label="Team members & LinkedIn URLs"
                placeholder={"One per line, e.g.\nAanya Kapoor — https://linkedin.com/in/aanyakapoor\nRahul Sharma — https://linkedin.com/in/rahulsharma\nPriya Patel — https://linkedin.com/in/priyapatel"}
                value={form.linkedins}
                onChange={update("linkedins")}
                testId="input-linkedins"
                rows={5}
                helper="We'll link each member's name to their LinkedIn beside the deck. Recognition stays with the people who did the work."
                required
              />
            </FieldGroup>

            <FieldGroup eyebrow="03" title="The competition">
              <Field
                label="Competition name"
                placeholder="McKinsey Case Competition"
                value={form.competition}
                onChange={update("competition")}
                testId="input-competition"
                required
              />
              <Field
                label="Year"
                placeholder="2024"
                value={form.year}
                onChange={update("year")}
                testId="input-year"
                required
              />
            </FieldGroup>

            <FieldGroup eyebrow="04" title="The deck">
              <Field
                label="Deck title"
                placeholder="Market Entry Strategy — RetailTech Case"
                value={form.title}
                onChange={update("title")}
                testId="input-title"
                required
              />
              <Field
                label="Link to the deck (Drive, Dropbox, Notion…)"
                placeholder="https://drive.google.com/…"
                value={form.deckLink}
                onChange={update("deckLink")}
                testId="input-deck-link"
                helper="Make sure 'Anyone with the link can view' is on. We'll convert and host it ourselves."
                required
              />
              <Textarea
                label="A line or two about the deck"
                placeholder="What was the prompt? What was your team's recommendation?"
                value={form.description}
                onChange={update("description")}
                testId="input-description"
                rows={4}
              />
            </FieldGroup>

            <div
              className="pt-10 mt-2 flex items-baseline justify-between gap-4 flex-wrap"
              style={{ borderTop: "1px solid var(--paper-rule)" }}
            >
              <p
                style={{
                  fontFamily: "var(--app-font-serif)",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "var(--paper-muted)",
                  maxWidth: 380,
                }}
              >
                Submitting will open your email app with everything filled in,
                addressed to{" "}
                <span style={{ color: "var(--ink)" }}>hello@acedcases.in</span>.
              </p>
              <button
                type="submit"
                className="link-edit text-[15px] cursor-pointer"
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 500,
                  color: "var(--ink)",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
                data-testid="button-submit"
              >
                Send the deck →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Quiet note */}
      <section className="surface-dark py-16" data-testid="section-note">
        <div className="container-narrow flex items-baseline justify-between gap-4 flex-wrap">
          <p className="eyebrow mb-0">Prefer plain email?</p>
          <a
            href={`mailto:${RECIPIENT}`}
            className="link-edit text-[14px]"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 500,
              color: "var(--on-bg)",
            }}
            data-testid="link-direct-email"
          >
            Write to hello@acedcases.in →
          </a>
        </div>
      </section>

      <div
        className="surface-paper py-10"
        style={{ borderTop: "1px solid var(--paper-rule)" }}
      >
        <div className="container-narrow">
          <Link
            href="/about"
            className="link-edit text-[14px]"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 500,
              color: "var(--ink)",
            }}
            data-testid="link-back-about"
          >
            ← Back to About
          </Link>
        </div>
      </div>

      <Footer variant="paper" />
    </div>
  );
}

function FieldGroup({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid gap-8 md:gap-12 py-10 md:py-12 md:grid-cols-[160px_1fr]"
      style={{ borderTop: "1px solid var(--paper-rule)" }}
    >
      <div>
        <p
          className="mb-3"
          style={{
            fontFamily: "var(--app-font-heading)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 16,
            color: "var(--accent)",
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--app-font-heading)",
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
          }}
        >
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-7">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  testId,
  helper,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  testId?: string;
  helper?: string;
}) {
  return (
    <label className="flex flex-col">
      <span className="eyebrow-paper mb-2.5">
        {label}
        {required && (
          <span style={{ color: "var(--accent)", marginLeft: 4 }}>·</span>
        )}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-transparent py-2.5 text-base focus:outline-none transition-colors"
        style={{
          fontFamily: "var(--app-font-sans)",
          color: "var(--ink)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
        data-testid={testId}
      />
      {helper && (
        <span
          className="mt-2"
          style={{
            fontFamily: "var(--app-font-sans)",
            fontSize: 12,
            color: "var(--paper-muted)",
          }}
        >
          {helper}
        </span>
      )}
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
  testId,
  helper,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  testId?: string;
  helper?: string;
}) {
  return (
    <label className="flex flex-col">
      <span className="eyebrow-paper mb-2.5">
        {label}
        {required && (
          <span style={{ color: "var(--accent)", marginLeft: 4 }}>·</span>
        )}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="bg-transparent py-2.5 text-base focus:outline-none transition-colors resize-y"
        style={{
          fontFamily: "var(--app-font-sans)",
          color: "var(--ink)",
          borderBottom: "1px solid var(--paper-rule)",
          lineHeight: 1.55,
        }}
        data-testid={testId}
      />
      {helper && (
        <span
          className="mt-2"
          style={{
            fontFamily: "var(--app-font-sans)",
            fontSize: 12,
            color: "var(--paper-muted)",
          }}
        >
          {helper}
        </span>
      )}
    </label>
  );
}
