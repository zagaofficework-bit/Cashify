// src/components/ReviewsList.js

import React from "react";
import Card from "./Card.jsx";
import { recentReviews } from "../../res/js/recent.js";

const ReviewsList = () => {
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

export default ReviewsList;
