import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import SiteChrome from "@/components/SiteChrome";
import { supabase } from "@/lib/supabaseClient";

export const metadata = {
  title: "Bagstuff — Bags & Jewellery",
  description: "Handbags, totes, crossbody bags, and jewellery — delivered nationwide with Cash on Delivery.",
};

export default async function RootLayout({ children }) {
  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F7F5F1" }}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CartProvider>
          <SiteChrome categories={categories || []}>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
