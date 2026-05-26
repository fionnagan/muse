import { Calendar, Clock, Users, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TODAY_EVENTS, EVENT_TYPE_STYLES } from "@/lib/mock-calendar";
import DMOCard from "@/components/DMOCard";

export default function ContextPage() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const totalInspirations = TODAY_EVENTS.reduce(
    (sum, e) => sum + e.relatedDMOs.length,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="inline-flex items-center gap-2 bg-lilac-light/60 border border-lilac/40 text-lilac-dark text-xs tracking-widest font-mono px-3 py-1 rounded-full mb-3">
            <Calendar size={10} />
            CONTEXT ENGINE
          </div>
          <h1
            className="font-display italic text-3xl sm:text-4xl text-ink"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {dateStr}
          </h1>
          <p className="text-ink-light text-sm mt-1">
            Muse found{" "}
            <span className="font-medium text-ink">{totalInspirations} relevant inspirations</span>{" "}
            for your day.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs font-mono text-sand-dark tracking-widest">SYNCED</p>
          <p className="text-xs text-sand-dark mt-0.5">Google Calendar</p>
        </div>
      </div>

      <div className="ornate-divider my-5">
        <span>✦</span>
      </div>

      {/* Events */}
      <div className="space-y-10">
        {TODAY_EVENTS.map((event) => {
          const typeStyle = EVENT_TYPE_STYLES[event.type];
          const isToday = !event.time.startsWith("Tomorrow");

          return (
            <section key={event.id}>
              {/* Event header card */}
              <div
                className="bg-paper border border-sand rounded-[12px] p-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full border uppercase ${typeStyle}`}
                    >
                      {event.type}
                    </span>
                    {!isToday && (
                      <span className="text-[10px] text-sand-dark font-mono">Tomorrow</span>
                    )}
                  </div>
                  <h2
                    className="font-display text-xl text-ink"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {event.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-ink-light">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {event.time} · {event.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={11} />
                      {event.attendees.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Inspiration count pill */}
                <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 self-start sm:self-center">
                  <Sparkles size={12} className="text-gold" />
                  <div>
                    <p className="text-sm font-semibold text-ink leading-none">
                      {event.relatedDMOs.length}
                    </p>
                    <p className="text-[10px] text-gold-dark font-mono leading-tight">
                      relevant saves
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification banner */}
              <div className="mb-4 bg-ink/4 border border-sand rounded-[10px] px-4 py-2.5 flex items-center gap-2">
                <Sparkles size={12} className="text-gold flex-shrink-0" />
                <p className="text-xs text-ink-light leading-snug">
                  You saved{" "}
                  <span className="font-medium text-ink">
                    {event.relatedDMOs.length} {event.project} inspiration
                    {event.relatedDMOs.length !== 1 ? "s" : ""}
                  </span>{" "}
                  — surfaced because of your{" "}
                  <span className="italic">{event.title}</span>.
                </p>
              </div>

              {/* DMO grid */}
              {event.relatedDMOs.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {event.relatedDMOs.map((dmo) => (
                    <DMOCard key={dmo.id} dmo={dmo} />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-sand rounded-[12px]">
                  <p className="text-sm text-ink-light italic">
                    No saved inspirations for this project yet.
                  </p>
                  <Link
                    href="/capture"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-gold hover:text-gold-dark transition-colors"
                  >
                    Capture some now <ArrowRight size={11} />
                  </Link>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Weekly digest teaser */}
      <div className="mt-12 bg-ink text-cream rounded-[12px] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-widest text-sand mb-1">WEEKLY DIGEST</p>
          <p
            className="font-display italic text-xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your design week in review.
          </p>
          <p className="text-sm text-sand mt-1">
            12 new memories · 3 forgotten gems resurfaced · 2 clusters identified
          </p>
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 bg-gold text-cream text-sm px-4 py-2 rounded-full hover:bg-gold-dark transition-colors font-medium">
          View digest <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
