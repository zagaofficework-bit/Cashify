import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(2, "Too short").required("First name required"),
      lastname:  Yup.string().min(2, "Too short").required("Last name required"),
      email:     Yup.string().email("Invalid email").required("Email required"),
      phone:     Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required("Phone required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      navigate("/otp");
    },
  });

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-300 focus:ring-red-200"
        : "border-gray-200 focus:ring-teal-200 focus:border-teal-400"
    }`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 overflow-auto"
      onClick={() => navigate("/")}
    >
      <div
        className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Left panel ── */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-gray-700 items-center justify-center p-10 relative">
          <div className="absolute top-6 left-6">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1006/1006551.png"
            alt="Signup"
            className="max-w-[200px] drop-shadow-xl"
          />
          <div className="absolute bottom-6 left-6 right-6 text-center">
            <p className="text-white text-sm font-medium">Join Phonify today</p>
            <p className="text-gray-400 text-xs mt-1">Your trusted refurbished device store</p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">

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
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign up</h2>
          <p className="text-sm text-gray-400 mb-6">Create your Phonify account</p>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col flex-grow space-y-4">

            {/* First + Last name */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="firstname" className="block text-xs font-semibold text-gray-700 mb-1.5">First Name</label>
                <input
                  id="firstname" type="text" name="firstname"
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstname}
                  placeholder="John"
                  className={inputClass("firstname")}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.firstname}</p>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor="lastname" className="block text-xs font-semibold text-gray-700 mb-1.5">Last Name</label>
                <input
                  id="lastname" type="text" name="lastname"
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastname}
                  placeholder="Doe"
                  className={inputClass("lastname")}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.lastname}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">Email address</label>
              <input
                id="email" type="email" name="email"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                placeholder="you@example.com"
                className={inputClass("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <input
                id="phone" type="tel" name="phone"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}
                placeholder="10-digit mobile number"
                className={inputClass("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  formik.isValid && formik.dirty
                    ? "bg-teal-500 text-white hover:bg-teal-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Create Account
              </button>
            </div>

          </form>

          {/* Login link */}
          <p className="text-sm text-gray-500 text-center mt-5">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-teal-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;