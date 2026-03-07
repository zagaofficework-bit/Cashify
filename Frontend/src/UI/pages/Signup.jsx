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
      lastname: Yup.string().min(2, "Too short").required("Last name required"),
      email: Yup.string().email("Invalid email").required("Email required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone required"),
    }),

    onSubmit: (values) => {
      console.log(values);

      // Navigate to OTP page
      navigate("/otp");
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 z-50 p-4">

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

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 flex flex-col h-full mt-10"
          >

            <div className="flex gap-4">

              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />

                {formik.touched.firstname && formik.errors.firstname && (
                  <p className="text-red-500 text-sm">{formik.errors.firstname}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />

                {formik.touched.lastname && formik.errors.lastname && (
                  <p className="text-red-500 text-sm">{formik.errors.lastname}</p>
                )}
              </div>

            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            <div className="mt-auto">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mb-3"
              >
                Submit
              </button>
            </div>

          </form>
           <div>
            <p>If Already have an Account?<a className="text-green-500 cursor-pointer" onClick={()=>{
              navigate("/login")
            }}>Login</a></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;