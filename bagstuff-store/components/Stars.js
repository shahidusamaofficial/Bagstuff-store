import { Star } from "lucide-react";
import { COLORS } from "@/lib/tokens";

export default function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? COLORS.accent : "none"}
          color={i <= Math.round(rating) ? COLORS.accent : COLORS.line}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
