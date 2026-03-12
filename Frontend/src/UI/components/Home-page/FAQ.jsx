import React, { useState } from "react";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("SellSmart");
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = {
    SellSmart: [
      { question: "What should I do if my Amazon voucher shows 'Already Redeemed'?", answer: "If your voucher shows as already redeemed, please contact Phonify support with your voucher details. They will verify and issue a replacement if applicable." },
      { question: "What documents do you need to sell old mobile phone on Phonify?", answer: "You typically need a valid government ID proof and address proof." },
      { question: "What if my pickup is delayed?", answer: "If your pickup is delayed, you can reschedule through the app or website." },
    ],
    SmartBuy: [
      { question: "What is a refurbished product?", answer: "A refurbished product is a pre-owned device that has been tested, repaired if necessary, and certified to work like new." },
      { question: "What is the Return policy?", answer: "Phonify offers a return policy within a specified period. Check the product page for exact details." },
      { question: "Do you have delivery in all places?", answer: "Delivery is available in most major cities. Check availability by entering your pin code at checkout." },
    ],
    "Repair/Others": [
      { question: "Can I place another exchange order if my previous one was cancelled?", answer: "Yes, you can place a new exchange order if your previous one was cancelled." },
      { question: "What happens if my exchange order is cancelled by Phonify?", answer: "If Phonify cancels your order, you will be notified with the reason." },
      { question: "Can I appeal Phonify's decision to cancel my order?", answer: "Yes, you can appeal by contacting customer support." },
    ],
  };

  return (
    <section className="py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Frequently Asked Questions</h2>
        <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
          {Object.keys(faqData).map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); setOpenIndex(null); }}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base ${activeTab === tab ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="space-y-3 md:space-y-4">
          {faqData[activeTab].map((faq, index) => (
            <div key={index} className="rounded-lg bg-white shadow-sm">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-4 py-3 font-medium text-gray-800 flex justify-between items-center text-sm md:text-base">
                {faq.question}
                <span className="text-teal-600 ml-2 flex-shrink-0">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && <div className="px-4 pb-4 text-sm text-gray-600">{faq.answer}</div>}
            </div>
          ))}
        </div>
        <div className="mt-4 md:mt-6 text-center">
          <button className="text-teal-600 font-semibold hover:underline text-sm md:text-base">Load More FAQs</button>
        </div>
      </div>
    </section>
  );
}
