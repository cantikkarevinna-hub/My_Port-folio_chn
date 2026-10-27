"use client";

import { heroWords } from "@/data/content";
import IdCard from "@/components/IdCard";

export default function Hero() {
  return (
    <div className="grid items-center gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-20">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#5c5c5c]">✦ OPEN FOR COLLABORATION</div>
        <h1 className="mt-6 font-display text-[3.1rem] leading-[0.95] tracking-[-0.06em] text-white md:text-[5.5rem] lg:text-[6.2rem]">
          <span className="block">Visual</span>
          <span className="block bg-gradient-to-r from-[#d4d4d4] via-[#8a8a8a] to-[#5a5a5a] bg-clip-text text-transparent">
            Storyteller
          </span>
        </h1>

        <div className="mt-6 flex min-h-[26px] items-center gap-2 text-lg text-white/80 md:text-2xl">
          <span className="font-medium text-white/60">I am</span>
          <span className="font-medium text-white">{heroWords[0]}</span>
          <span className="inline-block animate-pulse text-white/70">_</span>
        </div>

        <p className="mt-6 max-w-xl text-base leading-7 text-[#8a8a8a] md:text-lg">
          Mengabadikan keindahan alam lewat lensa dan mengubah ide menjadi karya visual yang bermakna. Seni, desain, dan fotografi dalam satu cerita.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {['Photography', 'Art & Design', 'Nature'].map((item) => (
            <span key={item} className="rounded-full border border-white/12 bg-white/[0.02] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 space-y-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8a8a8a]">
          <div className="inline-flex items-center gap-2">↓ explore my work below</div>
          <div className="inline-flex items-center gap-2">↗ open for collaboration & commissions</div>
        </div>
      </div>

      <div className="relative flex justify-center py-8 md:py-0">
        <IdCard />
      </div>
    </div>
  );
}
