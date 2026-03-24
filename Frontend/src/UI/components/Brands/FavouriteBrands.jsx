import React from 'react'
import { brands } from "../../../res/Data/Data.js"
const FavouriteBrands = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-semibold mb-6">Favourite Brands</h2>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-6">

        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center text-center cursor-pointer">

            <div className="bg-gray-100 rounded-xl p-3 w-24 h-24 flex items-center justify-center hover:shadow-md transition">

              <img
                src={brand.image}
                alt={brand.name}
                className="w-16 h-16 object-contain"
              />

            </div>

            <p className="text-xs text-gray-500 mt-2">Starting From</p>

            <p className="text-sm font-semibold">{brand.price}</p>

          </div>
        ))}

      </div>
    </div>
  );
};

export default FavouriteBrands