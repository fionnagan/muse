"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, Camera, Link2, Sparkles, CheckCircle } from "lucide-react";

const PROCESSING_STEPS = [
  { label: "Ingesting screenshot", duration: 800 },
  { label: "Analysing UI composition", duration: 1000 },
  { label: "Classifying design style", duration: 900 },
  { label: "Extracting color palette", duration: 700 },
  { label: "Detecting components", duration: 800 },
  { label: "Inferring intent", duration: 600 },
  { label: "Generating embeddings", duration: 1000 },
  { label: "Building Design Memory Object", duration: 1200 },
];

type Phase = "idle" | "dragging" | "processing" | "done";

export default function UploadZone() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const router = useRouter();

  const startProcessing = useCallback(() => {
    setPhase("processing");
    setCurrentStep(0);
    setCompletedSteps([]);

    let step = 0;
    const runStep = () => {
      if (step >= PROCESSING_STEPS.length) {
        setPhase("done");
        setTimeout(() => router.push("/capture/confirm"), 1200);
        return;
      }
      setCurrentStep(step);
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step]);
        step++;
        runStep();
      }, PROCESSING_STEPS[step].duration);
    };
    runStep();
  }, [router]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setPhase("idle");
      startProcessing();
    },
    [startProcessing]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setPhase("dragging");
  };
  const handleDragLeave = () => setPhase("idle");
  const handleClick = () => {
    if (phase === "idle" || phase === "dragging") startProcessing();
  };

  if (phase === "processing" || phase === "done") {
    return (
      <div className="w-full max-w-md mx-auto">
        {/* Processing card */}
        <div
          className="bg-paper border border-sand rounded-[16px] p-8 space-y-5"
          style={{ boxShadow: "var(--shadow-float)" }}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="text-gold" size={22} />
            </div>
            <p
              className="font-display italic text-2xl text-ink"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {phase === "done" ? "Memory captured." : "Processing…"}
            </p>
            <p className="text-sm text-ink-light mt-1">
              {phase === "done"
                ? "Redirecting to your Design Memory Object"
                : "Muse is understanding your screenshot"}
            </p>
          </div>

          <div className="space-y-2">
            {PROCESSING_STEPS.map((step, i) => {
              const isCompleted = completedSteps.includes(i);
              const isCurrent = currentStep === i && phase === "processing";
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    isCompleted || isCurrent ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                    {isCompleted ? (
                      <CheckCircle size={14} className="text-sage" />
                    ) : isCurrent ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-sand-dark" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isCurrent
                        ? "text-ink font-medium"
                        : isCompleted
                        ? "text-ink-light line-through"
                        : "text-sand-dark"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-sand rounded-full h-1">
            <div
              className="bg-gold h-1 rounded-full transition-all duration-500"
              style={{
                width: `${
                  phase === "done"
                    ? 100
                    : (completedSteps.length / PROCESSING_STEPS.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-md mx-auto rounded-[16px] border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${
        phase === "dragging"
          ? "border-gold bg-gold/10 scale-[1.02]"
          : "border-sand hover:border-sand-dark hover:bg-sand/30"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <div
        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all ${
          phase === "dragging" ? "bg-gold text-cream scale-110" : "bg-sand text-ink-light"
        }`}
      >
        <Upload size={24} />
      </div>

      <p
        className="font-display italic text-2xl text-ink mb-2"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {phase === "dragging" ? "Release to capture" : "Drop your inspiration here"}
      </p>
      <p className="text-sm text-ink-light mb-6">
        Drag & drop, paste from clipboard, or click to browse
      </p>

      <div className="flex items-center justify-center gap-4">
        <button className="flex items-center gap-2 text-sm text-ink-light hover:text-ink px-3 py-1.5 rounded-full border border-sand hover:bg-sand transition-all">
          <Camera size={13} />
          Camera Roll
        </button>
        <button className="flex items-center gap-2 text-sm text-ink-light hover:text-ink px-3 py-1.5 rounded-full border border-sand hover:bg-sand transition-all">
          <Link2 size={13} />
          Paste URL
        </button>
      </div>

      <p className="text-[11px] text-sand-dark mt-6 tracking-widest font-mono">
        PNG · JPG · WEBP · HEIC
      </p>
    </div>
  );
}
