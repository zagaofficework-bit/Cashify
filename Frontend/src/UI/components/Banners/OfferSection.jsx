import React from "react";
import { FaGoogle } from "react-icons/fa";

const OfferSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Product Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* Card 1 */}
        <div className="flex items-center gap-5 bg-purple-100 border-2 border-purple-300 rounded-xl p-5">

          <img
           src="../assets/phone.png"
            alt="phone"
            className="w-28"
          />

          <div>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              51% OFF
            </span>

            <h3 className="font-semibold mt-2 text-sm">
              Samsung Galaxy S25 Edge - Refurbished
            </h3>

            <p className="text-sm mt-1">
              ₹58,699 <span className="line-through text-gray-500">₹1,19,799</span>
            </p>

            <p className="text-gray-500 text-xs">
              Effective Price
            </p>

            <p className="text-2xl font-bold">
              ₹57,525
            </p>
          </div>

        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-5 bg-purple-100 border-2 border-purple-300 rounded-xl p-5">

          <img
            src="../assets/phone.png"
            alt="phone"
            className="w-28"
          />

          <div>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              42% OFF
            </span>

            <h3 className="font-semibold mt-2 text-sm">
              Samsung Galaxy Z Flip 7 - Refurbished
            </h3>

            <p className="text-sm mt-1">
              ₹68,699 <span className="line-through text-gray-500">₹1,18,899</span>
            </p>

            <p className="text-gray-500 text-xs">
              Effective Price
            </p>

            <p className="text-2xl font-bold">
              ₹67,325
            </p>
          </div>

        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-5 bg-purple-100 border-2 border-purple-300 rounded-xl p-5">

          <img
            src="../assets/phone.png"
            alt="phone"
            className="w-28"
          />

          <div>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              65% OFF
            </span>

            <h3 className="font-semibold mt-2 text-sm">
              Apple iPhone 12 - Refurbished
            </h3>

            <p className="text-sm mt-1">
              ₹18,899 <span className="line-through text-gray-500">₹54,499</span>
            </p>

            <p className="text-gray-500 text-xs">
              Effective Price
            </p>

            <p className="text-2xl font-bold">
              ₹18,521
            </p>
          </div>

        </div>

      </div>

      {/* Google Banner */}

      <div className="bg-black text-white flex items-center justify-between px-6 py-4 rounded-lg">

        <div className="flex items-center gap-3">

          <FaGoogle className="text-2xl text-yellow-400"/>

          <p className="text-lg">
            <span className="font-semibold">Trusted Reseller</span>
          </p>

        </div>

        <p className="hidden md:block">
          Explore select range of <span className="font-semibold">Google-trusted</span> Pixel phones
        </p>

        <button className="bg-white text-black px-5 py-2 rounded-md font-semibold">
          Buy Now
        </button>

      </div>

    </div>
  );
};

export default OfferSection;