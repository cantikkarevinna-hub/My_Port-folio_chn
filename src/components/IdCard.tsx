"use client";

import { motion } from "framer-motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { profileContent } from "@/data/content";

export default function IdCard() {
  return (
    <motion.div
      className="relative cursor-grab active:cursor-grabbing"
      animate={{ rotate: [-1, 1, -1.5, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "top center" }}
      drag
      dragConstraints={{ left: -32, right: 32, top: 0, bottom: 24 }}
      dragElastic={0.18}
      dragTransition={{ bounceStiffness: 220, bounceDamping: 18 }}
    >
      <div className="absolute left-1/2 top-[-78px] flex h-[138px] w-[12px] -translate-x-1/2 flex-col items-center overflow-hidden rounded-full bg-[#111111] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <span className="mt-2 rotate-90 whitespace-nowrap font-mono text-[7px] tracking-[0.2em] text-white/35">CHANTIKKA · CHANTIKKA</span>
        <span className="absolute bottom-[-2px] h-5 w-7 rounded-full border border-white/15 bg-[#111111]" />
      </div>
      <div className="relative ml-4 mt-10 rounded-[26px] border-[10px] border-white bg-white p-3 shadow-[0_26px_60px_rgba(0,0,0,0.5)]">
        <div className="overflow-hidden rounded-[16px]">
          <ImagePlaceholder src={profileContent.heroPortrait} alt="Chantikka portrait" title="hero-portrait.jpg · 3:4" aspectRatio="3 / 4" className="w-[min(70vw,300px)] grayscale-[1] contrast-125" />
        </div>
      </div>
    </motion.div>
  );
}
