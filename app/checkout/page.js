"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { COLORS, formatPKR } from "@/lib/tokens";
import { useCart } from "@/components/CartContext";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const placeOrder = async () => {
    setError("");
    if (!form.name || !form.phone || !form.address || !form.city) {
      setError("Please fill in all delivery details.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, cart, paymentMethod }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      clearCart();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return <div className="max-w-2xl mx-auto px-4 py-24 text-center" style={{ color: COLORS.muted }}>Your cart is empty.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-[1fr_320px] gap-10">
      <div>
        <div className="stitch-rule mb-2 max-w-[200px]">
          <span className="rivet" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] shrink-0" style={{ color: COLORS.brass }}>Almost there</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl mb-6" style={{ color: COLORS.ink }}>Checkout</h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: COLORS.ink }}>Full name</label>
            <input value={form.name} onChange={update("name")} className="w-full border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: COLORS.line }} />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: COLORS.ink }}>Phone number</label>
            <input value={form.phone} onChange={update("phone")} placeholder="03XXXXXXXXX" className="w-full border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: COLORS.line }} />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: COLORS.ink }}>Delivery address</label>
            <textarea value={form.address} onChange={update("address")} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: COLORS.line }} />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1" style={{ color: COLORS.ink }}>City</label>
            <input value={form.city} onChange={update("city")} className="w-full border rounded-lg px-3 py-2 text-sm outline-none" style={{ borderColor: COLORS.line }} />
          </div>

          <div className="mt-2">
            <div className="text-sm font-medium mb-2" style={{ color: COLORS.ink }}>Payment method</div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 border rounded-lg px-3 py-2.5 cursor-pointer text-sm" style={{ borderColor: paymentMethod === "cod" ? COLORS.accent : COLORS.line }}>
                <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 border rounded-lg px-3 py-2.5 cursor-pointer text-sm" style={{ borderColor: paymentMethod === "payfast" ? COLORS.accent : COLORS.line }}>
                <input type="radio" checked={paymentMethod === "payfast"} onChange={() => setPaymentMethod("payfast")} />
                Bank Account / JazzCash / EasyPaisa
              </label>
              {paymentMethod === "payfast" && (
                <p className="text-xs" style={{ color: COLORS.muted }}>
We'll reach out to you on Whatsapp to collect payment via Jazzcash/ Easypaisa/ Bank Account.                </p>
              )}
            </div>
          </div>

          {error && <p className="text-sm" style={{ color: "#D64545" }}>{error}</p>}

          <button onClick={placeOrder} disabled={submitting} className="shine-btn mt-2 font-semibold text-sm text-white py-3 rounded-full disabled:opacity-50 transition-all hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: COLORS.accent }}>
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </div>
      </div>

      <div className="tag-notch h-fit border p-4" style={{ borderColor: COLORS.line, "--tag-hole-bg": "#ffffff" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="rivet" />
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: COLORS.muted }}>Order summary</h2>
        </div>
        <div className="flex flex-col gap-3 mb-4">
          {cart.map((item, idx) => {
            const itemImage = (item.variant && item.product.images?.[item.variant]) || item.product.image_url;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 fade-in-up"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0 border" style={{ borderColor: COLORS.line }}>
                  {itemImage ? (
                    <img src={itemImage} alt={item.product.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full" style={{ backgroundColor: COLORS.paper }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm leading-snug truncate" style={{ color: COLORS.ink }}>{item.product.name}</div>
                  <div className="text-xs" style={{ color: COLORS.muted }}>
                    {item.variant && `${item.variant} · `}Qty {item.qty}
                  </div>
                </div>
                <span className="font-mono text-sm shrink-0" style={{ color: COLORS.ink }}>{formatPKR(item.product.price * item.qty)}</span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-dashed pt-3 flex justify-between font-semibold text-sm" style={{ borderColor: COLORS.line, color: COLORS.ink }}>
          <span>Subtotal</span><span className="font-mono">{formatPKR(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
