import UploadZone from "@/components/UploadZone";
import { Sparkles } from "lucide-react";

export default function CapturePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold-dark text-xs tracking-widest font-mono px-3 py-1 rounded-full mb-6">
          <Sparkles size={10} />
          SMART COMPRESSION ENGINE
        </div>
        <h1
          className="font-display italic text-4xl sm:text-5xl text-ink mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Capture a screenshot.
          <br />
          <span className="text-gold">Muse remembers everything.</span>
        </h1>
        <p className="text-ink-light text-sm max-w-sm mx-auto leading-relaxed">
          Drop your inspiration below. Muse will extract its design DNA,
          classify its UI type, and build a reusable Design Memory Object.
        </p>
      </div>

      {/* Upload zone */}
      <UploadZone />

      {/* What happens next */}
      <div className="mt-12">
        <div className="ornate-divider mb-6">
          <span>✦ WHAT MUSE EXTRACTS ✦</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "UI Classification", desc: "Identifies onboarding, dashboard, form, etc." },
            { label: "Design Style", desc: "Whimsical, minimal, luxury, brutalist, and more." },
            { label: "Color Palette", desc: "Extracts every hex from the design." },
            { label: "Typography", desc: "Identifies and categorizes font choices." },
            { label: "UI Components", desc: "Maps every interactive element." },
            { label: "Semantic Tags", desc: "Infers meaning — high-trust, fintech, Gen Z…" },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="bg-paper border border-sand rounded-[10px] p-3"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <p className="text-xs font-medium text-ink mb-0.5">{label}</p>
              <p className="text-[11px] text-ink-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
