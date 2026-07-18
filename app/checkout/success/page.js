import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { COLORS } from "@/lib/tokens";

export default function SuccessPage({ searchParams }) {
  const orderId = searchParams.order;
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <CheckCircle2 size={56} color={COLORS.green} className="mx-auto mb-4" />
      <h1 className="font-display font-extrabold text-3xl mb-2" style={{ color: COLORS.ink }}>Order placed!</h1>
      <p className="text-sm mb-1" style={{ color: COLORS.muted }}>Your order number is <span className="font-mono font-semibold" style={{ color: COLORS.ink }}>#{orderId}</span>.</p>
      <p className="text-sm mb-8" style={{ color: COLORS.muted }}>Thank you for your order, We'll confirm details on WhatsApp shortly.</p>
      <p className="text-sm mb-8" style={{ color: COLORS.muted }}>Have a great day!.</p>
  <Link href="/" className="font-semibold text-sm text-white px-6 py-3 rounded-full inline-block" style={{ backgroundColor: COLORS.accent }}>
        Continue shopping
      </Link>
    </div>
  );
}
