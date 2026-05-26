import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Archive, Download, Sparkles, Layers, Type, Grid2x2, Tag } from "lucide-react";
import { getDMO, getRelatedDMOs } from "@/lib/mock-data";
import { UI_TYPE_COLORS, STYLE_COLORS } from "@/lib/types";
import ColorPalette from "@/components/ColorPalette";
import DMOCard from "@/components/DMOCard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DMODetailPage({ params }: Props) {
  const { id } = await params;
  const dmo = getDMO(id);
  if (!dmo) notFound();

  const related = getRelatedDMOs(dmo);
  const uiColor = UI_TYPE_COLORS[dmo.ui_type] ?? UI_TYPE_COLORS.unknown;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back */}
      <Link
        href="/library"
        className="inline-flex items-center gap-1.5 text-sm text-ink-light hover:text-ink mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Visual */}
        <div className="lg:col-span-3 space-y-4">
          {/* Screenshot / placeholder */}
          <div
            className="w-full aspect-[4/3] rounded-[12px] overflow-hidden relative border border-sand"
            style={{ background: dmo.image_placeholder }}
          >
            {/* Color strip bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex h-8">
              {dmo.color_palette.map((hex, i) => (
                <div key={i} className="flex-1" style={{ background: hex }} />
              ))}
            </div>
            {dmo.compressed && (
              <div className="absolute top-3 right-3 bg-ink/70 text-cream text-[10px] tracking-widest font-mono px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <Archive size={10} />
                COMPRESSED MEMORY
              </div>
            )}
          </div>

          {/* Color palette detail */}
          <div
            className="bg-paper border border-sand rounded-[12px] p-4"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <h3 className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-3">
              Color Palette
            </h3>
            <div className="flex gap-3 items-center flex-wrap">
              {dmo.color_palette.map((hex, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-lg border border-sand/50"
                    style={{ background: hex }}
                    title={hex}
                  />
                  <span className="text-[9px] font-mono text-sand-dark">{hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DNA Kit preview */}
          <div
            className="bg-paper border border-gold/40 rounded-[12px] p-5 frame-corner"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-gold" />
              <h3
                className="font-display text-base text-ink"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Design DNA Kit
              </h3>
              <span className="ml-auto text-[10px] tracking-widest text-gold font-mono bg-gold/10 px-2 py-0.5 rounded-full">
                READY TO EXPORT
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <DNARow icon={Grid2x2} label="Grid" value={`${dmo.layout.grid} · ${dmo.layout.density} density`} />
              <DNARow icon={Type} label="Typography" value={dmo.typography.join(", ")} />
              <DNARow icon={Layers} label="Components" value={dmo.components.slice(0, 4).join(", ")} />
              <DNARow icon={Tag} label="Semantic tags" value={dmo.semantic_tags.join(" · ")} />
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-gold text-cream text-sm py-2.5 rounded-full hover:bg-gold-dark transition-colors font-medium">
              <Download size={14} />
              Export Design DNA JSON
            </button>
          </div>
        </div>

        {/* Right: Metadata */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[11px] font-semibold tracking-widest px-2.5 py-0.5 rounded-full border uppercase ${uiColor}`}>
                {dmo.ui_type}
              </span>
              {dmo.project && (
                <span className="text-[11px] text-sand-dark bg-sand px-2 py-0.5 rounded-full">
                  {dmo.project}
                </span>
              )}
            </div>
            <h1
              className="font-display italic text-2xl text-ink"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Design Memory Object
            </h1>
            <p className="text-xs font-mono text-sand-dark mt-1">{dmo.id}</p>
          </div>

          {/* Intent */}
          <div className="bg-paper border border-sand rounded-[12px] p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-2">AI Intent</p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-ink capitalize">{dmo.intent.primary}</span>
              <span className="text-sm font-mono text-gold">{Math.round(dmo.intent.confidence * 100)}%</span>
            </div>
            <div className="w-full bg-sand rounded-full h-1.5">
              <div
                className="bg-gold h-1.5 rounded-full"
                style={{ width: `${dmo.intent.confidence * 100}%` }}
              />
            </div>
          </div>

          {/* Design styles */}
          <div className="bg-paper border border-sand rounded-[12px] p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-3">Design Style</p>
            <div className="flex flex-wrap gap-2">
              {dmo.design_style.map((s) => (
                <span
                  key={s}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium italic ${STYLE_COLORS[s] ?? "bg-cream-dark text-ink-light"}`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Semantic tags */}
          <div className="bg-paper border border-sand rounded-[12px] p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-3">Semantic Tags</p>
            <div className="flex flex-wrap gap-2">
              {dmo.semantic_tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-cream-dark text-ink-light border border-sand"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="bg-paper border border-sand rounded-[12px] p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-[10px] tracking-widest text-sand-dark font-mono uppercase mb-2">Source</p>
            <p className="text-sm text-ink font-medium">{dmo.source.app}</p>
            <p className="text-xs text-sand-dark font-mono mt-1">
              {new Date(dmo.created_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>

          {/* Compression CTA */}
          {!dmo.compressed ? (
            <button className="w-full flex items-center justify-center gap-2 border border-sand text-ink-light text-sm py-2.5 rounded-full hover:bg-sand hover:text-ink transition-all">
              <Archive size={14} />
              Compress this memory
            </button>
          ) : (
            <div className="text-center py-3 px-4 bg-sage-light/40 text-sage-dark text-xs rounded-full border border-sage/30 flex items-center justify-center gap-2">
              <Archive size={11} />
              Raw image deleted · Semantic memory preserved
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <div className="ornate-divider mb-6">
            <span>✦ RELATED MEMORIES ✦</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <DMOCard key={r.id} dmo={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DNARow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 rounded bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={11} className="text-gold" />
      </div>
      <div>
        <p className="text-[10px] text-sand-dark font-mono uppercase tracking-wider">{label}</p>
        <p className="text-sm text-ink-light mt-0.5">{value}</p>
      </div>
    </div>
  );
}
