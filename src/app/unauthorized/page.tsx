"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const UnauthorizedPageFromDesign: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center text-gray-800 px-5 sm:px-6 lg:px-8 box-border font-sans"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto mb-6 md:mb-8"
    >
      <div className="relative w-full pb-[75%]">
        <Image
          src="/images/unauthorized_illustration.png"
          alt="Unauthorized Access Illustration"
          layout="fill"
          objectFit="contain"
          className="absolute top-0 left-0 w-full h-full"
          priority
        />
      </div>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="text-2xl sm:text-[28px] font-bold text-blue-600 mt-0 mb-4"
    >
      We are Sorry...
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-sm sm:max-w-md md:max-w-[450px] mb-8"
    >
      The page you&apos;re trying to access has restricted access.
      <br />
      Please Sign In with your account to continue.
    </motion.p>

    <Link href="/sign-in" legacyBehavior passHref>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 no-underline"
      >
        Go Back
      </motion.a>
    </Link>
  </motion.div>
);

export default UnauthorizedPageFromDesign;
