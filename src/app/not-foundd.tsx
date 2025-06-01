"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-100">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/images/404_illustration.svg"
          alt="Page Not Found"
          width={300}
          height={300}
        />
      </motion.div>

      <motion.h1
        className="text-6xl font-extrabold text-blue-600 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl text-gray-700 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
