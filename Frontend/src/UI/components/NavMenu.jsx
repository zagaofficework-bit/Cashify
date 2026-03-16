import { useState, useRef, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavMenu({ mobileOpen, setMobileMenuOpen }) {
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [openMenu, setOpenMenu]   = useState(null); // which top-level nav item is open
  const [openSub, setOpenSub]     = useState(null); // "menuIdx-subIdx"
  const navRef = useRef(null);
  const navigate = useNavigate();

  // Close everything when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setOpenSub(null);
      }
    }
    document.addEventListener("mouseover", handleClick);
    return () => document.removeEventListener("mouseover", handleClick);
  }, []);

  const handleMenuClick = (idx) => {
    if (openMenu === idx) {
      setOpenMenu(null);
      setOpenSub(null);
    } else {
      setOpenMenu(idx);
      setOpenSub(null);
    }
  };

  const handleSubClick = (key) => {
    setOpenSub(openSub === key ? null : key);
  };

  const menuItems = [
    {
      title: "Sell Phone",
      tit: "Brands",
      subItems: [
        { label: "Apple" },
        { label: "OnePlus" },
        { label: "Samsung" },
        { label: "Xiaomi" },
      ],
    },
    {
      title: "Sell Gadgets",
      subItems: [
        {
          label: "Sell Phone", path:'/sell-phone'
        },
                {
          label: "Sell TV", path:'/sell-tv'
        },
        { 
          label: "Sell Laptops", path:'/sell-laptop' 
        },
        {
          label: "Sell Smart Watches", path:'/sell-smartwatch'
        },
        {
          label: "Sell Tablets", path:'/sell-tablet'
        },
        {
          label: "Sell Gaming Console", path:'/sell-gaming'
        },
        {
          label: "Sell Speakers", path:'/sell-speaker'
        },
      ],
    },
    {
      title: "Buy Refurbished Devices",
      subItems: [
        { 
          label: "Buy Phone", path:"/buy-phone"
        },
        { 
          label: "Buy Laptops", path:"/buy-laptop"
        },
        {
          label: "Buy Smart Watches", path:"/buy-smartwatch"
        },
        {
          label: "Buy Tablets", path:"/buy-tablet"
        },
        {
          label: "Buy Gaming Console", path:"/buy-gaming"
        },
        {
          label: "Buy Speakers", path:"/buy-speaker"
        },
      ],
    },
    {
      title: "Find New Gadget",
      subItems: [
        {
          label: "Find New Phone", path: '/find-  phone'
          
        },
        {
          label: "Find New Laptops",
          subs: ["MacBook", "HP", "Dell", "Lenovo"],
        },
        {
          label: "Find New Smart Watches",
          subs: ["Apple Watch", "Amazefit", "Boat", "Bolt"],
        },
        {
          label: "Find New Tablets",
          subs: ["iPad", "Samsung", "Lenovo", "Oneplus"],
        },
        {
          label: "Find New Gaming Console",
          subs: ["PlayStation", "Xbox", "Nintendo Switch", "Sony"],
        },
        {
          label: "Find New Speakers",
          subs: ["Boat", "JBL", "Marshall", "Zebronics"],
        },
      ],
    },
    {
      title: "Buy Laptop",
      tit: "Top Brands",
      subItems: [
        {
          label: "MacBook",
          subs: [
            "MacBook Air M2",
            "MacBook Air M3",
            'MacBook Pro 14"',
            'MacBook Pro 16"',
          ],
        },
        {
          label: "HP",
          subs: ["Dell XPS", "HP Spectre", "Lenovo ThinkPad", "Asus ZenBook"],
        },
        {
          label: "Dell",
          subs: ["ASUS ROG", "MSI Gaming", "Alienware", "Razer Blade"],
        },
        {
          label: "Lenovo",
          subs: ["ASUS ROG", "MSI Gaming", "Alienware", "Razer Blade"],
        },
      ],
    },
    {
      title: "More",
      subItems: [
        {
          label: "Support",
          subs: ["Help Center", "Track Order", "Warranty Claim", "Contact Us"],
        },
        {
          label: "Blog",
          subs: ["Tech News", "Buying Guides", "Comparison", "Tips & Tricks"],
        },
        { label: "About Us", subs: ["Our Story", "Team", "Careers", "Press"] },
      ],
    },
  ];

  return (
    <>
      {/* ═══════════════ DESKTOP ═══════════════ */}
      <div className="hidden md:block w-full bg-white border-t border-b border-gray-200" ref={navRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-24">

            {menuItems.map((item, idx) => (
              <div key={idx} className="relative py-3">

                {/* Nav label — click to open */}
                <button
                  onMouseEnter={() => handleMenuClick(idx)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium cursor-pointer whitespace-nowrap border-b-2 transition-all duration-150 ${
                    openMenu === idx
                      ? "text-teal-600 border-teal-500"
                      : "text-gray-700 border-transparent hover:text-teal-600 hover:border-teal-400"
                  }`}
                >
                  {item.title}
                  <svg
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${
                      openMenu === idx ? "rotate-180 text-teal-500" : "text-gray-400"
                    }`}
                    viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown panel */}
                {openMenu === idx && (
                  <div className="absolute left-0 top-full pt-2 z-50 min-w-[210px]">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-visible">

                      {/* Non-clickable title */}
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.tit}</p>
                      </div>

                      {/* Sub items */}
                      {item.subItems.map((sub, si) => {
                        const subKey = `${idx}-${si}`;
                        const isSubOpen = openSub === subKey;
                        return (
                          <div key={si} className="relative">

                            {/* Clickable sub row */}
                            <button
                              onMouseEnter={() => handleSubClick(subKey)}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors duration-100 ${
                                isSubOpen
                                  ? "bg-teal-50 text-teal-700"
                                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                              }`}
                            >
                              
                              <span
                              onClick={() => sub.path && navigate(sub.path)}
                              className={sub.path ? "cursor-pointer" : ""}
                              >{sub.label}</span>
                  
                              {sub.subs?.length > 0 && (
                                <svg
                                  className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${
                                    isSubOpen ? "rotate-90 text-teal-500" : "text-gray-300"
                                  }`}
                                  viewBox="0 0 20 20" fill="currentColor"
                                >
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>

                            {/* Sub-sub panel — opens below on click */}
                            {isSubOpen && sub.subs?.length > 0 && (
                              <div className="bg-teal-50 border-t border-teal-100">
                                {sub.subs.map((s, ti) => (
                                  <div
                                    key={ti}
                                    onClick={() => s.path && navigate(s.path)}
                                    className="px-6 py-2 text-sm text-gray-600 hover:bg-teal-100 hover:text-teal-800 cursor-pointer transition-colors duration-100 flex items-center gap-2"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                                    {s.label}
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                        );
                      })}

                    </div>
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* ═══════════════ MOBILE OVERLAY ═══════════════ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ═══════════════ MOBILE DRAWER ═══════════════ */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Your City</p>
            <p className="text-sm font-semibold text-gray-800">Gurgaon</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Login Card */}
        <div className="m-4 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="text-base font-semibold">Hello 👋</p>
            <p className="text-xs text-gray-300 mt-0.5">Please login or signup</p>
          </div>
          <button
            className="bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        {/* Mobile menu items */}
        <div className="pb-8">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100">

              <button
                className="w-full flex justify-between items-center px-5 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileExpanded(mobileExpanded === index ? null : index)}
              >
                {item.title}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileExpanded === index ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileExpanded === index && (
                <div className="bg-gray-50 pb-3">
                  {/* Non-clickable section title */}
                  <p className="px-5 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {item.title}
                  </p>

                  {item.subItems.map((sub, si) => (
                    <div key={si} className="mt-1">
                      {/* Sub label — non-clickable */}
                      <p className="px-5 py-1 text-xs font-semibold text-gray-600">{sub.label}</p>
                      {/* Sub-sub items — clickable */}
                      {sub.subs?.map((s, ti) => (
                        <div key={ti} className="flex items-center gap-2 px-8 py-1.5 text-xs text-gray-500 hover:text-teal-600 cursor-pointer transition-colors">
                          <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                          {s}
                        </div>
                      ))}
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