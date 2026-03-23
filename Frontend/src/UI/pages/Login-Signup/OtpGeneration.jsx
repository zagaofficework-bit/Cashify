import React, { useState, useRef } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";

export default function OtpGeneration() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [localErr, setLocalErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otpTarget = location.state?.otpTarget || "login";

  //   const {
  //     user, isAuthenticated, initializing,
  //     handleVerifyLoginOtp, handleVerifyRegisterOtp,
  //     handleLogin,
  //     error: authError,
  //     clearError,
  //   } = useAuth();

  // ── Guard ─────────────────────────────────────────────────────────────────
  //   if (!initializing && isAuthenticated) {
  //     if (user?.role === "admin")  return <Navigate to="/admin-dashboard" replace />;
  //     if (user?.role === "seller") return <Navigate to="/seller-dashboard" replace />;
  //     return <Navigate to="/" replace />;
  //   }

  //   if (!initializing && !email) return <Navigate to="/login" replace />;
  //   if (initializing) return <FullScreenSpinner />;

  // ── Input handlers ────────────────────────────────────────────────────────
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 3) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      setLocalErr("Please enter the complete 4-digit OTP");
      return;
    }
    setLocalErr("");
    setSubmitting(true);
    if (otpTarget === "login") {
      await handleVerifyLoginOtp({ otp: otpValue });
    } else {
      await handleVerifyRegisterOtp({ otp: otpValue });
    }
    setSubmitting(false);
    navigate("/", { replace: true });
  };

  // ── Resend ────────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resending) return;
    setOtp(["", "", "", ""]);
    setLocalErr("");
    clearError();
    setResending(true);
    await handleLogin({ email });
    setResending(false);
    inputs.current[0]?.focus();
  };

  const filled = otp.filter((d) => d !== "").length;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* ── Left panel ── */}
        <div className="hidden md:flex w-1/2 bg-gray-900 flex-col items-center justify-between p-10 relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-teal-500/10" />
          <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-teal-500/10" />

          {/* Logo */}
          <div className="w-full flex items-center gap-2 z-10">
            <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-white font-bold text-sm tracking-wide">
              Phonify
            </span>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center z-10">
            <div className="w-20 h-20 rounded-3xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5">
              <svg
                className="w-10 h-10 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold text-center leading-snug mb-2">
              Verify your
              <br />
              identity
            </h3>
            <p className="text-gray-400 text-xs text-center leading-relaxed max-w-[200px]">
              We sent a 4-digit code to keep your account secure
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-2 w-full z-10">
            {[
              { icon: "🔒", label: "End-to-End Encrypted" },
              { icon: "⏱️", label: "Code valid for 10 minutes" },
              { icon: "✅", label: "Phonify Assured Security" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-gray-300 text-xs font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
          {/* Top nav */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() =>
                navigate(otpTarget === "login" ? "/login" : "/signup", {
                  replace: true,
                })
              }
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors font-semibold"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 transition-all"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span className="text-xs font-semibold text-teal-600">
                OTP Verification
              </span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-1.5">
              Verify your
              <br />
              email
            </h2>
            <div className="flex items-center gap-1.5 flex-wrap mt-1">
              <p className="text-sm text-gray-400">
                Code sent to{" "}
                <span className="font-semibold text-gray-700">{email}</span>
              </p>
              <span
                className="cursor-pointer text-sm"
                onClick={() =>
                  navigate(otpTarget === "login" ? "/login" : "/signup", {
                    replace: true,
                  })
                }
              >
                ✏️
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* OTP inputs */}
            <div className="flex justify-center gap-3 mb-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={submitting}
                  className={`w-14 h-14 text-center text-xl font-black rounded-2xl border-2 focus:outline-none transition-all duration-200 disabled:opacity-60 ${
                    digit
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-200 bg-gray-50 text-gray-800 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-50"
                  }`}
                />
              ))}
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mb-5">
              {otp.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i < filled ? "w-6 bg-teal-500" : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Errors */}
            {localErr && (
              <p className="text-red-500 text-xs mb-3 flex items-center justify-center gap-1.5 font-medium">
                <svg
                  className="w-3 h-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {localErr}
              </p>
            )}
            {/* {authError && (
              <p className="text-red-500 text-xs mb-3 flex items-center justify-center gap-1.5 font-medium">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {authError}
              </p>
            )} */}

            {/* Verify button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                !submitting && filled === 4
                  ? "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {submitting && (
                <span className="w-4 h-4 border-2 border-gray-300 border-t-teal-500 rounded-full animate-spin" />
              )}
              {submitting ? "Verifying…" : "Verify OTP"}
              {!submitting && filled === 4 && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              )}
            </button>
          </form>

          {/* Resend */}
          <p className="text-sm text-gray-400 text-center mt-6">
            Didn't receive OTP?{" "}
            <span
              onClick={handleResend}
              className={`font-bold ${resending ? "text-gray-400 opacity-50 cursor-not-allowed" : "text-teal-600 cursor-pointer hover:underline"}`}
            >
              {resending ? "Sending…" : "Resend"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function FullScreenSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-8 h-8 border-[3px] border-teal-100 border-t-teal-500 rounded-full animate-spin" />
    </div>
  );
}
