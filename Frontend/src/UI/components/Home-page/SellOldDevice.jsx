import { useState } from "react";
import ServiceCard from "../Card/ServiceCard.jsx";
import { sellDevices } from "../../../res/Data/Data.js";

const SellOldDevices = () => {

  const [openSidebar, setOpenSidebar] = useState(false);

  const visibleDesktopDevices = sellDevices.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Sell Old Devices
      </h2>

      {/* MOBILE + TABLET VIEW */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 lg:hidden">
        {sellDevices.map((item, index) => (
          <ServiceCard
            key={index}
            image={item.image}
            title={item.title}
            path={item.path}
          />
        ))}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:grid lg:grid-cols-7 gap-5">

        {visibleDesktopDevices.map((item, index) => (
          <ServiceCard
            key={index}
            image={item.image}
            title={item.title}
            path={item.path}
          />
        ))}

        {/* SELL MORE */}
        <div
          onClick={() => setOpenSidebar(true)}
          className="flex flex-col items-center justify-center 
          bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 p-6"
        >
          <div className="text-3xl mb-2">•••</div>
          <p className="text-sm font-medium">Sell More</p>
        </div>

      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl
        transform transition-transform duration-300 z-50
        ${openSidebar ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-lg font-semibold">Sell Devices</h3>
          <button onClick={() => setOpenSidebar(false)}>✕</button>
        </div>

        <div className="p-5 grid grid-cols-2 gap-4 overflow-y-auto">
          {sellDevices.map((item, index) => (
            <ServiceCard
              key={index}
              image={item.image}
              title={item.title}
              path={item.path}
            />
          ))}
        </div>

      </div>

      {/* OVERLAY */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

    </div>
  );
};

export default SellOldDevices;