"use client";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { COLORS, formatPKR } from "@/lib/tokens";
import { getIcon } from "@/lib/icons";
import Plate from "./Plate";
import { useCart } from "./CartContext";

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, removeItem, subtotal } = useCart();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: COLORS.line }}>
          <h3 className="font-bold text-xl" style={{ color: COLORS.ink }}>Your Cart</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <p className="text-sm text-center mt-10" style={{ color: COLORS.muted }}>Your cart is empty.</p>
          ) : cart.map((item, idx) => {
            const Icon = getIcon(item.product.categories?.icon);
            const color = item.product.categories?.color || COLORS.muted;
            return (
              <div key={idx} className="flex gap-3">
                <Plate icon={Icon} color={color} iconSize={20} className="h-16 w-16 rounded-lg shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium leading-snug" style={{ color: COLORS.ink }}>{item.product.name}</div>
                  {item.variant && <div className="text-xs" style={{ color: COLORS.muted }}>{item.variant}</div>}
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center border rounded-full" style={{ borderColor: COLORS.line }}>
                      <button onClick={() => updateQty(idx, item.qty - 1)} className="p-1"><Minus size={12} /></button>
                      <span className="font-mono text-xs w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(idx, item.qty + 1)} className="p-1"><Plus size={12} /></button>
                    </div>
                    <span className="font-mono text-sm font-semibold" style={{ color: COLORS.ink }}>{formatPKR(item.product.price * item.qty)}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(idx)} className="self-start"><Trash2 size={15} color={COLORS.muted} /></button>
              </div>
            );
          })}
        </div>
        {cart.length > 0 && (
          <div className="p-4 border-t" style={{ borderColor: COLORS.line }}>
            <div className="flex justify-between text-sm mb-3" style={{ color: COLORS.ink }}>
              <span>Subtotal</span><span className="font-mono font-bold">{formatPKR(subtotal)}</span>
            </div>
            <Link href="/checkout" onClick={onClose} className="w-full block text-center font-semibold text-sm text-white py-3 rounded-full" style={{ backgroundColor: COLORS.accent }}>
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
