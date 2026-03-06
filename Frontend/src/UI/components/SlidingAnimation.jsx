import React from 'react'
import { useState, useEffect, useRef } from "react";


const SlidingAnimation = () => {

    const images = [
        {
            src: "https://external-preview.redd.it/samsung-galaxy-s26-ultra-first-official-promotional-poster-v0-tL7dNLnE8quh_1Dd_6Gh1vfWKNMZWqSisbF-oR-NziA.jpeg?width=1080&crop=smart&auto=webp&s=129da99e1a72d8e73acd76cbea38d0a736fdc877",
            alt: "Samsung Galaxy S26 Ultra 1",
        },
        {
            src: "https://external-preview.redd.it/samsung-galaxy-s26-ultra-first-official-promotional-poster-v0-tL7dNLnE8quh_1Dd_6Gh1vfWKNMZWqSisbF-oR-NziA.jpeg?width=1080&crop=smart&auto=webp&s=129da99e1a72d8e73acd76cbea38d0a736fdc877",
            alt: "Samsung Galaxy S26 Ultra 2",
        },
        {
            src:"https://external-preview.redd.it/samsung-galaxy-s26-ultra-first-official-promotional-poster-v0-tL7dNLnE8quh_1Dd_6Gh1vfWKNMZWqSisbF-oR-NziA.jpeg?width=1080&crop=smart&auto=webp&s=129da99e1a72d8e73acd76cbea38d0a736fdc877",
            alt: "Samsung Galaxy S26 Ultra 3",
        },
        {
            src:"https://external-preview.redd.it/samsung-galaxy-s26-ultra-first-official-promotional-poster-v0-tL7dNLnE8quh_1Dd_6Gh1vfWKNMZWqSisbF-oR-NziA.jpeg?width=1080&crop=smart&auto=webp&s=129da99e1a72d8e73acd76cbea38d0a736fdc877",
            alt: "Samsung Galaxy S26 Ultra 4",
        },
    ];


    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    // Auto slide every 4 seconds
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const goToPrevious = () => {
        resetTimeout();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        resetTimeout();
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg select-none mt-15 h-[400px]">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map(({ src, alt }, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt={alt}
                        className="w-full h-full flex-shrink-0 object-cover"
                    />
                ))}
            </div>
    

            {/* Left Arrow */ }
    <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
        aria-label="Previous Slide"
    >
        &#10094;
    </button>

    {/* Right Arrow */ }
    <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
        aria-label="Next Slide"
    >
        &#10095;
    </button>

    {/* Dots Indicator */ }
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
            <button
                key={idx}
                className={`w-3 h-3 rounded-full ${currentIndex === idx ? "bg-white" : "bg-gray-400"
                    }`}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => {
                    resetTimeout();
                    setCurrentIndex(idx);
                }}
            />
        ))}
    </div>
        </div >
    );
};

export default SlidingAnimation