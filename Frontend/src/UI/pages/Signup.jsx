import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname:  "",
    email:     "",
    phone:     "",
  });

  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate                          = useNavigate();
  const { handleRegister, error: apiError } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field as user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstname.trim())
      newErrors.firstname = "First name is required";
    else if (form.firstname.trim().length < 2)
      newErrors.firstname = "Too short";

    if (!form.lastname.trim())
      newErrors.lastname = "Last name is required";
    else if (form.lastname.trim().length < 2)
      newErrors.lastname = "Too short";

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";

    if (!form.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    return newErrors;
  };


  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    await handleRegister({
      firstname: form.firstname,
      lastname:  form.lastname,
      email:     form.email,
      mobile:    form.phone,
    });
    setSubmitting(false);

    navigate("/otp", { state: { email: form.email, otpTarget: "register" } });
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">

      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full max-h-[600px]">

        {/* Left panel */}
        <div className="bg-black text-white flex flex-col justify-between p-8 w-1/2 min-w-[280px]">
          <h2 className="text-3xl font-bold mb-10 text-center">Signup Form</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1006/1006551.png"
            alt="Security"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right panel */}
        <div className="flex flex-col p-8 w-1/2">

          <div className="space-y-4 flex flex-col h-full mt-6">

            {/* First + Last name row */}
            <div className="flex gap-4">

              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                )}
              </div>

            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* API error */}
            {apiError && (
              <p className="text-red-500 text-sm">{apiError}</p>
            )}

            {/* Submit button */}
            <div className="mt-auto">
              <button
                disabled={submitting}
                onClick={handleSubmit}
                className={`w-full py-3 rounded-md font-semibold transition mb-3 ${
                  submitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {submitting ? "Sending OTP..." : "Submit"}
              </button>
            </div>

          </div>

          <div>
            <p className="text-sm">
              Already have an Account?{" "}
              <a
                className="text-green-500 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;