import React, { useState } from "react";

const features = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-teal-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 9l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 6h6v12h-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Best Prices",
    description: "Objective AI-based pricing",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-teal-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 10h7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Instant Payment",
    description: "Instant Money Transfer in your preferred mode at time of pick up or store drop off",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-teal-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Simple & Convenient",
    description: "Check price, schedule pickup & get paid",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-teal-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 16h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 8h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Free Doorstep Pickup",
    description: "No fees for pickup across 1500 cities across India",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-teal-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Factory Grade Data Wipe",
    description: "100% Safe and Data Security Guaranteed",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-teal-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 12h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 16h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21a9 9 0 110-18 9 9 0 010 18z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Valid Purchase Invoice",
    description: "Genuine Bill of Sale",
  },
];

const brands = [
  { name: "Xiaomi", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg" },
  { name: "Samsung", img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Realme", img: "https://upload.wikimedia.org/wikipedia/commons/7/74/Realme_logo.svg" },
  { name: "Lenovo", img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Lenovo_logo.svg" },
  { name: "Nokia", img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Nokia_wordmark.svg" },
  { name: "Dell", img: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
  { name: "HP/Compaq", img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/HP_logo_2012.svg" },
];

export default function Brands() {
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
      {/* Why Us Section */}
      <section className="bg-teal-50 py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon, title, description }, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="flex-shrink-0">{icon}</div>
              <div>
                <h4 className="font-semibold text-black">{title}</h4>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h3 className="font-bold text-lg mb-6">Top Selling Brands</h3>
        <div className="relative">
          {/* Carousel */}
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

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-100"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-100"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
      </section>
    </div>
  );
}