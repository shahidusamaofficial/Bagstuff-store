import { supabase } from "@/lib/supabaseClient";
import ShopClient from "./ShopClient";

export const revalidate = 60;

export default async function ShopPage({ searchParams }) {
  const { data: categories } = await supabase.from("categories").select("*");
  const { data: products } = await supabase.from("products").select("*, categories(*)");

  return (
    <ShopClient
      key={`${searchParams.category || "all"}-${searchParams.q || ""}`}
      categories={categories || []}
      products={products || []}
      initialCategory={searchParams.category || null}
      initialQuery={searchParams.q || ""}
    />
  );
}
