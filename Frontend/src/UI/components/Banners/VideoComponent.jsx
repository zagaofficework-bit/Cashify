import React from "react";
import VideoCard from "../Card/VideoCard.jsx";
import { flashSaleData } from "../../../res/Data/Data.js";

const VideoComponent = () => {
  return (
    <section className="max-w-full mx-auto px-6 py-8  bg-gray-200">

      {/* Header */}
      <div className="flex justify-between items-center mx-20 mb-6">

        <h2 className="text-2xl font-bold">
          Flash Sale
        </h2>

        <button className="text-teal-600 font-medium">
          View All
        </button>

      </div>

      {/* Cards */}
      <div className="flex gap-5 overflow-x-auto mx-20">

        {flashSaleData.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}

      </div>

    </section>
  );
};

export default VideoComponent;