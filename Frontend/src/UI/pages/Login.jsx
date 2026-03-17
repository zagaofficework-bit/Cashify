import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
      onClick={() => navigate("/")}
    >
      <div
        className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Left: illustration ── */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-gray-700 items-center justify-center p-10 relative">
          <div className="absolute top-6 left-6">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <img src="/assets/img/LoginImg.png" alt="Login" className="max-w-[220px] drop-shadow-xl" />
          <div className="absolute bottom-6 left-6 right-6 text-center">
            <p className="text-white text-sm font-medium">Welcome back to Phonify</p>
            <p className="text-gray-400 text-xs mt-1">Your trusted refurbished device store</p>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">

          {/* Top nav */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Login</h2>
          <p className="text-sm text-gray-400 mb-7">Enter your email to continue</p>

          {/* Email input */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${
                email && !isValid
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-teal-200 focus:border-teal-400"
              }`}
            />
            {email && !isValid && (
              <p className="text-red-500 text-xs mt-1.5">Please enter a valid email address.</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 my-5">
            <input type="checkbox" checked readOnly className="mt-0.5 accent-teal-500 flex-shrink-0" />
            <span className="text-xs text-gray-500 leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-teal-600 hover:underline font-medium">Terms and Conditions</a>
              {" "}&{" "}
              <a href="#" className="text-teal-600 hover:underline font-medium">Privacy Policy</a>
            </span>
          </div>

          {/* Continue button */}
          <button
            disabled={!isValid}
            onClick={() => navigate("/otp")}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isValid
                ? "bg-teal-500 text-white hover:bg-teal-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>

          {/* Signup link */}
          <p className="text-sm text-gray-500 text-center mt-5">
            New user?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-teal-600 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}