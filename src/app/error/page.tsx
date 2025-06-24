"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const errorMessages: Record<
  string,
  { title: string; message: string; description: string; icon: string }
> = {
  "401": {
    title: "401",
    message: "Unauthorized Access",
    description:
      "You don't have permission to view this page. Please check your credentials.",
    icon: "🔐",
  },
  "403": {
    title: "403",
    message: "Access Forbidden",
    description:
      "Sorry, access to this page is restricted. Contact support if you need help.",
    icon: "🚫",
  },
  "404": {
    title: "404",
    message: "Page Not Found",
    description:
      "The page you're looking for seems to have wandered off into the digital void.",
    icon: "🔍",
  },
  "500": {
    title: "500",
    message: "Server Error",
    description:
      "Something went wrong on our end. Our team has been notified and is working on it.",
    icon: "⚠️",
  },
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "404";
  const { title, message, description, icon } =
    errorMessages[code] || errorMessages["404"];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Icon with floating animation */}
          <motion.div
            className="text-8xl mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: [0, -10, 0],
              opacity: 1,
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: { duration: 0.5 },
            }}
          >
            {icon}
          </motion.div>

          {/* Error code with glitch effect */}
          <motion.h1
            className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
          >
            {title}
          </motion.h1>

          {/* Error message */}
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {message}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-gray-300 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {description}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/"
              className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="relative z-10">← Back to Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group relative px-8 py-3 bg-transparent border-2 border-gray-400 text-gray-300 font-semibold rounded-full transition-all duration-300 hover:border-white hover:text-white hover:scale-105"
            >
              <span className="relative z-10">← Go Back</span>
            </button>
          </motion.div>

          {/* Additional help text */}
          <motion.p
            className="text-gray-500 text-sm mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Need help? Contact our
            <Link
              href="/support"
              className="text-purple-400 hover:text-purple-300 underline transition-colors"
            >
              support team
            </Link>
          </motion.p>
        </div>
      </div>
    </main>
  );
}
