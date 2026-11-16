"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ShowcaseData, ShowcaseWork, WorkCategory } from "@/lib/portfolio-types";
import WorkCard from "@/components/portfolio/WorkCard";
import WorkModal from "@/components/portfolio/WorkModal";

const tabs = [
  { label: "Web Projects", category: "web" },
  { label: "Slides", category: "slides" },
  { label: "Logo", category: "logo" },
  { label: "Poster & Design", category: "poster" },
  { label: "Writings", category: "writing" },
] as const;

type TabCategory = WorkCategory;
const slideFilters = ["Semua", "Brand Guideline", "PPT Design"] as const;

// STYLE: existing showcase pill surface; category content is supplied by src/lib/portfolio.ts.
export default function PortfolioTabs({ data }: { data: ShowcaseData }) {
  const [activeTab, setActiveTab] = useState<TabCategory>("web");
  const [activeFilter, setActiveFilter] = useState<(typeof slideFilters)[number]>("Semua");
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeWork, setActiveWork] = useState<ShowcaseWork | null>(null);
  const reducedMotion = useReducedMotion();
  const activeCategory = activeTab;
  const allItems = data[activeCategory];
  const filteredSlides = activeTab === "slides" && activeFilter !== "Semua"
    ? allItems.filter((item) => item.kind === (activeFilter === "Brand Guideline" ? "brand-guideline" : "ppt"))
    : allItems;
  const displayedItems = filteredSlides.slice(0, visibleCount);

  const selectTab = (tab: TabCategory) => {
    setActiveTab(tab);
    setActiveFilter("Semua");
    setVisibleCount(6);
  };

  const renderWorkGrid = (category: WorkCategory) => {
    if (category === "web") {
      return <div className="grid gap-5 md:grid-cols-2">{displayedItems.map((item, index) => <WorkCard key={item.slug} item={item} index={index} onOpen={setActiveWork} />)}</div>;
    }
    if (category === "slides") {
      return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{displayedItems.map((item, index) => <WorkCard key={item.slug} item={item} index={index} onOpen={setActiveWork} />)}</div>;
    }
    if (category === "logo") {
      return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">{displayedItems.map((item, index) => <WorkCard key={item.slug} item={item} index={index} onOpen={setActiveWork} />)}</div>;
    }
    if (category === "poster") {
      return <div className="columns-2 gap-4 md:columns-3 xl:columns-4">{displayedItems.map((item, index) => <div key={item.slug} className="mb-4 break-inside-avoid"><WorkCard item={item} index={index} onOpen={setActiveWork} /></div>)}</div>;
    }
    return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{displayedItems.map((item, index) => <WorkCard key={item.slug} item={item} index={index} onOpen={setActiveWork} />)}</div>;
  };

  return (
    <div>
      <div className="mb-8 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-max min-w-full items-center rounded-full border border-white/8 bg-[#181818]/80 p-1.5 md:w-full md:min-w-0">
          {tabs.map(({ label, category }) => (
            <button
              key={category}
              type="button"
              onClick={() => selectTab(category)}
              aria-pressed={activeTab === category}
              className={`relative z-0 min-h-11 shrink-0 snap-center rounded-full px-3 py-2.5 text-[11px] font-medium transition sm:px-4 sm:text-xs md:min-h-0 xl:flex-1 ${activeTab === category ? "text-black" : "text-[#8a8a8a] hover:text-white"}`}
            >
              {activeTab === category && <motion.span layoutId="tab-pill" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="absolute inset-0 -z-10 rounded-full bg-[#d9d9d9]" />}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "slides" && (
            <div className="mb-5 flex flex-wrap gap-2" aria-label="Filter slides">
              {slideFilters.map((filter) => (
                <button key={filter} type="button" onClick={() => { setActiveFilter(filter); setVisibleCount(6); }} aria-pressed={activeFilter === filter} className={`min-h-11 rounded-full border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] transition md:min-h-0 ${activeFilter === filter ? "border-white/30 bg-white/10 text-white" : "border-white/8 text-[#888] hover:text-white"}`}>
                  {filter}
                </button>
              ))}
            </div>
          )}
          {renderWorkGrid(activeCategory)}
          {filteredSlides.length > visibleCount && (
            <button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="mx-auto mt-7 block min-h-11 rounded-full border border-white/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-[#aaa] transition hover:border-white/25 hover:text-white md:min-h-0">
              Tampilkan lebih banyak
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {activeWork && (
          <WorkModal
            key={activeWork.slug}
            item={activeWork}
            photos={data.photos}
            writingWorks={data.writing}
            onClose={() => setActiveWork(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
