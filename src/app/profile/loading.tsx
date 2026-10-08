import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-44 rounded-md" />
        <Skeleton className="h-4 w-60 rounded-md" />
      </div>

      <Skeleton className="h-32 w-full rounded-3xl" />
    </div>
  );
}
