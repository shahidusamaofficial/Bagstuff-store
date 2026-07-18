export default function LoadingProduct() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="skeleton h-4 w-52 rounded mb-6" />
      <div className="grid md:grid-cols-2 gap-10">
        <div className="skeleton h-96 w-full rounded-2xl" />
        <div className="flex flex-col gap-4">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton h-8 w-3/4 rounded" />
          <div className="skeleton h-6 w-32 rounded" />
          <div className="skeleton h-24 w-full rounded" />
          <div className="skeleton h-12 w-full rounded-full mt-4" />
        </div>
      </div>
    </div>
  );
}
