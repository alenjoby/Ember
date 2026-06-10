import React, { useState } from "react";
import { Drawer } from "vaul";
import { Send, X } from "lucide-react";

interface ThoughtDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export function ThoughtDrawer({ isOpen, onClose, onSubmit }: ThoughtDrawerProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
      onClose();
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        <Drawer.Content className="bg-[#0f0f1a] flex flex-col rounded-t-[32px] h-[60vh] mt-24 fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 outline-none">
          <div className="p-6 bg-[#0f0f1a] rounded-t-[32px] flex-1 flex flex-col">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-white/10 mb-8" />
            <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
              <Drawer.Title className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-light mb-6 text-center">
                Release a Thought
              </Drawer.Title>
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-8">
                <textarea
                  autoFocus
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What's floating in your mind?"
                  className="flex-1 bg-transparent text-white/90 text-2xl font-light placeholder:text-white/10 border-none outline-none resize-none leading-relaxed text-center"
                />
                <div className="flex justify-center pb-8">
                  <button
                    type="submit"
                    disabled={!text.trim()}
                    className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5"
                  >
                    <span className="text-xs tracking-[0.2em] uppercase font-light">Set Adrift</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
