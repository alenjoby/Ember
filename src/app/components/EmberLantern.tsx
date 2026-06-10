import imgLantern from "../../imports/Desktop1/b8023224861880eed6418af332e2450cd1fe8902.png";

export type LanternVariant = "default" | "active" | "fading" | "glow-low" | "glow-med" | "glow-high";

export interface EmberData {
  id: string;
  text: string;
  variant: LanternVariant;
  spriteCol?: 0 | 1 | 2 | 3;
  spriteRow?: 0 | 1 | 2;
  responseCount?: number;
  createdAt?: Date;
  x?: number;
  y?: number;
  size?: number;
}

const VARIANT_STYLES: Record<LanternVariant, { glow: string; opacity: string; scale: string }> = {
  default:    { glow: "rgba(232, 201, 122, 0.25)", opacity: "1",    scale: "1" },
  active:     { glow: "rgba(232, 201, 122, 0.55)", opacity: "1",    scale: "1.04" },
  fading:     { glow: "rgba(232, 201, 122, 0.10)", opacity: "0.5",  scale: "0.96" },
  "glow-low": { glow: "rgba(232, 201, 122, 0.30)", opacity: "0.9",  scale: "1" },
  "glow-med": { glow: "rgba(232, 201, 122, 0.45)", opacity: "1",    scale: "1.02" },
  "glow-high":{ glow: "rgba(232, 201, 122, 0.70)", opacity: "1",    scale: "1.06" },
};

export function EmberLantern({ ember, onTap, animDelay = 0 }: { ember: EmberData; onTap: any; animDelay?: number }) {
  const { glow, opacity: variantOpacity, scale: variantScale } = VARIANT_STYLES[ember.variant];
  const col = ember.spriteCol ?? 0;
  const row = ember.spriteRow ?? 0;
  const baseSize = ember.size ?? 250;
  const isSmall = baseSize < 300;
  const blurAmount = isSmall ? (300 - baseSize) / 50 : 0;
  const depthOpacity = isSmall ? 0.7 + (baseSize / 300) * 0.3 : 1;
  const driftType = baseSize > 350 ? "ember-drift-fast" : baseSize > 280 ? "ember-drift-medium" : "ember-drift-slow";
  const driftDuration = 22 + (animDelay % 18);

  return (
    <div
      className="absolute"
      style={{
        left: `${ember.x ?? 50}%`,
        top: `${ember.y ?? 50}%`,
        zIndex: Math.floor(baseSize),
        animation: `${driftType} ${driftDuration}s ease-in-out infinite -${animDelay * 20}ms`,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
        pointerEvents: "auto",
      }}
    >
      <button
        type="button"
        onClick={(e) => onTap(ember, e.currentTarget)}
        className="group relative flex flex-col items-center gap-6 cursor-pointer focus:outline-none"
        style={{
          animation: `ember-float-in var(--ember-duration-float) var(--ember-spring) ${animDelay}ms both`,
          opacity: variantOpacity === "1" ? depthOpacity : parseFloat(variantOpacity) * depthOpacity,
          transform: `scale(${variantScale})`,
          transition: `transform 400ms var(--ember-spring), opacity 400ms ease`,
        }}
      >
        <div className="relative rounded-[3rem] overflow-hidden" style={{ width: `${baseSize}px`, height: `${baseSize}px` }}>
          <div className="absolute inset-0" style={{ boxShadow: `0 0 ${baseSize / 2.5}px ${baseSize / 10}px ${glow}` }} />
          <img alt="" className="absolute max-w-none" src={imgLantern} style={{ width: "400%", height: "300%", left: `${-col * 100}%`, top: `${-row * 100}%` }} />
        </div>
        <p className="text-center px-6 leading-relaxed" style={{ color: "var(--ember-text-primary)", fontSize: "1rem" }}>{ember.text}</p>
      </button>
    </div>
  );
}
