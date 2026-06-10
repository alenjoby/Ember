import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface AIFallbackProps {
  isActive: boolean;
}

export function AIFallback({ isActive }: AIFallbackProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-40"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,179,71,0.1)_0%,transparent_60%)]"
          />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [12, 32, 12],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="w-0.5 bg-[var(--amber-glow)] rounded-full"
              />
            ))}
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute mt-24 text-center"
          >
            <p className="text-[var(--amber-glow)]/60 text-xs tracking-[0.4em] uppercase font-light italic">
              "You're not alone in the silence."
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
