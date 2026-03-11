
import React, { useState } from "react";

export default function RefurbishedLaptops({ products = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleItems = 5;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev < products.length - visibleItems ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Refurbished Laptops</h2>

        {/* Slider container relative for absolute arrows */}
        <div className="relative overflow-hidden ">

          {/* Slider flex container */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {products.map((laptop, index) => (
              <div
                key={index}
                className="w-1/5 flex-shrink-0 p-4 bg-white rounded-lg shadow-md mx-2"
              >
                <img
                  src={laptop.image}
                  alt={laptop.name}
                  className="w-full h-40 object-contain mb-3"
                />
                <p className="text-green-600 font-bold">{laptop.discount}</p>
                <h3 className="text-sm font-semibold text-gray-800 mt-2">{laptop.name}</h3>
                <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                  <span>{laptop.saleTag}</span>
                  <span>{laptop.rating}</span>
                </div>
                <p className="text-red-600 font-bold mt-2">{laptop.percent}</p>
                <p className="text-lg font-bold text-gray-800">{laptop.price}</p>
                <p className="line-through text-gray-500">{laptop.original}</p>
                <p className="text-teal-600 font-medium mt-1">{laptop.gold}</p>
                <p className="text-xs text-gray-500 mt-1">{laptop.stock}</p>
                <span className="mt-3 inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">
                  Cashify Assured
                </span>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
            aria-label="Previous Slide"
          >
            &#x3c;
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= products.length - visibleItems}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
            aria-label="Next Slide"
          >
            &#x3e;
          </button>
        </div>
      </div>
    </section>
  );
}