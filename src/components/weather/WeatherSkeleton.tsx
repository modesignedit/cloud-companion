import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton for weather card
 * Displays animated placeholders while data is being fetched
 */
export const WeatherSkeleton = () => {
  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="glass-card rounded-2xl p-8 shadow-glass-lg">
        {/* Location skeleton */}
        <div className="text-center mb-6">
          <Skeleton className="h-7 w-32 mx-auto mb-2" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>

        {/* Temperature and icon skeleton */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex items-start">
            <Skeleton className="h-16 w-24" />
          </div>
        </div>

        {/* Description skeleton */}
        <Skeleton className="h-6 w-40 mx-auto mb-8" />

        {/* Details grid skeleton */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
