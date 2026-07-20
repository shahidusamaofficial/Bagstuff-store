import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { calculateShipping } from "@/lib/shipping";

export async function POST(req) {
  const body = await req.json();
  const { customer, cart, paymentMethod, shippingFee } = body;

  if (!customer?.name || !customer?.phone || !customer?.address || !customer?.city) {
    return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
  }
  if (!cart || cart.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  // Trust a valid client-supplied fee (it was shown to the customer before
  // they placed the order); otherwise compute one fresh so the order is
  // never saved without a shipping charge.
  const shipping_fee = Number.isFinite(shippingFee) && shippingFee >= 0 ? shippingFee : calculateShipping(subtotal).fee;
  const total = subtotal + shipping_fee;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: customer.name,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      payment_method: paymentMethod,
      subtotal,
      shipping_fee,
      total,
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  const items = cart.map((i) => ({
    order_id: order.id,
    product_id: i.product.id,
    product_name: i.product.name,
    variant: i.variant,
    qty: i.qty,
    price: i.product.price,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(items);
  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  // ---------------------------------------------------------------
  // PHASE 2: once your PayFast merchant account is approved, this is
  // where you'd build the PayFast redirect URL using order.id and
  // subtotal, and return { redirectUrl } instead of just the order.
  // For now, card/wallet orders are recorded the same as COD and
  // marked "pending" — you'll confirm payment manually until Phase 2.
  // ---------------------------------------------------------------

  return NextResponse.json({ orderId: order.id, subtotal, shippingFee: shipping_fee, total });
}
