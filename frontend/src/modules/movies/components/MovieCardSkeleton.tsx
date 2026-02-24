import { Skeleton } from "@/components/ui/skeleton"

const MovieCardSkeleton = () => (
  <div className="bg-gray-800 rounded-lg overflow-hidden">
    <Skeleton className="w-full h-72 bg-gray-700" />
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4 bg-gray-700" />
      <Skeleton className="h-3 w-1/2 bg-gray-700" />
      <Skeleton className="h-3 w-1/3 bg-gray-700" />
    </div>
  </div>
)

export { MovieCardSkeleton }
