import React, { useState } from "react";
import NewsList from "./NewsList";
import ReviewsList from "./ReviewList";

const Recents = ({title}) => {

  const [newsIndex, setNewsIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const visibleCards = 3;

  const nextNews = () => setNewsIndex(newsIndex + 1);
  const prevNews = () => setNewsIndex(newsIndex > 0 ? newsIndex - 1 : 0);

  const nextReviews = () => setReviewIndex(reviewIndex + 1);
  const prevReviews = () => setReviewIndex(reviewIndex > 0 ? reviewIndex - 1 : 0);

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title || "Tech Updates"}</h1>

      {/* Recent Views */}
      <div className="mb-10 relative">
       

        <button
          onClick={prevNews}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full"
        >
          ←
        </button>

        <div className="flex gap-6 overflow-hidden px-12">
          <NewsList startIndex={newsIndex} visibleCards={visibleCards} />
        </div>

        <button
          onClick={nextNews}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full"
        >
          →
        </button>
      </div>

      {/* Recent Reviews */}
      <div className="relative">
        

        <button
          onClick={prevReviews}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full"
        >
          ←
        </button>

        <div className="flex gap-6 overflow-hidden px-12">
          <ReviewsList startIndex={reviewIndex} visibleCards={visibleCards} />
        </div>

        <button
          onClick={nextReviews}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full"
        >
          →
        </button>
      </div>

    </div>
  );
};

export default Recents;