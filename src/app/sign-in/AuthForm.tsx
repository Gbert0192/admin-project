"use client";

import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

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
        <div
          className={`form-container sign-up-container absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-full md:w-1/2
                      ${
                        isRightPanelActive
                          ? "translate-x-0 opacity-100 z-[5] md:translate-x-full md:animate-show"
                          : "-translate-x-full opacity-0 z-[1] pointer-events-none md:translate-x-0 md:opacity-0" // Diubah untuk mobile first
                      }`}
        >
          <SignUpForm onSwitchToSignIn={handleSignInClick} />
        </div>

        <div
          className={`form-container sign-in-container absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-full md:w-1/2 z-[2]
                      ${
                        isRightPanelActive
                          ? "translate-x-full opacity-0 z-[1] pointer-events-none md:translate-x-full" // Diubah untuk mobile first
                          : "translate-x-0 opacity-100 z-[2] md:translate-x-0"
                      }`}
        >
          <SignInForm onSwitchToSignUp={handleSignUpClick} />
        </div>

        <div
          className={`overlay-container absolute top-0 h-full overflow-hidden transition-transform duration-600 ease-in-out z-[100]
                      hidden md:block md:left-1/2 md:w-1/2
                      ${
                        isRightPanelActive
                          ? "md:-translate-x-full"
                          : "md:translate-x-0"
                      }`}
        >
          <div
            className={`overlay bg-gradient-to-br from-primary-blue-light via-primary to-primary-blue-dark text-white relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out ${
              isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            <div
              className={`overlay-panel overlay-left absolute hidden md:flex flex-col items-center justify-center text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out px-4 md:px-5 lg:px-8
                            ${
                              isRightPanelActive
                                ? "translate-x-0"
                                : "-translate-x-[20%]"
                            }`}
            >
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0">
                Welcome Back!
              </h1>
              <p className="text-xs sm:text-sm font-light leading-snug tracking-wide my-4 max-w-[80%]">
                To keep connected with us please login with your personal info
              </p>
              <button
                className={`rounded-full border border-primary bg-primary text-white text-xs sm:text-sm font-bold py-3 px-6 sm:px-8 md:px-10 tracking-wider uppercase transition-transform duration-75 ease-in active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50  border-white`}
                id="signInOverlay"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
            <div
              className={`overlay-panel overlay-right absolute hidden md:flex flex-col items-center justify-center text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out right-0 px-4 md:px-5 lg:px-8
              ${isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"}`}
            >
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl m-0">
                Hello, Friend!
              </h1>
              <p className="text-xs sm:text-sm font-light leading-snug tracking-wide my-4 max-w-[80%]">
                Enter your personal details and start your journey with us
              </p>
              <button
                className={`rounded-full border border-primary bg-primary text-white text-xs sm:text-sm font-bold py-3 px-6 sm:px-8 md:px-10 tracking-wider uppercase transition-transform duration-75 ease-in active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 border-white`}
                id="signUpOverlay"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
