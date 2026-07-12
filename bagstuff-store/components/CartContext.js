"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved cart on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bagstuff_cart");
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
    setLoaded(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (loaded) localStorage.setItem("bagstuff_cart", JSON.stringify(cart));
  }, [cart, loaded]);

  const addToCart = (product, qty = 1, variant = null) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.variant === variant);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { product, qty, variant }];
    });
  };

  const updateQty = (idx, qty) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((it, i) => (i === idx ? { ...it, qty } : it)));
  };

  const removeItem = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
