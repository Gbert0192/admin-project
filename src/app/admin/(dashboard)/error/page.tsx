"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  "429": {
    title: "429",
    message: "Too Many Requests",
    description:
      "Too many requests have been made to this page. Please try again later.",
    icon: "⚠️",
  },
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code") ?? "404";
  const callbackUrl = searchParams.get("callbackUrl");
  const { title, message, description, icon } =
    errorMessages[code] || errorMessages["404"];

  const handleGoBack = () => {
    if (callbackUrl) {
      router.push(decodeURIComponent(callbackUrl));
    } else {
      window.history.back();
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        <div className="relative z-10">
          <motion.div
            className="text-7xl md:text-8xl mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.5 },
            }}
          >
            {icon}
          </motion.div>

          <motion.h1
            className="text-7xl md:text-8xl font-black text-gray-900 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {message}
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-blue-700"
            >
              ← Back to Home
            </Link>

            {/* Perubahan di sini */}
            <button
              onClick={handleGoBack} // Gunakan handleGoBack
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full transition-colors duration-300 hover:border-gray-400 hover:text-gray-800"
            >
              ← Go Back
            </button>
          </motion.div>

          {/* ... (Additional help text) */}
        </div>
      </div>
    </main>
  );
}
