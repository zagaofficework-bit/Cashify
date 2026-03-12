import React from "react";
import Category from "./Category";
import BuyRefurbishedDevices from "./Home-page/BuyRefurbishedDevices";
import { refurbishedProducts } from "../../res/Data/DevicesData";

const MobileBrand = ({ brand }) => {
  return (
    <div className="w-full">

      {/* Banner */}
      <div className="m-4 md:m-8 lg:m-12">
        <img
          src="https://s3ng.cashify.in/estore/4c5f04bf55fb46feba7b6a732de9225a.webp"
          alt=""
          className="w-full rounded-xl"
        />
      </div>

      {/* Brand Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {brand.map((card, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 overflow-hidden min-h-[160px] ${card.bg}`}
            >

              {/* Text */}
              <div className={`relative z-10 ${card.text}`}>
                <h3 className="text-base md:text-lg font-semibold">
                  {card.title}
                </h3>

                <p className="text-xs md:text-sm mt-1">
                  {card.subtitle}
                </p>

                <button className="mt-4 bg-white text-black px-4 py-2 rounded-lg text-xs md:text-sm font-medium">
                  {card.button}
                </button>
              </div>

              {/* Image */}
              <img
                src={card.img}
                alt=""
                className="absolute right-2 bottom-0 h-28 sm:h-32 md:h-36 object-contain"
              />
            </div>
          ))}

        </div>
      </div>

      {/* Refurbished Products */}
      <BuyRefurbishedDevices products={refurbishedProducts} />

      {/* Banner */}
      <div className="m-4 md:m-8 lg:m-12">
        <img
          src="https://s3ng.cashify.in/estore/3c89e731aa3d40a6bed6b20cc14756d6.webp"
          alt=""
          className="w-full rounded-xl"
        />
      </div>

      <BuyRefurbishedDevices products={refurbishedProducts} />

      {/* Bottom Banners */}
      <div className="m-4 md:m-8 lg:m-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src="https://s3ng.cashify.in/estore/e2588df8c0934fb4a7add81e2a1286fb.webp"
          alt=""
          className="w-full rounded-xl"
        />

        <img
          src="https://s3ng.cashify.in/estore/b5990e6860914df1b87841e4d36eb936.webp"
          alt=""
          className="w-full rounded-xl"
        />
      </div>

    </div>
  );
};

export default MobileBrand;