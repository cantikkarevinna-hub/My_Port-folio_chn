"use client";

import { heroWords } from "@/data/content";
import IdCard from "@/components/IdCard";

export default function Hero() {
  return (
    <div className="grid items-center gap-8 py-4 md:min-h-[470px] md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-3 md:py-6">
      <div className="min-w-0 overflow-visible">
        <div className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#5c5c5c]">✦ OPEN FOR COLLABORATION</div>
        <h1 className="mt-4 w-max max-w-none overflow-visible whitespace-nowrap font-display text-[clamp(2.2rem,5.6vw,4.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em] md:mt-6">
          <span className="block w-max max-w-none overflow-visible whitespace-nowrap bg-gradient-to-r from-[#e6e6e6] via-[#bdbdbd] to-[#737373] bg-clip-text text-transparent">
            CHANTIKKA
          </span>
          <span className="block w-max max-w-none overflow-visible whitespace-nowrap bg-gradient-to-r from-[#e6e6e6] via-[#bdbdbd] to-[#737373] bg-clip-text text-transparent">
            REVINNA
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

      <div className="relative z-10 mt-8 flex min-w-0 justify-center py-2 md:mt-0 md:py-0">
        <IdCard />
      </div>
    </div>
  );
}
