import { ShoppingBag, Briefcase, Package, Wallet, Backpack, CircleDot, Gem, Sparkles, Package as Fallback } from "lucide-react";

export const ICONS = { ShoppingBag, Briefcase, Package, Wallet, Backpack, CircleDot, Gem, Sparkles };

export function getIcon(name) {
  return ICONS[name] || Fallback;
}
