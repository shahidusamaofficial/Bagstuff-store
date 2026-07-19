export const COLORS = {
  ink: "#2B2724",
  paper: "#FBF3EF",
  surface: "#FFFFFF",
  // Darkened from the original #B76E79 (~3.8:1 on white) to pass WCAG AA (4.5:1)
  // for button labels and links, while keeping the same rose hue.
  accent: "#A15864",
  // Original accent, kept for decorative-only use (blobs, translucent chips)
  // where no text sits directly on top and contrast rules don't apply.
  accentDecorative: "#B76E79",
  deep: "#2B1F24",
  line: "#EDE0DA",
  // Darkened from #8F7F78 (~3.8:1 on white) to ~6:1 for secondary/small text.
  muted: "#6E5F58",
  green: "#4F7A6B",
  // Signature "hardware" accent — antique brass, evoking bag clasps and jewellery
  // findings. Decorative only (rivets, stitch-dividers, hairline rules, icon fills
  // on dark backgrounds) — never used for body text, so AA text-contrast rules
  // don't apply, same convention as accentDecorative.
  brass: "#A6803C",
  brassLight: "#D9BC85",
};

export const formatPKR = (n) => "PKR " + Number(n).toLocaleString("en-PK");
