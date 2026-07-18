// Animates a cloned image flying from its current position into the header cart icon.
// fromRect: DOMRect of the starting element. imgSrc: image url to clone (optional).
export function flyToCart(fromRect, imgSrc) {
  if (typeof window === "undefined" || !fromRect) return;
  const target = document.getElementById("header-cart-icon");
  if (!target) return;
  const targetRect = target.getBoundingClientRect();

  const ghost = document.createElement(imgSrc ? "img" : "div");
  if (imgSrc) ghost.src = imgSrc;
  ghost.className = "fly-to-cart";
  Object.assign(ghost.style, {
    left: `${fromRect.left}px`,
    top: `${fromRect.top}px`,
    width: `${fromRect.width}px`,
    height: `${fromRect.height}px`,
    objectFit: "cover",
    opacity: "1",
    backgroundColor: imgSrc ? "transparent" : "#B76E79",
  });
  document.body.appendChild(ghost);

  // Force layout so the browser registers the start position before animating
  requestAnimationFrame(() => {
    ghost.style.left = `${targetRect.left + targetRect.width / 2 - 12}px`;
    ghost.style.top = `${targetRect.top + targetRect.height / 2 - 12}px`;
    ghost.style.width = "24px";
    ghost.style.height = "24px";
    ghost.style.opacity = "0.2";
    ghost.style.borderRadius = "50%";
  });

  setTimeout(() => ghost.remove(), 750);
}
