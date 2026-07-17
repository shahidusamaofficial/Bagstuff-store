export default function Plate({ icon: Icon, color, className = "", iconSize = 40, image }) {
  if (image) {
    return (
      <div
        className={`relative flex items-end overflow-hidden ${className}`}
        style={{ backgroundColor: `${color}33` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, transparent 40%, ${color}cc 100%)` }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}dd 0%, ${color}99 100%)` }}
    >
      <div
        className="absolute inset-0 opacity-20 animate-shimmer"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 10px)",
          backgroundSize: "200% 200%",
        }}
      />
      <Icon size={iconSize} color="#fff" strokeWidth={1.4} />
    </div>
  );
}
