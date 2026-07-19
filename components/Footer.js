import Link from "next/link";
import { COLORS } from "@/lib/tokens";

export default function Footer({ categories }) {
  return (
    <footer style={{ backgroundColor: COLORS.ink, color: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-extrabold text-2xl mb-3"><span style={{ color: COLORS.accent }}>Bag</span>stuff</div>
          <p className="text-sm text-white/60 leading-relaxed">Bags and jewellery for everyday and occasion wear — delivered nationwide with cash on delivery.</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3"><span className="rivet" /><span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Shop</span></div>
          <div className="flex flex-col gap-2">
            {categories.slice(0, 5).map((c) => (
              <Link key={c.id} href={`/shop?category=${c.id}`} className="text-sm text-white/60 text-left hover:text-white transition-colors">{c.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3"><span className="rivet" /><span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Support</span></div>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <span>Track Order</span><span>Refund Policy</span><span>Shipping Policy</span><span>FAQs</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3"><span className="rivet" /><span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Stay updated</span></div>
          <p className="text-sm text-white/60 mb-3">Email us to get 10% off your first order.</p>
          <div className="flex">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input id="newsletter-email" type="email" placeholder="Email address" className="flex-1 px-3 py-2.5 rounded-l-lg text-sm outline-none text-black" />
            <button type="submit" className="px-4 py-2.5 rounded-r-lg text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: COLORS.accent }}>Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="stitch-rule py-1"><span className="rivet" /></div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Bagstuff. All rights reserved.</span>
          <span className="font-mono">COD • JazzCash • EasyPaisa • Visa/Mastercard</span>
        </div>
      </div>
    </footer>
  );
}
