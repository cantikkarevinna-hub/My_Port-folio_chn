"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { WorkPage } from "@/lib/portfolio-types";

export default function ModalCarousel({ pages, title, index, onChange, onZoom }: { pages: WorkPage[]; title: string; index: number; onChange: (index: number) => void; onZoom?: () => void }) {
  const reducedMotion = useReducedMotion();
  const page = pages[index];
  const move = (delta: number) => onChange((index + delta + pages.length) % pages.length);

  return (
    <div className="min-w-0">
      <div className="relative overflow-hidden rounded-[16px] border border-white/8 bg-[#111]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={page.title}
            initial={{ opacity: 0, x: reducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reducedMotion ? 0 : -24 }}
            transition={{ duration: 0.25 }}
            drag={pages.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onClick={pages.length === 1 ? onZoom : undefined}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) move(1);
              else if (info.offset.x > 60) move(-1);
            }}
            className={pages.length === 1 && onZoom ? "cursor-zoom-in" : "cursor-grab active:cursor-grabbing"}
          >
            <ImagePlaceholder
              src={page.src}
              alt={`${title}, ${page.title}`}
              title={page.title}
              aspectRatio="16 / 9"
              rounded="rounded-none"
            />
          </motion.div>
        </AnimatePresence>
        {pages.length > 1 && (
          <>
            <button type="button" onClick={() => move(-1)} aria-label="Halaman sebelumnya" className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white sm:h-9 sm:w-9">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Halaman berikutnya" className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white sm:h-9 sm:w-9">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#8a8a8a]">
        <span>{page.caption ?? page.title}</span>
        <span>{index + 1} / {pages.length}</span>
      </div>
      {pages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {pages.map((item, pageIndex) => (
            <button
              key={item.title}
              type="button"
              onClick={() => onChange(pageIndex)}
              aria-label={`Buka ${item.title}`}
              aria-current={pageIndex === index}
              className={`w-20 shrink-0 overflow-hidden rounded-lg border ${pageIndex === index ? "border-white/60" : "border-white/10 opacity-60 hover:opacity-100"}`}
            >
              <ImagePlaceholder src={item.src} alt="" title={`${pageIndex + 1}`} aspectRatio="16 / 9" rounded="rounded-none" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
