"use client";

import ImagePlaceholder from "@/components/ImagePlaceholder";
import Image from "next/image";

const plateStyle = {
  background: "linear-gradient(135deg,#e6e8eb 0%,#aeb3b9 35%,#737980 68%,#cbd0d5 100%)",
  border: "1px solid #f2f4f6",
  boxShadow: "inset 0 1px 5px rgba(255,255,255,.55), inset 0 -3px 6px rgba(0,0,0,.45), 0 18px 34px rgba(0,0,0,.48)",
} as const;

const panelDetails = [
  ["ID NUMBER", "CR-0001"],
  ["FIELD", "LIFETIME"],
  ["ISSUE DATE", "8329"],
];

export default function CardFallback() {
  return (
    <div
      className="relative select-none"
      style={{ width: "min(100%, 48vh, 426.67px)", height: "auto", aspectRatio: "2 / 3", perspective: 1000 }}
      aria-label="Silver portrait card"
    >
      <div className="absolute -inset-y-[12%] -inset-x-[8%] rounded-full blur-2xl" style={{ background: "radial-gradient(ellipse,var(--accent-glow),transparent 68%)", opacity: 0.12 }} />
      <div className="absolute inset-0" style={{ ...plateStyle, clipPath: "polygon(5% 8.33%,11% 4.33%,37% 4.33%,40% 2.33%,82.5% 2.33%,82.5% 78.33%,5% 78.33%,5% 55%,2.5% 53.33%,2.5% 35.83%,5% 34.17%)" }} />
      <div className="absolute left-[11.5%] top-[7.67%] w-[68%] overflow-hidden border border-white/60" style={{ ...plateStyle, aspectRatio: "5 / 8", borderTopLeftRadius: 28 }}>
        <div className="absolute inset-[3%] border border-black/40 bg-[#111]">
          <ImagePlaceholder alt="Hero Portrait placeholder" title="Hero Portrait · 5:8" aspectRatio="5 / 8" rounded="rounded-none" className="h-full w-full" />
        </div>
        <span className="absolute bottom-[5%] left-0 top-[10%] w-[2px]" style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent-glow)" }} />
        <span className="absolute left-0 top-0 h-[11%] w-[16%] rounded-tl-[28px] border-l border-t border-[var(--accent)]" style={{ boxShadow: "-2px -2px 8px var(--accent-glow)" }} />
      </div>
      <div className="absolute left-[74%] top-[2%] h-[96.3%] w-[24%]" style={{ ...plateStyle, clipPath: "polygon(0 0,75% 0,100% 3.8%,100% 95.2%,75% 100%,22.9% 100%,0 95.85%)" }}>
        <span className="absolute left-[79%] top-[6.5%] text-[clamp(7px,1vw,12px)] text-[#4c5158]">✦</span>
        <div className="absolute left-[42.7%] top-[9.3%] bottom-[41.5%] flex w-[57.3%] flex-col justify-between font-mono text-[clamp(4px,.55vw,7px)] font-bold text-[#5d636a]">
          {panelDetails.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[25.45%_1fr] items-start whitespace-nowrap">
              <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{label}</span>
              <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-[76.25%] top-[82.67%] h-[10%] w-[19.5%] rounded-[4px] border border-white/55 bg-[#0b0b0c] p-[1%] shadow-[inset_0_0_0_1px_#555b62,0_1px_4px_rgba(0,0,0,.6)]">
        <Image
          src="/images/chip-card.png"
          alt="Gold card chip"
          width={360}
          height={264}
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>
      <div className="absolute left-[1.5%] top-[75%] h-[21.67%] w-[69%]" style={{ ...plateStyle, clipPath: "polygon(0 10%,19.6% 10%,23.9% 0,66.7% 0,71% 10%,88.4% 10%,100% 37%,100% 94%,92.8% 100%,5.1% 100%,0 90%)" }}>
        <span className="absolute left-[7.8%] top-[18.5%] font-mono text-[clamp(5px,.65vw,9px)] font-bold uppercase tracking-[.14em] text-[#555b62]">NAME</span>
        <strong className="absolute left-[7.8%] top-[43.1%] max-w-[37.5%] -translate-y-1/2 whitespace-nowrap font-display text-[clamp(8px,1vw,14px)] leading-none tracking-tight text-[#3d4248]">CHANTIKKA</strong>
        <span className="absolute left-[7.8%] top-[58.5%] h-px w-[50%] bg-[#8d939a]" />
        <span className="absolute left-[7.8%] top-[69.2%] whitespace-nowrap font-mono text-[clamp(5px,.65vw,9px)] font-bold uppercase tracking-[.1em] text-[#555b62]">NATURE · ART · DESIGN</span>
      </div>
      <span className="absolute left-[15.5%] top-[6%] h-[1.6%] w-[1.6%] rounded-full border border-white/80 bg-[#24282d] shadow-[inset_0_0_0_1px_#050607,0_0_0_1px_rgba(0,0,0,.7)]" />
      <span className="absolute left-[19%] top-[6%] h-[1.6%] w-[1.6%] rounded-full border border-white/80 bg-[#24282d] shadow-[inset_0_0_0_1px_#050607,0_0_0_1px_rgba(0,0,0,.7)]" />
      <span className="absolute left-[8.5%] top-[94.5%] h-[1.6%] w-[1.6%] rounded-full border border-white/80 bg-[#24282d] shadow-[inset_0_0_0_1px_#050607,0_0_0_1px_rgba(0,0,0,.7)]" />
      <span className="absolute left-[12%] top-[94.5%] h-[1.6%] w-[1.6%] rounded-full border border-white/80 bg-[#24282d] shadow-[inset_0_0_0_1px_#050607,0_0_0_1px_rgba(0,0,0,.7)]" />
    </div>
  );
}
