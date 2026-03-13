import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavMenu({ mobileOpen, setMobileMenuOpen }) {
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { title: "All", subItems: ["Sell", "Repair", "Buy Gadgets", "Recycle", "Phonify Store"] },
    { title: "Sell Phone", subItems: ["Phone", "Laptop", "Smartwatch", "Tablet"] },
    { title: "Sell Gadgets", subItems: ["Sell Phone", "Sell Laptops", "Sell Smart Watches", "Sell Tablets", "Sell Gaming Console", "Sell Speakers"] },
    { title: "Buy Refurbished Devices", subItems: ["Refurbished Phones", "Refurbished Laptops", "Refurbished Smart Watches", "Refurbished Tablets"] },
    { title: "Find New Gadget", subItems: ["New Phones", "New Laptops", "New Smart Watches", "New Tablets"] },
    { title: "Buy Laptop", subItems: ["MacBook", "Windows Laptop", "Gaming Laptop"] },
    { title: "Phonify Store", subItems: ["Accessories", "Deals", "Offers"] },
    { title: "More", subItems: ["Support", "Blog", "About Us"] },
  ];

  return (
    <>
      {/* ================= DESKTOP MENU ================= */}
      <div className="hidden md:flex w-full border-t border-b bg-white border-gray-400">
        <div className="max-w-7xl mx-auto flex gap-11 px-6 py-3 text-md font-medium ">

          {menuItems.map((item, index) => (
            <div key={index} className="relative group cursor-pointer">

              <div className="flex items-center gap-1">
                {item.title}
                <img src="../../../assets/down-arrow.png" alt="" className="h-8 w-5"/>
                
              </div>

              {/* Dropdown */}
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border rounded-lg min-w-[220px] z-50">

                {item.subItems.map((sub, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {sub}
                  </div>
                ))}

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <p className="text-xs text-gray-500">Your City</p>
            <p className="font-semibold">Gurgaon</p>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-black text-white rounded-xl m-4 p-4 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">Hello</p>
            <p className="text-sm">Please login/signup</p>
          </div>

          <button
            className="bg-white text-black px-4 py-2 rounded-lg text-sm"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="px-4">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b">

              <button
                className="w-full flex justify-between items-center py-4 text-sm font-medium"
                onClick={() =>
                  setMobileExpanded(mobileExpanded === index ? null : index)
                }
              >
                {item.title}
                <span>{mobileExpanded === index ? "▲" : "▼"}</span>
              </button>

              {mobileExpanded === index && (
                <div className="pb-3 pl-3 space-y-2">
                  {item.subItems.map((sub, i) => (
                    <div key={i} className="text-sm text-gray-600">
                      {sub}
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </>
  );
}