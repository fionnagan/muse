"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Library, Search, Sparkles, CalendarDays, Trash2 } from "lucide-react";

const NAV = [
  { href: "/library", label: "Library", icon: Library },
  { href: "/capture", label: "Capture", icon: Camera },
  { href: "/search", label: "Search", icon: Search },
  { href: "/context", label: "Today", icon: CalendarDays },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="w-7 h-7 rounded-full bg-gold flex items-center justify-center">
            <Sparkles size={13} className="text-cream" />
          </span>
          <span
            className="font-display italic text-xl text-ink leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Muse
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/capture" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all ${
                  active
                    ? "bg-ink text-cream"
                    : "text-ink-light hover:bg-sand hover:text-ink"
                }`}
              >
                <Icon size={13} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}

          {/* Declutter — subtle icon-only link */}
          <Link
            href="/declutter"
            title="Memory Audit"
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ml-1 ${
              pathname.startsWith("/declutter")
                ? "bg-rose-light text-rose-dark"
                : "text-sand-dark hover:bg-sand hover:text-ink-light"
            }`}
          >
            <Trash2 size={13} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
