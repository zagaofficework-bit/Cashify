import React from "react";

export default function CashifyTrust() {
  const trustItems = [
    { icon: "./assets/icons/happy-customers.png", title: "40+ Lakh", subtitle: "Happy Customers" },
    { icon: "./assets/icons/devices-sold.png", title: "27+ Lakh", subtitle: "Devices Sold" },
    { icon: "./assets/icons/quality-checks.png", title: "32 Points", subtitle: "Quality Checks" },
    { icon: "./assets/icons/refund.png", title: "15 Days", subtitle: "Refund*" },
    { icon: "./assets/icons/warranty.png", title: "Upto 12 Months", subtitle: "Warranty*" },
    { icon: "./assets/icons/stores.png", title: "200+", subtitle: "Cashify Stores" },
  ];

  return (
    <section className="bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Cashify Trust</h2>

        <div className="grid md:grid-cols-6 gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition"
            >
              {/* Icon */}
              <img
                src={item.icon}
                alt={item.subtitle}
                className="h-16 w-16 mb-4"
              />
              {/* Title */}
              <h3 className="text-xl font-semibold">{item.title}</h3>
              {/* Subtitle */}
              <p className="text-gray-600 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
