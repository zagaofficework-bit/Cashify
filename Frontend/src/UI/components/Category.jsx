import React from "react";
import { Mobilecategories } from "../../res/js/Categorydata"

const Category = ({data}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 my-10 bg-gray-100">
      <div className="grid md:grid-cols-4 gap-6">

        {data.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-2xl p-6 text-center`}
          >
            <h3 className="text-xl font-semibold mb-4">
              {item.title}
            </h3>

            <img
              src={item.img}
              alt={item.title}
              className="mx-auto h-32"
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Category;