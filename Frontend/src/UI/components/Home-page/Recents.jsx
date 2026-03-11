import React, { useState } from "react";

import { recentNews ,recentReviews} from "../../../res/Data/recent.js";

//card component

const Card = ({ title, description, date }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <span className="text-xs text-gray-400">{date}</span>
    </div>
  );
};


//Review List
const ReviewsList = ({recentReviews}) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-green-600 mb-4">Recent Reviews</h2>
      <div className="flex gap-4">
      {recentReviews.map((item, index) => (
        <Card key={index} {...item} />
      ))}
      </div>
    </div>
  );
};

//New List

const NewsList = ({recentNews}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Recent News</h2>
      <div className="flex gap-4">
      {recentNews.map((item, index) => (
        <Card key={index} {...item} />
      ))}
      </div>
    </div>
  );
};


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
          <NewsList recentNews={recentNews} startIndex={newsIndex} visibleCards={visibleCards} />
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
          <ReviewsList recentReviews={recentReviews} startIndex={reviewIndex} visibleCards={visibleCards} />
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