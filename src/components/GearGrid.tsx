import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { GearItem } from "@/data/content";

export default function GearGrid({ items }: { items: GearItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group rounded-[18px] border border-white/8 bg-[#181818]/80 p-3 opacity-0 animate-[fade-up_0.5s_ease_forwards]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="mb-3 rounded-[16px] border border-white/6 bg-[#1d1d1d] p-4">
            <ImagePlaceholder src={item.image} alt={item.name} title={item.name} aspectRatio="1 / 1" className="rounded-[12px]" />
          </div>
          <div className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">{item.name}</div>
        </div>
      ))}
    </div>
  );
}
