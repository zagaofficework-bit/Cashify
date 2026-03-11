import React, { useState } from "react";
import Header from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import OtpGeneration from "./OtpGeneration";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (value) => {
    // Basic email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  return (
    <>
      {/* <Header/> */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
        <div className="flex w-full max-w-3xl h-[450px] bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left side illustration */}
          <div className="flex w-1/2 bg-black items-center justify-center p-6">
            {/* Replace with your illustration */}
            <img
              src="/assets/img/LoginImg.png"
              alt="Login Image"
              className="max-w-xs"
            />
          </div>

          {/* Right side form */}
          <div className="w-full md:w-1/2 p-8">
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

            <h2 className="text-2xl font-bold mb-2">Login</h2>

            <label className="block text-gray-700 mt-8 mb-5 font-bold">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            {!isValid && email && (
              <p className="text-red-500 text-sm mb-4">
                Please enter a valid email address.
              </p>
            )}

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                checked
                readOnly
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>{" "}
                &{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              disabled={!isValid}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                isValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => navigate("/otp")}
            >
              CONTINUE
            </button>
            <div>
              <p>
                New User?
                <a
                  className="text-green-500 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
