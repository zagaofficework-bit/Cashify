import React from "react";

export default function LaptopSection() {

  const laptops = [
    {
      title: "Laptops for Multi-tasking",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      bg: "bg-gradient-to-r from-red-400 to-orange-300",
    },
    {
      title: "Laptops that are Touchscreen",
      img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
      bg: "bg-gradient-to-r from-indigo-500 to-blue-400",
    },
    {
      title: "Laptops for Everyday Needs",
      img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      bg: "bg-gray-200",
    },
    {
      title: "Laptops that are Thin & Light",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      bg: "bg-gradient-to-r from-yellow-200 to-orange-200",
    },
  ];

  const LaptopCard = ({ title, img, bg }) => {
    return (
      <div
        className={`flex items-center justify-between p-6 rounded-2xl ${bg} h-[150px]`}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {title}
          </h3>

          <button className="bg-black text-white text-xs px-4 py-1 rounded-md">
            Shop Now
          </button>
        </div>

        <img
          src={img}
          alt="laptop"
          className="h-24 object-contain"
        />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {laptops.map((item, index) => (
          <LaptopCard
            key={index}
            title={item.title}
            img={item.img}
            bg={item.bg}
          />
        ))}
      </div>
    </div>
  );
}