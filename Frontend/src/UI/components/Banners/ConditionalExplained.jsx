import React from "react";
import { FaPlay } from "react-icons/fa";

const ConditionCard = ({ label, image }) => {
  return (
    <div className="relative bg-black rounded-xl overflow-hidden shadow-lg h-[480px] w-75 flex items-center justify-center">
      {/* Label */}
      <span className="absolute top-4 left-4 bg-teal-500 text-white text-sm px-3 py-1 rounded-md z-10">
        {label}
      </span>

      {/* Background Image */}
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Green Circle */}
      {/* <div className="w-48 h-48 bg-teal-600 rounded-full flex items-center justify-center z-10"> */}

      {/* Play Button */}
      <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center">
        <FaPlay className="text-white text-xl ml-1" />
      </div>
    </div>
  );
};

const ConditionsExplained = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-5">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-2">Conditions Explained</h2>

      <p className="text-gray-600 mb-8">
        Refurbished phones come in 3 variants - Superb, Good, Fair. Still
        puzzled? Check out explanatory videos to learn more.
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3">
        <ConditionCard label="Superb" image="/iphone1.png" />

        <ConditionCard label="Good" image="/iphone2.png" />

        <ConditionCard label="Fair" image="/iphone3.png" />
      </div>
    </div>
  );
};

export default ConditionsExplained;
