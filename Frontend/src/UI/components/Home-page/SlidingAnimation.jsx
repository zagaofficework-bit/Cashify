import React, { useState, useEffect, useRef } from "react";

const SlidingAnimation = () => {

  const images = [
    {
      src: "https://external-preview.redd.it/samsung-galaxy-s26-ultra-first-official-promotional-poster-v0-tL7dNLnE8quh_1Dd_6Gh1vfWKNMZWqSisbF-oR-NziA.jpeg?width=1080&crop=smart&auto=webp&s=129da99e1a72d8e73acd76cbea38d0a736fdc877",
      alt: "Samsung Galaxy S26 Ultra 1",
    },
    {
      src:"https://external-preview.redd.it/samsung-galaxy-s26-ultra-first-official-promotional-poster-v0-tL7dNLnE8quh_1Dd_6Gh1vfWKNMZWqSisbF-oR-NziA.jpeg?width=1080&crop=smart&auto=webp&s=129da99e1a72d8e73acd76cbea38d0a736fdc877",
      alt: "Samsung Galaxy S26 Ultra 1",
    
    },
    {
      src:"https://external-preview.redd.it/samsung-galaxy-s26-ultra-first-official-promotional-poster-v0-tL7dNLnE8quh_1Dd_6Gh1vfWKNMZWqSisbF-oR-NziA.jpeg?width=1080&crop=smart&auto=webp&s=129da99e1a72d8e73acd76cbea38d0a736fdc877",
      alt: "Samsung Galaxy S26 Ultra 1",
    },
    {
      src:"https://external-preview.redd.it/samsung-galaxy-s26-ultra-first-official-promotional-poster-v0-tL7dNLnE8quh_1Dd_6Gh1vfWKNMZWqSisbF-oR-NziA.jpeg?width=1080&crop=smart&auto=webp&s=129da99e1a72d8e73acd76cbea38d0a736fdc877",
      alt: "Samsung Galaxy S26 Ultra 1",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => resetTimeout();
  }, [currentIndex]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToPrevious = () => {
    resetTimeout();
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    resetTimeout();
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl mt-4 md:mt-8">

      {/* Responsive Height */}
      <div className="h-[170px] sm:h-[240px] md:h-[320px] lg:h-[420px] xl:h-[480px]">

        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              className="w-full h-full flex-shrink-0 object-cover"
            />
          ))}
        </div>

      </div>

      {/* Left Arrow (Hidden on Mobile) */}
      <button
        onClick={goToPrevious}
        className="hidden sm:flex absolute top-1/2 left-3 -translate-y-1/2 
        bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70"
      >
        &#10094;
      </button>

      {/* Right Arrow (Hidden on Mobile) */}
      <button
        onClick={goToNext}
        className="hidden sm:flex absolute top-1/2 right-3 -translate-y-1/2 
        bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              resetTimeout();
              setCurrentIndex(idx);
            }}
            className={`rounded-full transition-all ${
              currentIndex === idx
                ? "bg-white w-3 h-3 md:w-4 md:h-4"
                : "bg-gray-400 w-2 h-2 md:w-3 md:h-3"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default SlidingAnimation;