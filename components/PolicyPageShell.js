import Link from "next/link";
import { FileText } from "lucide-react";
import { COLORS } from "@/lib/tokens";
import LiquidGlass from "./LiquidGlass";

// Shared shell for the footer's informational pages (Track Order, Refund
// Policy, Shipping Policy, FAQs). Each page passes its own eyebrow/title/
// intro; until the real copy is dropped in, this renders a clear,
// on-brand "coming soon" notice instead of a blank page.
export default function PolicyPageShell({ eyebrow, title, intro, children }) {
  return (
    <div className="relative max-w-3xl mx-auto px-4 py-16 md:py-20 overflow-hidden">
      <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none" style={{ backgroundColor: COLORS.brass }} />

      <div className="relative">
        <div className="stitch-rule mb-3">
          <span className="rivet" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] shrink-0" style={{ color: COLORS.brass }}>
            {eyebrow}
          </span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: COLORS.ink }}>{title}</h1>
        {intro && (
          <p className="text-sm leading-relaxed max-w-lg mb-8" style={{ color: COLORS.muted }}>{intro}</p>
        )}

        {children ? (
          children
        ) : (
          <LiquidGlass as="div" options={{ scale: -70, chroma: 4, radius: 16 }} className="glass tag-notch p-6 flex items-start gap-4" style={{ "--tag-hole-bg": "rgba(255,255,255,0.75)" }}>
            <span className="h-11 w-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.brass}1a` }}>
              <FileText size={20} color={COLORS.brass} />
            </span>
            <div>
              <div className="font-semibold text-sm" style={{ color: COLORS.ink }}>This page is being written</div>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: COLORS.muted }}>
                We&rsquo;re putting together the details for this section. In the meantime, reach out and we&rsquo;ll help directly.
              </p>
              <Link href="/contact" className="text-sm font-medium mt-3 inline-block hover:underline" style={{ color: COLORS.accent }}>
                Contact us →
              </Link>
            </div>
          </LiquidGlass>
        )}
      </div>
    </div>
  );
}
