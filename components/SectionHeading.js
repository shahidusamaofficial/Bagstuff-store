import { COLORS } from "@/lib/tokens";

// Shared heading treatment: a brass rivet + uppercase eyebrow running into a
// dashed "stitch" rule, then the display headline underneath. Reused across
// homepage sections, Shop, and Footer so the signature motif reads as a
// system rather than a one-off decoration.
export default function SectionHeading({ eyebrow, title, action, className = "" }) {
  return (
    <div className={`mb-6 ${className}`}>
      {eyebrow && (
        <div className="stitch-rule mb-2">
          <span className="rivet" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] shrink-0" style={{ color: COLORS.brass }}>
            {eyebrow}
          </span>
        </div>
      )}
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display font-bold text-3xl" style={{ color: COLORS.ink }}>{title}</h2>
        {action}
      </div>
    </div>
  );
}
