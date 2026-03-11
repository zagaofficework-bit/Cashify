import React from "react";

export default function SellMobileBrand({data, brand}) {
  


  return (
    <>
    
    <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6">Sell Old {brand} Mobile Phone</h2>

        {/* Search Bar */}
        <div className="flex justify-end mb-6">
          <input
            type="text"
            placeholder="Select Model"
            className="border rounded-lg px-4 py-2 w-64 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Grid of Models */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {data.map((data, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg shadow p-4 hover:shadow-md cursor-pointer transition"
            >
              <div className="w-20 h-32 flex items-center justify-center mb-2">
                {/* Replace with actual image paths */}
                <img
                  src={data.img}
                  alt={data.title}
                  className="object-contain h-full"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">
                {data.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
