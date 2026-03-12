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
      firstname: Yup.string()
        .min(2, "Too short")
        .required("First name required"),
      lastname: Yup.string().min(2, "Too short").required("Last name required"),
      email: Yup.string().email("Invalid email").required("Email required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      navigate("/otp");
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 overflow-auto">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Left panel (hidden on small screens) */}
      
           <div className="hidden md:flex w-full md:w-1/2 bg-black items-center justify-center p-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1006/1006551.png"
            alt="Login Image"
            className="max-w-xs"
          />
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <button
              className="text-sm text-gray-600 hover:text-black"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              ← Back
            </button>

            <button
              className="text-gray-500 hover:text-black text-xl font-bold"
              onClick={() => navigate("/")}
              aria-label="Close signup form"
            >
              ✕
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-5">Signup</h2>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 flex flex-col flex-grow overflow-auto"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="firstname"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                  className={`w-full border rounded-md px-3 py-2 ${formik.touched.firstname && formik.errors.firstname
                      ? "border-red-500"
                      : "border-gray-300"
                    }`}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.firstname}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="lastname"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  className={`w-full border rounded-md px-3 py-2 ${formik.touched.lastname && formik.errors.lastname
                      ? "border-red-500"
                      : "border-gray-300"
                    }`}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.lastname}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full border rounded-md px-3 py-2 ${formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={`w-full border rounded-md px-3 py-2 ${formik.touched.phone && formik.errors.phone
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
              )}
            </div>

            <div className="mt-auto">
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-green-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;