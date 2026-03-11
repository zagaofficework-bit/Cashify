import React from "react";
import { FaStar } from "react-icons/fa";

export default function RatingReviews() {
  const ratingSummary = {
    overall: 4.2,
    totalReviews: 2,
    totalRatings: 6,
    breakdown: [
      { stars: 5, count: 4 },
      { stars: 4, count: 1 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 1 },
    ],
  };

  const reviews = [
    {
      title: "Nice phone quality good",
      rating: 5,
      comment: "Very good phone",
      reviewer: "Prasannakumar s (verified user)",
      date: "26/1/2026",
    },
    {
      title: "No ORIGNAL CHARGER, THEY GAVE FAKE CHINESE CHARGER WHICH IS CHARGING MY D...",
      rating: 1,
      comment: "FRAUD Phonify",
      reviewer: "BHAVESH KHILARE (verified user)",
      date: "16/4/2024",
    },
  ];

  return (
    <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-lg shadow p-6 space-y-8">
        
        {/* Rating Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl font-bold">{ratingSummary.overall}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xl ${i < Math.floor(ratingSummary.overall) ? "text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {ratingSummary.totalReviews} Reviews & {ratingSummary.totalRatings} Ratings
          </p>

          {/* Breakdown */}
          <div className="mt-4 space-y-2">
            {ratingSummary.breakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-10 text-sm">{item.stars} ★</span>
                <div className="flex-1 bg-gray-200 h-3 rounded">
                  <div
                    className="bg-yellow-500 h-3 rounded"
                    style={{ width: `${(item.count / ratingSummary.totalRatings) * 100}%` }}
                  ></div>
                </div>
                <span className="w-6 text-sm">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <h3 className="font-semibold">{review.title}</h3>
              <p className="text-gray-700 text-sm">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-1">
                {review.reviewer} • {review.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
