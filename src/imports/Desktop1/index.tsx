import svgPaths from "./svg-6ze2ev5nje";
import imgDesktop1 from "./a60bda67df0f10920fd85db23a2751110db8165f.png";
import imgLantern1 from "./b8023224861880eed6418af332e2450cd1fe8902.png";

export default function Desktop() {
  return (
    <div className="relative w-full h-full bg-[#0b0d1a]">
      <img src={imgDesktop1} className="absolute inset-0 object-cover w-full h-full opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-[#e8c97a] text-4xl mb-4">Ember Sanctuary</h1>
        <p className="text-white/60 text-xl">Every thought deserves a place to breathe.</p>
      </div>
    </div>
  );
}
