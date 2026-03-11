import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { bestSelling } from "../../res/Data/Categorydata";

const BestSellingcomponent = ({bestSelling}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-6">

        {bestSelling.map((item, index) => (
          <div
            key={index}
            className={`relative ${item.bg} rounded-2xl p-8 flex items-center justify-between overflow-hidden`}
          >
            {/* Text */}
            <div>
              <p className="text-lg text-black ">{item.subtitle}</p>

              <h2 className="text-3xl font-bold text-gray-900">
                {item.title}
              </h2>

              <button className="mt-6 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                <FaArrowRight />
              </button>
            </div>

            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="h-40 object-contain"
            />
          </div>
        ))}

      </div>

    </div>
  );
};

export default BestSellingcomponent;