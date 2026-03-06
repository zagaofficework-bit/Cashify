import React from "react";

export default function SellCard({title}) {
  return (
    <section className="bg-gray-200 rounded text-black px-6 py-12 m-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left: Text + Search */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          
          <ul className="space-y-2 text-lg">
            <li>✓ Maximum Value</li>
            <li>✓ Safe & Hassle-free</li>
            <li>✓ Free Doorstep Pickup</li>
          </ul>

          {/* Search Bar */}
          <div className="mt-6">
            <input
              type="text" 
              placeholder="Search your Mobile Phone to sell"
              className="w-full px-4 py-3 bg-white border border-gray-900 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Brand Options */}
          <div className="mt-6">
            <p className="font-semibold mb-3">Or choose a brand</p>
            <div className="flex gap-4 flex-wrap">
              <img src="./assets/img/AppleLogo.png" alt="Apple" className="h-12 w-12 object-contain bg-white rounded-lg p-2" />
              <img src="./assets/img/XiaomiLogo.png" alt="Xiaomi" className="h-12 w-12 object-contain bg-white rounded-lg p-2" />
              <img src="./assets/img/SamsungLogo.png" alt="Samsung" className="h-12 w-12 object-contain bg-white rounded-lg p-2" />
              <img src="./assets/img/VivoLogo.png" alt="Vivo" className="h-12 w-12 object-contain bg-white rounded-lg p-2" />
              <button className="text-sm font-medium underline">More Brands &gt;</button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/cashify-banner.png" // replace with actual banner image
            alt="Cashify Banner"
            className="w-80 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
