import React from "react";
import NavMenu from "../components/NavMenu";
import NavBar from "../components/NavBar";
import SellCard from "../components/SellCard";
import DealComponent from "../components/DealComponent";
import Brands from "../components/Brands";
import Feedback from "../components/Feedback";
import FAQ from "../components/FAQ";
import DownloadAppBanner from "../components/DownloadAppBanner";
import Footer from "../components/Footer";

const SellPhones = () => {
  const phones = [
    { name: "Apple iPhone 11 (4 GB/128 GB)", price: "₹14,340", image: "./assets/img/iphone.png" },
    { name: "Apple iPhone 11 (4 GB/64 GB)", price: "₹13,510", image: "./assets/img/iphone.png" },
    { name: "Apple iPhone XR (3 GB/64 GB)", price: "₹9,740", image: "./assets/img/iphone.png" },
    { name: "Apple iPhone 7 (2 GB/32 GB)", price: "₹4,050", image: "./assets/img/iphone.png" },
    { name: "Apple iPhone 12 (4 GB/128 GB)", price: "₹17,930", image: "./assets/img/iphone.png" },
  ];
  return (
    <>
      <NavBar />
      <NavMenu />
      <SellCard title="Sell Old Mobile Phone for Instant Cash" />
      <DealComponent />
      <Brands />
      <section className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Top Selling Mobile Phones
          </h2>

          <div className="grid md:grid-cols-1 gap-3">
            {phones.map((phone, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
              >
                <img
                src={phone.image}
                alt={phone.name}
                className="h-20 w-80 object-contain"
              />
                <div>
                  <h3 className="text-lg font-semibold">{phone.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Get Upto <span className="font-bold text-red-500"> {phone.price} </span>
                  </p>
                </div>
                <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                  Sell Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Feedback />
      <FAQ />
      <DownloadAppBanner />
      <Footer />
    </>
  );
};

export default SellPhones;
