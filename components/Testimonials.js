import { COLORS } from "@/lib/tokens";
import Stars from "./Stars";
import SectionHeading from "./SectionHeading";
import LiquidGlass from "./LiquidGlass";

const TESTIMONIALS = [
  { name: "Ayesha Siddiqui", text: "The handbag looks even better in person — solid stitching, and it arrived well packaged in two days.", rating: 5 },
  { name: "Zara Ahmed", text: "Ordered the bridal jewellery set for my sister's mehndi, everyone asked where it was from.", rating: 5 },
  { name: "Hina Malik", text: "My go-to for everyday totes now. COD made the first order an easy decision.", rating: 4 },
  { name: "Sana Raza", text: "The pendant necklace is delicate and doesn't tarnish, three months in and still looks new.", rating: 5 },
  { name: "Mehwish Tariq", text: "Crossbody bag is the perfect size — not too small, not bulky. Great for daily use.", rating: 4 },
  { name: "Nida Farooq", text: "Support replied quickly on WhatsApp when I asked about bag dimensions before ordering.", rating: 5 },
];

export default function Testimonials() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 py-14 overflow-hidden">
      {/* Ambient color washes behind the cards — glass needs something with
          color/contrast behind it to actually read as frosted; a flat cream
          page background alone doesn't show it off. */}
      <div className="absolute -top-10 left-0 h-64 w-64 rounded-full blur-3xl opacity-25 animate-blob pointer-events-none" style={{ backgroundColor: COLORS.accentDecorative || COLORS.accent }} />
      <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none" style={{ backgroundColor: COLORS.brass, animationDelay: "2s" }} />

      <div className="relative">
        <SectionHeading eyebrow="From our customers" title="What people are saying" />
        <p className="text-sm mb-8 -mt-4" style={{ color: COLORS.muted }}>Real feedback from customers across Pakistan</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <LiquidGlass
              key={i}
              as="div"
              options={{ scale: -65, chroma: 4, radius: 14 }}
              className="glass tag-notch p-5 pr-8 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ "--tag-hole-bg": "rgba(255,255,255,0.75)" }}
            >
              <Stars rating={t.rating} />
              <p className="font-display text-lg italic leading-snug" style={{ color: COLORS.ink }}>&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-2 mt-auto pt-1">
                <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0" style={{ backgroundColor: COLORS.accent }}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="text-sm font-medium" style={{ color: COLORS.ink }}>{t.name}</span>
              </div>
            </LiquidGlass>
          ))}
        </div>
      </div>
    </div>
  );
}
