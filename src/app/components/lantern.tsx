import React, { useMemo } from "react";
import { motion } from "motion/react";
import { Thought } from "./main-canvas";

interface LanternProps {
  thought: Thought;
  mousePos: { x: number; y: number };
}

export function Lantern({ thought, mousePos }: LanternProps) {
  const driftX = useMemo(() => Math.random() * 40 - 20, []);
  const driftY = useMemo(() => Math.random() * 40 - 20, []);
  const duration = useMemo(() => 15 + Math.random() * 20, []);
  const zIndex = Math.floor((1 - thought.z) * 100);
  const dx = thought.x - mousePos.x;
  const dy = thought.y - mousePos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const repulsionStrength = Math.max(0, (20 - distance) * 2);
  const translateX = (dx / (distance || 1)) * repulsionStrength;
  const translateY = (dy / (distance || 1)) * repulsionStrength;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: "100vh" }}
      animate={{ 
        opacity: thought.opacity, 
        scale: thought.scale,
        x: [0, driftX, 0],
        y: [0, -driftY, 0],
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        opacity: { duration: 2 },
        scale: { duration: 2 },
        x: { duration, repeat: Infinity, ease: "easeInOut" },
        y: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{
        position: "absolute",
        left: `${thought.x}%`,
        top: `${thought.y}%`,
        filter: `blur(${thought.blur}px)`,
        zIndex,
        x: translateX,
        y: translateY,
      }}
      className="group"
    >
      <div className="relative flex flex-col items-center">
        <div 
          className="w-8 h-10 rounded-full blur-xl opacity-60 transition-all group-hover:blur-2xl group-hover:opacity-100"
          style={{ backgroundColor: thought.color }}
        />
        <div 
          className="absolute top-2 w-3 h-4 rounded-full shadow-[0_0_15px_rgba(255,179,71,0.5)] transition-transform group-hover:scale-125"
          style={{ backgroundColor: thought.color }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, y: -20 }}
          className="absolute top-12 left-1/2 -translate-x-1/2 w-48 text-center pointer-events-none"
        >
          <p className="text-white/80 text-[13px] leading-relaxed font-light tracking-wide drop-shadow-lg">
            {thought.text}
          </p>
          <div className="mt-2 w-px h-8 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
        </motion.div>
      </div>
    </motion.div>
  );
}
