"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles, CheckCircle, Edit2, X, Plus, ArrowRight, ChevronDown,
} from "lucide-react";
import { MOCK_DMOS, PROJECTS } from "@/lib/mock-data";
import { UI_TYPE_COLORS, STYLE_COLORS } from "@/lib/types";
import type { UIType, DesignStyle } from "@/lib/types";

const DRAFT = MOCK_DMOS[0]; // simulated newly-processed DMO

const INTENT_OPTIONS = [
  { value: "inspiration", label: "Inspiration", desc: "General design inspiration to revisit" },
  { value: "research", label: "Research", desc: "Competitor or market reference" },
  { value: "reference", label: "Reference", desc: "Specific pattern to implement" },
];

const UI_TYPES: UIType[] = ["onboarding","dashboard","pricing","modal","form","landing","profile","navigation","card"];
const DESIGN_STYLES: DesignStyle[] = ["whimsical","minimal","editorial","brutalist","luxury","playful","corporate","organic"];

export default function ConfirmPage() {
  const router = useRouter();

  const [intent, setIntent] = useState(DRAFT.intent.primary);
  const [uiType, setUiType] = useState<UIType>(DRAFT.ui_type);
  const [styles, setStyles] = useState<DesignStyle[]>(DRAFT.design_style);
  const [tags, setTags] = useState<string[]>(DRAFT.semantic_tags);
  const [newTag, setNewTag] = useState("");
  const [project, setProject] = useState(DRAFT.project ?? "");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function toggleStyle(s: DesignStyle) {
    setStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }
  function removeTag(t: string) { setTags((prev) => prev.filter((x) => x !== t)); }
  function addTag() {
    const t = newTag.trim();
    if (t && !tags.includes(t)) { setTags((prev) => [...prev, t]); }
    setNewTag("");
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => router.push("/library/dmo_001"), 1400);
  }

  if (saved) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-14 h-14 bg-sage-light rounded-full flex items-center justify-center">
          <CheckCircle size={26} className="text-sage-dark" />
        </div>
        <p className="font-display italic text-2xl text-ink" style={{ fontFamily: "var(--font-playfair)" }}>
          Memory saved.
        </p>
        <p className="text-sm text-ink-light">Redirecting to your Design Memory Object…</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-sage-light/60 border border-sage/40 text-sage-dark text-xs tracking-widest font-mono px-3 py-1 rounded-full mb-4">
          <Sparkles size={10} />
          STEP 4 OF 4 — CONFIRM
        </div>
        <h1
          className="font-display italic text-3xl sm:text-4xl text-ink"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Muse has analysed your screenshot.
        </h1>
        <p className="text-ink-light text-sm mt-2">
          Review what Muse found. Adjust anything before saving to your library.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
        {/* Preview */}
        <div className="sm:col-span-2">
          <div
            className="w-full aspect-[3/4] rounded-[12px] overflow-hidden border border-sand relative"
            style={{ background: DRAFT.image_placeholder }}
          >
            <div className="absolute bottom-0 left-0 right-0 flex h-5">
              {DRAFT.color_palette.map((hex, i) => (
                <div key={i} className="flex-1" style={{ background: hex }} />
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-mono text-sand-dark">{DRAFT.source.app}</span>
            <span className="text-xs font-mono text-sand-dark">{DRAFT.intent.confidence * 100}% confidence</span>
          </div>

          {/* Confidence bar */}
          <div className="w-full bg-sand rounded-full h-1 mt-1">
            <div className="bg-gold h-1 rounded-full" style={{ width: `${DRAFT.intent.confidence * 100}%` }} />
          </div>
        </div>

        {/* Editable fields */}
        <div className="sm:col-span-3 space-y-4">

          {/* Intent suggestion — the key UX moment */}
          <div className="bg-gold/10 border border-gold/40 rounded-[12px] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={13} className="text-gold" />
              <p className="text-xs font-semibold tracking-widest text-gold-dark font-mono uppercase">
                Muse thinks you saved this for…
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {INTENT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setIntent(opt.value as typeof intent)}
                  className={`flex flex-col items-start px-3 py-2 rounded-[8px] border text-left transition-all ${
                    intent === opt.value
                      ? "bg-gold text-cream border-gold"
                      : "bg-paper border-sand text-ink-light hover:border-sand-dark"
                  }`}
                >
                  <span className="text-xs font-semibold">{opt.label}</span>
                  <span className={`text-[10px] mt-0.5 ${intent === opt.value ? "text-cream/70" : "text-sand-dark"}`}>
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* UI Type */}
          <div className="bg-paper border border-sand rounded-[12px] p-4">
            <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-2">UI Type</p>
            <div className="flex flex-wrap gap-1.5">
              {UI_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setUiType(t)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border tracking-wide transition-all ${
                    uiType === t
                      ? `${UI_TYPE_COLORS[t]} font-semibold`
                      : "border-sand text-ink-light hover:bg-sand"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Design style */}
          <div className="bg-paper border border-sand rounded-[12px] p-4">
            <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-2">Design Style</p>
            <div className="flex flex-wrap gap-1.5">
              {DESIGN_STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleStyle(s)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border italic tracking-wide transition-all ${
                    styles.includes(s)
                      ? `${STYLE_COLORS[s]} font-medium border-transparent`
                      : "border-sand text-ink-light hover:bg-sand"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Semantic tags */}
          <div className="bg-paper border border-sand rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase">Semantic Tags</p>
              <Edit2 size={11} className="text-sand-dark" />
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-cream-dark border border-sand text-ink-light"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-rose transition-colors">
                    <X size={9} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="Add a tag…"
                className="flex-1 text-xs bg-cream-dark border border-sand rounded-full px-3 py-1.5 focus:outline-none focus:border-gold/60 placeholder:text-sand-dark"
              />
              <button
                onClick={addTag}
                className="w-7 h-7 bg-sand rounded-full flex items-center justify-center hover:bg-sand-dark transition-colors"
              >
                <Plus size={12} className="text-ink-light" />
              </button>
            </div>
          </div>

          {/* Project */}
          <div className="bg-paper border border-sand rounded-[12px] p-4">
            <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-2">Project</p>
            <div className="relative">
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full appearance-none bg-cream-dark border border-sand rounded-full px-3 py-2 text-sm text-ink focus:outline-none focus:border-gold/60 pr-8"
              >
                <option value="">No project</option>
                {PROJECTS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
                <option value="new">+ New project…</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-dark pointer-events-none" />
            </div>
          </div>

          {/* Note */}
          <div className="bg-paper border border-sand rounded-[12px] p-4">
            <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-2">
              Why did you save this?
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Love the progressive disclosure pattern and the color warmth…"
              rows={2}
              className="w-full text-sm bg-cream-dark border border-sand rounded-[8px] px-3 py-2 resize-none focus:outline-none focus:border-gold/60 placeholder:text-sand-dark text-ink"
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex gap-3 justify-end">
        <button
          onClick={() => router.push("/library")}
          className="text-sm text-ink-light border border-sand px-5 py-2.5 rounded-full hover:bg-sand transition-all"
        >
          Skip & save as-is
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-ink text-cream text-sm px-6 py-2.5 rounded-full hover:bg-ink-light transition-all font-medium"
        >
          Save to Library
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
