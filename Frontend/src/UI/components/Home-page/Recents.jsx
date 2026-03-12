import React, { useState } from "react";
import { recentNews, recentReviews } from "../../../res/Data/recent.js";

const Card = ({ title, description, date }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow min-w-[240px] md:min-w-0 flex-1">
    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-3">{description}</p>
    <span className="text-xs text-gray-400">{date}</span>
  </div>
);

const Recents = ({ title }) => {
  const [newsIndex, setNewsIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const visibleCards = 3;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 font-sans">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">{title || "Tech Updates"}</h1>

      {/* Recent News */}
      <div className="mb-8 md:mb-10 relative">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-3 md:mb-4">Recent News</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 md:overflow-hidden md:px-10 scrollbar-hide">
          {recentNews.map((item, index) => <Card key={index} {...item} />)}
        </div>
        <button onClick={() => setNewsIndex((p) => (p > 0 ? p - 1 : 0))}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center">←</button>
        <button onClick={() => setNewsIndex((p) => p + 1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center">→</button>
      </div>

      {/* Recent Reviews */}
      <div className="relative">
        <h2 className="text-lg md:text-xl font-bold text-green-600 mb-3 md:mb-4">Recent Reviews</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 md:overflow-hidden md:px-10 scrollbar-hide">
          {recentReviews.map((item, index) => <Card key={index} {...item} />)}
        </div>
        <button onClick={() => setReviewIndex((p) => (p > 0 ? p - 1 : 0))}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center">←</button>
        <button onClick={() => setReviewIndex((p) => p + 1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center">→</button>
      </div>
    </div>
  );
};

export default Recents;
