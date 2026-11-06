"use client";

import { useEffect, useRef, useState } from "react";
import { heroWords, profileContent } from "@/data/content";
import IdCard from "@/components/IdCard";

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
    <div className="py-12 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#5c5c5c]">✦ OPEN FOR COLLABORATION</div>
          <h1 className="mt-6 font-display text-[3.1rem] leading-[0.95] tracking-[-0.06em] text-white md:text-[5.5rem] lg:text-[6.2rem]">
            <span className="block">{profileContent.heroTitle[0]}</span>
            <span className="block bg-gradient-to-r from-[#d4d4d4] via-[#8a8a8a] to-[#5a5a5a] bg-clip-text text-transparent">
              {profileContent.heroTitle[1]}
            </span>
          </h1>

          <div className="mt-6 flex min-h-[26px] items-center gap-2 font-mono text-sm text-white/80 md:text-base">
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

          <div className="mt-8 space-y-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8a8a8a]">
            {profileContent.heroPrompts.map((prompt) => <div key={prompt} className="inline-flex items-center gap-2">{prompt}</div>)}
          </div>
        </div>

        <div className="relative flex justify-center py-8 md:py-0">
          <IdCard />
        </div>
      </div>
      <a href="#portfolio" className="mt-10 flex justify-center font-mono text-[9px] uppercase tracking-[0.3em] text-[#5c5c5c] transition hover:text-white/80">
        SCROLL ↓
      </a>
    </div>
  );
}
