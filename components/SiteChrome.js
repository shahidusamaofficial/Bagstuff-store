"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import { COLORS } from "@/lib/tokens";

export default function SiteChrome({ categories, children }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header categories={categories} onOpenCart={() => setCartOpen(true)} />
      {children}
      <Footer categories={categories} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Replace the href below with your real WhatsApp Business number */}
      <a
        href="https://wa.me/923016337624"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ backgroundColor: COLORS.green }}
      >
        <MessageCircle size={26} color="#fff" />
      </a>
    </div>
  );
}
