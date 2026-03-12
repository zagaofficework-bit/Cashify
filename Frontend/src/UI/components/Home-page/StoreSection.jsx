import { useState, useRef } from "react";
import StoreCard from "../Card/StoreCard.jsx";
import { stores } from "../../../res/Data/store.js";

const StoreSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const visibleCards = 4;
  const touchStartX = useRef(null);

  const next = () => { if (startIndex + visibleCards < stores.length) setStartIndex(startIndex + 1); };
  const prev = () => { if (startIndex > 0) setStartIndex(startIndex - 1); };
  const mobileNext = () => { if (mobileIndex < stores.length - 1) setMobileIndex(mobileIndex + 1); };
  const mobilePrev = () => { if (mobileIndex > 0) setMobileIndex(mobileIndex - 1); };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) mobileNext();
    else if (diff < -40) mobilePrev();
    touchStartX.current = null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Our Exclusive</h2>
      <div className="flex flex-wrap gap-4 md:gap-8 text-sm mb-4 md:mb-6">
        <div className="flex items-center gap-2">📍<span className="font-medium">200+ Experience Centres</span></div>
        <div className="flex items-center gap-2">⭐<span className="font-medium">4.5+ Star Ratings</span></div>
      </div>

      <div className="bg-gray-100 max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 rounded-xl">
        <div className="mb-4 md:mb-6">
          <div className="flex items-center bg-white rounded-lg shadow-sm w-full sm:w-[300px] px-3 py-2">
            <input type="text" placeholder="Enter Pincode" className="flex-1 outline-none text-sm" />
            <button className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">→</button>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {stores.map((store, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <StoreCard {...store} />
                </div>
              ))}
            </div>
          </div>
          {/* Dots + arrows */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={mobilePrev} disabled={mobileIndex === 0}
              className="bg-white shadow rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-30 text-gray-600">←</button>
            <div className="flex gap-">
              {stores.map((_, i) => (
                <button key={i} onClick={() => setMobileIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${mobileIndex === i ? "bg-teal-600 w-4" : "bg-gray-300"}`} />
              ))}
            </div>
            <button onClick={mobileNext} disabled={mobileIndex === stores.length - 1}
              className="bg-white shadow rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-30 text-gray-600">→</button>
          </div>
        </div>

        {/* Desktop slider */}
        <div className="hidden md:block relative">
          <button onClick={prev} disabled={startIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40 z-10">←</button>
          <div className="grid grid-cols-4 gap-4 px-12">
            {stores.slice(startIndex, startIndex + visibleCards).map((store, index) => (
              <StoreCard key={index} {...store} />
            ))}
          </div>
          <button onClick={next} disabled={startIndex + visibleCards >= stores.length}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40 z-10">→</button>
        </div>
      </div>
    </div>
  );
};

export default StoreSection;
