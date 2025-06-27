import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Loader2 className="animate-spin min-h-20 min-w-20 text-blue-500" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Getting data...
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
            Please wait...
          </p>
        </div>

        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div
            className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </main>
  );
}
