import { useState, useRef, useEffect } from "react";

export function EmberDrawer({ ember, onClose, onRespond }: { ember: any; onClose: any; onRespond: any }) {
  const [mode, setMode] = useState("idle");
  const isOpen = ember !== null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#111428] rounded-t-3xl p-8 animate-in slide-in-from-bottom duration-500">
        <h2 className="text-white text-xl mb-4">Respond with Warmth</h2>
        <p className="text-white/60 mb-8 italic">"{ember.text}"</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 bg-white/5 rounded-full text-white/40">Close</button>
          <button onClick={() => { onRespond(ember.id, "note", "Warmth sent"); onClose(); }} className="flex-[2] py-3 bg-[#e8c97a]/20 border border-[#e8c97a]/40 rounded-full text-[#e8c97a]">Send Warmth</button>
        </div>
      </div>
    </div>
  );
}
