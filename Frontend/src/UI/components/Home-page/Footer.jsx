import { useState } from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const footerSections = [
  {
    title: "Services",
    links: ["Sell Phone","Sell Television","Sell Smart Watch","Sell Smart Speakers","Sell DSLR Camera","Sell Earbuds","Repair Phone","Buy Gadgets","Recycle Phone","Find New Phone","Partner With Us"],
  },
  {
    title: "Company",
    links: ["About Us","Careers","Articles","Press Releases","Become Phonify Partner","Become Supersale Partner","Corporate Information"],
  },
  {
    title: "Sell Device",
    links: ["Mobile Phone","Laptop","Tablet","iMac","Gaming Consoles"],
  },
  {
    title: "Help & Support",
    links: ["FAQ","Contact Us","Warranty Policy","Refund Policy"],
  },
  {
    title: "More Info",
    links: ["Terms & Conditions","Privacy Policy","Terms of Use","E-Waste Policy","Cookie Policy","What is Refurbished","Device Safety"],
  },
];

const FooterAccordion = ({ title, links }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-300 md:border-0">
      {/* Mobile: accordion toggle */}
      <button
        className="md:hidden w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-700"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <svg className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Desktop: always show title */}
      <h3 className="hidden md:block font-semibold mb-4 text-sm md:text-base">{title}</h3>

      {/* Links — always visible on desktop, toggle on mobile */}
      <ul className={`space-y-2 text-xs md:text-sm pb-3 md:pb-0 ${open ? "block" : "hidden"} md:block`}>
        {links.map((item) => (
          <li key={item}>
            <a href="#" className="hover:text-teal-500 text-gray-600 transition-colors">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-8 md:pt-12">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-6 md:pb-10">

        {/* Logo + Social — always on top */}
        <div className="flex items-center justify-between mb-6 md:mb-0">
          <a href="/" className="text-2xl md:text-3xl font-bold text-teal-500">Phonify</a>
          <div className="flex gap-3">
            {[
              { href: "https://twitter.com", icon: <FaTwitter /> },
              { href: "https://facebook.com", icon: <FaFacebookF /> },
              { href: "https://instagram.com", icon: <FaInstagram /> },
              { href: "https://youtube.com", icon: <FaYoutube /> },
            ].map((s, i) => (
              <a key={i} href={s.href} className="bg-gray-300 p-2 rounded-full hover:bg-teal-500 hover:text-white transition">{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Mobile: accordion sections */}
        <div className="md:hidden">
          {footerSections.map((section) => (
            <FooterAccordion key={section.title} title={section.title} links={section.links} />
          ))}
          <a href="/chat"
            className="inline-flex items-center gap-2 mt-5 bg-teal-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-teal-600 transition w-full justify-center">
            💬 Chat with Us
          </a>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-6 gap-10 mt-8">
          {/* Spacer for logo column */}
          <div />
          {footerSections.map((section) => (
            <div key={section.title}>
              <FooterAccordion title={section.title} links={section.links} />
            </div>
          ))}
        </div>

        {/* Desktop chat button */}
        <div className="hidden md:block mt-6">
          <a href="/chatbot"
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-teal-600 transition">
            💬 Chat with Us
          </a>
        </div>
      </div>

      <div className="border-t border-gray-300"></div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 grid md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 text-xs md:text-sm text-gray-600 space-y-2">
          <p className="font-medium text-gray-700">Registered Office:</p>
          <p>Manak Waste Management Pvt Ltd, 55, 2nd Floor, Lane-2, Westend Marg, Saidulajab, Near Saket Metro Station, New Delhi–110030, India, Support-7290068900 | CIN: U46524DL2009PTC190441</p>
          <p>Manak Waste Management Pvt Ltd. is ISO 27001 & 27701 Compliance Certified. Grievances: grievanceofficer@Phonify.in</p>
          <p className="text-xs">** All product names, logos, and brands are property of their respective owners.</p>
        </div>
        <div className="bg-white border rounded-lg p-3 md:p-4 flex gap-3 md:gap-4 items-start shadow-sm">
          <img src="/device-safety.png" alt="Device Safety" className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-xs md:text-sm">Safeguarded by DeviceSafety.org</h4>
            <p className="text-xs text-gray-600 mt-1">All devices are data-wiped using DeviceSafety.org certified tools, guaranteeing highest standards of data security.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 py-4 text-center text-xs md:text-sm text-gray-600">
        Copyright © 2026 Phonify All rights reserved
      </div>
    </footer>
  );
}
