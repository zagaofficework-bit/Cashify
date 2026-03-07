import React from "react";

export default function SearchByModel() {
  const phones = [
    { name: "Motorola Moto E15", price: null, tag: "NEW", img: "/images/moto-e15.png" },
    { name: "Apple iPhone 17e", price: "₹64,900", tag: "NEW", img: "/images/iphone-17e.png" },
    { name: "Samsung Galaxy S26", price: "₹87,999", tag: "NEW", img: "/images/galaxy-s26.png" },
  ];

  return (
    <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Left: Filters */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-bold mb-4">Search Filters</h2>

          {/* Search by Model */}
          <div>
            <label className="block text-sm font-medium mb-2">Search by Model Name</label>
            <input
              type="text"
              placeholder="Enter model name"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Price Slider */}
          <div>
            <label className="block text-sm font-medium mb-2">Search by Price</label>
            <input type="range" min="0" max="150000" className="w-full" />
            <p className="text-xs text-gray-500">Rs 0 – Rs 150000+</p>
          </div>

          {/* Quick Price Buttons */}
          <div className="flex flex-wrap gap-2">
            {["Below 5,000","Below 10,000","Below 15,000","Below 20,000","Below 30,000","Below 100,000"].map((p, i) => (
              <button key={i} className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-teal-600 hover:text-white">
                {p}
              </button>
            ))}
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold mb-2">Brands</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Apple","Samsung","Xiaomi (MI)","Motorola","Google","OnePlus","Oppo","Vivo"].map((brand, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" /> {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Usage */}
          <div>
            <h3 className="font-semibold mb-2">Usage</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Gaming","Budget","All","Battery","Performer","Camera","Flagship","Great UI"].map((use, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" /> {use}
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-teal-600 text-white py-2 rounded mt-4">Search</button>
        </div>

        {/* Right: Product Cards */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Find New Filter</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {phones.map((phone, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 text-center">
                <img src={phone.img} alt={phone.name} className="w-32 h-32 mx-auto mb-4 object-contain" />
                <h3 className="font-semibold">{phone.name}</h3>
                {phone.price && <p className="text-gray-700">{phone.price}</p>}
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-teal-600 text-white rounded">
                  {phone.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
