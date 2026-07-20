// Shipping fee logic.
//
// The header/homepage already advertise "Free shipping on orders over
// PKR 5,000" — so that threshold is the one hard rule. Below it, the fee
// is randomized within a realistic courier-rate band rather than a fixed
// number, so it feels closer to real-world variable courier pricing.
// Swap this out for a real rate table (by city/weight/courier) whenever
// you have one — the rest of the app only cares about the returned shape.

export const FREE_SHIPPING_THRESHOLD = 5000;

// Flat bands a real courier might charge for a small parcel nationwide.
const SHIPPING_BANDS = [150, 200, 250, 300];

export function calculateShipping(subtotal) {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return { fee: 0, isFree: true };
  }
  const fee = SHIPPING_BANDS[Math.floor(Math.random() * SHIPPING_BANDS.length)];
  return { fee, isFree: false };
}
