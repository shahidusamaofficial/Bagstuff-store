export default function Plate({ icon: Icon, color, className = "", iconSize = 40 }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}dd 0%, ${color}99 100%)` }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 10px)",
        }}
      />
      <Icon size={iconSize} color="#fff" strokeWidth={1.4} />
    </div>
  );
}
