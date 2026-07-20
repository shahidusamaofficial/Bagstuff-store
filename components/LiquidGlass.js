"use client";
import { useEffect, useRef } from "react";

// Thin wrapper around the vanilla window.liquidGlass() module (loaded via
// <Script src="/liquid-glass.js" strategy="beforeInteractive"> in the root
// layout). Keep this to small/medium elements — the module's own guidance
// is to avoid it on anything larger than ~800px per side (GPU cost from the
// displacement-map canvas + SVG filter). For anything bigger (the sticky
// header, the cart drawer, big modals) we rely on the plain CSS `.glass`
// utility in globals.css instead, which already gives the same frosted
// look this module falls back to on Safari/Firefox anyway.
//
// Visual dressing (tint, border, inset highlight, shadow) is NOT handled
// here — pass the CSS `.glass` / `.glass-dark` class alongside this via
// `className` so the two layer correctly: CSS owns the look, this owns the
// actual backdrop-filter refraction (and overrides CSS's blur once it's
// ready, since inline styles win over stylesheet rules).
export default function LiquidGlass({
  as: Tag = "div",
  options,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined" || typeof window.liquidGlass !== "function") {
      return undefined;
    }
    const instance = window.liquidGlass(ref.current, options);
    return () => instance.destroy();
    // Intentionally mount-once: re-running this on every prop change would
    // tear down and rebuild the SVG filter + displacement map for no visual
    // benefit (the module already re-generates the map itself on resize).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
