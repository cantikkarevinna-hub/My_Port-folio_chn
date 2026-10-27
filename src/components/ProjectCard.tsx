import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { ProjectItem } from "@/data/content";

export default function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <article className="group rounded-[20px] border border-white/8 bg-[#181818]/80 p-3 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#1b1b1b]">
      <div className="mb-4 overflow-hidden rounded-[14px]">
        <ImagePlaceholder src={item.image} alt={item.title} title={item.title} aspectRatio="16 / 10" className="transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-col gap-3 px-1 pb-1">
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-[#8a8a8a]">{item.description}</p>
        <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5c5c5c]">No Link</span>
          <Link href={`/portfolio/${item.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80">
            Details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
