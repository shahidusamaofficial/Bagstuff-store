import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";
import { COLORS } from "@/lib/tokens";

export default function TrustRow() {
  const items = [
    { icon: Truck, label: "Fast Delivery", sub: "4–5 days nationwide" },
    { icon: ShieldCheck, label: "Quality Checked", sub: "Inspected before dispatch" },
    { icon: CreditCard, label: "Secure Payments", sub: "COD, cards & wallets" },
    { icon: Headphones, label: "Customer Care", sub: "Quick replies on WhatsApp" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.deep}14` }}>
            <it.icon size={20} color={COLORS.deep} />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: COLORS.ink }}>{it.label}</div>
            <div className="text-xs" style={{ color: COLORS.muted }}>{it.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
