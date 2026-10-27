"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Link2, Code2, Sparkles } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { ProjectItem } from "@/data/content";

export default function ProjectDetail({ item }: { item: ProjectItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <Link href="/#portfolio" className="inline-flex items-center gap-2 text-sm text-[#8a8a8a] transition hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="font-display text-4xl leading-none tracking-[-0.06em] text-white md:text-6xl">{item.title}</h1>
          <div className="mt-5 h-px w-28 bg-white/20" />
          <p className="mt-6 max-w-xl text-base leading-7 text-[#8a8a8a]">{item.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] border border-white/8 bg-[#181818]/80 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8a8a]">Tools Used</div>
              <div className="mt-3 text-2xl font-semibold text-white">{item.tools.length}</div>
            </div>
            <div className="rounded-[18px] border border-white/8 bg-[#181818]/80 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8a8a]">Highlights</div>
              <div className="mt-3 text-2xl font-semibold text-white">{item.highlights.length}</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {item.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-transparent px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button type="button" disabled className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white/60">
              <Link2 className="h-4 w-4" /> No Link
            </button>
            <button type="button" disabled className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white/60">
              <Code2 className="h-4 w-4" /> No Source
            </button>
          </div>
        </div>

        <div>
          <button type="button" onClick={() => setOpen(true)} className="block w-full overflow-hidden rounded-[22px] border border-white/8 bg-[#181818]/80 p-2 text-left">
            <ImagePlaceholder src={item.image} alt={item.title} title={item.title} aspectRatio="16 / 9" className="rounded-[16px]" />
          </button>

          <div className="mt-6 rounded-[20px] border border-white/8 bg-[#181818]/80 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4 text-[#c084fc]" /> Highlights
            </div>
            <ul className="space-y-3 text-sm leading-6 text-[#8a8a8a]">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#c084fc]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="relative w-full max-w-4xl rounded-[24px] border border-white/12 bg-[#f5f5f5] p-3 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="absolute -right-4 -top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-medium text-black" onClick={() => setOpen(false)} aria-label="Close preview">×</button>
            <ImagePlaceholder src={item.image} alt={item.title} title={item.title} aspectRatio="16 / 9" className="rounded-[18px]" />
          </div>
        </div>
      )}
    </div>
  );
}
