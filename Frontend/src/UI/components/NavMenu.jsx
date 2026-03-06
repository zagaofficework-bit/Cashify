import { useState } from "react";
import React from "react";

export default function NavMenu() {
    const [openMenu, setOpenMenu] = useState(null);
  const menuItems = [
    {
      title: "All",
      subItems: ["Sell", "Repair", "Buy Gadgets", "Recycle", "Cashify Store"],
    },
    {
      title: "Sell Phone",
      subItems: ["Phone", "Laptop", "Smartwatch", "Tablet"],
    },
    {
      title: "Sell Gadgets",
      subItems: ["Camera", "Headphones", "Gaming Console"],
    },
    {
      title: "Buy Refurbished Devices",
      subItems: ["Mobiles", "Laptops", "Accessories"],
    },
    {
      title: "Find New Gadget",
      subItems: ["Mobiles", "Laptops", "Smartwatch"],
    },
    {
      title: "Buy Laptop",
      subItems: ["MacBook", "Windows Laptop", "Gaming Laptop"],
    },
    {
      title: "Cashify Store",
      subItems: ["Accessories", "Deals", "Offers"],
    },
    {
      title: "More",
      subItems: ["Support", "Blog", "About Us"],
    },
  ];

  return (
    <div className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={()=> setOpenMenu(index)}
            onMouseLeave={()=> setOpenMenu(null)}
            
          >
            <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-teal-600 font-medium">
            <span>{item.title}</span>
            {/* Dropdown arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              </div>
                {/* Dropdown menu */}
            {openMenu === index && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                {item.subItems.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    className="px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 cursor-pointer"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
