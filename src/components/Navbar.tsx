"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/content";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[];

    const handler = () => {
      let current = "#home";
      let smallestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - 120);
        if (distance < smallestDistance) {
          current = `#${section.id}`;
          smallestDistance = distance;
        }
      });

      setActiveSection(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="sticky top-4 z-40 px-4 md:px-8">
      <div className="mx-auto max-w-6xl rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl">
        <nav className="flex items-center justify-between gap-4">
          <a href="#home" className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white">
            chantikka.art
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] transition ${activeSection === item.href ? "text-white" : "text-[#8a8a8a] hover:text-white/90"}`}
              >
                {item.label}
                {activeSection === item.href && <span className="mt-1 block h-px w-full bg-white" />}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
