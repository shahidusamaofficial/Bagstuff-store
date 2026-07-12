import { supabase } from "@/lib/supabaseClient";
import ProductClient from "./ProductClient";

export const revalidate = 60;

export default async function ProductPage({ params }) {
  const { data: product } = await supabase.from("products").select("*, categories(*)").eq("id", params.id).single();
  if (!product) {
    return <div className="max-w-3xl mx-auto px-4 py-20 text-center">Product not found.</div>;
  }
  const { data: related } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .limit(4);

  return <ProductClient product={product} related={related || []} />;
}
