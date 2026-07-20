"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { COLORS } from "@/lib/tokens";
import { supabase } from "@/lib/supabaseClient";
import LiquidGlass from "./LiquidGlass";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and query.");
      return;
    }
    setSubmitting(true);
    const { error: insertError } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    });
    setSubmitting(false);
    if (insertError) {
      setError("Something went wrong sending your message — please try WhatsApp or email above instead.");
      return;
    }
    setSubmitted(true);
    setForm(initialForm);
  };

  if (submitted) {
    return (
      <LiquidGlass as="div" options={{ scale: -70, chroma: 4, radius: 16 }} className="glass tag-notch p-6 flex items-start gap-3" style={{ "--tag-hole-bg": "rgba(255,255,255,0.75)" }}>
        <span className="h-9 w-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.green}1a` }}>
          <Check size={18} color={COLORS.green} />
        </span>
        <div>
          <div className="font-display font-bold text-lg" style={{ color: COLORS.ink }}>Message sent</div>
          <p className="text-sm mt-1" style={{ color: COLORS.muted }}>
            Thanks for reaching out — we&rsquo;ll get back to you shortly.
          </p>
          <button onClick={() => setSubmitted(false)} className="text-sm font-medium mt-3 hover:underline" style={{ color: COLORS.accent }}>
            Send another message
          </button>
        </div>
      </LiquidGlass>
    );
  }

  return (
    <LiquidGlass as="form" onSubmit={handleSubmit} options={{ scale: -70, chroma: 4, radius: 16 }} className="glass tag-notch p-6 flex flex-col gap-4" style={{ "--tag-hole-bg": "rgba(255,255,255,0.75)" }}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium block mb-1" style={{ color: COLORS.ink }}>Name</label>
          <input
            id="contact-name"
            value={form.name}
            onChange={update("name")}
            placeholder="Your full name"
            required
            className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#A15864]/30"
            style={{ borderColor: COLORS.line }}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium block mb-1" style={{ color: COLORS.ink }}>Email</label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            required
            className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#A15864]/30"
            style={{ borderColor: COLORS.line }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-phone" className="text-sm font-medium block mb-1" style={{ color: COLORS.ink }}>Phone number <span className="font-normal" style={{ color: COLORS.muted }}>(optional)</span></label>
        <input
          id="contact-phone"
          value={form.phone}
          onChange={update("phone")}
          placeholder="03XXXXXXXXX"
          className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#A15864]/30"
          style={{ borderColor: COLORS.line }}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium block mb-1" style={{ color: COLORS.ink }}>Your query</label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us what you need help with…"
          required
          rows={4}
          className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none resize-none focus:ring-2 focus:ring-[#A15864]/30"
          style={{ borderColor: COLORS.line }}
        />
      </div>

      {error && <p className="text-sm" style={{ color: "#D64545" }}>{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="shine-btn font-semibold text-sm text-white py-3 rounded-full disabled:opacity-50 transition-all hover:-translate-y-0.5 shadow-lg self-start px-6"
        style={{ backgroundColor: COLORS.accent }}
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </LiquidGlass>
  );
}
