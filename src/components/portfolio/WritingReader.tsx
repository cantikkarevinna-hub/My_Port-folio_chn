"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ShowcaseWork } from "@/lib/portfolio-types";

function kindLabel(kind?: string) {
  if (kind === "puisi") return "Puisi";
  if (kind === "kalimat-kiasan") return "Kalimat Kiasan";
  return "Tulisan";
}

export default function WritingReader({
  works,
  index,
  onChange,
}: {
  works: ShowcaseWork[];
  index: number;
  onChange: (index: number) => void;
}) {
  const work = works[index];
  const reducedMotion = useReducedMotion();
  const move = (delta: number) => onChange((index + delta + works.length) % works.length);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-6 py-10 text-center">
      <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#aaa]">{kindLabel(work.writing?.type)}</span>
      <motion.div
        key={work.slug}
        initial={{ opacity: 0, x: reducedMotion ? 0 : 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        drag={works.length > 1 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) move(1);
          else if (info.offset.x > 60) move(-1);
        }}
        className="mt-6 w-full"
      >
        <h2 className="font-display text-3xl tracking-[-0.04em] text-white sm:text-4xl">{work.title}</h2>
        <p className="mt-2 text-sm text-[#777]">{work.writing?.date ?? work.year}</p>
        <blockquote className="mt-8 whitespace-pre-line font-serif text-xl italic leading-relaxed text-[#d0d0d0] sm:text-2xl" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{work.writing?.body}</blockquote>
      </motion.div>
      {works.length > 1 && (
        <div className="mt-10 flex items-center gap-5">
          <button type="button" onClick={() => move(-1)} aria-label="Tulisan sebelumnya" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 p-2 text-white/70 hover:text-white sm:h-9 sm:w-9"><ChevronLeft className="h-5 w-5" /></button>
          <span className="font-mono text-xs text-[#777]">{index + 1} / {works.length}</span>
          <button type="button" onClick={() => move(1)} aria-label="Tulisan berikutnya" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 p-2 text-white/70 hover:text-white sm:h-9 sm:w-9"><ChevronRight className="h-5 w-5" /></button>
        </div>
      )}
    </div>
  );
}
