import { COLORS } from "@/lib/tokens";
import Stars from "./Stars";

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
      <h2 className="font-display font-bold text-3xl mb-1" style={{ color: COLORS.ink }}>What our customers are saying</h2>
      <p className="text-sm mb-8" style={{ color: COLORS.muted }}>Real feedback from customers across Pakistan</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="p-5 rounded-xl border bg-white flex flex-col gap-3" style={{ borderColor: COLORS.line }}>
            <Stars rating={t.rating} />
            <p className="text-sm leading-relaxed" style={{ color: COLORS.ink }}>"{t.text}"</p>
            <div className="flex items-center gap-2 mt-auto pt-1">
              <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: COLORS.accent }}>
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
