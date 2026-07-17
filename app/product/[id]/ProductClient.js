"use client";
import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Heart, MessageCircle, Truck, ShieldCheck, CreditCard, Headphones, Check, ChevronRight } from "lucide-react";
import { COLORS, formatPKR } from "@/lib/tokens";
import { getIcon } from "@/lib/icons";
import Plate from "@/components/Plate";
import Stars from "@/components/Stars";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";

export default function ProductClient({ product, related }) {
  const cat = product.categories;
  const Icon = getIcon(cat?.icon);
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.variants?.[0] || null);
  const [tab, setTab] = useState("description");
  const [added, setAdded] = useState(false);

  const variantImages = product.images || {};
  // Gallery: one thumbnail per variant that has its own photo, falling back to the main image_url
  const gallery = product.variants?.length
    ? product.variants.map((v) => ({ variant: v, url: variantImages[v] || product.image_url }))
    : [];
  const activeImage = (variant && variantImages[variant]) || product.image_url;

  const tabs = {
    description: product.description || `${product.name} is made with durable materials and reinforced stitching, built to hold up to daily use.`,
    specifications: product.specifications || `SKU: ${product.sku}  ·  Category: ${cat?.name}  ·  Rating: ${product.rating}/5 from ${product.reviews} reviews  ·  Warranty: 6 months against manufacturing defects.`,
    shipping: product.shipping_info || `Ships within 1–2 business days. Delivery in 2–4 days nationwide. Cash on Delivery available on this item, along with card and wallet payments. Every order is gift-wrapped on request.`,
    reviews: `${product.reviews} verified customers rated this product ${product.rating} out of 5 on average.`,
  };

  // Renders text with lines starting in "-" or "•" as a bullet list; other lines as paragraphs
  function renderFormattedText(text) {
    const lines = String(text).split("\n").map((l) => l.trim()).filter(Boolean);
    const blocks = [];
    let currentList = null;
    lines.forEach((line) => {
      const isBullet = /^[-•]\s*/.test(line);
      if (isBullet) {
        if (!currentList) { currentList = []; blocks.push(currentList); }
        currentList.push(line.replace(/^[-•]\s*/, ""));
      } else {
        currentList = null;
        blocks.push(line);
      }
    });
    return blocks.map((block, i) =>
      Array.isArray(block) ? (
        <ul key={i} className="list-disc pl-5 space-y-1 my-2">
          {block.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      ) : (
        <p key={i} className="my-2 first:mt-0">{block}</p>
      )
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-1.5 text-sm flex-wrap" style={{ color: COLORS.muted }}>
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight size={13} />
        <Link href={`/shop?category=${cat?.id}`} className="hover:underline">{cat?.name}</Link>
        <ChevronRight size={13} />
        <span style={{ color: COLORS.ink }}>{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="flex flex-col gap-3">
          {activeImage ? (
            <img src={activeImage} alt={product.name} className="h-96 w-full object-cover rounded-2xl" />
          ) : (
            <Plate icon={Icon} color={cat?.color} iconSize={64} className="h-96 rounded-2xl" />
          )}
          {gallery.length > 1 && (
            <div className="flex gap-2">
              {gallery.map((g) => (
                <button
                  key={g.variant}
                  onClick={() => setVariant(g.variant)}
                  className="h-16 w-16 rounded-lg overflow-hidden border-2 shrink-0"
                  style={{ borderColor: variant === g.variant ? COLORS.accent : COLORS.line }}
                >
                  {g.url ? (
                    <img src={g.url} alt={g.variant} className="h-full w-full object-cover" />
                  ) : (
                    <Plate icon={Icon} color={cat?.color} iconSize={20} className="h-full w-full" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat?.color }} />
            <span className="text-xs uppercase tracking-wide" style={{ color: COLORS.muted }}>{cat?.name}</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl" style={{ color: COLORS.ink }}>{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Stars rating={product.rating} />
            <span className="font-mono text-xs" style={{ color: COLORS.muted }}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="font-mono font-bold text-3xl" style={{ color: COLORS.ink }}>{formatPKR(product.price)}</span>
            {product.old_price && <span className="font-mono text-base line-through" style={{ color: COLORS.muted }}>{formatPKR(product.old_price)}</span>}
          </div>

          {product.variants?.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2" style={{ color: COLORS.ink }}>Color: <span className="font-normal" style={{ color: COLORS.muted }}>{variant}</span></div>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button key={v} onClick={() => setVariant(v)} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: v === variant ? COLORS.accent : COLORS.line, color: v === variant ? COLORS.accent : COLORS.ink, backgroundColor: v === variant ? `${COLORS.accent}0f` : "transparent" }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-6">
            <div className="flex items-center border rounded-full" style={{ borderColor: COLORS.line }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5"><Minus size={14} /></button>
              <span className="font-mono text-sm w-6 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2.5"><Plus size={14} /></button>
            </div>
            <button
              disabled={!product.in_stock}
              onClick={() => { addToCart(product, qty, variant); setAdded(true); setTimeout(() => setAdded(false), 1600); }}
              className="flex-1 font-semibold text-sm text-white py-3 rounded-full disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ backgroundColor: added ? COLORS.green : COLORS.accent }}
            >
              {added ? <><Check size={16} /> Added to cart</> : product.in_stock ? "Add to cart" : "Out of stock"}
            </button>
            <button className="p-3 rounded-full border shrink-0" style={{ borderColor: COLORS.line }}><Heart size={16} color={COLORS.ink} /></button>
          </div>

          <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer" className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-full border" style={{ borderColor: COLORS.green, color: COLORS.green }}>
            <MessageCircle size={16} /> Ask about this product on WhatsApp
          </a>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="flex items-center gap-2 text-xs" style={{ color: COLORS.muted }}><Truck size={15} /> 2–4 day delivery</div>
            <div className="flex items-center gap-2 text-xs" style={{ color: COLORS.muted }}><ShieldCheck size={15} /> 6-month warranty</div>
            <div className="flex items-center gap-2 text-xs" style={{ color: COLORS.muted }}><CreditCard size={15} /> COD available</div>
            <div className="flex items-center gap-2 text-xs" style={{ color: COLORS.muted }}><Headphones size={15} /> Real support</div>
          </div>

          <div className="mt-8 border-t pt-5" style={{ borderColor: COLORS.line }}>
            <div className="flex gap-5 border-b mb-4" style={{ borderColor: COLORS.line }}>
              {Object.keys(tabs).map((t) => (
                <button key={t} onClick={() => setTab(t)} className="text-sm capitalize pb-3 -mb-px border-b-2" style={{ borderColor: tab === t ? COLORS.accent : "transparent", color: tab === t ? COLORS.ink : COLORS.muted, fontWeight: tab === t ? 600 : 400 }}>
                  {t}
                </button>
              ))}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: COLORS.muted }}>{renderFormattedText(tabs[tab])}</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl mb-5" style={{ color: COLORS.ink }}>You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
