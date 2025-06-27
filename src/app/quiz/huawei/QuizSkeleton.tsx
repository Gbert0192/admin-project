import { Skeleton } from "@/components/ui/skeleton";

export const QuizSkeleton = () => {
  return (
    <div className="flex h-screen bg-white text-slate-800 overflow-hidden">
      <aside className="w-1/4 border-r p-4 flex flex-col justify-between bg-gray-50">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="grid grid-cols-1 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full px-4 py-3 rounded-lg border bg-white"
              >
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-1 w-full mt-2" />
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full mt-2" />
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto pb-40">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <div className="bg-white border rounded-xl shadow-md p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
            </div>
            <Skeleton className="h-6 w-24 ml-4" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </main>
    </div>
  );
};
