"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

type StatCardProps = {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
};

export default function StatCard({ label, value, suffix, icon }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1400;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const time = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutExpo(time);
      setDisplayValue(Math.round(eased * value));
      if (time < 1) {
        requestAnimationFrame(tick);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className="group relative rounded-[20px] border border-white/8 bg-[#181818]/80 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/15">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/80">
          {icon}
        </div>
        <div className="text-[1.6rem] font-bold leading-none tracking-[-0.06em] text-white">
          {displayValue}
          {suffix}
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8a8a8a]">{label}</div>
        <ArrowUpRight className="h-3.5 w-3.5 text-[#8a8a8a]" />
      </div>
    </div>
  );
}
