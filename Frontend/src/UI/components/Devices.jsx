import React from 'react'
import { devices } from "../../res/Data/Data.js"

const Devices = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6">

        {devices.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center cursor-pointer">

            <div className="relative bg-gray-100 rounded-xl p-3 w-20 h-20 flex items-center justify-center hover:shadow-md transition">

              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 object-contain"
              />

              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-2 py-[2px] rounded">
                {item.tag}
              </span>

            </div>

            <p className="text-xs mt-2 w-24 leading-tight">
              {item.title}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Devices;