import type { Metadata } from "next";
import { Inter, Space_Mono, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["700", "800"] });
const spaceMono = Space_Mono({ subsets: ["latin"], variable: "--font-space-mono", weight: ["400", "700"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Chantikka Revinna | Visual Storyteller",
  description: "Portfolio for Chantikka Revinna, artist, designer, and nature photographer.",
  openGraph: {
    title: "Chantikka Revinna | Visual Storyteller",
    description: "Portfolio for Chantikka Revinna, artist, designer, and nature photographer.",
    images: ["/images/og-image.svg"],
  },
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${syne.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
