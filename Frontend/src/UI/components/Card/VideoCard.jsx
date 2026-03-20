import React, { useRef, useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";

const VideoCard = ({ item }) => {

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {

    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }

  };

  return (
    <div className="bg-white rounded-lg shadow-sm w-[220px] overflow-hidden">

      {/* Video */}
      <div className="relative">

        <video
          ref={videoRef}
          src={item.video}
          className="w-full h-[220px] object-cover"
          muted
          loop
        />

        {/* Tag */}
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          {item.tag}
        </span>

        {/* Rating */}
        <span className="absolute top-2 right-2 bg-white text-xs flex items-center gap-1 px-2 py-1 rounded shadow">
          {item.rating}
          <FaStar className="text-yellow-400 text-xs" />
        </span>

        {/* Play Button */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="bg-white/80 p-3 rounded-full"
            >
              <FaPlay />
            </button>
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-3">

        <h3 className="text-sm font-semibold">
          {item.title}
        </h3>

        <div className="flex gap-2 mt-1 text-sm">

          <span className="text-red-500 font-semibold">
            {item.discount}
          </span>

          <span className="font-bold">
            {item.price}
          </span>

        </div>

        <div className="text-xs mt-1 bg-yellow-100 inline-block px-2 py-1 rounded">
          {item.goldPrice} with <span className="font-semibold">GOLD</span>
        </div>

      </div>

    </div>
  );
};

export default VideoCard;