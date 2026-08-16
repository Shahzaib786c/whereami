export default function CompassMark({ size = 40, spinning = false, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${spinning ? "compass-spin" : ""} ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="2.5" fill="var(--brass)" />
      {/* Tick marks */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const isMajor = i % 4 === 0;
        const r1 = isMajor ? 36 : 40;
        const r2 = 46;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + r1 * Math.sin(rad);
        const y1 = 50 - r1 * Math.cos(rad);
        const x2 = 50 + r2 * Math.sin(rad);
        const y2 = 50 - r2 * Math.cos(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--ink)"
            strokeWidth={isMajor ? 1.6 : 0.8}
          />
        );
      })}
      {/* Needle */}
      <g className="compass-needle">
        <polygon points="50,14 44,50 50,50" fill="var(--rust)" />
        <polygon points="50,14 56,50 50,50" fill="var(--ink)" />
        <polygon points="50,86 44,50 50,50" fill="var(--brass)" />
        <polygon points="50,86 56,50 50,50" fill="var(--brass-light)" />
      </g>
      <circle cx="50" cy="50" r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  );
}
