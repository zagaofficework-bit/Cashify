

import React from "react";

const Card = ({ title, description, date }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <span className="text-xs text-gray-400">{date}</span>
    </div>
  );
};

export default Card;
