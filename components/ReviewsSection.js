"use client";
import { useEffect, useState } from "react";
import { Star, Check } from "lucide-react";
import { COLORS } from "@/lib/tokens";
import { supabase } from "@/lib/supabaseClient";

export default function ReviewsSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .eq("approved", true)
        .order("created_at", { ascending: false });
      setReviews(data || []);
      setLoading(false);
    }
    load();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      product_id: productId,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      approved: false,
    });
    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
      setShowForm(false);
      setName("");
      setComment("");
      setRating(5);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="skeleton h-16 w-full rounded" />
      ) : reviews.length === 0 ? (
        <p className="text-sm" style={{ color: COLORS.muted }}>No reviews yet — be the first to share your thoughts on this product.</p>
      ) : (
        <div className="flex flex-col gap-4 mb-5">
          {reviews.map((r) => (
            <div key={r.id} className="pb-4 border-b" style={{ borderColor: COLORS.line }}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < r.rating ? COLORS.accent : "none"} color={i < r.rating ? COLORS.accent : COLORS.line} />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: COLORS.ink }}>{r.name}</span>
              </div>
              <p className="text-sm mt-1.5" style={{ color: COLORS.muted }}>{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      {submitted ? (
        <p className="text-sm flex items-center gap-1.5" style={{ color: COLORS.green }}>
          <Check size={15} /> Thanks! Your review has been submitted and will appear once approved.
        </p>
      ) : showForm ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2 p-4 rounded-xl border" style={{ borderColor: COLORS.line }}>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button type="button" key={i} onClick={() => setRating(i + 1)} onMouseEnter={() => setHoverRating(i + 1)} onMouseLeave={() => setHoverRating(0)}>
                <Star size={20} fill={i < (hoverRating || rating) ? COLORS.accent : "none"} color={i < (hoverRating || rating) ? COLORS.accent : COLORS.line} />
              </button>
            ))}
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="text-sm px-3 py-2 rounded-lg border outline-none" style={{ borderColor: COLORS.line }} />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience with this product…" required rows={3} className="text-sm px-3 py-2 rounded-lg border outline-none resize-none" style={{ borderColor: COLORS.line }} />
          <div className="flex gap-2">
            <button type="submit" disabled={submitting} className="text-sm font-semibold text-white px-4 py-2 rounded-full disabled:opacity-50" style={{ backgroundColor: COLORS.accent }}>
              {submitting ? "Submitting…" : "Submit review"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-sm px-4 py-2 rounded-full border" style={{ borderColor: COLORS.line, color: COLORS.muted }}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="text-sm font-semibold px-4 py-2 rounded-full border" style={{ borderColor: COLORS.accent, color: COLORS.accent }}>
          Write a review
        </button>
      )}
    </div>
  );
}
