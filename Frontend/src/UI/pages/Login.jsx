import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail]   = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate                        = useNavigate();
  const { handleLogin, loading, error } = useAuth();

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const handleContinue = async () => {
    if (!isValid) return;

    await handleLogin({ email });
    // handleLogin sets otpSent = true + otpTarget = "login"
    // Navigate to OTP screen, pass email so it can be displayed
    navigate("/otp", { state: { email, otpTarget: "login" } });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="flex w-full max-w-3xl h-[450px] bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Left side illustration */}
        <div className="flex w-1/2 bg-black items-center justify-center p-6">
          <img
            src="/assets/img/LoginImg.png"
            alt="Login"
            className="max-w-xs"
          />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <label className="block text-gray-700 mb-2">Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />

          {/* Email validation error */}
          {!isValid && email && (
            <p className="text-red-500 text-sm mb-2">
              Please enter a valid email address.
            </p>
          )}

          {/* API error from useAuth */}
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}

          <div className="flex items-center mb-6 mt-2">
            <input
              type="checkbox"
              checked
              readOnly
              className="mr-2 accent-blue-600"
            />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
              {" "}&{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </span>
          </div>

          <button
            disabled={!isValid || loading}
            onClick={handleContinue}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              isValid && !loading
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Sending OTP..." : "CONTINUE"}
          </button>

          <div className="mt-4">
            <p className="text-sm">
              New User?{" "}
              <a
                className="text-green-500 cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}