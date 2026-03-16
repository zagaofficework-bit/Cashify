import React from "react";
import { apple } from "../../../../res/Data/SellBrandData";
import SellMobileBrand from "../../../components/SellMobileBrand";
import NavMenu from "../../../components/NavMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faBolt,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import Brands from "../../../components/Brands";
import DownloadAppBanner from "../../../components/Home-page/DownloadAppBanner";
import Footer from "../../../components/Home-page/Footer";

const Apple = () => {
  const benefits = [
    {
      icon: faShieldAlt,
      title: "Safe & Secure",
      description:
        "Select your device & we'll help you unlock the best selling price based on the present conditions of your gadget & the current market price.",
    },
    {
      icon: faBolt,
      title: "Instant Payment",
      description:
        "On accepting the price offered for your device, we'll arrange a free pick up.",
    },
    {
      icon: faMoneyBillWave,
      title: "Best Price",
      description:
        "Instant Cash will be handed over to you at time of pickup or through payment mode of your choice.",
    },
  ];
  return (
    <div>
      <NavMenu />
      <SellMobileBrand data={apple} brand="Apple" />
      <section className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Why Sell On Cashify?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white rounded-lg shadow p-6 hover:shadow-md transition"
              >
                <FontAwesomeIcon
                  icon={benefit.icon}
                  className="text-blue-600 text-5xl mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Brands/>
      <DownloadAppBanner />
      <Footer/>
    </div>
  );
};

export default Apple;
