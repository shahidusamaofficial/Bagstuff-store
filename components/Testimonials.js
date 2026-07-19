import { COLORS } from "@/lib/tokens";
import Stars from "./Stars";
import SectionHeading from "./SectionHeading";

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
    <div className="max-w-7xl mx-auto px-4 py-14">
      <SectionHeading eyebrow="From our customers" title="What people are saying" />
      <p className="text-sm mb-8 -mt-4" style={{ color: COLORS.muted }}>Real feedback from customers across Pakistan</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="tag-notch p-5 pr-8 border bg-white flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ borderColor: COLORS.line, "--tag-hole-bg": COLORS.paper }}
          >
            <Stars rating={t.rating} />
            <p className="font-display text-lg italic leading-snug" style={{ color: COLORS.ink }}>&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-2 mt-auto pt-1">
              <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0" style={{ backgroundColor: COLORS.accent }}>
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className="text-sm font-medium" style={{ color: COLORS.ink }}>{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
