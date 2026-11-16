"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import type { IconType } from "react-icons";
import { heroWords, profileContent, socialLinks } from "@/data/content";
import IdCard from "@/components/IdCard";

const socialIcons: Record<string, IconType> = {
  Instagram: FaInstagram,
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
};

export default function Hero() {
  const [typedWord, setTypedWord] = useState("");
  const typing = useRef({ wordIndex: 0, deleting: false, pause: 0, text: "" });

  useEffect(() => {
    const timer = window.setInterval(() => {
      const state = typing.current;
      const word = heroWords[state.wordIndex];

      if (state.pause > 0) {
        state.pause -= 1;
      } else if (!state.deleting && state.text.length < word.length) {
        state.text = word.slice(0, state.text.length + 1);
        if (state.text.length === word.length) {
          state.deleting = true;
          state.pause = 10;
        }
      } else if (state.deleting && state.text.length > 0) {
        state.text = state.text.slice(0, -1);
      } else {
        state.deleting = false;
        state.wordIndex = (state.wordIndex + 1) % heroWords.length;
      }

      setTypedWord(state.text);
    }, 90);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="grid min-w-0 grid-cols-1 items-center gap-6 py-4 md:min-h-[470px] md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-3 md:py-6">
      <div className="min-w-0 overflow-visible">
        <div className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#5c5c5c]">✦ OPEN FOR COLLABORATION</div>
        <h1 className="mt-4 w-full max-w-full overflow-visible whitespace-normal font-display text-[clamp(1.7rem,8.5vw,3.8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em] md:mt-6 md:w-max md:max-w-none md:whitespace-nowrap md:text-[clamp(2.2rem,5.6vw,4.2rem)]">
          <span className="block w-full max-w-full overflow-visible whitespace-nowrap bg-gradient-to-r from-[#e6e6e6] via-[#bdbdbd] to-[#737373] bg-clip-text text-transparent md:w-max md:max-w-none">
            CHANTIKKA
          </span>
          <span className="block w-full max-w-full overflow-visible whitespace-nowrap bg-gradient-to-r from-[#e6e6e6] via-[#bdbdbd] to-[#737373] bg-clip-text text-transparent md:w-max md:max-w-none">
            REVINNA
          </span>
        </h1>

        <div className="mt-6 flex min-h-[26px] flex-wrap items-center gap-2 font-mono text-sm text-white/80 md:flex-nowrap md:text-base">
          <span className="font-medium text-white/60">I am</span>
          <span className="font-medium text-white">{typedWord}</span>
          <span className="inline-block animate-pulse text-white/70">_</span>
        </div>

        <p className="mt-6 max-w-xl text-base leading-7 text-[#8a8a8a] md:text-lg">
          {profileContent.heroDescription}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {profileContent.heroChips.map((item) => (
            <span key={item} className="rounded-full border border-white/12 bg-white/[0.02] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3" aria-label="Social media links">
          {socialLinks
            .filter(({ platform }) => platform in socialIcons)
            .map(({ platform, href }) => {
              const Icon = socialIcons[platform];
              return (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={platform}
                  title={platform}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-10 md:w-10"
                >
                  <Icon aria-hidden="true" className="h-[17px] w-[17px]" />
                </a>
              );
            })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[8px] uppercase leading-5 tracking-[0.04em] text-[#8a8a8a] sm:text-[10px] sm:tracking-[0.12em] md:gap-x-5 md:tracking-[0.2em]">
          {profileContent.heroPrompts.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center whitespace-nowrap transition-colors hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:min-h-0"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-4 flex min-w-0 justify-center py-2 md:mt-0 md:py-0">
        <IdCard />
      </div>
    </div>
  );
}
