import React, { useState } from "react";
import Header from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
const navigate = useNavigate();

const click=()=>{
  navigate("/otp")
}

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
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
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <label className="block text-gray-700 mb-2">Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          {!isValid && email && (
            <p className="text-red-500 text-sm mb-4">Please enter a valid email address.</p>
          )}

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              
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
            onClick={click}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              isValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            CONTINUE
          </button>
          <div>
            <p>New User?<a className="text-green-500 cursor-pointer" onClick={()=>{
              navigate("/signup")
            }}>Signup</a></p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
