

import React from "react";
import Card from "./Card.jsx";
import { recentNews } from "../../res/js/recent.js";

const NewsList = () => {
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

export default NewsList;
