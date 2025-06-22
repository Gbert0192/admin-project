"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      {/* <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/images/404_illustration.svg"
          alt="Page Not Found"
          width={300}
          height={300}
          className="max-w-full h-auto"
          priority
        />
      </motion.div> */}

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-blue-600 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        404
      </motion.h1>

      <motion.p
        className="mt-4 text-lg md:text-xl text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </motion.div>
    </main>
  );
}
