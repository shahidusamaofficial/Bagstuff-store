"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { COLORS } from "@/lib/tokens";
import { getIcon } from "@/lib/icons";
import { useCart } from "./CartContext";

export default function Header({ categories, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { cartCount } = useCart();
  const router = useRouter();

  const doSearch = () => {
    if (query.trim()) router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <div className="w-full py-2 px-4 text-center text-xs tracking-wide" style={{ backgroundColor: COLORS.deep, color: "#fff" }}>
        Cash on Delivery Available Nationwide &nbsp;•&nbsp; Free shipping on orders over PKR 5,000
      </div>
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur" style={{ borderColor: COLORS.line }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" className="font-extrabold text-2xl tracking-tight flex items-center gap-1.5 shrink-0" style={{ color: COLORS.ink }}>
            <span style={{ color: COLORS.accent }}>Bag</span>stuff
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-2">
            <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
              <button className="text-sm font-medium flex items-center gap-1 py-2" style={{ color: COLORS.ink }}>
                Shop <ChevronDown size={14} />
              </button>
              {menuOpen && (
                <div className="absolute top-full left-0 bg-white border rounded-xl shadow-xl p-3 grid grid-cols-2 gap-1 w-[420px]" style={{ borderColor: COLORS.line }}>
                  {categories.map((c) => {
                    const Icon = getIcon(c.icon);
                    return (
                      <Link key={c.id} href={`/shop?category=${c.id}`} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 text-left">
                        <span className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${c.color}22` }}>
                          <Icon size={16} color={c.color} />
                        </span>
                        <span className="text-sm" style={{ color: COLORS.ink }}>{c.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <Link href="/about" className="text-sm font-medium" style={{ color: COLORS.ink }}>About</Link>
            <Link href="/contact" className="text-sm font-medium" style={{ color: COLORS.ink }}>Contact</Link>
          </div>

          <div className="flex-1 flex items-center max-w-md ml-auto">
            <div className="w-full relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color={COLORS.muted} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                placeholder="Search products…"
                className="w-full pl-9 pr-3 py-2 rounded-full border text-sm outline-none focus:ring-2"
                style={{ borderColor: COLORS.line, backgroundColor: COLORS.paper }}
              />
            </div>
          </div>

          <button onClick={onOpenCart} className="relative shrink-0 p-2 rounded-full hover:bg-gray-50">
            <ShoppingCart size={22} color={COLORS.ink} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: COLORS.accent, height: 18 }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t px-4 py-3 flex flex-col gap-1" style={{ borderColor: COLORS.line }}>
            {categories.map((c) => (
              <Link key={c.id} href={`/shop?category=${c.id}`} className="flex items-center gap-2 py-2 text-left" onClick={() => setMobileOpen(false)}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-sm">{c.name}</span>
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
