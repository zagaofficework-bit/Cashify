import React, { useState } from "react";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("SellSmart");
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = {
    SellSmart: [
      {
        question: "What should I do if my Amazon voucher shows “Already Redeemed”?",
        answer: "If your voucher shows as already redeemed, please contact Cashify support with your voucher details. They will verify and issue a replacement if applicable.",
      },
      {
        question: "What documents do you need to sell old mobile phone on Cashify?",
        answer: "You typically need a valid government ID proof and address proof. These documents help verify ownership and ensure a smooth transaction.",
      },
      {
        question: "What if my pickup is delayed?",
        answer: "If your pickup is delayed, you can reschedule through the app or website. Cashify support will also notify you of any changes.",
      },
    ],
    SmartBuy: [
      {
        question: "What is a refurbished product?",
        answer: "A refurbished product is a pre-owned device that has been tested, repaired if necessary, and certified to work like new.",
      },
      {
        question: "What is the Return policy?",
        answer: "Cashify offers a return policy within a specified period. Check the product page for exact details before purchase.",
      },
      {
        question: "Do you have delivery in all places or only in particular locations?",
        answer: "Delivery is available in most major cities. You can check availability by entering your pin code at checkout.",
      },
    ],
    "Repair/Others": [
      {
        question: "Can I place another exchange order if my previous one was cancelled?",
        answer: "Yes, you can place a new exchange order if your previous one was cancelled. Ensure your device meets the eligibility criteria.",
      },
      {
        question: "What happens if my exchange order is cancelled by Cashify?",
        answer: "If Cashify cancels your order, you will be notified with the reason. You can then place a new order or contact support for clarification.",
      },
      {
        question: "Can I appeal Cashify’s decision to cancel my order?",
        answer: "Yes, you can appeal by contacting customer support. They will review your case and provide further assistance.",
      },
    ],
  };

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(faqData).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData[activeTab].map((faq, index) => (
          <div
            key={index}
            className=" rounded-lg bg-white shadow-sm"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full text-left px-4 py-3 font-medium text-gray-800 flex justify-between items-center"
            >
              {faq.question}
              <span className="text-teal-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="text-teal-600 font-semibold hover:underline">
          Load More FAQs
        </button>
      </div>
    </section>
  );
}
