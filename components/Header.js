"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

  const closeMenuOnEscape = (e) => {
    if (e.key === "Escape") setMenuOpen(false);
  };

  return (
    <>
      <div className="w-full py-2 px-4 flex items-center justify-center gap-2 text-center text-xs tracking-wide font-mono" style={{ backgroundColor: COLORS.deep, color: "#fff" }}>
        <span className="rivet hidden sm:inline-block" />
        Cash on Delivery Available Nationwide &nbsp;•&nbsp; Free shipping on orders over PKR 5,000
      </div>
      <header className="glass sticky top-0 z-40 w-full" style={{ borderColor: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            className="md:hidden p-2.5 -ml-2.5 rounded-full hover:bg-gray-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/logo.png" alt="Bagstuff" width={140} height={87} priority className="h-11 w-auto animate-logo transition-transform duration-300 hover:scale-110" />
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-2">
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
              onFocus={() => setMenuOpen(true)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false); }}
              onKeyDown={closeMenuOnEscape}
            >
              <button
                className="nav-underline text-sm font-medium flex items-center gap-1 py-2"
                style={{ color: COLORS.ink }}
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                Shop <ChevronDown size={14} />
              </button>
              {menuOpen && (
                <div
                  className="fade-in-up absolute top-full left-0 rounded-xl p-3 grid grid-cols-2 gap-1 w-[420px] border"
                  style={{
                    animationDuration: "0.18s",
                    backgroundColor: "#FFFFFF",
                    borderColor: COLORS.line,
                    boxShadow: "0 12px 40px rgba(43,31,36,0.18)",
                  }}
                >
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
            <Link href="/about" className="nav-underline text-sm font-medium py-2" style={{ color: COLORS.ink }}>About</Link>
            <Link href="/contact" className="nav-underline text-sm font-medium py-2" style={{ color: COLORS.ink }}>Contact</Link>
          </div>

          <div className="flex-1 flex items-center max-w-md ml-auto">
            <div className="w-full relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color={COLORS.muted} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                placeholder="Search products…"
                aria-label="Search products"
                type="search"
                className="w-full pl-9 pr-3 py-2 rounded-full border text-sm outline-none focus:ring-2"
                style={{ borderColor: COLORS.line, backgroundColor: COLORS.paper }}
              />
            </div>
          </div>

          <button
            id="header-cart-icon"
            onClick={onOpenCart}
            className="relative shrink-0 p-2.5 rounded-full hover:bg-gray-50 transition-colors"
            aria-label={cartCount > 0 ? `Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}` : "Open cart"}
          >
            <ShoppingCart size={22} color={COLORS.ink} />
            {cartCount > 0 && (
              <span key={cartCount} className="fade-in-up absolute -top-0.5 -right-0.5 min-w-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: COLORS.accent, height: 18 }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-4 py-3 flex flex-col gap-1 border-t" style={{ backgroundColor: "#FFFFFF", borderColor: COLORS.line }}>
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
