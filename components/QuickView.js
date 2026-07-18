"use client";
import { useState } from "react";
import Link from "next/link";
import { X, Minus, Plus, Check } from "lucide-react";
import { COLORS, formatPKR } from "@/lib/tokens";
import { getIcon } from "@/lib/icons";
import Plate from "./Plate";
import Stars from "./Stars";
import { useCart } from "./CartContext";
import { flyToCart } from "@/lib/flyToCart";

export default function QuickView({ product, onClose }) {
  const cat = product.categories;
  const Icon = getIcon(cat?.icon);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.variants?.[0] || null);
  const [added, setAdded] = useState(false);

  const activeImage = (variant && product.images?.[variant]) || product.image_url;

  const handleAdd = (e) => {
    const rect = e.currentTarget.closest(".quickview-panel")?.querySelector("img")?.getBoundingClientRect();
    if (rect) flyToCart(rect, activeImage);
    addToCart(product, qty, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="quickview-panel relative bg-white rounded-2xl max-w-2xl w-full grid sm:grid-cols-2 gap-6 p-5 shadow-2xl page-transition max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 z-10">
          <X size={18} />
        </button>

        <div className="h-64 sm:h-full rounded-xl overflow-hidden">
          {activeImage ? (
            <img src={activeImage} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <Plate icon={Icon} color={cat?.color} iconSize={48} className="h-full w-full" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide" style={{ color: COLORS.muted }}>{cat?.name}</span>
          <h3 className="font-display font-bold text-xl mt-1" style={{ color: COLORS.ink }}>{product.name}</h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Stars rating={product.rating} size={13} />
            <span className="font-mono text-xs" style={{ color: COLORS.muted }}>({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-mono font-bold text-2xl" style={{ color: COLORS.ink }}>{formatPKR(product.price)}</span>
            {product.old_price && <span className="font-mono text-sm line-through" style={{ color: COLORS.muted }}>{formatPKR(product.old_price)}</span>}
          </div>

          {product.stock_count != null && product.stock_count > 0 && product.stock_count <= 5 && (
            <span className="text-xs font-semibold mt-2" style={{ color: COLORS.accent }}>Only {product.stock_count} left in stock</span>
          )}

          {product.variants?.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-4">
              {product.variants.map((v) => (
                <button key={v} onClick={() => setVariant(v)} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: v === variant ? COLORS.accent : COLORS.line, color: v === variant ? COLORS.accent : COLORS.ink, backgroundColor: v === variant ? `${COLORS.accent}0f` : "transparent" }}>
                  {v}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 mt-5">
            <div className="flex items-center border rounded-full" style={{ borderColor: COLORS.line }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5"><Minus size={14} /></button>
              <span className="font-mono text-sm w-6 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2.5"><Plus size={14} /></button>
            </div>
            <button
              disabled={!product.in_stock}
              onClick={handleAdd}
              className="flex-1 font-semibold text-sm text-white py-2.5 rounded-full disabled:opacity-40 flex items-center justify-center gap-2 transition-colors"
              style={{ backgroundColor: added ? COLORS.green : COLORS.accent }}
            >
              {added ? <><Check size={16} /> Added</> : product.in_stock ? "Add to cart" : "Out of stock"}
            </button>
          </div>

          <Link href={`/product/${product.id}`} className="text-sm mt-4 hover:underline" style={{ color: COLORS.accent }}>
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
}
