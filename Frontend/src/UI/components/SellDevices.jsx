import React from "react";
import { useNavigate } from "react-router-dom";

import {
  faShieldAlt,
  faBolt,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SellDevices({ data, brand }) {
  const navigate = useNavigate();

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
    <>
      <section className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Sell Old {brand}</h2>

          <div className="flex justify-end mb-6">
            <input
              type="text"
              placeholder="Select Model"
              className="border rounded-lg px-4 py-2 w-64 focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate("/choose-variant", {
                    state: { product: item },
                  })
                }
                className="flex flex-col items-center bg-white rounded-lg shadow p-4 hover:shadow-md cursor-pointer transition"
              >
                <div className="w-20 h-32 flex items-center justify-center mb-2">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-contain h-full"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700 text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
                <h3 className="text-xl font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}