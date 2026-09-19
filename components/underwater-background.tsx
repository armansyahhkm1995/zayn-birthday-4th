type UnderwaterBackgroundProps = {
  className?: string;
};

export function UnderwaterBackground({
  className = "",
}: UnderwaterBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(143,249,255,0.92),_rgba(7,73,112,0.88)_38%,_rgba(1,24,44,1)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(180deg,_rgba(10,83,118,0)_0%,_rgba(7,95,122,0.8)_30%,_rgba(6,59,79,0.96)_100%)]" />
      <div className="absolute inset-x-0 bottom-[12%] h-24 bg-[radial-gradient(circle_at_50%_100%,_rgba(53,145,185,0.45),_transparent_60%)]" />

      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={`bubble-${index}`}
          className="absolute rounded-full border border-white/15 bg-white/10"
          style={{
            width: `${10 + (index % 4) * 7}px`,
            height: `${10 + (index % 4) * 7}px`,
            left: `${(index * 13) % 96}%`,
            top: `${10 + ((index * 7) % 62)}%`,
            opacity: 0.35 + (index % 5) * 0.08,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-20 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,211,87,0.3),_transparent_35%)]" />
      <div className="absolute bottom-0 left-0 h-24 w-[42%] rounded-t-[46%] border-t-[6px] border-x-[4px] border-[#1a7a97]/60 bg-[#103b55]/45" />
      <div className="absolute bottom-0 right-0 h-24 w-[38%] rounded-t-[48%] border-t-[6px] border-x-[4px] border-[#1a7a97]/60 bg-[#103b55]/45" />
      <div className="absolute bottom-6 left-[12%] h-10 w-24 rounded-full bg-[#ff9c72]/25 blur-2xl" />
      <div className="absolute bottom-4 right-[16%] h-12 w-28 rounded-full bg-[#72d9ff]/20 blur-3xl" />
    </div>
  );
}
