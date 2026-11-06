"use client";

import { ArrowUpRight, Camera, FileDown, Palette } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import StatCard from "@/components/StatCard";
import { aboutStats, profileContent } from "@/data/content";

const icons = [<Camera key="photos" className="h-4 w-4" />, <Palette key="designs" className="h-4 w-4" />, <Camera key="cameras" className="h-4 w-4" />];

export default function About() {
  return (
    <div className="grid items-center gap-10 py-8 md:grid-cols-[1.15fr_0.85fr]">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#8a8a8a]">ABOUT ME</div>
        <h2 className="mt-4 font-display text-[2.8rem] leading-[0.9] tracking-[-0.06em] text-white md:text-[4.2rem]">
          {profileContent.name.split(" ").slice(0, 1)}
          <span className="block">{profileContent.name.split(" ").slice(1).join(" ")}</span>
        </h2>
        {profileContent.aboutParagraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-xl text-base leading-7 text-[#8a8a8a]">{paragraph}</p>
        ))}
        <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.02] px-4 py-3 italic text-sm text-[#d4d4d4]">
          “{profileContent.aboutQuote}”
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#" className="inline-flex items-center gap-2 rounded-[10px] bg-white px-5 py-3 text-sm font-medium text-black">
            <FileDown className="h-4 w-4" /> Download CV
          </a>
          <a href="#portfolio" className="inline-flex items-center gap-2 rounded-[10px] border border-white/12 px-5 py-3 text-sm font-medium text-white">
            View Projects <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-[-18px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_62%)] blur-2xl" />
          <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border border-white/10 bg-[#101010] shadow-[0_0_55px_rgba(255,255,255,0.06)]">
            <ImagePlaceholder src={profileContent.aboutPortrait} alt="Chantikka portrait profile" title="about-portrait.jpg · 1:1" aspectRatio="1 / 1" className="h-full w-full rounded-full grayscale-[1] contrast-125" />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 mt-8 grid gap-4 md:grid-cols-3">
        {aboutStats.map((stat, index) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} icon={icons[index]} />
        ))}
      </div>
    </div>
  );
}
