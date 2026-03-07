import React from "react";

const Category = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 my-10 bg-gray-100">

      <div className="grid md:grid-cols-4 gap-6">

        {/* Budget Phones */}
        <div className="bg-pink-100 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">
            Budget Phones
          </h3>

          <img
            src="/budget.png"
            alt="budget"
            className="mx-auto h-32"
          />
        </div>

        {/* Flagship Phones */}
        <div className="bg-purple-100 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">
            Flagship Phones
          </h3>

          <img
            src="/flagship.png"
            alt="flagship"
            className="mx-auto h-32"
          />
        </div>

        {/* Gaming Phones */}
        <div className="bg-green-100 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">
            Gaming Phones
          </h3>

          <img
            src="/gaming.png"
            alt="gaming"
            className="mx-auto h-32"
          />
        </div>

        {/* Camera Phones */}
        <div className="bg-yellow-100 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">
            Best Camera Phones
          </h3>

          <img
            src="/camera.png"
            alt="camera"
            className="mx-auto h-32"
          />
        </div>

      </div>

    </div>
  );
};

export default  Category;