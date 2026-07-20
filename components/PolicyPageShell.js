import Link from "next/link";
import { FileText } from "lucide-react";
import { COLORS } from "@/lib/tokens";

// Shared shell for the footer's informational pages (Track Order, Refund
// Policy, Shipping Policy, FAQs). Each page passes its own eyebrow/title/
// intro; until the real copy is dropped in, this renders a clear,
// on-brand "coming soon" notice instead of a blank page.
export default function PolicyPageShell({ eyebrow, title, intro, children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-20">
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
        <div className="tag-notch border bg-white p-6 flex items-start gap-4" style={{ borderColor: COLORS.line, "--tag-hole-bg": "#ffffff" }}>
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
        </div>
      )}
    </div>
  );
}
