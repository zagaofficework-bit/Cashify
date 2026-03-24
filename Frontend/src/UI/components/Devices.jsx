import React from "react";
import { devices } from "../../res/Data/Data.js";

const Devices = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
        {devices.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center cursor-pointer group"
          >
            {/* Icon box */}
            <div className="relative bg-gray-50 border border-gray-100 rounded-2xl p-3 w-20 h-20 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-teal-200 group-hover:bg-teal-50 transition-all duration-200">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
              />

              {item.tag && (
                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {item.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <p className="text-xs font-medium text-gray-600 mt-2 w-20 leading-tight group-hover:text-teal-600 transition-colors duration-150">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;
