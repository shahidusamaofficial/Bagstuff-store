import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { COLORS } from "@/lib/tokens";

export default function SuccessPage({ searchParams }) {
  const orderId = searchParams.order;
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <CheckCircle2 size={56} color={COLORS.green} className="mx-auto mb-4" />
      <h1 className="font-display font-extrabold text-3xl mb-2" style={{ color: COLORS.ink }}>Order placed!</h1>
      <p className="text-sm mb-6" style={{ color: COLORS.muted }}>Thank you for your order — we&rsquo;ll confirm details on WhatsApp shortly. Have a great day!</p>

      <div className="tag-notch inline-block px-6 py-3 border" style={{ borderColor: COLORS.line, "--tag-hole-bg": "#ffffff" }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: COLORS.brass }}>Order number</div>
        <div className="font-mono font-bold text-lg" style={{ color: COLORS.ink }}>#{orderId}</div>
      </div>

      <div>
        <Link href="/" className="shine-btn font-semibold text-sm text-white px-6 py-3 rounded-full inline-block mt-8 transition-all hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: COLORS.accent }}>
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
