"use client";
import { useEffect, useState } from "react";
import { getRecentlyViewed } from "@/lib/recentlyViewed";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function RecentlyViewed({ excludeId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getRecentlyViewed(excludeId));
  }, [excludeId]);

  if (items.length === 0) return null;

  return (
    <div className="mt-16">
      <SectionHeading eyebrow="Picking up where you left off" title="Recently viewed" />
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
