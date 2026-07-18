"use client";

// Next.js re-mounts template.js on every navigation, giving every route
// a soft fade+rise transition without any extra animation library.
export default function Template({ children }) {
  return <div className="page-transition">{children}</div>;
}
