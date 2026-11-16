"use client";

import { motion } from "framer-motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { ShowcaseWork } from "@/lib/portfolio-types";

function WorkFrame({ children, index, className = "" }: { children: React.ReactNode; index: number; className?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 5) * 0.04 }}
      className={`group overflow-hidden rounded-[20px] border border-white/8 bg-[#181818]/80 transition duration-300 hover:-translate-y-1 hover:border-white/15 ${className}`}
    >
      {children}
    </motion.article>
  );
}

export default function WorkCard({ item, index, onOpen }: { item: ShowcaseWork; index: number; onOpen: (item: ShowcaseWork) => void }) {
  const source = item.cover;
  const pages = item.pages.length || (item.category === "web" ? 4 : item.category === "slides" ? 6 : 1);
  const openButton = (children: React.ReactNode, label = `Buka ${item.title}`) => (
    <button type="button" onClick={() => onOpen(item)} className="block w-full text-left" aria-label={label}>{children}</button>
  );

  if (item.category === "web") {
    // STYLE: browser mockup + metadata; data: content/portfolio/web.ts.
    return (
      <WorkFrame index={index} className="p-3">
        {openButton(
          <>
            <div className="mb-2 flex h-8 items-center gap-1.5 rounded-t-[12px] border border-white/8 bg-[#202020] px-3">
              <i className="h-2 w-2 rounded-full bg-white/25" /><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-2 h-3 flex-1 rounded-full bg-black/25" />
            </div>
            <div className="relative overflow-hidden rounded-b-[12px]">
              <ImagePlaceholder src={source} alt={item.title} title={`${item.title} · 1600×1000 · 16:10`} aspectRatio="16 / 10" rounded="rounded-none" className="transition duration-500 group-hover:scale-[1.02]" />
              {item.team ? <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/65 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white">Team Project</span> : null}
            </div>
          </>,
        )}
        <div className="space-y-3 px-1 pb-1 pt-4">
          <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-semibold text-white">{item.title}</h3><span className="shrink-0 rounded-full border border-white/10 px-2 py-1 font-mono text-[9px] text-[#aaa]">{pages} pages</span></div>
          <p className="line-clamp-2 min-h-12 text-sm leading-6 text-[#888]">{item.description}</p>
          <div className="flex flex-wrap gap-2">{item.tools?.map((tool) => <span key={tool} className="rounded-full border border-white/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#999]">{tool}</span>)}</div>
        </div>
      </WorkFrame>
    );
  }

  if (item.category === "slides") {
    // STYLE: layered 16:9 presentation preview; data: content/portfolio/slides.ts.
    return (
      <WorkFrame index={index} className="p-3 pt-5">
        {openButton(
          <div className="relative mx-3 mb-4">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[12px] border border-white/8 bg-[#202020]" />
            <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-[12px] border border-white/10 bg-[#1e1e1e]" />
            <div className="relative overflow-hidden rounded-[12px]">
              <ImagePlaceholder src={source} alt={item.title} title={`${item.title} · 1920×1080 · 16:9`} aspectRatio="16 / 9" rounded="rounded-none" />
            </div>
          </div>,
        )}
        <div className="flex items-center justify-between gap-2 px-1 pb-1">
          <div className="min-w-0"><span className="font-mono text-[9px] uppercase tracking-wider text-[#888]">{item.kind === "brand-guideline" ? "Brand Guideline" : "PPT Design"}</span><h3 className="mt-1 truncate font-medium text-white">{item.title}</h3></div>
          <span className="shrink-0 rounded-full border border-white/10 px-2 py-1 font-mono text-[9px] text-[#aaa]">{pages} slides</span>
        </div>
      </WorkFrame>
    );
  }

  if (item.category === "logo") {
    // STYLE: square minimal logo tile; data: content/portfolio/logo.ts.
    return (
      <WorkFrame index={index}>
        {openButton(<div className="p-3">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[14px] bg-[#111] transition duration-300 group-hover:bg-[#202020]">
            <ImagePlaceholder src={source} alt={item.title} title={`${item.title} · 1200×1200 · 1:1`} aspectRatio="1 / 1" rounded="rounded-none" className="w-full transition duration-500 group-hover:scale-105" />
          </div>
          <h3 className="mt-3 truncate text-center text-xs uppercase tracking-[0.12em] text-[#bbb]">{item.title}</h3>
        </div>)}
      </WorkFrame>
    );
  }

  if (item.category === "poster") {
    // STYLE: mixed-ratio masonry poster tile; data: content/portfolio/poster.ts.
    const ratio = index % 2 === 0 ? "4 / 5" : "3 / 4";
    return (
      <WorkFrame index={index}>
        {openButton(<div className="relative overflow-hidden">
          <ImagePlaceholder src={source} alt={item.title} title={`${item.title} · ${ratio}`} aspectRatio={ratio} rounded="rounded-none" className="transition duration-500 group-hover:scale-[1.03]" />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-4 pt-12 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <h3 className="font-medium text-white">{item.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-white/70">{item.description}</p>
          </div>
          <span className="sr-only">{item.title}</span>
        </div>)}
      </WorkFrame>
    );
  }

  // STYLE: typography-only writing card; data: content/portfolio/writing.ts.
  const typeLabel = item.writing?.type === "puisi" ? "Puisi" : item.writing?.type === "kalimat-kiasan" ? "Kalimat Kiasan" : "Tulisan";
  return (
    <WorkFrame index={index} className="p-5">
      {openButton(
        <div className="min-h-48">
          <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#aaa]">{typeLabel}</span>
          <h3 className="mt-5 font-display text-xl text-white">{item.title}</h3>
          <p className="mt-3 line-clamp-3 whitespace-pre-line font-serif text-base italic leading-7 text-[#aaa]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>{item.writing?.body}</p>
          <p className="mt-5 font-mono text-[10px] text-[#777]">{item.writing?.date ?? item.year}</p>
        </div>,
      )}
    </WorkFrame>
  );
}
