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
    <button className="text-sm text-gray-600 mb-6 hover:text-black self-start" >

    ← Back
        </button>


          <form onSubmit={handleSubmit} className="flex flex-col text-center">

            <h3 className="text-xl font-semibold text-gray-800">
              Verify Your Email
            </h3>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span>
                 The verification code has been send to your <span className="font-medium">xx@gmail.com</span>
              </span>
              <span className="cursor-pointer">✏️</span>
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

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            {/* Verify button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
              onClick={()=>navigate("/home")}
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