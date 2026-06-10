import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lantern } from "./lantern";
import { AIFallback } from "./ai-fallback";
import { ThoughtDrawer } from "./thought-drawer";
import { Sparkles, Plus } from "lucide-react";

export interface Thought {
  id: string;
  text: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  blur: number;
  opacity: number;
  color: string;
}

const INITIAL_THOUGHTS: Thought[] = [
  { id: "1", text: "Quiet moments feel heavy tonight", x: 20, y: 30, z: 0.2, scale: 1.2, blur: 0, opacity: 0.8, color: "var(--amber-glow)" },
  { id: "2", text: "Is anyone else just... waiting?", x: 70, y: 15, z: 0.8, scale: 0.6, blur: 4, opacity: 0.4, color: "#fff" },
  { id: "3", text: "The stars are particularly bright in the silence", x: 45, y: 60, z: 0.5, scale: 0.9, blur: 2, opacity: 0.6, color: "var(--amber-glow)" },
  { id: "4", text: "I hope you find what you're looking for", x: 15, y: 75, z: 0.1, scale: 1.4, blur: 0, opacity: 0.9, color: "#fff" },
];

export function MainCanvas() {
  const [thoughts, setThoughts] = useState<Thought[]>(INITIAL_THOUGHTS);
  const [isAiActive, setIsAiActive] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lastActivityRef = useRef<number>(Date.now());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const now = Date.now();
      if (now - lastActivityRef.current > 12000) {
        setIsAiActive(true);
      }
    }, 1000);

    const handleInteraction = (e: any) => {
      lastActivityRef.current = Date.now();
      setIsAiActive(false);
      if (e.clientX) {
        setMousePos({ 
          x: (e.clientX / window.innerWidth) * 100, 
          y: (e.clientY / window.innerHeight) * 100 
        });
      }
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      clearInterval(checkInactivity);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const addThought = (text: string) => {
    const newThought: Thought = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      z: Math.random(),
      scale: Math.random() * 0.8 + 0.6,
      blur: Math.random() * 4,
      opacity: Math.random() * 0.5 + 0.4,
      color: Math.random() > 0.5 ? "var(--amber-glow)" : "#fff",
    };
    setThoughts((prev) => [...prev, newThought]);
    setIsAiActive(false);
    lastActivityRef.current = Date.now();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--deep-sanctuary)] cursor-none">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(circle,rgba(74,48,109,0.15)_0%,transparent_70%)]" />
      </div>
      <div className="relative w-full h-full">
        <AnimatePresence>
          {thoughts.map((thought) => (
            <Lantern key={thought.id} thought={thought} mousePos={mousePos} />
          ))}
        </AnimatePresence>
      </div>
      <AIFallback isActive={isAiActive} />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-110 active:scale-95"
        >
          <Plus className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
          <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity text-white/50 text-xs tracking-widest uppercase">Release</span>
        </button>
      </div>
      <ThoughtDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSubmit={addThought} 
      />
      <div className="absolute top-8 left-8 flex items-center gap-3 pointer-events-none opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--amber-glow)] animate-pulse" />
        <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-light italic">Ember Sanctuary</span>
      </div>
    </div>
  );
}
