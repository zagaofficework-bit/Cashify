import { useState, useRef } from "react";

const ArticleCard = ({ image, title }) => (
  <div className="relative w-[220px] sm:w-[250px] md:w-[280px] h-[130px] md:h-[150px] rounded-xl overflow-hidden cursor-pointer group flex-shrink-0">
    <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="absolute bottom-3 left-3 right-3">
      <p className="text-white text-xs md:text-sm font-semibold line-clamp-2">{title}</p>
    </div>
  </div>
);

const MobileArticleCard = ({ image, title }) => (
  <div className="relative w-full h-[160px] rounded-xl overflow-hidden cursor-pointer flex-shrink-0">
    <img src={image} alt={title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="absolute bottom-3 left-3 right-3">
      <p className="text-white text-sm font-semibold line-clamp-2">{title}</p>
    </div>
  </div>
);

const Articles = ({ title, data }) => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const touchStartX = useRef(null);

  const next = () => { if (mobileIndex < data.length - 1) setMobileIndex(mobileIndex + 1); };
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
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
      <div className="flex justify-between items-center mb-4 md:mb-5">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <button className="text-teal-500 text-sm font-medium">See all</button>
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
            {data.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1">
                <MobileArticleCard image={item.image} title={item.title} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
          <button onClick={prev} disabled={mobileIndex === 0}
            className="bg-white shadow rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-30">←</button>
          <div className="flex gap-2">
            {data.map((_, i) => (
              <button key={i} onClick={() => setMobileIndex(i)}
                className={`h-2 rounded-full transition-all ${mobileIndex === i ? "bg-teal-600 w-4" : "bg-gray-300 w-2"}`} />
            ))}
          </div>
          <button onClick={next} disabled={mobileIndex === data.length - 1}
            className="bg-white shadow rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-30">→</button>
        </div>
      </div>

      {/* Desktop horizontal scroll */}
      <div className="hidden md:flex gap-5 overflow-x-auto pb-2">
        {data.map((item, index) => (
          <ArticleCard key={index} image={item.image} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
