"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { COLORS, formatPKR } from "@/lib/tokens";
import { getIcon } from "@/lib/icons";
import ProductCard from "@/components/ProductCard";

export default function ShopClient({ categories, products, initialCategory, initialQuery }) {
  const categoryId = initialCategory;
  const searchQuery = initialQuery || "";

  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const cat = categoryId ? categories.find((c) => c.id === categoryId) : null;
  const CatIcon = cat ? getIcon(cat.icon) : null;

  const base = useMemo(() => {
    let list = products;
    if (categoryId) list = list.filter((p) => p.category_id === categoryId);
    if (searchQuery) list = list.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return list;
  }, [products, categoryId, searchQuery]);

  const filtered = useMemo(() => {
    let list = base.filter((p) => p.price <= maxPrice && p.rating >= minRating && (!inStockOnly || p.in_stock));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [base, sort, maxPrice, minRating, inStockOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-1.5 text-sm flex-wrap" style={{ color: COLORS.muted }}>
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight size={13} />
        <Link href="/shop" className="hover:underline">Shop</Link>
        {cat && <><ChevronRight size={13} /><span style={{ color: COLORS.ink }}>{cat.name}</span></>}
        {searchQuery && <><ChevronRight size={13} /><span style={{ color: COLORS.ink }}>Search: "{searchQuery}"</span></>}
      </div>

      <div
        className="mt-4 mb-8 rounded-2xl overflow-hidden relative h-44 flex items-end"
        style={{
          backgroundColor: cat ? cat.color : COLORS.deep,
          backgroundImage: cat?.image_url ? `url(${cat.image_url})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {cat?.image_url && (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(0deg, ${cat.color}E6 0%, ${cat.color}99 55%, ${cat.color}4D 100%)` }}
          />
        )}
        <div className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            {cat && <CatIcon size={22} color="#fff" />}
            <h1 className="font-display font-extrabold text-3xl text-white">
              {cat ? cat.name : searchQuery ? `Results for "${searchQuery}"` : "All Products"}
            </h1>
          </div>
          <p className="text-sm text-white/80">{filtered.length} of {base.length} products shown</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        <aside className="flex flex-col gap-6">
          <div>
            <div className="font-semibold text-sm mb-3" style={{ color: COLORS.ink }}>Category</div>
            <div className="flex flex-col gap-2">
              <Link href="/shop" className="text-sm text-left" style={{ color: !categoryId ? COLORS.accent : COLORS.muted, fontWeight: !categoryId ? 600 : 400 }}>All products</Link>
              {categories.map((c) => (
                <Link key={c.id} href={`/shop?category=${c.id}`} className="text-sm text-left flex items-center gap-2" style={{ color: categoryId === c.id ? COLORS.ink : COLORS.muted, fontWeight: categoryId === c.id ? 600 : 400 }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />{c.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3" style={{ color: COLORS.ink }}>Max price</div>
            <input type="range" min="500" max="15000" step="250" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-orange-500" />
            <div className="font-mono text-xs mt-1" style={{ color: COLORS.muted }}>Up to {formatPKR(maxPrice)}</div>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3" style={{ color: COLORS.ink }}>Minimum rating</div>
            <div className="flex flex-col gap-1.5">
              {[0, 4, 4.5].map((r) => (
                <button key={r} onClick={() => setMinRating(r)} className="text-sm text-left" style={{ color: minRating === r ? COLORS.ink : COLORS.muted, fontWeight: minRating === r ? 600 : 400 }}>
                  {r === 0 ? "Any rating" : `${r}+ stars`}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: COLORS.ink }}>
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
            In stock only
          </label>
        </aside>

        <div>
          <div className="flex items-center justify-end mb-4">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded-lg px-3 py-1.5 text-sm outline-none" style={{ borderColor: COLORS.line, color: COLORS.ink }}>
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-sm" style={{ color: COLORS.muted }}>No products match these filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
