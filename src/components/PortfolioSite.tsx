"use client";

import { motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PhotoSlider from "@/components/portfolio/PhotoSlider";
import PortfolioTabs from "@/components/PortfolioTabs";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import type { ShowcaseData } from "@/lib/portfolio-types";

export default function PortfolioSite({ showcaseData }: { showcaseData: ShowcaseData }) {
  return (
    <div className="min-h-[100dvh] bg-[#0d0d0d] text-white">
      <div className="page-grid" aria-hidden="true" />
      <IntroScreen />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-12 md:px-8">
        <motion.section id="home" className="scroll-mt-20 pt-3 md:scroll-mt-0 md:pt-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Hero />
        </motion.section>
        <motion.section id="about" className="scroll-mt-20 pt-16 md:scroll-mt-0 md:pt-28" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }}>
          <About />
        </motion.section>
        <motion.section id="photography" className="scroll-mt-20 pt-16 md:scroll-mt-0 md:pt-28 lg:pt-24" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 text-center lg:mb-6">
            <h2 className="font-display text-[clamp(2rem,7vw,3rem)] tracking-[-0.06em] text-white">Photography</h2>
            <p className="mt-3 text-sm text-[#8a8a8a] md:text-base">A closer look at moments and stories captured in nature.</p>
          </div>
          <PhotoSlider photos={showcaseData.photos} />
        </motion.section>
        <motion.section id="portfolio" className="scroll-mt-20 pt-16 md:scroll-mt-0 md:pt-28" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 text-center">
            <h2 className="font-display text-[clamp(2rem,7vw,3rem)] tracking-[-0.06em] text-white">Portfolio Showcase</h2>
            <p className="mt-3 text-sm text-[#8a8a8a] md:text-base">Explore selected projects across design, web, and writing.</p>
          </div>
          <PortfolioTabs data={showcaseData} />
        </motion.section>
        <motion.section id="contact" className="scroll-mt-20 pt-16 md:scroll-mt-0 md:pt-28" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <div className="relative mb-8 text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-display text-[clamp(2.5rem,11vw,6rem)] font-bold tracking-[-0.08em] text-white/8 md:text-[6rem]">Contact Me</motion.div>
            <div className="mt-[-1.2rem] text-sm text-[#8a8a8a] md:text-base">Have something in mind? Send a message and let&apos;s connect.</div>
          </div>
          <ContactForm />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
