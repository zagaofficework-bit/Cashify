import React, { useState, useEffect } from "react";

export default function BuyRefurbishedDevices({ title, products = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleItems = () => {
    if (screenWidth < 640) return 2;
    if (screenWidth < 768) return 3;
    if (screenWidth < 1024) return 4;
    return 5;
  };

  const visibleItems = getVisibleItems();

  const next = () =>
    setCurrentIndex((p) => (p < products.length - visibleItems ? p + 1 : p));

  const prev = () => setCurrentIndex((p) => (p > 0 ? p - 1 : 0));

  return (
    <section className="bg-gray-50 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
          {title || "Buy Refurbished Devices"}
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="group flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:basis-1/5 p-2 md:p-3 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mx-1 cursor-pointer border border-transparent hover:border-teal-200 overflow-hidden"
              >
                {/* Image with zoom + teal backdrop */}
                <div className="overflow-hidden rounded-xl bg-gray-50 group-hover:bg-teal-50 transition-colors duration-300 flex items-center justify-center h-28 md:h-40">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full object-contain h-28 md:h-40 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>

                {/* Sliding teal underline */}
                <div className="h-0.5 w-0 group-hover:w-full bg-teal-400 transition-all duration-300 rounded-full mt-2" />

                <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2 line-clamp-2 mt-2">
                  {product.name}
                </h3>

                <p className="text-green-600 font-bold text-xs md:text-sm">
                  {product.discount}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                  <span>{product.saleTag}</span>
                  <span>{product.rating}</span>
                </div>

                <p className="text-red-600 font-bold mt-1 text-xs md:text-sm">
                  {product.percent}
                </p>

                <p className="text-base md:text-xl font-bold text-gray-800">
                  {product.price}
                </p>

                <p className="line-through text-gray-500 text-xs md:text-sm">
                  {product.original}
                </p>

                <p className="text-teal-600 font-medium mt-1 text-xs md:text-sm">
                  {product.gold}
                </p>

                <span className="mt-2 inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">
                  Phonify Assured
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center disabled:opacity-40 z-10 hover:bg-teal-500 hover:text-white transition-colors duration-200"
          >
            &#x3c;
          </button>

          <button
            onClick={next}
            disabled={currentIndex >= products.length - visibleItems}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center disabled:opacity-40 z-10 hover:bg-teal-500 hover:text-white transition-colors duration-200"
          >
            &#x3e;
          </button>
        </div>
      </div>
    </section>
  );
} 