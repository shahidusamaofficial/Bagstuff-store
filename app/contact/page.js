import { MessageCircle, Mail } from "lucide-react";
import { COLORS } from "@/lib/tokens";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="relative max-w-3xl mx-auto px-4 py-16 md:py-20 overflow-hidden">
      <div className="absolute -top-16 -right-20 h-72 w-72 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none" style={{ backgroundColor: COLORS.accentDecorative }} />
      <div className="absolute bottom-0 -left-20 h-64 w-64 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none" style={{ backgroundColor: COLORS.brass, animationDelay: "1.5s" }} />

      <div className="relative">
        <div className="stitch-rule mb-3">
          <span className="rivet" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] shrink-0" style={{ color: COLORS.brass }}>
            We reply fast
          </span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: COLORS.ink }}>Get in touch</h1>
        <p className="text-sm leading-relaxed max-w-lg mb-10" style={{ color: COLORS.muted }}>
          Questions about sizing, an order, or a custom request — reach us however&rsquo;s easiest. We look forward to hearing from you.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a
            href="https://wa.me/923016337624"
            target="_blank"
            rel="noopener noreferrer"
            className="glass tag-notch group flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="h-11 w-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.green}1a` }}>
              <MessageCircle size={20} color={COLORS.green} />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] mb-1" style={{ color: COLORS.muted }}>WhatsApp</div>
              <div className="font-semibold text-sm" style={{ color: COLORS.ink }}>+92 301 6337624</div>
              <div className="text-xs mt-1" style={{ color: COLORS.muted }}>Fastest way to reach us</div>
            </div>
          </a>
          <a
            href="mailto:bagstuffhelp@gmail.com"
            className="glass tag-notch group flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="h-11 w-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.accent}1a` }}>
              <Mail size={20} color={COLORS.accent} />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] mb-1" style={{ color: COLORS.muted }}>Email</div>
              <div className="font-semibold text-sm break-all" style={{ color: COLORS.ink }}>bagstuffhelp@gmail.com</div>
              <div className="text-xs mt-1" style={{ color: COLORS.muted }}>Usually within a day</div>
            </div>
          </a>
        </div>

        <div className="stitch-rule mb-4">
          <span className="rivet" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] shrink-0" style={{ color: COLORS.brass }}>
            Or write to us directly
          </span>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
