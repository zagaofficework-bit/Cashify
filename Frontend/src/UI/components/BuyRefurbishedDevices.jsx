import React from "react";
import { useState } from "react";

export default function BuyRefurbishedDevices() {
    const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      img: "./assets/img/vivo-x90-pro-plus.png",
      name: "Vivo X90 Pro - Refurbished",
      discount: "₹53,000 OFF",
      rating: "4.2 ★",
      saleTag: "Holi Sale",
      percent: "-59%",
      price: "₹36,299",
      original: "₹89,299",
      gold: "₹35,573 with GOLD",
    },
    {
      img: "./assets/img/Samsung-Galaxy-S25-Edge.png",
      name: "Samsung Galaxy S25 Edge - Refurbished",
      discount: "₹58,100 OFF",
      rating: "4.8 ★",
      saleTag: "Holi Sale",
      percent: "-48%",
      price: "₹61,699",
      original: "₹119,799",
      gold: "₹59,877 with GOLD",
    },
    {
      img:"./assets/img/Xiaomi-Redmi-Note-11-Pro-Plus-5G.png",
      name: "Xiaomi Redmi Note 11 Pro Plus 5G - Refurbished",
      discount: "₹12,100 OFF",
      rating: "4.4 ★",
      saleTag: "Holi Sale",
      percent: "-50%",
      price: "₹12,099",
      original: "₹24,199",
      gold: "₹11,269 with GOLD",
    },
    {
     img: "./assets/img/Google-Pixel-8-Pro.png",
      name: "Google Pixel 8 Pro - Refurbished",
      discount: "₹62,300 OFF",
      rating: "5.0 ★",
      saleTag: "Holi Sale",
      percent: "-57%",
      price: "₹46,699",
      original: "₹108,999",
      gold: "₹45,177 with GOLD",
    },
    {
      img:"./assets/img/Nord-CE.png",
      name: "OnePlus Nord CE 5G - Refurbished",
      discount: "₹14,000 OFF",
      rating: "4.0 ★",
      saleTag: "Holi Sale",
      percent: "-54%",
      price: "₹11,999",
      original: "₹25,999",
      gold: "₹11,171 with GOLD",
    },
    {
      img: "./assets/img/vivo-x90-pro-plus.png",
      name: "Vivo X90 Pro - Refurbished",
      discount: "₹53,000 OFF",
      rating: "4.2 ★",
      saleTag: "Holi Sale",
      percent: "-59%",
      price: "₹36,299",
      original: "₹89,299",
      gold: "₹35,573 with GOLD",
    }
  ];

    const visibleItems = 5;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev < products.length - visibleItems ? prev + 1: prev
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : 0
    );
  };

  return (
   <section className="bg-gray-50 py-10">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">
      Buy Refurbished Devices
    </h2>

    {/* Slider container with relative for arrows */}
    <div className="relative overflow-hidden">

      {/* Slider flex container */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="flex-shrink-0 basis-1/5 p-4 bg-white rounded-lg shadow-md"
          >
            <img src={product.img} alt={product.name} className="w-full object-contain" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-green-600 font-bold">{product.discount}</p>
            <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
              <span>{product.saleTag}</span>
              <span>{product.rating}</span>
            </div>
            <p className="text-red-600 font-bold mt-2">{product.percent}</p>
            <p className="text-xl font-bold text-gray-800">{product.price}</p>
            <p className="line-through text-gray-500">{product.original}</p>
            <p className="text-teal-600 font-medium mt-1">{product.gold}</p>
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
