import { useState } from "react";
import StoreCard from "../Card/StoreCard.jsx";
import { stores } from "../../../res/Data/store.js";

const StoreSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 4;

  const nextSlide = () => {
    if (startIndex + visibleCards < stores.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const showButtons = stores.length > visibleCards;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-semibold mb-6">Our Exclusive</h2>

      <div className="flex gap-8 text-sm mb-6">
        <div className="flex items-center gap-3">
          📍
          <span className="font-medium">200+ Experience Centres</span>
        </div>

        <div className="flex items-center gap-2">
          ⭐
          <span className="font-medium">4.5+ Star Ratings</span>
        </div>
      </div>

      <div className="bg-gray-100 max-w-7xl mx-auto px-6 py-6 rounded-xl">
        
        {/* Search */}
        <div className="mb-6">
          <div className="flex items-center bg-white rounded-lg shadow-sm w-[300px] px-3 py-2">
            <input
              type="text"
              placeholder="Enter Pincode"
              className="flex-1 outline-none text-sm"
            />
            <button className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center">
              →
            </button>
          </div>
        </div>

        <div className="relative">

          {/* Prev Button */}
          {showButtons && (
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
            >
              ←
            </button>
          )}

          <div className="flex gap-5 overflow-hidden px-12">
            {stores
              .slice(startIndex, startIndex + visibleCards)
              .map((store, index) => (
                <StoreCard key={index} {...store} />
              ))}
          </div>

          {/* Next Button */}
          {showButtons && (
            <button
              onClick={nextSlide}
              disabled={startIndex + visibleCards >= stores.length}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
            >
              →
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default StoreSection;