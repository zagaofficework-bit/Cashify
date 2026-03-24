import React, { useState } from "react";

//top selling brands

const brands = [
  { name: "Xiaomi", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg" },
  { name: "Samsung", img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Realme", img: "https://upload.wikimedia.org/wikipedia/commons/7/74/Realme_logo.svg" },
  { name: "Lenovo", img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Lenovo_logo.svg" },
  { name: "Nokia", img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Nokia_wordmark.svg" },
];

export default function Brands({ title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5;

  const prev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev < brands.length - visibleCount ? prev + 1 : prev));
  };

  return (
    <div>
      
      {/* Brands Section */}
      <section className="max-w-full mx-auto px-20 py-8 mt-10 mb-10 bg-gray-100">
        <h3 className="font-bold text-lg mb-6">{title || "Top Selling Brands"}</h3>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${(currentIndex * 100) / visibleCount}%)` }}
            >
              {brands.map(({ name, img }, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-1/5 p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-2"
                >
                  <img src={img} alt={name} className="h-16 object-contain" />
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center"
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
}