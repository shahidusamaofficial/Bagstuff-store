"use client";
import { useEffect, useState } from "react";
import { COLORS } from "@/lib/tokens";
import { getRecentlyViewed } from "@/lib/recentlyViewed";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function RecentlyViewed({ excludeId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getRecentlyViewed(excludeId));
  }, [excludeId]);

  if (items.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="font-display font-bold text-2xl mb-5" style={{ color: COLORS.ink }}>Recently viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
