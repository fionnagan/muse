"use client";
import { useState } from "react";
import { MOCK_DMOS } from "@/lib/mock-data";
import DMOCard from "@/components/DMOCard";
import FilterBar from "@/components/FilterBar";
import type { DMO } from "@/lib/types";
import { Sparkles, SlidersHorizontal } from "lucide-react";

export default function LibraryPage() {
  const [filtered, setFiltered] = useState<DMO[]>(MOCK_DMOS);
  const [showFilters, setShowFilters] = useState(true);

  const compressed = filtered.filter((d) => d.compressed).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1
            className="font-display italic text-3xl sm:text-4xl text-ink"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Design Memory Library
          </h1>
          <p className="text-ink-light text-sm mt-1">
            {filtered.length} memories
            {compressed > 0 && (
              <span className="ml-2 text-gold-dark font-mono text-xs">
                · {compressed} compressed
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-ink-light border border-sand px-3 py-1.5 rounded-full hover:bg-sand transition-all mt-1"
        >
          <SlidersHorizontal size={13} />
          {showFilters ? "Hide" : "Filter"}
        </button>
      </div>

      {/* Ornate divider */}
      <div className="ornate-divider my-4">
        <span>✦</span>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 bg-paper border border-sand rounded-[12px] p-4">
          <FilterBar dmos={MOCK_DMOS} onFilter={setFiltered} />
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <Sparkles size={32} className="text-sand-dark mx-auto mb-4" />
          <p className="font-display italic text-2xl text-ink-light" style={{ fontFamily: "var(--font-playfair)" }}>
            No memories match that filter.
          </p>
          <p className="text-sm text-sand-dark mt-2">Try broadening your selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((dmo) => (
            <DMOCard key={dmo.id} dmo={dmo} />
          ))}
        </div>
      )}
    </div>
  );
}
