import { Package, Star, Users, Truck } from "lucide-react";
import { COLORS } from "@/lib/tokens";

const STATS = [
  { icon: Package, value: "420+", label: "orders fulfilled" },
  { icon: Star, value: "4.8/5", label: "average rating" },
  { icon: Users, value: "16+", label: "styles in stock" },
  { icon: Truck, value: "4–5 days", label: "average delivery" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-20">
      <div className="stitch-rule mb-3">
        <span className="rivet" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] shrink-0" style={{ color: COLORS.brass }}>
          Est. in Pakistan
        </span>
      </div>
      <h1 className="font-display font-bold text-4xl md:text-5xl mb-10" style={{ color: COLORS.ink }}>Our Story</h1>

      <div className="space-y-5 text-[15px] leading-relaxed" style={{ color: COLORS.muted }}>
        <p className="font-display text-2xl leading-snug" style={{ color: COLORS.ink }}>
          <span className="float-left text-6xl font-bold leading-[0.8] pr-2 pt-1" style={{ color: COLORS.accent }}>A</span>
          t Bagstuff, we believe a great bag is more than just something you carry — it&rsquo;s something you rely on every single day.
        </p>
        <p>
          Our journey began with a simple observation: finding a stylish, well-made bag at a fair price shouldn&rsquo;t be difficult. Too often, shoppers have to choose between expensive designer labels and low-quality alternatives that don&rsquo;t last. We set out to bridge that gap.
        </p>
        <p>
          Every collection is carefully selected with a focus on timeless design, everyday functionality, and lasting quality. Whether you&rsquo;re heading to work, university, travelling, or simply going about your day, Bagstuff is designed to complement your lifestyle without compromising on style or practicality.
        </p>
        <p>
          We believe in clean aesthetics, thoughtful details, and products that remain relevant beyond passing trends. Our goal isn&rsquo;t to sell the most bags — it&rsquo;s to create a brand people trust whenever they need something they&rsquo;ll enjoy carrying for years to come.
        </p>
        <p>
          As a proudly Pakistani brand, we&rsquo;re committed to making premium fashion accessories more accessible while delivering a shopping experience that&rsquo;s simple, transparent, and dependable. From carefully packed orders to responsive customer support, every interaction reflects the standards we hold ourselves to.
        </p>
        <p>
          This is only the beginning of our journey. As Bagstuff grows, so will our collections, our community, and our commitment to bringing you products that combine elegance, function, and exceptional value.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 mt-10 border-y" style={{ borderColor: COLORS.line }}>
        {STATS.map((s, i) => (
          <div key={i} className={`text-center px-2 ${i < STATS.length - 1 ? "ticket-seam" : ""}`}>
            <s.icon size={22} color={COLORS.accent} className="mx-auto mb-2" />
            <div className="font-display font-bold text-2xl" style={{ color: COLORS.ink }}>{s.value}</div>
            <div className="text-xs" style={{ color: COLORS.muted }}>{s.label}</div>
          </div>
        ))}
      </div>

      <p className="font-display text-xl italic text-center mt-10" style={{ color: COLORS.ink }}>
        Carry with confidence. Carry Bagstuff.
      </p>
    </div>
  );
}
