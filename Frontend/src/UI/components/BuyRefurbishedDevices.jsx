import React, { useState } from "react";

export default function BuyRefurbishedDevices({ title, products=[
  
] }) {
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
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
                className="flex-shrink-0 basis-1/5 p-4 bg-white rounded-lg shadow-md"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full object-contain h-40"
                />

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>

                <p className="text-green-600 font-bold">{product.discount}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                  <span>{product.saleTag}</span>
                  <span>{product.rating}</span>
                </div>

                <p className="text-red-600 font-bold mt-2">
                  {product.percent}
                </p>

                <p className="text-xl font-bold text-gray-800">
                  {product.price}
                </p>

                <p className="line-through text-gray-500">
                  {product.original}
                </p>

                <p className="text-teal-600 font-medium mt-1">
                  {product.gold}
                </p>

                <span className="mt-3 inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">
                  Cashify Assured
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
          >
            &#x3c;
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= products.length - visibleItems}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
          >
            &#x3e;
          </button>
        </div>
      </div>
    </section>
  );
}