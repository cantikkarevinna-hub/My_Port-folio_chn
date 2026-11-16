"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/content";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = menuTrigger.current;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => closeButton.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab" || !menuPanel.current) return;
      const focusable = [...menuPanel.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-[calc(env(safe-area-inset-top)+1rem)] z-40 px-3 md:top-4 md:px-8">
      <div className="mx-auto max-w-6xl rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl">
        <nav className="flex items-center justify-between gap-4">
          <a href="#home" className="inline-flex min-h-11 shrink-0 items-center font-mono text-[10px] tracking-[0.08em] text-white/80 hover:text-white md:min-h-0 md:text-[11px]">
            chantikka.art
          </a>
          <div className="hidden items-center gap-2 sm:gap-4 md:flex md:gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap font-mono text-[8px] tracking-[0.04em] transition sm:text-[10px] md:text-[11px] md:tracking-[0.08em] ${activeSection === item.href ? "text-white" : "text-[#8a8a8a] hover:text-white/90"}`}
              >
                {item.label}
                {activeSection === item.href && <span className="mt-1 block h-px w-full bg-white" />}
              </a>
            ))}
          </div>
          <button
            ref={menuTrigger}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:bg-white/10 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </header>
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-y-0 left-0 z-[80] w-screen bg-black/75 backdrop-blur-md md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setMenuOpen(false); }}
          onKeyDown={(event) => { if (event.key === "Escape") setMenuOpen(false); }}
        >
          <motion.div
            ref={menuPanel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] top-[calc(env(safe-area-inset-top)+0.75rem)] flex flex-col rounded-[24px] border border-white/10 bg-[#0d0d0d] px-5 pb-5 pt-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <span className="font-mono text-xs tracking-[0.08em] text-white/80">chantikka.art</span>
              <button
                ref={closeButton}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup menu navigasi"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/80 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Navigasi utama" className="flex flex-1 flex-col justify-center gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035 }}
                  aria-current={activeSection === item.href ? "location" : undefined}
                  className={`flex min-h-14 items-center justify-between border-b border-white/8 py-3 font-display text-2xl ${activeSection === item.href ? "text-white" : "text-white/55"}`}
                >
                  {item.label}
                  <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
