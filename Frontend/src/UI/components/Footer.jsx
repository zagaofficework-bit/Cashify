import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12">
      
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 gap-10 pb-10">

        {/* Logo + Social */}
        <div>
          <a href="/" className="text-3xl font-bold text-teal-500 mb-6 block">
            CASHIFY
          </a>

          <p className="mb-3 text-sm font-medium">Follow us on</p>

          <div className="flex gap-3">
            <a href="https://twitter.com" className="bg-gray-300 p-2 rounded-full hover:bg-teal-500 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" className="bg-gray-300 p-2 rounded-full hover:bg-teal-500 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" className="bg-gray-300 p-2 rounded-full hover:bg-teal-500 hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" className="bg-gray-300 p-2 rounded-full hover:bg-teal-500 hover:text-white transition">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Sell Phone","Sell Television","Sell Smart Watch","Sell Smart Speakers",
              "Sell DSLR Camera","Sell Earbuds","Repair Phone","Buy Gadgets",
              "Recycle Phone","Find New Phone","Partner With Us"
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-500">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            {[
              "About Us","Careers","Articles","Press Releases",
              "Become Cashify Partner","Become Supersale Partner","Corporate Information"
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-500">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sell Device */}
        <div>
          <h3 className="font-semibold mb-4">Sell Device</h3>
          <ul className="space-y-2 text-sm">
            {["Mobile Phone","Laptop","Tablet","iMac","Gaming Consoles"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-500">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-4">Help & Support</h3>
          <ul className="space-y-2 text-sm">
            {["FAQ","Contact Us","Warranty Policy","Refund Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-500">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* More Info */}
        <div>
          <h3 className="font-semibold mb-4">More Info</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Terms & Conditions","Privacy Policy","Terms of Use","E-Waste Policy",
              "Cookie Policy","What is Refurbished","Device Safety"
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-500">{item}</a>
              </li>
            ))}
          </ul>

          <a
            href="/chat"
            className="inline-flex items-center gap-2 mt-6 bg-teal-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-teal-600 transition"
          >
            💬 Chat with Us
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8 items-start">

        {/* Registered Office */}
        <div className="md:col-span-2 text-sm text-gray-600 space-y-2">
          <p className="font-medium text-gray-700">Registered Office:</p>

          <p>
            Manak Waste Management Pvt Ltd, 55, 2nd Floor, Lane-2, Westend Marg,
            Saidulajab, Near Saket Metro Station, New Delhi–110030, India,
            Support-7290068900 | CIN: U46524DL2009PTC190441
          </p>

          <p>
            Manak Waste Management Pvt Ltd. is ISO 27001 & 27701 Compliance
            Certified. Person who may be contacted in case of any compliance
            related queries or grievances: Manoj Kumar
            (grievanceofficer@cashify.in)
          </p>

          <p className="text-xs">
            ** All product names, logos, and brands are property of their
            respective owners. All company, product and service names used in
            this website are for identification purposes only.
          </p>
        </div>

        {/* Device Safety Card */}
        <div className="bg-white border rounded-lg p-4 flex gap-4 items-start shadow-sm">
          <img
            src="/device-safety.png"
            alt="Device Safety"
            className="w-12 h-12"
          />

          <div>
            <h4 className="font-semibold text-sm">
              Safeguarded by DeviceSafety.org
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              All devices are data-wiped using DeviceSafety.org certified tools,
              guaranteeing the highest standards of data security and privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        Copyright © 2026 Cashify All rights reserved
      </div>

    </footer>
  );
}