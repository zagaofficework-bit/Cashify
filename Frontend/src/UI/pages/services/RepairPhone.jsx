import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Brands from "../../components/Brands";
import HowCashifyWorks from "../../components/HowCashifyWorks";
import Feedback from "../../components/Feedback";
import FAQ from "../../components/FAQ";
import StoreSection from "../../components/StoreSection";
import DownloadAppBanner from "../../components/DownloadAppBanner";
import Footer from "../../components/Footer";

export default function RepairPhone() {
  const scrollRef = useRef(null);

  const services = [
    { name: "SCREEN", icon: "./assets/icons/Screen.png" },
    { name: "BATTERY", icon: "./assets/icons/Battery.png" },
    { name: "MIC", icon: "./assets/icons/Mic.png" },
    { name: "RECEIVER", icon: "./assets/icons/Receiver.png" },
    { name: "CHARGING JACK", icon: "./assets/icons/ChargingJack.png" },
    { name: "SPEAKER", icon: "./assets/icons/Speaker.png" },
    { name: "BACK PANEL", icon: "./assets/icons/BackPanel.png" },
    { name: "PROXIMITY SENSOR", icon: "./assets/icons/ProximitySensor.png" },
    { name: "AUX JACK", icon: "./assets/icons/AuxJack.png" },
    { name: "FRONT CAMERA", icon: "./assets/icons/Camera.png" },
    { name: "BACK CAMERA", icon: "./assets/icons/Camera.png" },
    { name: "LCD SCREEN", icon: "./assets/icons/Screen.png" },
    { name: "MOTHERBOARD", icon: "./assets/icons/Motherboard.png" },
    { name: "MOBILE CLEANING", icon: "./assets/icons/Cleaning.png" },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -160, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 160, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Services Available
          </h2>

          <div className="relative">
            {/* Left Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            {/* Scrollable Row */}
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden space-x-6 scrollbar-hide  scroll-smooth px-12"
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center min-w-[120px] bg-white rounded-lg shadow p-4"
                >
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="h-16 w-16 mb-2 object-contain"
                  />
                  <p className="text-sm font-semibold">{service.name}</p>
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </section>
      <Brands title="Top Selling Brands" />

      <HowCashifyWorks />
      <img src="./assets/img/WhyUs.png" alt="Why Us" />
      <Feedback />
      <FAQ />
      <StoreSection />
      <DownloadAppBanner />
      <Footer />
    </>
  );
}
