import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Skeleton className="h-5 w-48 rounded-md" />

      <Skeleton className="h-44 w-full rounded-3xl" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-36 rounded-md" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-48 rounded-md" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}
