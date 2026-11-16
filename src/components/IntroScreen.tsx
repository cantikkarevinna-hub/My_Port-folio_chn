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
          className="fixed inset-0 z-[60] flex min-h-[100dvh] items-center justify-center bg-[#0d0d0d]"
        >
          <div className="flex flex-col items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              {[Camera, UserRound, Globe].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.7, opacity: 0.2 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.45 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/5 text-white/90 sm:h-14 sm:w-14"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
              ))}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="font-display bg-gradient-to-r from-[#d4d4d4] via-[#8a8a8a] to-[#4f4f4f] bg-clip-text text-center text-[clamp(1.75rem,8vw,2.25rem)] font-extrabold tracking-[0.08em] text-transparent"
            >
              Welcome
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
