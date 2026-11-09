export function ProjectThumbLiveBadge() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10 h-16 w-16 overflow-hidden"
      aria-hidden
    >
      <span className="absolute left-[-32px] top-[18px] block w-[110px] -rotate-45 bg-emerald-400 py-0.5 text-center text-[8px] font-bold uppercase tracking-[0.15em] text-[#0a0a0a] shadow-sm">
        Live
      </span>
    </div>
  );
}
