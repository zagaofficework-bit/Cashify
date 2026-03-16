import React from "react";
import { FaArrowRight } from "react-icons/fa";

const BestSellingcomponent = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-6">

        {/* Android Phones Card */}
        <div className="relative bg-gradient-to-r from-pink-100 to-pink-200 rounded-2xl p-8 flex items-center justify-between overflow-hidden">

          {/* Text */}
          <div>
            <p className="text-lg text-gray-700">Best Selling</p>
            <h2 className="text-3xl font-bold text-gray-900">
              Android Phones
            </h2>

            <button className="mt-6 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
              <FaArrowRight />
            </button>
          </div>

          {/* Image */}
          <img
            src="/android.png"
            alt="Android Phones"
            className="h-40 object-contain"
          />

        </div>

        {/* Apple Phones Card */}
        <div className="relative bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-8 flex items-center justify-between overflow-hidden">

          {/* Text */}
          <div>
            <p className="text-lg text-gray-700">Best Selling</p>
            <h2 className="text-3xl font-bold text-gray-900">
              Apple Phones
            </h2>

            <button className="mt-6 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
              <FaArrowRight />
            </button>
          </div>

          {/* Image */}
          <img
            src="/iphone.png"
            alt="Apple Phones"
            className="h-40 object-contain"
          />

        </div>

      </div>

    </div>
  );
};

export default BestSellingcomponent;