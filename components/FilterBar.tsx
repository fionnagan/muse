"use client";
import { useState } from "react";
import type { UIType, DesignStyle } from "@/lib/types";
import type { DMO } from "@/lib/types";

const UI_TYPES: UIType[] = [
  "onboarding", "dashboard", "pricing", "modal", "form",
  "landing", "profile", "navigation", "card",
];
const STYLES: DesignStyle[] = [
  "whimsical", "minimal", "editorial", "brutalist", "luxury", "playful",
];

interface Props {
  dmos: DMO[];
  onFilter: (filtered: DMO[]) => void;
}

export default function FilterBar({ dmos, onFilter }: Props) {
  const [activeType, setActiveType] = useState<UIType | null>(null);
  const [activeStyle, setActiveStyle] = useState<DesignStyle | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const projects = [...new Set(dmos.map((d) => d.project).filter(Boolean))] as string[];

  function apply(type: UIType | null, style: DesignStyle | null, proj: string | null) {
    let result = dmos;
    if (type) result = result.filter((d) => d.ui_type === type);
    if (style) result = result.filter((d) => d.design_style.includes(style));
    if (proj) result = result.filter((d) => d.project === proj);
    onFilter(result);
  }

  function toggleType(t: UIType) {
    const next = activeType === t ? null : t;
    setActiveType(next);
    apply(next, activeStyle, activeProject);
  }
  function toggleStyle(s: DesignStyle) {
    const next = activeStyle === s ? null : s;
    setActiveStyle(next);
    apply(activeType, next, activeProject);
  }
  function toggleProject(p: string) {
    const next = activeProject === p ? null : p;
    setActiveProject(next);
    apply(activeType, activeStyle, next);
  }
  function clearAll() {
    setActiveType(null);
    setActiveStyle(null);
    setActiveProject(null);
    onFilter(dmos);
  }

  const hasActive = activeType || activeStyle || activeProject;

  return (
    <div className="space-y-2">
      {/* UI Type filters */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mr-1">UI</span>
        {UI_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => toggleType(t)}
            className={`text-[11px] px-2.5 py-1 rounded-full border tracking-wide transition-all ${
              activeType === t
                ? "bg-ink text-cream border-ink"
                : "border-sand text-ink-light hover:border-sand-dark hover:bg-sand"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Style filters */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mr-1">Style</span>
        {STYLES.map((s) => (
          <button
            key={s}
            onClick={() => toggleStyle(s)}
            className={`text-[11px] px-2.5 py-1 rounded-full border tracking-wide transition-all italic ${
              activeStyle === s
                ? "bg-rose text-cream border-rose"
                : "border-sand text-ink-light hover:border-sand-dark hover:bg-sand"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Project filters */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mr-1">Project</span>
        {projects.map((p) => (
          <button
            key={p}
            onClick={() => toggleProject(p)}
            className={`text-[11px] px-2.5 py-1 rounded-full border tracking-wide transition-all ${
              activeProject === p
                ? "bg-gold text-cream border-gold"
                : "border-sand text-ink-light hover:border-sand-dark hover:bg-sand"
            }`}
          >
            {p}
          </button>
        ))}
        {hasActive && (
          <button
            onClick={clearAll}
            className="text-[11px] px-2.5 py-1 rounded-full text-rose-dark hover:bg-rose-light transition-all ml-auto"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
