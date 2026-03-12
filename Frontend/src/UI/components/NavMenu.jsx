import { useState } from "react";
import React from "react";

export default function NavMenu() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const menuItems = [
    { title: "All", subItems: ["Sell", "Repair", "Buy Gadgets", "Recycle", "Phonify Store"] },
    { title: "Sell Phone", subItems: ["Phone", "Laptop", "Smartwatch", "Tablet"] },
    { title: "Sell Gadgets", subItems: ["Sell Phone", "Sell Laptops", "Sell Smart Watches", "Sell Tablets", "Sell Gaming Console", "Sell Speakers"] },
    { title: "Buy Refurbished", subItems: ["Refurbished Phones", "Refurbished Laptops", "Refurbished Smart Watches", "Refurbished Tablets", "Refurbished Gaming Console", "Refurbished Cameras", "Speakers"] },
    { title: "Find New Gadget", subItems: ["New Phones", "New Laptops", "New Smart Watches", "New Tablets", "Speaker"] },
    { title: "Buy Laptop", subItems: ["MacBook", "Windows Laptop", "Gaming Laptop"] },
    { title: "Phonify Store", subItems: ["Accessories", "Deals", "Offers"] },
    { title: "More", subItems: ["Support", "Blog", "About Us"] },
  ];

  return (
    <div className="w-full bg-white shadow-md">
      {/* Desktop menu */}
      <div className="hidden lg:flex items-center justify-between px-6 py-3">
        {menuItems.map((item, index) => (
          <div key={index} className="relative"
            onMouseEnter={() => setOpenMenu(index)}
            onMouseLeave={() => setOpenMenu(null)}>
            <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-teal-600 font-medium text-sm">
              <span>{item.title}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {openMenu === index && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                {item.subItems.map((sub, subIndex) => (
                  <div key={subIndex} className="px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 cursor-pointer text-sm">
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile menu bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold text-gray-700">Browse Categories</span>
        <button onClick={() => setMobileOpen((v) => !v)} className="text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-4 pb-4">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b last:border-0">
              <button
                className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700"
                onClick={() => setMobileExpanded(mobileExpanded === index ? null : index)}
              >
                <span>{item.title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform ${mobileExpanded === index ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === index && (
                <div className="pl-4 pb-2 space-y-2">
                  {item.subItems.map((sub, subIndex) => (
                    <div key={subIndex} className="text-sm text-gray-600 hover:text-teal-600 cursor-pointer py-1">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
