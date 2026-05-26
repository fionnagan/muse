"use client";
import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { MOCK_DMOS } from "@/lib/mock-data";
import DMOCard from "@/components/DMOCard";
import type { DMO } from "@/lib/types";

const SUGGESTIONS = [
  "warm fintech onboarding with soft colors",
  "minimal dashboard with bento grid",
  "luxury pricing page with purple tones",
  "playful form with green accents",
  "brutalist landing page dark tones",
  "editorial card layout warm palette",
];

function fuzzySearch(dmos: DMO[], query: string): DMO[] {
  const q = query.toLowerCase();
  return dmos
    .map((dmo) => {
      let score = 0;
      const text = [
        dmo.ui_type,
        ...dmo.design_style,
        ...dmo.semantic_tags,
        ...dmo.components,
        ...dmo.typography,
        dmo.source.app,
        dmo.project ?? "",
        dmo.intent.primary,
        dmo.layout.grid,
        dmo.layout.density,
      ].join(" ").toLowerCase();

      const words = q.split(/\s+/).filter(Boolean);
      words.forEach((w) => {
        if (text.includes(w)) score += 2;
        if (dmo.semantic_tags.some((t) => t.toLowerCase().includes(w))) score += 3;
        if (dmo.design_style.some((s) => s.toLowerCase().includes(w))) score += 2;
        if (dmo.ui_type.includes(w)) score += 3;
      });

      const colorWords = ["warm", "cool", "dark", "light", "pastel", "muted"];
      colorWords.forEach((cw) => {
        if (q.includes(cw) && text.includes(cw)) score += 1;
      });

      return { dmo, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ dmo }) => dmo);
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DMO[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  function doSearch(q: string) {
    setQuery(q);
    if (!q.trim()) { setResults(null); setHasSearched(false); return; }
    setHasSearched(true);
    setResults(fuzzySearch(MOCK_DMOS, q));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="font-display italic text-4xl sm:text-5xl text-ink mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Search your memory.
        </h1>
        <p className="text-ink-light text-sm">
          Ask in plain English — Muse finds semantically relevant inspiration.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative max-w-xl mx-auto mb-4">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-dark"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => doSearch(e.target.value)}
          placeholder="warm fintech onboarding with high trust signals…"
          className="w-full bg-paper border border-sand rounded-full pl-10 pr-12 py-3 text-sm text-ink placeholder:text-sand-dark focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 transition-all"
          style={{ boxShadow: "var(--shadow-card)" }}
          autoFocus
        />
        {query && (
          <button
            onClick={() => doSearch(query)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors"
          >
            <ArrowRight size={13} className="text-cream" />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {!hasSearched && (
        <div className="max-w-xl mx-auto mb-10">
          <p className="text-center text-[11px] text-sand-dark font-mono tracking-widest mb-3">
            TRY THESE
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => doSearch(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-sand text-ink-light hover:bg-sand hover:border-sand-dark hover:text-ink transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && results !== null && (
        <div>
          {results.length === 0 ? (
            <div className="text-center py-16">
              <Sparkles size={28} className="text-sand-dark mx-auto mb-4" />
              <p
                className="font-display italic text-2xl text-ink-light"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                No memories found.
              </p>
              <p className="text-sm text-sand-dark mt-2">
                Try different keywords — or{" "}
                <a href="/capture" className="text-gold hover:text-gold-dark transition-colors">
                  capture new inspiration.
                </a>
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-ink-light">
                  <span className="font-medium text-ink">{results.length}</span> memories found
                  {query && (
                    <span className="text-sand-dark">
                      {" "}for{" "}
                      <em className="text-gold not-italic">&ldquo;{query}&rdquo;</em>
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-gold font-mono bg-gold/10 px-2.5 py-1 rounded-full">
                  <Sparkles size={9} />
                  SEMANTIC MATCH
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {results.map((dmo) => (
                  <DMOCard key={dmo.id} dmo={dmo} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Recently surfaced */}
      {!hasSearched && (
        <div>
          <div className="ornate-divider mb-6">
            <span>✦ FORGOTTEN INSPIRATION ✦</span>
          </div>
          <p className="text-center text-sm text-ink-light mb-6">
            Memories you haven&apos;t revisited in a while — worth rediscovering.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {MOCK_DMOS.slice(6, 10).map((dmo) => (
              <DMOCard key={dmo.id} dmo={dmo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
