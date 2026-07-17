import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { COLORS } from "@/lib/tokens";
import { getIcon } from "@/lib/icons";
import Plate from "@/components/Plate";
import ProductCard from "@/components/ProductCard";
import TrustRow from "@/components/TrustRow";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";

export const revalidate = 60; // refresh product data every minute

export default async function HomePage() {
  const { data: categories } = await supabase.from("categories").select("*");
  const { data: products } = await supabase.from("products").select("*, categories(*)");

  const cats = categories || [];
  const all = products || [];
  const heroCats = (cats.filter((c) => c.featured).length > 0 ? cats.filter((c) => c.featured) : cats).slice(0, 4);
  const featured = all.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const arrivals = all.filter((p) => p.badge === "New").concat(all.slice(0, 4)).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(20,15,14,0.82) 0%, rgba(20,15,14,0.6) 45%, rgba(20,15,14,0.25) 75%, rgba(20,15,14,0.15) 100%)",
          }}
        />
        {/* Soft drifting ambient blobs for continuous subtle movement */}
        <div
          className="absolute -top-16 -left-10 h-72 w-72 rounded-full blur-3xl opacity-30 animate-blob pointer-events-none"
          style={{ backgroundColor: COLORS.accent }}
        />
        <div
          className="absolute -bottom-20 right-10 h-80 w-80 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none"
          style={{ backgroundColor: COLORS.green, animationDelay: "4s", animationDirection: "reverse" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="fade-in-up font-mono text-xs uppercase tracking-widest px-2 py-1 rounded inline-block" style={{ color: "#fff", backgroundColor: `${COLORS.accent}55` }}>
              {cats.length} collections · {all.length}+ pieces
            </span>
            <h1 className="fade-in-up font-display font-extrabold text-5xl md:text-6xl leading-[0.95] mt-4 text-white" style={{ animationDelay: "0.1s" }}>
              Bags and jewellery, made for everyday and every occasion.
            </h1>
            <p className="fade-in-up text-base mt-4 max-w-md text-white/80" style={{ animationDelay: "0.2s" }}>
              Handbags, totes, crossbody bags, and jewellery — designed to last, delivered nationwide with Cash on Delivery.
            </p>
            <div className="fade-in-up flex items-center gap-3 mt-6" style={{ animationDelay: "0.3s" }}>
              <Link href="/shop" className="shine-btn font-semibold text-sm text-white px-6 py-3 rounded-full hover:opacity-90 transition-all hover:-translate-y-0.5" style={{ backgroundColor: COLORS.accent }}>
                Shop the collection
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {heroCats.map((c, i) => {
              const Icon = getIcon(c.icon);
              return (
                <div key={c.id} className="fade-in-up" style={{ animationDelay: `${0.15 * i}s` }}>
                  <div className="animate-float" style={{ animationDelay: `${i * 0.7}s` }}>
                    <Link href={`/shop?category=${c.id}`} className="block">
                      <Plate icon={Icon} color={c.color} image={c.image_url} iconSize={34} className="h-32 rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="font-display font-bold text-3xl mb-6" style={{ color: COLORS.ink }}>Shop by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c, i) => {
            const Icon = getIcon(c.icon);
            const count = all.filter((p) => p.category_id === c.id).length;
            return (
              <Reveal key={c.id} delay={i * 60}>
                <Link
                  href={`/shop?category=${c.id}`}
                  className="text-left rounded-xl border bg-white p-4 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  style={{ borderTop: `4px solid ${c.color}`, borderLeftColor: COLORS.line, borderRightColor: COLORS.line, borderBottomColor: COLORS.line }}
                >
                  <span className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}1f` }}>
                    <Icon size={20} color={c.color} />
                  </span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: COLORS.ink }}>{c.name}</div>
                    <div className="font-mono text-xs mt-0.5" style={{ color: COLORS.muted }}>{count} products</div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      <TrustRow />

      {featured.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-3xl" style={{ color: COLORS.ink }}>Bestsellers</h2>
            <Link href="/shop" className="text-sm font-medium flex items-center gap-1" style={{ color: COLORS.accent }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <div className="w-full" style={{ backgroundColor: COLORS.deep }}>
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-3xl text-white">Up to 20% off Clutches & Wallets</h3>
            <p className="text-sm text-white/60 mt-1">Limited-time pricing on our evening and everyday essentials.</p>
          </div>
          <Link href="/shop?category=clutches" className="shine-btn font-semibold text-sm px-6 py-3 rounded-full shrink-0 transition-all duration-300 hover:-translate-y-0.5" style={{ backgroundColor: COLORS.accent, color: "#fff" }}>
            Shop the deal
          </Link>
        </div>
      </div>

      {arrivals.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="font-display font-bold text-3xl mb-6" style={{ color: COLORS.ink }}>New arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {arrivals.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <Testimonials />
    </div>
  );
}
