"use client";
import Link from "next/link";
import Plate from "./Plate";
import Stars from "./Stars";
import { COLORS, formatPKR } from "@/lib/tokens";
import { getIcon } from "@/lib/icons";

export default function ProductCard({ product }) {
  const cat = product.categories;
  const Icon = getIcon(cat?.icon);
  const catColor = cat?.color || COLORS.muted;

  return (
    <Link
      href={`/product/${product.id}`}
      className="text-left group flex flex-col rounded-xl overflow-hidden bg-white border transition-all hover:-translate-y-1"
      style={{ borderColor: COLORS.line, boxShadow: "0 1px 2px rgba(27,31,35,0.04)" }}
    >
      <div className="relative h-40 w-full">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <Plate icon={Icon} color={catColor} className="h-full w-full" />
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          {product.badge && (
            <span
              className="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
              style={{ backgroundColor: product.badge === "Sale" ? COLORS.accent : COLORS.deep, color: "#fff" }}
            >
              {product.badge}
            </span>
          )}
          {!product.in_stock && (
            <span className="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-white/90" style={{ color: COLORS.muted }}>
              Out of stock
            </span>
          )}
        </div>
        <span className="absolute bottom-2 right-2 font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/90" style={{ color: COLORS.muted }}>
          {product.sku}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: catColor }} />
          <span className="text-[11px] uppercase tracking-wide" style={{ color: COLORS.muted }}>{cat?.name}</span>
        </div>
        <h3 className="font-medium text-sm leading-snug" style={{ color: COLORS.ink }}>{product.name}</h3>
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} size={12} />
          <span className="font-mono text-[11px]" style={{ color: COLORS.muted }}>({product.reviews})</span>
        </div>
        <div className="mt-auto pt-1 flex items-center gap-2">
          <span className="font-mono font-bold text-base" style={{ color: COLORS.ink }}>{formatPKR(product.price)}</span>
          {product.old_price && (
            <span className="font-mono text-xs line-through" style={{ color: COLORS.muted }}>{formatPKR(product.old_price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
