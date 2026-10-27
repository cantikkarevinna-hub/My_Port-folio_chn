"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, UserRound, Globe } from "lucide-react";

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0d0d0d]"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              {[Camera, UserRound, Globe].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.7, opacity: 0.2 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.45 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/5 text-white/90"
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
              ))}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="font-display bg-gradient-to-r from-[#d4d4d4] via-[#8a8a8a] to-[#4f4f4f] bg-clip-text text-center text-4xl font-extrabold tracking-[0.08em] text-transparent"
            >
              Welcome
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
