import { COLORS } from "@/lib/tokens";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-display font-bold text-4xl mb-4" style={{ color: COLORS.ink }}>Contact Us</h1>
      <p className="text-sm leading-relaxed" style={{ color: COLORS.muted }}>
        WhatsApp: +92 3016337624 &nbsp;·&nbsp; Email: hello@bagstuff.pk
        <br /><br />
        Thank you for contacting us!.
      </p>
    </div>
  );
}
