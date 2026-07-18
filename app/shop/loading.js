export default function LoadingShop() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="skeleton h-4 w-40 rounded mb-6" />
      <div className="skeleton h-9 w-64 rounded mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: "#EDE0DA" }}>
            <div className="skeleton h-40 w-full" />
            <div className="p-3 flex flex-col gap-2">
              <div className="skeleton h-3 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
              <div className="skeleton h-4 w-1/3 rounded mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
