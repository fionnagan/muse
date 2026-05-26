import Link from "next/link";
import { Camera, ArrowRight, Sparkles, Archive, Wand2 } from "lucide-react";
import { MOCK_DMOS } from "@/lib/mock-data";
import DMOCard from "@/components/DMOCard";

const STATS = [
  { value: "12", label: "Memories" },
  { value: "4", label: "Projects" },
  { value: "3", label: "Compressed" },
  { value: "96%", label: "Avg. confidence" },
];

const FEATURES = [
  {
    icon: Sparkles,
    color: "bg-gold/20 text-gold",
    title: "Smart Compression",
    desc: "Extract semantic meaning from screenshots. Safely delete the raw image. Preserve everything that matters.",
  },
  {
    icon: Wand2,
    color: "bg-lilac-light text-lilac-dark",
    title: "Design DNA Kit",
    desc: "Every screenshot becomes a reusable design system — color tokens, typography, spacing, components.",
  },
  {
    icon: Archive,
    color: "bg-sage-light text-sage-dark",
    title: "Semantic Search",
    desc: 'Ask in plain English. "Show me fintech onboarding with warm tones." Muse finds it instantly.',
  },
];

export default function HomePage() {
  const recent = MOCK_DMOS.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 h-48 rounded-full bg-rose-light/30 blur-3xl" />
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-blue-light/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-80 h-40 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold-dark text-xs tracking-widest font-mono px-3 py-1 rounded-full mb-8">
            <Sparkles size={10} />
            AI DESIGN INTELLIGENCE
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl text-ink leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your taste,{" "}
            <em className="text-rose not-italic">remembered</em>
            <br />
            and{" "}
            <em className="text-gold not-italic">activated.</em>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-xl mx-auto mb-10 leading-relaxed">
            Muse transforms screenshots into structured design memory. Compress
            the clutter. Rediscover your inspiration. Apply it inside Figma.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/capture"
              className="flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full font-medium text-sm hover:bg-ink-light transition-colors"
            >
              <Camera size={15} />
              Capture a screenshot
            </Link>
            <Link
              href="/library"
              className="flex items-center gap-2 border border-sand text-ink px-6 py-3 rounded-full font-medium text-sm hover:bg-sand transition-colors"
            >
              View your library
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-sand bg-cream-dark/50">
        <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-4 divide-x divide-sand">
          {STATS.map(({ value, label }) => (
            <div key={label} className="px-4 text-center">
              <div
                className="font-display text-3xl text-ink"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {value}
              </div>
              <div className="text-[11px] tracking-widest text-sand-dark font-mono uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent captures */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="font-display italic text-2xl text-ink"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Recent memories
          </h2>
          <Link
            href="/library"
            className="text-sm text-gold hover:text-gold-dark flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recent.map((dmo) => (
            <DMOCard key={dmo.id} dmo={dmo} />
          ))}
        </div>
      </section>

      {/* Feature pillars */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="ornate-divider mb-12">
          <span>✦ TWO KILLER FEATURES ✦</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, color, title, desc }) => (
            <div
              key={title}
              className="bg-paper border border-sand rounded-[12px] p-6 frame-corner"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mb-4`}
              >
                <Icon size={18} />
              </div>
              <h3
                className="font-display text-lg text-ink mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {title}
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote strip */}
      <section className="bg-ink text-cream py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p
            className="font-display italic text-2xl sm:text-3xl leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;Your inspiration is preserved,
            <br />
            but your clutter is{" "}
            <span className="text-gold">gone.</span>&rdquo;
          </p>
          <p className="text-sand mt-4 text-sm tracking-widest font-mono">
            — MUSE SMART COMPRESSION ENGINE
          </p>
        </div>
      </section>
    </div>
  );
}
