export default function LoadingHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-10 pb-6 grid md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col gap-4">
        <div className="skeleton h-5 w-40 rounded-full" />
        <div className="skeleton h-14 w-full rounded" />
        <div className="skeleton h-14 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-11 w-44 rounded-full mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
