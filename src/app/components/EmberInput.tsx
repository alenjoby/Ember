import { useState, useRef } from "react";
import svgPaths from "../../imports/Desktop1/svg-6ze2ev5nje";

export function EmberInput({ onSubmit, disabled = false }: { onSubmit: any; disabled?: boolean }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex items-center gap-3 w-full h-14 bg-white/5 backdrop-blur-md rounded-full px-6 border border-white/10">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Share your thoughts..."
        className="flex-1 bg-transparent border-none outline-none text-white"
      />
      <button
        onClick={() => { onSubmit(value); setValue(""); }}
        disabled={!value.trim()}
        className="p-2 bg-[#e8c97a]/20 rounded-full disabled:opacity-30"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d={svgPaths.p179fe300} stroke="#e8c97a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
