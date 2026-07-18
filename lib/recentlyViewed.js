const KEY = "bagstuff_recently_viewed";
const MAX_ITEMS = 8;

export function trackRecentlyViewed(product) {
  if (typeof window === "undefined") return;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    const withoutCurrent = saved.filter((p) => p.id !== product.id);
    const updated = [product, ...withoutCurrent].slice(0, MAX_ITEMS);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch (e) {}
}

export function getRecentlyViewed(excludeId) {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    return saved.filter((p) => p.id !== excludeId);
  } catch (e) {
    return [];
  }
}
