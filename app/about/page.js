import { Package, Star, Users, Truck } from "lucide-react";
import { COLORS } from "@/lib/tokens";

const STATS = [
  { icon: Package, value: "1,000+", label: "orders fulfilled" },
  { icon: Star, value: "4.7/5", label: "average rating" },
  { icon: Users, value: "16+", label: "styles in stock" },
  { icon: Truck, value: "2–4 days", label: "average delivery" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-display font-bold text-4xl mb-6" style={{ color: COLORS.ink }}>Our Story</h1>

<p className="text-sm leading-relaxed mb-4" style={{ color: COLORS.muted }}>
  At Bagstuff, we believe a great bag is more than just something you carry—it's something you rely on every single day.
</p
<p className="text-sm leading-relaxed mb-4" style={{ color: COLORS.muted }}>
  Our journey began with a simple observation: finding a stylish, well-made bag at a fair price shouldn't be difficult. Too often, shoppers have to choose between expensive designer labels and low-quality alternatives that don't last. We set out to bridge that gap.
 </p>
<p className="text-sm leading-relaxed mb-10" style={{ color: COLORS.muted }}>
  Every collection is carefully selected with a focus on timeless design, everyday functionality, and lasting quality. Whether you're heading to work, university, traveling, or simply going about your day, Bagstuff is designed to complement your lifestyle without compromising on style or practicality.
</p>
<p className="text-sm leading-relaxed mb-10" style={{ color: COLORS.muted }}>
  We believe in clean aesthetics, thoughtful details, and products that remain relevant beyond passing trends. Our goal isn't to sell the most bags—it's to create a brand people trust whenever they need something they'll enjoy carrying for years to come.
</p>
<p className="text-sm leading-relaxed mb-10" style={{ color: COLORS.muted }}>
  As a proudly Pakistani brand, we're committed to making premium fashion accessories more accessible while delivering a shopping experience that's simple, transparent, and dependable. From carefully packed orders to responsive customer support, every interaction reflects the standards we hold ourselves to.
</p>
<p className="text-sm leading-relaxed mb-10" style={{ color: COLORS.muted }}>
This is only the beginning of our journey. As Bagstuff grows, so will our collections, our community, and our commitment to bringing you products that combine elegance, function, and exceptional value.
</p>
<p className="text-sm leading-relaxed mb-10" style={{ color: COLORS.muted }}>
Thank you for choosing to be part of our story.
</p>
<p className="text-sm leading-relaxed mb-10" style={{ color: COLORS.muted }}>
Carry with confidence. Carry Bagstuff.
</p>
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y" style={{ borderColor: COLORS.line }}>
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <s.icon size={22} color={COLORS.accent} className="mx-auto mb-2" />
            <div className="font-display font-bold text-2xl" style={{ color: COLORS.ink }}>{s.value}</div>
            <div className="text-xs" style={{ color: COLORS.muted }}>{s.label}</div>
          </div>
        ))}
      </div>

      <p className="text-xs mt-8" style={{ color: COLORS.muted }}>
        Update the numbers above in app/about/page.js once you have real figures to show.
      </p>
    </div>
  );
}
