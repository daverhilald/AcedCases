import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeckCard } from "@/components/DeckCard";
import { decksData, type DeckCategory, type DeckTopic } from "@/data/decks";

const TOPICS: DeckTopic[] = ["strategy", "marketing", "finance", "operations", "analytics"];
const YEARS = ["2024", "2023", "2022"];

type SortOpt = "recent" | "name" | "team";

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
  const [searchInput, setSearchInput] = useState("");
  const [categoryAll, setCategoryAll] = useState(true);
  const [categories, setCategories] = useState<Set<DeckCategory>>(new Set());
  const [topics, setTopics] = useState<Set<DeckTopic>>(new Set());
  const [years, setYears] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortOpt>("recent");

  // Apply URL params on mount
  useEffect(() => {
    const cat = params.get("category") as DeckCategory | null;
    const topic = params.get("topic") as DeckTopic | null;
    if (cat) {
      setCategoryAll(false);
      setCategories(new Set([cat]));
    }
    if (topic) {
      setTopics(new Set([topic]));
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

  const handleTopic = (t: DeckTopic, checked: boolean) => {
    const next = new Set(topics);
    if (checked) next.add(t);
    else next.delete(t);
    setTopics(next);
  };

  const handleYear = (y: string, checked: boolean) => {
    const next = new Set(years);
    if (checked) next.add(y);
    else next.delete(y);
    setYears(next);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setCategoryAll(true);
    setCategories(new Set());
    setTopics(new Set());
    setYears(new Set());
    setSort("recent");
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = decksData.filter((deck) => {
      const categoryMatch = categoryAll || categories.has(deck.category);
      const topicMatch =
        topics.size === 0 || deck.topics.some((t) => topics.has(t));
      const yearMatch = years.size === 0 || years.has(deck.year);
      const searchMatch =
        !q ||
        deck.title.toLowerCase().includes(q) ||
        deck.team.toLowerCase().includes(q) ||
        deck.college.toLowerCase().includes(q) ||
        deck.competition.toLowerCase().includes(q) ||
        deck.tags.some((tag) => tag.toLowerCase().includes(q));
      return categoryMatch && topicMatch && yearMatch && searchMatch;
    });

    if (sort === "recent") {
      result = [...result].sort((a, b) => b.year.localeCompare(a.year));
    } else if (sort === "name") {
      result = [...result].sort((a, b) =>
        a.competition.localeCompare(b.competition),
      );
    } else if (sort === "team") {
      result = [...result].sort((a, b) => a.team.localeCompare(b.team));
    }
    return result;
  }, [search, categoryAll, categories, topics, years, sort]);

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />

      <section className="bg-dark-gray border-b border-brand py-16" data-testid="section-library-header">
        <div className="container-acm">
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-3 text-gradient"
            style={{ fontFamily: "var(--app-font-heading)" }}
            data-testid="text-page-title"
          >
            Deck Library
          </h1>
          <p className="text-lg text-secondary-muted mb-8">
            Explore winning case competition strategies from top teams.
          </p>
          <div className="max-w-2xl mx-auto flex gap-3 flex-wrap sm:flex-nowrap">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setSearch(searchInput);
              }}
              placeholder="Search by competition, team, or topic..."
              className="flex-1 px-6 py-4 rounded-xl bg-medium-gray text-white border-2 border-brand-strong focus:outline-none focus:border-[var(--bright-cyan)] transition-colors text-base"
              data-testid="input-search"
            />
            <button
              onClick={() => setSearch(searchInput)}
              className="px-8 py-4 rounded-xl text-white font-semibold gradient-primary transition-all hover:-translate-y-0.5 w-full sm:w-auto"
              data-testid="button-search"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 flex-1 bg-navy">
        <div className="container-acm">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <aside
              className="bg-medium-gray rounded-2xl p-6 border border-brand h-fit lg:sticky lg:top-24"
              data-testid="aside-filters"
            >
              <FilterGroup title="Categories">
                <FilterCheckbox
                  label="All Decks"
                  checked={categoryAll}
                  onChange={handleCategoryAll}
                  testId="filter-cat-all"
                />
                <FilterCheckbox
                  label="College Competitions"
                  checked={categories.has("college")}
                  onChange={(c) => handleCategory("college", c)}
                  testId="filter-cat-college"
                />
                <FilterCheckbox
                  label="Corporate Competitions"
                  checked={categories.has("corporate")}
                  onChange={(c) => handleCategory("corporate", c)}
                  testId="filter-cat-corporate"
                />
              </FilterGroup>

              <FilterGroup title="Topics">
                {TOPICS.map((t) => (
                  <FilterCheckbox
                    key={t}
                    label={t.charAt(0).toUpperCase() + t.slice(1)}
                    checked={topics.has(t)}
                    onChange={(c) => handleTopic(t, c)}
                    testId={`filter-topic-${t}`}
                  />
                ))}
              </FilterGroup>

              <FilterGroup title="Year">
                {YEARS.map((y) => (
                  <FilterCheckbox
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
                className="w-full py-3 rounded-lg font-semibold text-sm border-2 transition-colors text-[var(--electric-blue)] hover:text-[var(--bright-cyan)] hover:border-[var(--bright-cyan)] hover:bg-[rgba(59,130,246,0.1)]"
                style={{ borderColor: "var(--electric-blue)" }}
                data-testid="button-clear-filters"
              >
                Clear All Filters
              </button>
            </aside>

            {/* Decks */}
            <div>
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <p className="text-secondary-muted text-sm">
                  <span className="text-cyan font-semibold" data-testid="text-deck-count">
                    {filtered.length}
                  </span>{" "}
                  deck{filtered.length === 1 ? "" : "s"} found
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOpt)}
                  className="px-4 py-2.5 rounded-lg bg-medium-gray text-white border border-brand-strong text-sm cursor-pointer focus:outline-none focus:border-[var(--bright-cyan)]"
                  data-testid="select-sort"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Competition Name</option>
                  <option value="team">Team Name</option>
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-xl text-secondary-muted mb-3">
                    No decks found
                  </h3>
                  <p className="text-secondary-muted text-sm">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              ) : (
                <div
                  className="grid gap-8"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                  }}
                  data-testid="grid-decks"
                >
                  {filtered.map((d, i) => (
                    <DeckCard key={d.id} deck={d} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
    <div className="mb-8">
      <h3
        className="text-lg font-bold text-white mb-4"
        style={{ fontFamily: "var(--app-font-heading)" }}
      >
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FilterCheckbox({
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
      className="flex items-center gap-3 cursor-pointer text-sm text-secondary-muted hover:text-white transition-colors"
      data-testid={testId}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-[18px] h-[18px] cursor-pointer accent-[var(--bright-cyan)]"
      />
      <span>{label}</span>
    </label>
  );
}
