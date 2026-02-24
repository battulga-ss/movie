import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeleton = () => (
  <div className="border rounded-lg overflow-hidden">
    <Skeleton className="w-full h-72" />
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </div>
);

export { MovieCardSkeleton };
