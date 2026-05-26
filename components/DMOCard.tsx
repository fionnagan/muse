import Link from "next/link";
import { Archive, Sparkles } from "lucide-react";
import type { DMO } from "@/lib/types";
import { UI_TYPE_COLORS } from "@/lib/types";

interface Props {
  dmo: DMO;
  layout?: "grid" | "list";
}

export default function DMOCard({ dmo, layout = "grid" }: Props) {
  const uiColorClass = UI_TYPE_COLORS[dmo.ui_type] ?? UI_TYPE_COLORS.unknown;
  const ago = formatAgo(dmo.created_at);

  return (
    <Link href={`/library/${dmo.id}`} className="group block">
      <article
        className="bg-paper border border-sand rounded-[12px] overflow-hidden hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {/* Image / placeholder */}
        <div
          className="relative w-full aspect-[4/3]"
          style={{ background: dmo.image_placeholder }}
        >
          {/* Color palette strip */}
          <div className="absolute bottom-0 left-0 right-0 flex h-6">
            {dmo.color_palette.slice(0, 5).map((hex, i) => (
              <div
                key={i}
                className="flex-1 transition-all duration-300 group-hover:h-8"
                style={{ background: hex, height: "100%" }}
              />
            ))}
          </div>

          {/* Compressed badge */}
          {dmo.compressed && (
            <div className="absolute top-2 right-2 bg-ink/70 text-cream text-[10px] tracking-widest font-mono px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
              <Archive size={9} />
              COMPRESSED
            </div>
          )}

          {/* UI type badge */}
          <div
            className={`absolute top-2 left-2 border text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full uppercase ${uiColorClass}`}
          >
            {dmo.ui_type}
          </div>
        </div>

        {/* Card body */}
        <div className="p-3 space-y-2">
          {/* Source + project */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-ink-light tracking-wide font-mono">
              {dmo.source.app}
            </span>
            {dmo.project && (
              <span className="text-[10px] text-sand-dark bg-sand px-2 py-0.5 rounded-full">
                {dmo.project}
              </span>
            )}
          </div>

          {/* Semantic tags */}
          <div className="flex flex-wrap gap-1">
            {dmo.semantic_tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-ink-light bg-cream-dark px-2 py-0.5 rounded-full border border-sand"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Design styles */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {dmo.design_style.slice(0, 2).map((s) => (
                <span key={s} className="text-[10px] text-rose-dark italic">
                  {s}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-sand-dark font-mono">{ago}</span>
          </div>

          {/* AI confidence */}
          <div className="flex items-center gap-1.5 pt-0.5 border-t border-sand/50">
            <Sparkles size={9} className="text-gold" />
            <div className="flex-1 bg-sand rounded-full h-1">
              <div
                className="bg-gold h-1 rounded-full"
                style={{ width: `${dmo.intent.confidence * 100}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-sand-dark">
              {Math.round(dmo.intent.confidence * 100)}%
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function formatAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}
