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
        Bagstuff started with a simple idea: everyday bags and jewellery shouldn't mean choosing
        between style and durability. We curate pieces that hold up to daily use without
        compromising on how they look — priced fairly, delivered nationwide with Cash on Delivery.
      </p>
      <p className="text-sm leading-relaxed mb-10" style={{ color: COLORS.muted }}>
        [Replace this paragraph with your real founding story — what got you started, what makes
        your pieces different, and who you're making them for.]
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
