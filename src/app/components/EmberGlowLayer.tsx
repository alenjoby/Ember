export function EmberGlowLayer({ intensity = 0, origin = { x: 50, y: 50 }, visible = false }: { intensity?: number; origin?: any; visible?: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000" style={{ opacity: visible ? 1 : 0 }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at ${origin.x}% ${origin.y}%, rgba(232, 201, 122, ${intensity * 0.2}) 0%, transparent 70%)` }} />
    </div>
  );
}
