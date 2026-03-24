import { useState } from "react";
import { Link } from "react-router-dom";
import { sellDevices } from "../../../res/Data/Data.js";

const DeviceCard = ({ image, title, path }) => (
  <Link to={path} className="group flex flex-col items-center text-center cursor-pointer">
    <div className="w-full aspect-square flex items-center justify-center bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:bg-teal-50 group-hover:border-teal-200 transition-all duration-200 p-2">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
      />
    </div>
    <p className="text-[11px] md:text-xs font-semibold text-gray-600 mt-2.5 leading-snug group-hover:text-teal-600 transition-colors duration-150 px-1">
      {title}
    </p>
  </Link>
);

const SellOldDevices = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const visibleDesktopDevices = sellDevices.slice(0, 6);

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        <div className=" text-center items-center gap-8 mb-8">
          <h1 className="md:text-xl font-bold text-gray-900 tracking-tight">Sell Old Devices</h1>
        </div>

        {/* MOBILE + TABLET */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-5 lg:hidden">
          {sellDevices.map((item, index) => (
            <DeviceCard key={index} image={item.image} title={item.title} path={item.path} />
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:grid lg:grid-cols-7 gap-5">
          {visibleDesktopDevices.map((item, index) => (
            <DeviceCard key={index} image={item.image} title={item.title} path={item.path} />
          ))}

          {/* Sell More card */}
          <div
            onClick={() => setOpenSidebar(true)}
            className="group flex flex-col items-center text-center cursor-pointer z-50"
          >
            <div className="w-full aspect-square flex flex-col items-center justify-center bg-gray-50 border border-gray-100 rounded-2xl shadow-sm group-hover:shadow-md group-hover:bg-teal-50 group-hover:border-teal-200 transition-all duration-200 gap-1">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-teal-500 transition-colors duration-200" />
                ))}
              </div>
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-600 mt-2.5 group-hover:text-teal-600 transition-colors duration-150">
              Sell More
            </p>
          </div>
        </div>

      </div>

      {/* SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ${openSidebar ? "translate-x-0" : "translate-x-full"}`}>

        {/* Sidebar header */}
        <div className="flex justify-between items-center px-5 py-4 border-b  border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-5 bg-teal-500 rounded-full" />
            <h3 className="text-base font-bold text-gray-900">Sell Devices</h3>
          </div>
          <button
            onClick={() => setOpenSidebar(false)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-3 gap-4">
            {sellDevices.map((item, index) => (
              <DeviceCard key={index} image={item.image} title={item.title} path={item.path} />
            ))}
          </div>
        </div>

      </div>

      {/* OVERLAY */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

    </div>
  );
};

export default SellOldDevices;