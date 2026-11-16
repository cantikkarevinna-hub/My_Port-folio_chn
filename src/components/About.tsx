"use client";

import { ArrowUpRight, FileDown } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { profileContent } from "@/data/content";

export default function About() {
  return (
    <div className="grid grid-cols-1 items-center gap-7 py-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
      <div className="order-2 md:order-1">
        <div className="font-display text-xl tracking-[-0.06em] text-white md:text-lg">About Me</div>
        <h2 className="mt-4 w-max max-w-full font-display text-[clamp(2rem,9vw,4.2rem)] font-bold uppercase leading-[0.88] tracking-[-0.055em] md:text-[clamp(2.2rem,.6vw,4.2rem)]">
          <span className="block bg-gradient-to-r from-[#e6e6e6] via-[#bdbdbd] to-[#737373] bg-clip-text text-transparent">
            {profileContent.name.split("\n")[0]}
          </span>
          <span className="block bg-gradient-to-r from-[#e6e6e6] via-[#bdbdbd] to-[#737373] bg-clip-text text-transparent">
            {profileContent.name.split("\n").slice(1).join("\n")}
          </span>
        </h2>
        {profileContent.aboutParagraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-xl text-base leading-7 text-[#8a8a8a]">{paragraph}</p>
        ))}
        <div className="mt-6 inline-flex max-w-full rounded-full border border-white/10 bg-white/[0.02] px-4 py-3 text-sm italic text-[#d4d4d4]">
          “{profileContent.aboutQuote}”
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a href="#" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-white px-5 py-3 text-sm font-medium text-black sm:w-auto">
            <FileDown className="h-4 w-4" /> Download CV
          </a>
          <a href="#portfolio" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-white/12 px-5 py-3 text-sm font-medium text-white sm:w-auto">
            View Projects <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="order-1 flex flex-col items-center md:order-2">
        <div className="relative">
          <div className="absolute inset-[-18px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_62%)] blur-2xl" />
          <div className="relative h-[min(72vw,280px)] w-[min(72vw,280px)] overflow-hidden rounded-full border border-white/10 bg-[#101010] shadow-[0_0_55px_rgba(255,255,255,0.06)]">
            <ImagePlaceholder src={profileContent.aboutPortrait} alt="Chantikka portrait profile" title="about-portrait.jpg · 1:1" aspectRatio="1 / 1" className="h-full w-full rounded-full grayscale-[1] contrast-125" />
          </div>
        </div>
      </div>
    </div>
  );
}
