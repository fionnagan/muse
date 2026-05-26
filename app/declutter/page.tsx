"use client";
import { useState } from "react";
import { Archive, Trash2, CheckCircle, Sparkles, ShieldCheck } from "lucide-react";
import { MOCK_DMOS } from "@/lib/mock-data";
import { UI_TYPE_COLORS } from "@/lib/types";
import type { DMO } from "@/lib/types";

type Action = "keep" | "archive" | "delete";

const LOW_VALUE_IDS = ["dmo_008", "dmo_009", "dmo_011", "dmo_012", "dmo_006"];

const REASON_MAP: Record<string, string> = {
  dmo_008: "Not revisited in 10 days",
  dmo_009: "Low confidence score (77%)",
  dmo_011: "Duplicate of dmo_002 pattern",
  dmo_012: "No project association · 14 days old",
  dmo_006: "Marked 'reference' but never opened",
};

export default function DeclutterPage() {
  const candidates = MOCK_DMOS.filter((d) => LOW_VALUE_IDS.includes(d.id));
  const [actions, setActions] = useState<Record<string, Action>>({});
  const [done, setDone] = useState(false);

  function setAction(id: string, action: Action) {
    setActions((prev) => ({ ...prev, [id]: action }));
  }

  const decided = Object.keys(actions).length;
  const total = candidates.length;
  const allDone = decided === total;

  const toArchive = candidates.filter((d) => actions[d.id] === "archive").length;
  const toDelete = candidates.filter((d) => actions[d.id] === "delete").length;
  const toKeep = candidates.filter((d) => actions[d.id] === "keep").length;

  if (done) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 bg-sage-light rounded-full flex items-center justify-center mx-auto">
          <ShieldCheck size={28} className="text-sage-dark" />
        </div>
        <h2 className="font-display italic text-3xl text-ink" style={{ fontFamily: "var(--font-playfair)" }}>
          Library decluttered.
        </h2>
        <p className="text-sm text-ink-light max-w-xs">
          {toArchive > 0 && `${toArchive} memories archived. `}
          {toDelete > 0 && `${toDelete} deleted. `}
          {toKeep > 0 && `${toKeep} kept in library.`}
        </p>
        <div className="flex gap-3 mt-2">
          <a href="/library" className="text-sm text-ink border border-sand px-5 py-2 rounded-full hover:bg-sand transition-all">
            Back to Library
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-rose-light/60 border border-rose/30 text-rose-dark text-xs tracking-widest font-mono px-3 py-1 rounded-full mb-4">
          <Sparkles size={10} />
          DECLUTTER INTELLIGENCE
        </div>
        <h1
          className="font-display italic text-3xl sm:text-4xl text-ink"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Memory audit.
        </h1>
        <p className="text-ink-light text-sm mt-2">
          Muse identified {total} low-value memories. Review each one — archive,
          delete, or keep it.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6 bg-paper border border-sand rounded-[12px] p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-ink-light">{decided} of {total} reviewed</span>
            <span className="font-mono text-sand-dark">{Math.round((decided / total) * 100)}%</span>
          </div>
          <div className="w-full bg-sand rounded-full h-1.5">
            <div
              className="bg-ink h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(decided / total) * 100}%` }}
            />
          </div>
        </div>
        {allDone && (
          <button
            onClick={() => setDone(true)}
            className="flex-shrink-0 flex items-center gap-2 bg-ink text-cream text-xs px-4 py-2 rounded-full hover:bg-ink-light transition-all font-medium"
          >
            <CheckCircle size={12} />
            Apply changes
          </button>
        )}
      </div>

      {/* Candidate cards */}
      <div className="space-y-3">
        {candidates.map((dmo) => {
          const action = actions[dmo.id];
          const uiColor = UI_TYPE_COLORS[dmo.ui_type];

          return (
            <DeclutterCard
              key={dmo.id}
              dmo={dmo}
              reason={REASON_MAP[dmo.id]}
              uiColor={uiColor}
              action={action}
              onAction={(a) => setAction(dmo.id, a)}
            />
          );
        })}
      </div>

      {/* Storage estimate */}
      <div className="mt-8 border border-sand rounded-[12px] p-4 bg-paper text-center">
        <p className="text-xs text-sand-dark font-mono tracking-widest uppercase mb-1">Estimated savings</p>
        <p className="font-display text-3xl text-ink" style={{ fontFamily: "var(--font-playfair)" }}>
          ~{toDelete + toArchive} memories cleared
        </p>
        <p className="text-xs text-ink-light mt-1">
          Semantic metadata preserved · Raw images removed
        </p>
      </div>
    </div>
  );
}

function DeclutterCard({
  dmo, reason, uiColor, action, onAction,
}: {
  dmo: DMO;
  reason: string;
  uiColor: string;
  action?: Action;
  onAction: (a: Action) => void;
}) {
  return (
    <div
      className={`bg-paper border rounded-[12px] overflow-hidden transition-all duration-200 ${
        action ? "border-sand opacity-60" : "border-sand"
      }`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex gap-3 p-3">
        {/* Gradient thumbnail */}
        <div
          className="w-16 h-16 rounded-[8px] flex-shrink-0 border border-sand/50"
          style={{ background: dmo.image_placeholder }}
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full border uppercase ${uiColor}`}>
              {dmo.ui_type}
            </span>
            <span className="text-[10px] text-sand-dark font-mono">{dmo.source.app}</span>
          </div>
          <p className="text-xs text-rose-dark bg-rose-light/40 px-2 py-0.5 rounded inline-block mb-2">
            {reason}
          </p>
          <div className="flex flex-wrap gap-1">
            {dmo.semantic_tags.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] text-ink-light bg-cream-dark px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <button
            onClick={() => onAction("keep")}
            className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-full border transition-all ${
              action === "keep"
                ? "bg-sage-light text-sage-dark border-sage font-medium"
                : "border-sand text-ink-light hover:bg-sage-light hover:text-sage-dark"
            }`}
          >
            <CheckCircle size={10} />
            Keep
          </button>
          <button
            onClick={() => onAction("archive")}
            className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-full border transition-all ${
              action === "archive"
                ? "bg-gold/20 text-gold-dark border-gold font-medium"
                : "border-sand text-ink-light hover:bg-gold/10 hover:text-gold-dark"
            }`}
          >
            <Archive size={10} />
            Archive
          </button>
          <button
            onClick={() => onAction("delete")}
            className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-full border transition-all ${
              action === "delete"
                ? "bg-rose-light text-rose-dark border-rose font-medium"
                : "border-sand text-ink-light hover:bg-rose-light hover:text-rose-dark"
            }`}
          >
            <Trash2 size={10} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
