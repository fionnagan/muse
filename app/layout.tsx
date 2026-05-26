import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muse — AI Design Memory",
  description: "Transform screenshots into structured design intelligence.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-sand py-6 text-center text-xs text-sand-dark tracking-widest font-sans">
          <span className="font-display italic text-gold">Muse</span>
          <span className="mx-2 text-sand-dark">—</span>
          Your AI Design Intelligence
        </footer>
      </body>
    </html>
  );
}
