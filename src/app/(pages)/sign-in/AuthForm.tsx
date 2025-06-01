// app/AuthForm.tsx (atau folder komponen Anda)
"use client";

import { useState, MouseEvent } from "react";
import TemplateCompatibleSignInForm from './form'; // Pastikan path ini benar

const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState<string | null>(null);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    setSignUpMessage(null);
  };
  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    setSignUpMessage(null);
  };

  const handleActualSignUp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignUpMessage("Sign-up feature is not yet implemented. Please check back later!");
  };

  const inputClasses = "bg-gray-100 border-gray-300 border text-gray-900 p-3 my-2 w-full focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent text-sm sm:text-base rounded-md transition-colors duration-200";
  const buttonClasses = "rounded-full border border-custom-blue bg-custom-blue text-white text-xs sm:text-sm font-bold py-3 px-6 sm:px-8 md:px-10 tracking-wider uppercase transition-transform duration-75 ease-in active:scale-95 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-opacity-50";
  const formPaddingClasses = "px-4 md:px-5 lg:px-8"; // Digunakan oleh form internal & toggle

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 p-4 font-sans">
      <div
        className={`container bg-white rounded-xl shadow-2xl relative overflow-hidden
                  w-full max-w-sm
                  sm:max-w-md
                  md:w-[768px] md:max-w-[768px]
                  min-h-[520px] sm:min-h-[540px] md:min-h-[500px]`}
        id="container"
      >
        {/* Sign Up Container */}
        <div
          className={`form-container absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-full md:w-1/2
                      ${isRightPanelActive
                        ? 'translate-x-0 opacity-100 z-[5] md:translate-x-full md:animate-show'
                        : '-translate-x-full opacity-0 z-[1] pointer-events-none md:translate-x-0 md:opacity-0'
                      }`}
        >
          {/* Form Sign Up memiliki h-full dan flex properties sendiri */}
          <form onSubmit={(e) => e.preventDefault()} className={`bg-white flex flex-col items-center justify-center h-full text-center ${formPaddingClasses}`}>
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0">Create Account</h1>
            <div className="social-container my-4">
            </div>
            <input type="text" placeholder="Name" className={inputClasses} aria-label="Name" />
            <input type="text" placeholder="Student ID" className={inputClasses} aria-label="Student ID" />
            <input type="password" placeholder="Password" className={inputClasses} aria-label="Password" />
            {signUpMessage && (
              <p className="text-red-500 text-xs mt-2 mb-1 px-1">{signUpMessage}</p>
            )}
            <button type="button" className={`${buttonClasses} mt-4`} onClick={handleActualSignUp}>Sign Up</button>
            <p className="mt-4 text-xs text-gray-600 md:hidden">
              Already have an account?{' '}
              <button
                type="button"
                onClick={handleSignInClick}
                className="font-semibold text-custom-blue hover:underline focus:outline-none"
              >
                Sign In
              </button>
            </p>
          </form>
        </div>

        {/* Sign In Container */}
        <div
          className={`form-container absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-full md:w-1/2 z-[2]
                      bg-white /* Tambahkan bg-white di sini untuk konsistensi */
                      flex flex-col /* KUNCI: Jadikan container ini flex column */
                      ${isRightPanelActive
                        ? 'translate-x-full opacity-0 z-[1] pointer-events-none md:translate-x-full'
                        : 'translate-x-0 opacity-100 z-[2] md:translate-x-0'
                      }`}
        >
          {/* Wrapper untuk TemplateCompatibleSignInForm agar bisa grow dan center content */}
          <div className="flex-grow flex flex-col justify-center items-center w-full">
            {/* TemplateCompatibleSignInForm kemungkinan me-render <form> yang menggunakan formPaddingClasses
                dan memiliki flex properties internalnya sendiri. Idealnya, form di dalamnya TIDAK h-full,
                tapi mengandalkan wrapper ini untuk positioning. */}
            <TemplateCompatibleSignInForm
              inputClasses={inputClasses}
              buttonClasses={buttonClasses}
              formPaddingClasses={formPaddingClasses} // Komponen ini harus menerapkan padding ini ke form di dalamnya
            />
          </div>

          {/* Tombol untuk toggle ke Sign Up pada tampilan mobile */}
          {!isRightPanelActive && (
            // Div ini akan berada di bawah form karena parentnya flex-col.
            // Padding horizontal dari formPaddingClasses, padding vertikal spesifik.
            // PERUBAHAN DI SINI: pt-2 diubah menjadi pt-0
            <div className={`text-center md:hidden px-4 pb-4 pt-0 w-full`}> {/* Menggunakan px-4 dari formPaddingClasses, pb-4, pt-0 */}
              <p className="text-xs text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="font-semibold text-custom-blue hover:underline focus:outline-none"
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Overlay Container */}
        <div
          className={`overlay-container absolute top-0 h-full overflow-hidden transition-transform duration-600 ease-in-out z-[100]
                      hidden md:block md:left-1/2 md:w-1/2
                      ${isRightPanelActive ? 'md:-translate-x-full' : 'md:translate-x-0'}`}
        >
          <div
            className={`overlay bg-gradient-to-br from-custom-blue-light via-custom-blue to-custom-blue-dark text-white relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out
                        ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}`}
          >
            <div
              className={`overlay-panel absolute hidden md:flex flex-col items-center justify-center text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out ${formPaddingClasses}
                          ${isRightPanelActive ? "translate-x-0" : "-translate-x-[20%]"}`}
            >
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0">Welcome Back!</h1>
              <p className="text-xs sm:text-sm font-light leading-snug tracking-wide my-4 max-w-[80%]">
                To keep connected with us please login with your personal info
              </p>
              <button className={`${buttonClasses} bg-transparent border-2 border-white`} id="signIn" onClick={handleSignInClick}>Sign In</button>
            </div>

            <div
              className={`overlay-panel absolute hidden md:flex flex-col items-center justify-center text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out right-0 ${formPaddingClasses}
                          ${isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"}`}
            >
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0">Hello, Friend!</h1>
              <p className="text-xs sm:text-sm font-light leading-snug tracking-wide my-4 max-w-[80%]">
                Enter your personal details and start your journey with us
              </p>
              <button className={`${buttonClasses} bg-transparent border-2 border-white`} id="signUp" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;