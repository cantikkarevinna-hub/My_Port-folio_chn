"use client";

import { motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioTabs from "@/components/PortfolioTabs";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function PortfolioSite() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="page-grid" aria-hidden="true" />
      <IntroScreen />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12 md:px-8">
        <motion.section id="home" className="pt-3 md:pt-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Hero />
        </motion.section>
        <motion.section id="about" className="pt-20 md:pt-28" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6 }}>
          <About />
        </motion.section>
        <motion.section id="portfolio" className="pt-20 md:pt-28" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 text-center">
            <h2 className="font-display text-4xl tracking-[-0.06em] text-white md:text-5xl">Portfolio Showcase</h2>
            <p className="mt-3 text-sm text-[#8a8a8a] md:text-base">Explore my journey through photography, art, and the gear behind it.</p>
          </div>
          <PortfolioTabs />
        </motion.section>
        <motion.section id="contact" className="pt-20 md:pt-28" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <div className="relative mb-8 text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="font-display text-[3.5rem] font-bold tracking-[-0.08em] text-white/8 md:text-[6rem]">Contact Me</motion.div>
            <div className="mt-[-1.2rem] text-sm text-[#8a8a8a] md:text-base">Have something in mind? Send a message and let&apos;s connect.</div>
          </div>
          <ContactForm />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
