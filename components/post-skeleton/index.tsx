export default function PostSkeleton({ bg }: { bg: string }) {
  return (
    <div
      className={`flex flex-col items-start justify-start overflow-hidden h-[calc(100vh/3)] relative ${bg}`}
    >
      <div className="flex flex-col items-start justify-start gap-4 p-6 w-full">
        <div className="h-8 w-3/4 bg-white/20 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
        <div className="h-4 w-4/5 bg-white/20 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-white/20 rounded animate-pulse"></div>
        <div className="flex items-center gap-8 absolute bottom-6 left-6">
          <div className="h-6 w-24 bg-white/20 rounded animate-pulse"></div>
          <div className="h-6 w-24 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
