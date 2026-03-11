import React from "react";

export default function Feedback() {
  const metrics = [
    { label: "₹13052.48Cr. Cash Given" },
    { label: "193.37Lac Gadgets Encashed" },
  ];

  const feedback = [
    {
      name: "Karan Sharma",
      location: "Delhi NCR",
      text: "Well trained staff. Overall a positive experience in selling my phone at Phonify.",
    },
    {
      name: "Abhiyash",
      location: "New Delhi",
      text: "No complaints, sold my phone very easily here. Definitely worth a try.",
    },
    {
      name: "Vinit Kumar",
      location: "New Delhi",
      text: "Payment was very instant and the whole process was quick. Will recommend it.",
    },
    {
      name: "Satheesh Kumaram",
      location: "Bengaluru",
      text: "It was a wonderful experience with Phonify. I got a reasonable price for my product and their response was very quick! Good to see such a service available.",
    },
  ];

  return (
    <section className="bg-black text-white px-6 py-12">
      {/* Heading */}
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8">
        Trusted by <span className="text-teal-400">174.03 Lac +</span> Happy Users and Major Brands since 2015
      </h2>

      {/* Metrics */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-teal-500 rounded-lg px-6 py-4 text-center font-semibold"
          >
            {metric.label}
          </div>
        ))}
      </div>

      {/* feedback */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedback.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <p className="text-sm italic text-black mb-6">"{t.text}"</p>
            <p className="font-semibold text-teal-400">{t.name}</p>
            <p className="text-xs text-gray-400">{t.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
