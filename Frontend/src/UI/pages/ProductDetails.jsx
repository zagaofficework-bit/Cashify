import React from "react";
import BuyRefurbishedDevices from "../components/BuyRefurbishedDevices";
import CashifyTrust from "../components/CashifyTrust";
import WhyCashify from "../components/WhyCashify";
import FAQ from "../components/FAQ";
import RatingReviews from "../components/RatingReview";
import Footer from "../components/Footer";

export default function RefurbishedPhoneCard() {
    const specs = [
    {  label: "Screen Size", value: "17.22 cm (6.78 inch)" },
    {  label: "Chipset", value: "MediaTek Dimensity 9200 MT6985" },
    {  label: "Pixel Density", value: "453 ppi" },
    {  label: "Network Support", value: "5G" },
    {  label: "SIM Slot(s)", value: "Dual SIM, GSM+GSM" },
  ];
  return (
    <>
    <div className="m-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div  className="max-w-100 h-100 mx-30 bg-white rounded-lg shadow-lg p-6">
        {/* Left: Product Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="./assets/img/VivoX90Pro.png" 
            alt="Vivo X90 Pro Refurbished"
            className="w-80 h-auto object-contain"
          />
        </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold">Vivo X90 Pro - Refurbished</h2>
          <p className="text-gray-600 text-sm">
            Cashify Warranty, Fair, 12 GB RAM / 256 GB, Legendary Black
          </p>
          <p className="text-yellow-500 font-semibold">★ 4.2 (6 reviews)</p>

          {/* Pricing */}
          <div className="space-y-2">
            <p className="text-red-600 font-bold text-xl">
              -63% ₹34,599 <span className="line-through text-gray-400">₹94,499</span>
            </p>
            <p className="text-sm text-gray-600">
              Get it for <span className="font-semibold">₹33,999</span> with GOLD
            </p>
            <p className="text-sm text-gray-600">
              EMI starting at ₹1,930/month
            </p>
          </div>

          {/* Highlights */}
          <div className="flex gap-4 text-sm text-gray-700">
            <span className="bg-gray-100 px-3 py-1 rounded">Camera Focused</span>
            <span className="bg-gray-100 px-3 py-1 rounded">Flagship</span>
          </div>

          {/* Warranty */}
          <p className="text-sm bg-green-600 w-78 rounded p-1 text-white">
            &#x2713; All devices have a default 6 Months warranty.  
            <br />
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
              Buy Now
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">
              View EMI Plans
            </button>
          </div>
          
        
          {/* Storage & Color Options (just below Buy Now) */}
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold">Storage</h4>
              <p className="text-sm text-gray-700 border border-gray-300 rounded p-2 w-40">
                12 GB RAM / 256 GB
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Color</h4>
              <div className="flex gap-4 mt-2">
                <button className="border-2 border-teal-600 rounded-lg px-4 py-2 text-sm">
                  Legendary Black <br />
                  <span className="text-red-600 font-medium">₹26,900 off</span>
                </button>
                <button className="border rounded-lg px-4 py-2 text-sm text-gray-600">
                  Red
                </button>
                <button className="border rounded-lg px-4 py-2 text-sm text-gray-600">
                  Gray
                </button>
              </div>
            </div>

            {/* Extra Offer */}
            <p className="text-sm text-gray-600 mt-2">
              Save extra on buying these together <br />
              <span className="text-teal-600 font-medium">Up to ₹100 extra off</span>
            </p>
          </div>
          {/* Payment Methods + Pincode Check */}
          <div className="mt-8 space-y-4">
            <h4 className="font-semibold">Available Payment Methods</h4>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <span className="bg-gray-100 px-3 py-1 rounded">EMI</span>
              <span className="bg-gray-100 px-3 py-1 rounded">UPI</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Credit Card</span>
              <span className="bg-gray-100 px-3 py-1 rounded">COD Available</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Split Payment</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Debit Card</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Net Banking</span>
            </div>

            {/* Pincode Check */}
            <div className="flex w-80 gap-2 mt-4 border rounded">
              <input
                type="text"
                placeholder="Postal code e.g. 414001"
                className="flex-1 px-4 py-2"
              />
              <button className="text-black px-4 py-2 rounded hover:bg-teal-700">
                Check
              </button>
            </div>
            <p className="text-sm text-gray-600">Enter pincode for exact delivery dates</p>
          </div>
        </div>
      </div>
      
      
      <BuyRefurbishedDevices title="You May Also Like" products={audioDevices} />
      <CashifyTrust/>

     
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        
        {/* Grade Tabs */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Grade Explained</h3>
          <div className="flex gap-4 mb-6">
            <button className="px-4 py-2 rounded bg-teal-600 text-white font-semibold">
              Superb
            </button>
            <button className="px-4 py-2 rounded bg-gray-200 text-gray-700">
              Good
            </button>
            <button className="px-4 py-2 rounded bg-gray-200 text-gray-700">
              Fair
            </button>
          </div>

          {/* Checklist */}
          <ul>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✔</span>
              <span><strong>Overall</strong> – No functional defects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✔</span>
              <span>
                <strong>Screen Glass</strong> – Minimal scratches, barely noticeable when screen is off
                <li/>
                <li>
                  <img
              src="./assets/img/ScreenGlass.png" // replace with actual image
              alt="Back view"
              className="w-70 h-70 object-contain"
            />
            </li>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✔</span>
              <span><strong>Display</strong> – Perfect condition</span>
              </li>
              <li>
              <img
              src="./assets/img/Display.png" // replace with actual image
              alt="Back view"
              className="w-70 h-70 object-contain"
            />
            </li>
          </ul>
        </div>

        {/* Cosmetic Condition */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Cosmetic Condition</h3>
          <p className="text-sm text-gray-700 mb-4">
            ✔ <strong>Chrome/Body</strong> – Minor signs of wear and light scratches. Invisible from a 20 cm distance.
          </p>

          {/* Images */}
          <div className="flex gap-4">
            
            <img
              src="./assets/img/Cosmetic1.png" // replace with actual image
              alt="Side view"
              className="w-70 h-70 object-contain"
            />
            <img
              src="./assets/img/Cosmetic2.png" // replace with actual image
              alt="Bottom view"
              className="w-70 h-70 object-contain"
            />
          </div>
        </div>
      </div>
    
    <WhyCashify/>
    
    <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Specs</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              {/* Icon */}
              <div className="mb-3">{spec.icon}</div>
              {/* Label */}
              <h3 className="text-lg font-semibold mb-1">{spec.label}</h3>
              {/* Value */}
              <p className="text-gray-700 text-sm">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FAQ/>

    </div>
    <RatingReviews/>
    <img src="./assets/img/NewVsRefurbished.png" className="w-full h-auto" alt="" />

<Footer/>


    </>
  );
}
