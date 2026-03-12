

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OtpGeneration = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputs = useRef([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length < 4) {
      setError("Please enter complete OTP");
      return;
    }

    setError("");
    console.log("Entered OTP:", otpValue);

    // API call for verification here
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 overflow-auto">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Left panel (hidden on small screens) */}
        <div className="hidden md:flex flex-col justify-between p-8 bg-black text-white w-1/2 min-w-[280px]">
          <h2 className="text-3xl font-bold mb-10 text-center">OTP Verification</h2>
          <img
            src="../assets/OTP.png"
            alt="Security"
            className="max-w-full h-auto mx-auto"
          />
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="text-sm text-gray-600 hover:text-black"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            <button
              className="text-gray-500 hover:text-black text-xl font-bold"
              onClick={() => navigate("/")}
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-center flex-grow overflow-auto"
          >
            <h3 className="text-xl font-semibold text-gray-800">Verify Your Email</h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 mt-2 text-sm text-gray-500">
              <span>
                The verification code has been sent to{" "}
                <span className="font-medium">xx@gmail.com</span>
              </span>
              <span className="cursor-pointer">✏️</span>
            </div>

            {/* OTP Inputs */}
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

            {/* Error */}
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Verify OTP
            </button>

            {/* Resend */}
            <p className="text-sm text-gray-500 mt-4">
              Didn't receive OTP?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
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
