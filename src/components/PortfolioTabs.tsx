"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { photographyProjects, artDesignProjects, gearItems } from "@/data/content";
import ProjectCard from "@/components/ProjectCard";
import GearGrid from "@/components/GearGrid";

const tabs = ["Photography", "Art & Design", "Camera Gear"] as const;

export default function PortfolioTabs() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Photography");

  const getItems = () => {
    if (activeTab === "Photography") return photographyProjects;
    if (activeTab === "Art & Design") return artDesignProjects;
    return [];
  };

  return (
    <div>
      <div className="mx-auto mb-8 flex w-full max-w-xl items-center rounded-full border border-white/8 bg-[#181818]/80 p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${activeTab === tab ? "text-black" : "text-[#8a8a8a] hover:text-white"}`}
          >
            {activeTab === tab && (
              <motion.span
                layoutId="tab-pill"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 rounded-full bg-[#d9d9d9]"
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {activeTab === "Camera Gear" ? (
        <GearGrid items={gearItems} />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {getItems().map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
