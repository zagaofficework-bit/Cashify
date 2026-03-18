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
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4"
      onClick={() => navigate("/")}
    >
      <div
        className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Left panel ── */}
        <div className="hidden md:flex w-1/2 bg-gray-900 flex-col items-center justify-between p-10 relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-teal-500/10" />
          <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-teal-500/10" />

          {/* Logo */}
          <div className="w-full flex items-center gap-2 z-10">
            <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm tracking-wide">Phonify</span>
          </div>

          {/* Center text */}
          <div className="flex flex-col items-center z-10">
            <h3 className="text-white text-xl font-bold text-center leading-snug mb-2">
              Welcome back to<br />Phonify
            </h3>
            <p className="text-gray-400 text-xs text-center leading-relaxed max-w-[200px]">
              Your trusted marketplace for quality refurbished devices
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-2 w-full z-10">
            {[
              { icon: "🔒", label: "100% Secure Login" },
              { icon: "✅", label: "Phonify Assured Quality" },
              { icon: "🔄", label: "6 Month Warranty" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <span className="text-sm">{item.icon}</span>
                <span className="text-gray-300 text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">

          {/* Top nav */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors font-semibold"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span className="text-xs font-semibold text-teal-600">Secure Login</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-1.5">
              Sign in to<br />your account
            </h2>
            <p className="text-sm text-gray-400">Enter your email and we'll send you a code</p>
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
              Email address
            </label>
            <div className={`flex items-center border rounded-2xl px-4 py-3 transition-all duration-200 ${
              email && !isValid
                ? "border-red-300 bg-red-50/50"
                : email && isValid
                ? "border-teal-400 bg-teal-50/30"
                : "border-gray-200 bg-gray-50 focus-within:border-teal-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50"
            }`}>
              <svg
                className={`w-4 h-4 mr-3 flex-shrink-0 transition-colors ${email && isValid ? "text-teal-500" : "text-gray-400"}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="flex-1 bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-400 font-medium"
              />
              {email && isValid && (
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {email && !isValid && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1.5 font-medium">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Please enter a valid email address
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 mb-6 bg-gray-50 rounded-2xl px-4 py-3">
            <input type="checkbox" checked readOnly className="mt-0.5 accent-teal-500 flex-shrink-0 w-3.5 h-3.5" />
            <span className="text-xs text-gray-500 leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-teal-600 hover:underline font-semibold">Terms and Conditions</a>
              {" "}and{" "}
              <a href="#" className="text-teal-600 hover:underline font-semibold">Privacy Policy</a>
            </span>
          </div>

          {/* Continue button */}
          <button
            disabled={!isValid}
            onClick={() => navigate("/otp")}
            className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              isValid
                ? "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:-translate-y-0.5"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
            {isValid && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </button>

          {/* Signup link */}
          <p className="text-sm text-gray-400 text-center mt-6">
            New to Phonify?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-teal-600 font-bold cursor-pointer hover:underline"
            >
              Create account
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}