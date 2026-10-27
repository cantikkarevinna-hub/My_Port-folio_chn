"use client";

import { motion } from "framer-motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function IdCard() {
  return (
    <motion.div
      className="relative"
      animate={{ rotate: [-1, 1, -1.5, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "top center" }}
    >
      <div className="absolute left-1/2 top-[-60px] h-[120px] w-[4px] -translate-x-1/2 rounded-full bg-[#111111] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <div className="mt-[-8px] h-5 w-[24px] -translate-x-1/2 rounded-full border border-white/15 bg-[#111111] text-[8px] font-medium uppercase tracking-[0.34em] text-white/60" />
      </div>
      <div className="relative ml-4 mt-10 rounded-[26px] border-[10px] border-white bg-white p-3 shadow-[0_26px_60px_rgba(0,0,0,0.5)]">
        <div className="overflow-hidden rounded-[16px]">
          <ImagePlaceholder src="/images/hero-portrait.svg" alt="Chantikka portrait" title="hero-portrait.jpg · 3:4" aspectRatio="3 / 4" className="max-w-[300px]" />
        </div>
      </div>
    </motion.div>
  );
}
