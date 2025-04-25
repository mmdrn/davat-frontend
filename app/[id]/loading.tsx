export default function Loading() {
  return (
    <div className="container mx-auto">
      <div className="bg-sky-200 text-sky-900 mb-4 py-5 w-full">
        <div className="h-8 bg-sky-300/50 animate-pulse rounded w-3/4 mx-auto" />
      </div>
      <div className="w-[900px] max-w-full mx-auto mb-3">
        <div className="bg-zinc-100 rounded-md px-4 py-2 w-24 h-8 animate-pulse" />
      </div>
      <div className="max-w-full w-[900px] mx-auto">
        <div className="h-40 bg-zinc-100 animate-pulse rounded-lg" />
      </div>

      <div className="mt-8 max-w-full w-[900px] mx-auto">
        <div className="h-8 bg-sky-300/50 animate-pulse rounded w-32 mb-4" />

        <div className="space-y-4">
          <div className="h-24 bg-zinc-100 animate-pulse rounded-lg" />
          <div className="h-24 bg-zinc-100 animate-pulse rounded-lg" />
          <div className="h-24 bg-zinc-100 animate-pulse rounded-lg" />
        </div>

        <div className="mb-4 mt-8">
          <div className="w-full h-32 bg-zinc-100 animate-pulse rounded-xl mb-4" />
          <div className="w-32 h-10 bg-zinc-100 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
}
