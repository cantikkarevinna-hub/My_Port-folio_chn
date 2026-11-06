"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { ProjectItem } from "@/data/content";

export default function ProjectCard({ item, index = 0 }: { item: ProjectItem; index?: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: index * 0.08 }} className="group rounded-[20px] border border-white/8 bg-[#181818]/80 p-3 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#1b1b1b]">
        <div className="mb-4 overflow-hidden rounded-[14px]">
          <button type="button" className="block w-full text-left" onClick={() => setLightboxOpen(true)} aria-label={`Open ${item.title} image`}>
            <ImagePlaceholder src={item.image} alt={item.title} title={`${item.title} · 16:10`} aspectRatio="16 / 10" className="grayscale-[0.15] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex flex-col gap-3 px-1 pb-1">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="line-clamp-2 text-sm leading-6 text-[#8a8a8a]">{item.description}</p>
          <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5c5c5c]">No Link</span>
            <Link href={`/portfolio/${item.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80">
              Details <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </motion.article>
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} image preview`}
        >
          <div className="relative w-full max-w-5xl rounded-[24px] border border-white/12 bg-[#f5f5f5] p-3 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black" onClick={() => setLightboxOpen(false)} aria-label="Close preview">
              <X className="h-5 w-5" />
            </button>
            <ImagePlaceholder src={item.image} alt={item.title} title={`${item.title} · 16:10`} aspectRatio="16 / 10" className="rounded-[18px]" />
          </div>
        </div>
      )}
    </>
  );
}
