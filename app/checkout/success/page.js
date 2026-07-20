import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { COLORS, formatPKR } from "@/lib/tokens";

export default function SuccessPage({ searchParams }) {
  const orderId = searchParams.order;
  const subtotal = Number(searchParams.subtotal);
  const shippingFee = Number(searchParams.shipping);
  const total = Number(searchParams.total);
  const hasBreakdown = Number.isFinite(subtotal) && Number.isFinite(total);

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <CheckCircle2 size={56} color={COLORS.green} className="mx-auto mb-4" />
      <h1 className="font-display font-extrabold text-3xl mb-2" style={{ color: COLORS.ink }}>Order placed!</h1>
      <p className="text-sm mb-6" style={{ color: COLORS.muted }}>Thank you for your order — we&rsquo;ll confirm details on WhatsApp shortly. Have a great day!</p>

      <div className="tag-notch inline-block px-6 py-4 border text-left" style={{ borderColor: COLORS.line, "--tag-hole-bg": "#ffffff" }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-center mb-1" style={{ color: COLORS.brass }}>Order number</div>
        <div className="font-mono font-bold text-lg text-center" style={{ color: COLORS.ink }}>#{orderId}</div>

        {hasBreakdown && (
          <div className="flex flex-col gap-1 text-sm mt-4 pt-3 border-t border-dashed min-w-[220px]" style={{ borderColor: COLORS.line }}>
            <div className="flex justify-between" style={{ color: COLORS.muted }}>
              <span>Subtotal</span><span className="font-mono">{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between" style={{ color: COLORS.muted }}>
              <span>Shipping</span>
              <span className="font-mono">{shippingFee === 0 ? "Free" : formatPKR(shippingFee)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-1.5 border-t border-dashed" style={{ borderColor: COLORS.line, color: COLORS.ink }}>
              <span>Total</span><span className="font-mono">{formatPKR(total)}</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <Link href="/" className="shine-btn font-semibold text-sm text-white px-6 py-3 rounded-full inline-block mt-8 transition-all hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: COLORS.accent }}>
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
