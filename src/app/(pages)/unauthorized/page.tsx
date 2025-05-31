import Image from "next/image";
import Link from "next/link";
import React from "react";

const UnauthorizedPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center text-gray-800 px-5 box-border font-sans">
    <div className="relative w-[700px] h-[600px]">
      <Image
        src="/images/unauthorized_illustration.png"
        alt="Unauthorized Access Illustration"
        layout="fill"
        objectFit="contain"
        className="w-full h-auto object-contain"
      />
    </div>

    <h1 className="text-[28px] font-bold text-[#2c3e50] mt-0 mb-4">
      We are Sorry...
    </h1>
    <p className="text-base text-gray-600 leading-relaxed max-w-[450px] mb-8">
      The page you&apos;re trying to access has restricted access.
      <br />
      Please refer to your system administrator
    </p>

    <Link href="/sign-in" legacyBehavior>
      <a className="inline-block px-8 py-3 text-base font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors duration-200 no-underline">
        Go Back
      </a>
    </Link>
  </div>
);

export default UnauthorizedPage;
