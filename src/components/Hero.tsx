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

      <div className="relative z-10 mt-8 flex min-w-0 justify-center py-2 md:mt-0 md:py-0">
        <IdCard />
      </div>

      <a href="#portfolio" className="mt-2 flex justify-center font-mono text-[9px] uppercase tracking-[0.3em] text-[#5c5c5c] transition hover:text-white/80 md:col-span-2 md:mt-0">
        SCROLL ↓
      </a>
    </div>
  );
}
