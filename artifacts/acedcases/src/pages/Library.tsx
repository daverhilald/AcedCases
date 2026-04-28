import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeckCard } from "@/components/DeckCard";
import { decksData, type DeckCategory, type DeckTopic } from "@/data/decks";

const DOMAINS: DeckTopic[] = ["strategy", "marketing", "finance", "operations", "analytics"];
const YEARS = ["2024", "2023", "2022"];

function useQueryParams() {
  const [location] = useLocation();
  return useMemo(() => {
    const idx = location.indexOf("?");
    const search = idx >= 0 ? location.slice(idx) : window.location.search;
    return new URLSearchParams(search);
  }, [location]);
}

export default function Library() {
  const params = useQueryParams();

  const [search, setSearch] = useState("");
  const [categoryAll, setCategoryAll] = useState(true);
  const [categories, setCategories] = useState<Set<DeckCategory>>(new Set());
  const [domains, setDomains] = useState<Set<DeckTopic>>(new Set());
  const [years, setYears] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const cat = params.get("category") as DeckCategory | null;
    const domain = (params.get("domain") ?? params.get("topic")) as DeckTopic | null;
    if (cat) {
      setCategoryAll(false);
      setCategories(new Set([cat]));
    }
    if (domain) {
      setDomains(new Set([domain]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryAll = (checked: boolean) => {
    if (checked) {
      setCategoryAll(true);
      setCategories(new Set());
    } else {
      setCategoryAll(true);
    }
  };

  const handleCategory = (cat: DeckCategory, checked: boolean) => {
    const next = new Set(categories);
    if (checked) {
      next.add(cat);
      setCategoryAll(false);
    } else {
      next.delete(cat);
    }
    setCategories(next);
    if (next.size === 0) setCategoryAll(true);
  };

  const handleDomain = (t: DeckTopic, checked: boolean) => {
    const next = new Set(domains);
    if (checked) next.add(t);
    else next.delete(t);
    setDomains(next);
  };

  const handleYear = (y: string, checked: boolean) => {
    const next = new Set(years);
    if (checked) next.add(y);
    else next.delete(y);
    setYears(next);
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryAll(true);
    setCategories(new Set());
    setDomains(new Set());
    setYears(new Set());
  };

  const activeFilterCount =
    (categoryAll ? 0 : categories.size) + domains.size + years.size;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return decksData.filter((deck) => {
      const categoryMatch = categoryAll || categories.has(deck.category);
      const domainMatch =
        domains.size === 0 || deck.topics.some((t) => domains.has(t));
      const yearMatch = years.size === 0 || years.has(deck.year);
      const searchMatch =
        !q ||
        deck.title.toLowerCase().includes(q) ||
        deck.team.toLowerCase().includes(q) ||
        deck.college.toLowerCase().includes(q) ||
        deck.competition.toLowerCase().includes(q) ||
        deck.tags.some((tag) => tag.toLowerCase().includes(q));
      return categoryMatch && domainMatch && yearMatch && searchMatch;
    });
  }, [search, categoryAll, categories, domains, years]);

  const filterPanel = (
    <>
      <FilterGroup title="Category">
        <FilterRadioLabel
          label="All decks"
          checked={categoryAll}
          onChange={handleCategoryAll}
          testId="filter-cat-all"
        />
        <FilterRadioLabel
          label="College"
          checked={categories.has("college")}
          onChange={(c) => handleCategory("college", c)}
          testId="filter-cat-college"
        />
        <FilterRadioLabel
          label="Corporate"
          checked={categories.has("corporate")}
          onChange={(c) => handleCategory("corporate", c)}
          testId="filter-cat-corporate"
        />
      </FilterGroup>

      <FilterGroup title="Domain">
        {DOMAINS.map((t) => (
          <FilterRadioLabel
            key={t}
            label={t.charAt(0).toUpperCase() + t.slice(1)}
            checked={domains.has(t)}
            onChange={(c) => handleDomain(t, c)}
            testId={`filter-domain-${t}`}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Year">
        {YEARS.map((y) => (
          <FilterRadioLabel
            key={y}
            label={y}
            checked={years.has(y)}
            onChange={(c) => handleYear(y, c)}
            testId={`filter-year-${y}`}
          />
        ))}
      </FilterGroup>

      <button
        onClick={clearFilters}
        className="mt-4 text-[13px] link-edit"
        style={{
          fontFamily: "var(--app-font-sans)",
          color: "var(--on-bg)",
          alignSelf: "start",
        }}
        data-testid="button-clear-filters"
      >
        Clear filters
      </button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col surface-dark">
      <Navbar />

      {/* Page header */}
      <section
        className="py-16 md:py-24"
        style={{ borderBottom: "1px solid var(--rule)" }}
        data-testid="section-library-header"
      >
        <div className="container-acm">
          <p className="eyebrow mb-5">Library</p>
          <h1
            className="display-2 mb-6 max-w-3xl"
            data-testid="text-page-title"
          >
            All the decks,{" "}
            <span style={{ fontStyle: "italic" }}>in one place.</span>
          </h1>
          <div
            className="max-w-xl relative"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by team, college, competition…"
              className="w-full bg-transparent py-3 pr-10 text-base focus:outline-none"
              style={{
                fontFamily: "var(--app-font-sans)",
                color: "var(--on-bg)",
              }}
              data-testid="input-search"
            />
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--on-bg-muted)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" />
                <path d="M12 12L16 16" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 flex-1">
        <div className="container-acm">
          {/* Mobile filter trigger */}
          <div className="lg:hidden mb-8 flex items-center justify-between">
            <span
              className="eyebrow-muted"
              data-testid="text-deck-count-mobile"
            >
              {filtered.length} {filtered.length === 1 ? "deck" : "decks"}
            </span>
            <button
              onClick={() => setFiltersOpen(true)}
              className="link-edit text-[13px]"
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 500,
                color: "var(--on-bg)",
              }}
              data-testid="button-open-filters"
            >
              Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </button>
          </div>

          <div className="grid gap-12 lg:grid-cols-[200px_1fr]">
            <aside
              className="hidden lg:flex flex-col h-fit lg:sticky lg:top-24"
              data-testid="aside-filters"
            >
              {filterPanel}
            </aside>

            <div>
              <p
                className="hidden lg:block eyebrow-muted mb-8"
                data-testid="text-deck-count"
              >
                {filtered.length} {filtered.length === 1 ? "deck" : "decks"}
              </p>

              {filtered.length === 0 ? (
                <div className="py-20">
                  <p
                    style={{
                      fontFamily: "var(--app-font-serif)",
                      fontStyle: "italic",
                      fontSize: 20,
                      color: "var(--on-bg-muted)",
                    }}
                  >
                    Nothing matches that yet.
                  </p>
                </div>
              ) : (
                <div data-testid="grid-decks">
                  {filtered.map((d) => (
                    <DeckCard key={d.id} deck={d} variant="dark" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {filtersOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[60] flex"
          data-testid="drawer-filters"
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setFiltersOpen(false)}
          />
          <div
            className="relative ml-auto h-full w-[85%] max-w-sm overflow-y-auto p-7 animate-slide-in-right flex flex-col"
            style={{
              background: "var(--bg-2)",
              borderLeft: "1px solid var(--rule)",
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <p className="eyebrow-muted">Filter</p>
              <button
                onClick={() => setFiltersOpen(false)}
                className="text-on-bg"
                aria-label="Close filters"
                data-testid="button-close-filters"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {filterPanel}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-auto text-[13px] py-3 self-start link-edit"
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 500,
                color: "var(--on-bg)",
              }}
              data-testid="button-apply-filters"
            >
              Show {filtered.length} {filtered.length === 1 ? "deck" : "decks"} →
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-9">
      <p className="eyebrow-muted mb-4">{title}</p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FilterRadioLabel({
  label,
  checked,
  onChange,
  testId,
}: {
  label: string;
  checked: boolean;
  onChange: (c: boolean) => void;
  testId: string;
}) {
  return (
    <label
      className="flex items-center gap-3 cursor-pointer text-[14px] transition-colors group"
      style={{
        fontFamily: "var(--app-font-sans)",
        color: checked ? "var(--on-bg)" : "var(--on-bg-muted)",
      }}
      data-testid={testId}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden
        className="inline-block transition-all"
        style={{
          width: 14,
          height: 1,
          background: checked ? "var(--accent)" : "var(--on-bg-muted)",
          opacity: checked ? 1 : 0.4,
        }}
      />
      <span className="group-hover:opacity-80">{label}</span>
    </label>
  );
}
