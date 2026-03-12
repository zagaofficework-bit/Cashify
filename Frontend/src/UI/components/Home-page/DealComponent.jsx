import { useState, useRef } from "react";
import { hotDeals } from "../../../res/Data/Deal.js";

const DealCard = ({ title, image, bg }) => (
  <div className={`relative rounded-xl p-4 md:p-6 flex items-center justify-between w-full h-[120px] md:h-[140px] ${bg}`}>
    <div>
      <h3 className="text-sm md:text-lg font-semibold leading-5 md:leading-6">{title}</h3>
      <button className="mt-4 md:mt-6 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center shadow text-sm">→</button>
    </div>
    <img src={image} alt={title} className="h-[70px] md:h-[90px] object-contain" />
  </div>
);

const DealComponent = () => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const touchStartX = useRef(null);

  const next = () => { if (mobileIndex < hotDeals.length - 1) setMobileIndex(mobileIndex + 1); };
  const prev = () => { if (mobileIndex > 0) setMobileIndex(mobileIndex - 1); };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    else if (diff < -40) prev();
    touchStartX.current = null;
  };

  return (
    <div className="bg-gray-100 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-semibold">Hot Deals</h2>
        <p className="text-gray-500 text-sm mb-4 md:mb-6">Exciting offers for more value</p>

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
              {hotDeals.map((deal, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <DealCard {...deal} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={prev} disabled={mobileIndex === 0}
              className="bg-white shadow rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-30">←</button>
            <div className="flex gap-2">
              {hotDeals.map((_, i) => (
                <button key={i} onClick={() => setMobileIndex(i)}
                  className={`h-2 rounded-full transition-all ${mobileIndex === i ? "bg-teal-600 w-4" : "bg-gray-400 w-2"}`} />
              ))}
            </div>
            <button onClick={next} disabled={mobileIndex === hotDeals.length - 1}
              className="bg-white shadow rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-30">→</button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {hotDeals.map((deal, index) => (
            <DealCard key={index} {...deal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealComponent;
