import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const OtpGeneration = () => {
  const [otp, setOtp]               = useState(["", "", "", ""]);
  const [error, setError]           = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputs   = useRef([]);
  const navigate = useNavigate();

  // email + otpTarget passed from Login/Signup via navigate state
  const location  = useLocation();
  const email     = location.state?.email     || "";
  const otpTarget = location.state?.otpTarget || "login";

  const {
    handleVerifyLoginOtp,
    handleVerifyRegisterOtp,
    handleLogin,
    error: authError,
    clearError,
  } = useAuth();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length < 4) {
      setError("Please enter complete OTP");
      return;
    }

    setError("");
    setSubmitting(true);

    if (otpTarget === "login") {
      await handleVerifyLoginOtp({ otp: otpValue });
    } else {
      await handleVerifyRegisterOtp({ otp: otpValue });
    }

    setSubmitting(false);
    navigate("/");
  };

  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    setError("");
    clearError();
    inputs.current[0]?.focus();
    await handleLogin({ email });
  };

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full max-h-[600px]">

        {/* Left panel */}
        <div className="bg-black text-white flex flex-col justify-between p-8 w-1/2 min-w-[280px]">
          <h2 className="text-3xl font-bold mb-10 text-center">
            OTP Verification
          </h2>

          <img
            src="../assets/OTP.png"
            alt="Security"
            className="max-w-full h-auto"
          />
        </div>
        {/*right panel*/}

      <div className="flex flex-col p-8 w-1/2 ">

        {/* Back */}
        <button
          className="text-sm text-gray-600 mb-6 hover:text-black self-start"
          onClick={() => navigate(otpTarget === "login" ? "/login" : "/signup")}
        >
          ← Back
        </button>

          <form onSubmit={handleSubmit} className="flex flex-col text-center">

            <h3 className="text-xl font-semibold text-gray-800">
              Verify Your Email
            </h3>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span>
                The verification code has been sent to{" "}
                <span className="font-medium">{email || "your email"}</span>
              </span>
              <span
                className="cursor-pointer"
                onClick={() => navigate(otpTarget === "login" ? "/login" : "/signup")}
              >
                ✏️
              </span>
            </div>

            {/* OTP inputs */}
            <div className="flex justify-center gap-4 mt-8 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            {/* Local error */}
            {error && (
              <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            {/* API error */}
            {authError && (
              <p className="text-red-500 text-sm mb-3">{authError}</p>
            )}

            {/* Verify button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend */}
            <p className="text-sm text-gray-500 mt-4">
              Didn't receive OTP?{" "}
              <span
                onClick={handleResend}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Resend
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpGeneration;