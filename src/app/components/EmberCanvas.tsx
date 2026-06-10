import { useState, useCallback, useRef } from "react";
import { EmberLantern, type EmberData, type LanternVariant } from "./EmberLantern";
import { EmberInput } from "./EmberInput";
import { EmberDrawer } from "./EmberDrawer";
import { EmberGlowLayer } from "./EmberGlowLayer";
import imgBackground from "../../imports/Desktop1/a60bda67df0f10920fd85db23a2751110db8165f.png";

const SEED_EMBERS: EmberData[] = [
  { id: "1", text: "I finally said the thing I've been holding for months.", variant: "glow-high", spriteCol: 0, spriteRow: 0, responseCount: 4, x: 12, y: 18, size: 380 },
  { id: "2", text: "Some days the quiet feels like company.", variant: "glow-med",  spriteCol: 1, spriteRow: 0, responseCount: 2, x: 82, y: 15, size: 280 },
  { id: "3", text: "I don't know why I'm crying. I just needed somewhere to put it.",  variant: "default",  spriteCol: 2, spriteRow: 0, responseCount: 7, x: 48, y: 45, size: 320 },
  { id: "4", text: "Missing someone who is still here.",      variant: "glow-low", spriteCol: 3, spriteRow: 0, responseCount: 1, x: 10, y: 72, size: 350 },
  { id: "5", text: "Today felt smaller than it needed to be.", variant: "fading",   spriteCol: 0, spriteRow: 1, responseCount: 0, x: 88, y: 78, size: 240 },
  { id: "6", text: "I am allowed to take up space.",           variant: "active",   spriteCol: 1, spriteRow: 1, responseCount: 3, x: 42, y: 12, size: 400 },
  { id: "7", text: "The stars don't ask for permission to shine.", variant: "glow-med", spriteCol: 2, spriteRow: 1, responseCount: 1, x: 74, y: 52, size: 310 },
  { id: "8", text: "Learning to love the version of me that is still healing.", variant: "glow-low", spriteCol: 3, spriteRow: 1, responseCount: 5, x: 28, y: 82, size: 340 },
  { id: "9", text: "It's okay to not have all the answers yet.", variant: "default", spriteCol: 0, spriteRow: 2, responseCount: 0, x: 65, y: 85, size: 260 },
  { id: "10", text: "Small steps are still progress.", variant: "glow-high", spriteCol: 1, spriteRow: 2, responseCount: 12, x: 92, y: 40, size: 370 },
];

const AMBIENT_DOTS = [
  { left: "34%",  top: "16%",  r: 4, opacity: 0.85, blur: 6 },
  { left: "47%",  top: "38%",  r: 3, opacity: 0.75, blur: 5 },
  { left: "53%",  top: "52%",  r: 3.5, opacity: 0.80, blur: 5.5 },
  { left: "80%",  top: "43%",  r: 3, opacity: 0.70, blur: 5 },
  { left: "38%",  top: "56%",  r: 4, opacity: 0.80, blur: 6 },
  { left: "93%",  top: "36%",  r: 3.5, opacity: 0.72, blur: 5 },
];

function AmbientDot({ left, top, r, opacity, blur }: typeof AMBIENT_DOTS[0]) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        left,
        top,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: "#FFB347",
        opacity,
        boxShadow: `0 0 ${blur * 2}px ${blur}px rgba(255, 179, 71, 0.8)`,
        animation: "ember-ambient-drift 8s ease-in-out infinite",
        animationDelay: `${Math.random() * 4}s`,
      }}
    />
  );
}

type ResponseMode = "idle" | "note" | "sticker" | "voice" | "draw";

export function EmberCanvas() {
  const [embers, setEmbers] = useState<EmberData[]>(SEED_EMBERS);
  const [activeEmber, setActiveEmber] = useState<EmberData | null>(null);
  const [glowOrigin, setGlowOrigin] = useState({ x: 50, y: 50 });
  const [glowIntensity, setGlowIntensity] = useState(0);
  const streamRef = useRef<HTMLDivElement>(null);

  const handleLanternTap = useCallback(
    (ember: EmberData, el: HTMLButtonElement) => {
      setActiveEmber(ember);
      const rect = el.getBoundingClientRect();
      setGlowOrigin({
        x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
        y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
      });

      const variantIntensity: Record<LanternVariant, number> = {
        "default":    0.4,
        "active":     0.9,
        "fading":     0.2,
        "glow-low":   0.45,
        "glow-med":   0.65,
        "glow-high":  1.0,
      };
      setGlowIntensity(variantIntensity[ember.variant]);
    },
    []
  );

  const handleDrawerClose = useCallback(() => {
    setActiveEmber(null);
    setGlowIntensity(0);
  }, []);

  const handleRespond = useCallback(
    (emberId: string, _type: ResponseMode, _content: string) => {
      setEmbers((prev) =>
        prev.map((e) =>
          e.id === emberId
            ? { ...e, responseCount: (e.responseCount ?? 0) + 1 }
            : e
        )
      );
    },
    []
  );

  const playAIFallback = useCallback((ember: EmberData) => {
    if (!("speechSynthesis" in window)) return;
    setGlowOrigin({ x: ember.x ?? 50, y: ember.y ?? 50 });
    const messages = ["I hear you.", "Your feelings are valid.", "It is okay to feel this way."];
    const text = messages[Math.floor(Math.random() * messages.length)];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setGlowIntensity(0.7);
    utterance.onend = () => setGlowIntensity(0);
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleNewEmber = useCallback((text: string) => {
    const newEmber: EmberData = {
      id: `local-${Date.now()}`,
      text,
      variant: "active",
      spriteCol: (Math.floor(Math.random() * 4)) as 0 | 1 | 2 | 3,
      spriteRow: 0,
      responseCount: 0,
      createdAt: new Date(),
      x: 5 + Math.random() * 90, 
      y: 10 + Math.random() * 75,
      size: 200 + Math.random() * 200,
    };
    setEmbers((prev) => [newEmber, ...prev]);
    setGlowOrigin({ x: newEmber.x!, y: newEmber.y! });
    setGlowIntensity(0.85);
    setTimeout(() => {
      setGlowIntensity(0);
      setTimeout(() => playAIFallback(newEmber), 12000);
    }, 2200);
  }, [playAIFallback]);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "var(--ember-bg-deep)" }}>
      <img alt="" aria-hidden className="pointer-events-none absolute inset-0 object-cover w-full h-full" src={imgBackground} />
      {AMBIENT_DOTS.map((dot, i) => <AmbientDot key={i} {...dot} />)}
      <EmberGlowLayer intensity={glowIntensity} origin={glowOrigin} visible={glowIntensity > 0} />
      <main ref={streamRef} className="absolute -inset-20 overflow-hidden">
        <div className="relative w-full h-full">
          {embers.map((ember, i) => (
            <EmberLantern key={ember.id} ember={ember} onTap={handleLanternTap} animDelay={i * 150} />
          ))}
        </div>
      </main>
      <div className="absolute bottom-0 left-0 right-0 z-10 px-5 md:px-16 pb-6 pt-3">
        <EmberInput onSubmit={handleNewEmber} />
      </div>
      <EmberDrawer ember={activeEmber} onClose={handleDrawerClose} onRespond={handleRespond} />
    </div>
  );
}
