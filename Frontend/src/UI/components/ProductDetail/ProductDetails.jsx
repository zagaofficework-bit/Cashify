import React, { useState } from "react";
import BuyRefurbishedDevices from "../Home-page/BuyRefurbishedDevices";
import PhonifyTrust from "../Banners/PhonifyTrust";
import WhyPhonify from "../Banners/WhyPhonify";
import FAQ from "../Home-page/FAQ";
import RatingReviews from "../RatingReview";
import Footer from "../Home-page/Footer";
import { audioDevices } from "../../../res/Data/DevicesData";



const specs = [
  { label: "Screen Size", value: "17.22 cm (6.78 inch)", icon: "📱" },
  { label: "Chipset", value: "MediaTek Dimensity 9200 MT6985", icon: "⚙️" },
  { label: "Pixel Density", value: "453 ppi", icon: "🖥️" },
  { label: "Network Support", value: "5G", icon: "📶" },
  { label: "SIM Slot(s)", value: "Dual SIM, GSM+GSM", icon: "🪪" },
];

const grades = {
  Superb: [
    { label: "Overall", desc: "No functional or cosmetic defects. Absolutely like new.", img: null },
    { label: "Screen Glass", desc: "Zero scratches or marks visible in any lighting condition.", img: "./assets/img/ScreenGlass.png" },
    { label: "Display", desc: "Perfect — no dead pixels, burns, or pressure marks.", img: "./assets/img/Display.png" },
  ],
  Good: [
    { label: "Overall", desc: "No functional defects. Minor cosmetic signs of use.", img: null },
    { label: "Screen Glass", desc: "Minimal scratches, barely noticeable when screen is off.", img: "./assets/img/ScreenGlass.png" },
    { label: "Display", desc: "Perfect condition — no dead pixels or marks.", img: "./assets/img/Display.png" },
  ],
  Fair: [
    { label: "Overall", desc: "Fully functional. Visible wear marks on body.", img: null },
    { label: "Screen Glass", desc: "Noticeable scratches, visible even when screen is on.", img: "./assets/img/ScreenGlass.png" },
    { label: "Display", desc: "May have faint marks under certain lighting angles.", img: "./assets/img/Display.png" },
  ],
};

const images = [
  "./assets/img/VivoX90Pro.png",
  "./assets/img/VivoX90Pro.png",
  "./assets/img/VivoX90Pro.png",
  "./assets/img/VivoX90Pro.png",
];

const paymentMethods = [
  { label: "EMI", icon: "💳" },
  { label: "UPI", icon: "📲" },
  { label: "Credit Card", icon: "💳" },
  { label: "COD", icon: "🚚" },
  { label: "Split Pay", icon: "✂️" },
  { label: "Debit Card", icon: "🏧" },
  { label: "Net Banking", icon: "🏦" },
];

const colors = [
  { name: "Legendary Black", off: "₹26,900 off", hex: "#1c1c1e" },
  { name: "Red", off: "₹22,000 off", hex: "#c0392b" },
  { name: "Gray", off: "₹20,500 off", hex: "#8e8e93" },
];

export default function ProductDetails({data}) {
  const [activeImg, setActiveImg] = useState(0);
  const [activeGrade, setActiveGrade] = useState("Good");
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [activeTab, setActiveTab] = useState("specs");
  const [wishlist, setWishlist] = useState(false);

  const tabs = [
    { key: "specs", label: "Top Specs" },
    { key: "cosmetic", label: "Cosmetic" },
  ];


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .pd-root { font-family: 'DM Sans', sans-serif; }
        .pd-heading { font-family: 'DM Serif Display', serif; }
        .fade-in { animation: fadeIn 0.35s ease both; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        .img-zoom { transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
        .img-zoom:hover { transform: scale(1.05); }
        .btn-buy { background:#0d9488; color:white; transition:all 0.2s; }
        .btn-buy:hover { background:#0f766e; transform:translateY(-1px); box-shadow:0 6px 18px rgba(13,148,136,0.3); }
        .btn-emi { border:2px solid #0d9488; color:#0d9488; transition:all 0.2s; }
        .btn-emi:hover { background:#f0fdfa; transform:translateY(-1px); }
        .spec-card { transition:all 0.2s; }
        .spec-card:hover { border-color:#99f6e4; background:#f0fdfa; transform:translateY(-2px); box-shadow:0 4px 12px rgba(13,148,136,0.08); }
        .grade-item { border-left:3px solid #5eead4; }
        .tag-pill { font-size:10px; letter-spacing:0.07em; text-transform:uppercase; font-weight:700; }
        .thumb-active { border-color:#0d9488 !important; box-shadow:0 0 0 3px #ccfbf1; }
        .pay-pill { transition:all 0.15s; }
        .pay-pill:hover { border-color:#0d9488; color:#0d9488; background:#f0fdfa; }
        .tab-btn { border-bottom:2px solid transparent; transition:all 0.15s; }
        .tab-active { color:#0d9488; border-bottom-color:#0d9488; }
        .tab-btn:not(.tab-active):hover { color:#374151; }
        .divider { height:1px; background:linear-gradient(to right,transparent,#e5e7eb 30%,#e5e7eb 70%,transparent); }
        .storage-active { border-color:#0d9488; color:#0f766e; background:#f0fdfa; }
        .storage-btn { border:2px solid #e5e7eb; color:#6b7280; transition:all 0.15s; }
        .storage-btn:not(.storage-active):hover { border-color:#d1d5db; color:#374151; }
        .color-btn-active { border-color:#0d9488 !important; background:#f0fdfa !important; }
        .share-btn { transition:all 0.15s; }
        .share-btn:hover { color:#0d9488; border-color:#0d9488; }
      `}</style>

      <div className="pd-root bg-white min-h-screen">
      

        
        {/* ── HERO ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* LEFT: Gallery */}
            <div className="lg:w-[420px] flex-shrink-0">
              <div className="sticky top-24 space-y-3">
                {/* Main Image */}
                <div className="relative bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center h-[340px] md:h-[400px]">
                  <img src="" alt="Vivo X90 Pro" className="w-56 h-56 object-contain img-zoom fade-in" key={activeImg} />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    <span className="tag-pill bg-red-500 text-white px-2.5 py-1 rounded-lg"></span>
                    <span className="tag-pill bg-amber-400 text-white px-2.5 py-1 rounded-lg">Holi Sale</span>
                  </div>
                  <span className="absolute top-4 right-4 tag-pill bg-teal-600 text-white px-2.5 py-1 rounded-lg">Phonify Assured</span>
                  <button onClick={() => setWishlist(!wishlist)}
                    className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center transition-transform hover:scale-110">
                    <svg className={`w-4 h-4 transition-colors ${wishlist ? "text-red-500 fill-red-500" : "text-gray-400"}`} viewBox="0 0 24 24" stroke="currentColor" fill="none">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`flex-1 aspect-square rounded-xl border-2 bg-gray-50 flex items-center justify-center overflow-hidden transition-all ${activeImg === i ? "thumb-active" : "border-gray-200 hover:border-gray-300"}`}>
                      <img src={img} alt="" className="w-10 h-10 object-contain" />
                    </button>
                  ))}
                </div>

                {/* Share */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-gray-400 mr-1">Share:</span>
                  {["WhatsApp", "Copy Link"].map((s) => (
                    <button key={s} className="share-btn text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg">{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="flex-1 space-y-5">

              {/* Badges + Title */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="tag-pill bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full">Vivo</span>
                  <span className="tag-pill bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">Refurbished</span>
                  <span className="tag-pill bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">In Stock</span>
                </div>
                <h1 className="pd-heading text-3xl md:text-4xl text-gray-900 leading-tight">{data.name}</h1>
                <p className="text-sm text-gray-500 mt-1.5">Phonify Warranty · Fair Grade · 12 GB / 256 GB · Legendary Black</p>

                {/* Rating */}
                <div className="flex items-center gap-2.5 mt-3">
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className={`w-4 h-4 ${s <= 4 ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">4.2</span>
                  <span className="text-sm text-gray-400">(6 reviews)</span>
                  <a href="#reviews" className="text-sm text-teal-600 hover:underline">View all →</a>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {["Camera Focused", "Flagship", "5G Ready", "120W Fast Charge", "Zeiss Optics"].map((h) => (
                  <span key={h} className="text-xs font-medium bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full">{h}</span>
                ))}
              </div>

              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="pd-heading text-4xl text-gray-900">₹34,599</span>
                  <span className="text-xl text-gray-400 line-through">₹94,499</span>
                  <span className="tag-pill bg-red-500 text-white px-2.5 py-1.5 rounded-lg">63% OFF</span>
                </div>
                <div className="h-px bg-gray-200 my-3" />
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                  <span className="text-gray-600">💎 <span className="font-semibold text-teal-600">₹33,999</span> with GOLD</span>
                  <span className="text-gray-600">📅 EMI from <span className="font-semibold">₹1,930/mo</span></span>
                  <span className="text-gray-600">🎁 <span className="font-semibold text-teal-600">₹100 extra off</span> on bundle</span>
                </div>
              </div>

              {/* Warranty */}
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-800">6 Months Phonify Warranty Included</p>
                  <p className="text-xs text-green-700 mt-0.5">Covers manufacturing defects. All devices are quality tested before dispatch.</p>
                </div>
              </div>

              {/* Storage */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Storage</p>
                <div className="flex flex-wrap gap-2">
                  {["12 GB RAM / 256 GB", "8 GB RAM / 128 GB"].map((s, i) => (
                    <button key={s} onClick={() => setSelectedStorage(i)}
                      className={`storage-btn px-4 py-2.5 rounded-xl text-sm font-medium ${selectedStorage === i ? "storage-active" : ""}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2.5">
                  Color — <span className="font-normal text-gray-500">{colors[selectedColor].name}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {colors.map((c, i) => (
                    <button key={c.name} onClick={() => setSelectedColor(i)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 text-sm transition-all ${selectedColor === i ? "color-btn-active" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                      <span className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" style={{ background: c.hex }} />
                      <span className="font-medium text-gray-700">{c.name}</span>
                      <span className="text-xs text-red-500 font-semibold">{c.off}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button className="btn-buy flex-1 px-6 py-3.5 rounded-xl font-semibold text-sm">Buy Now</button>
                <button className="btn-emi flex-1 px-6 py-3.5 rounded-xl font-semibold text-sm">View EMI Plans</button>
                <button className="border-2 border-gray-200 hover:border-gray-300 text-gray-500 w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>

              {/* Payment Methods */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2.5">Available Payment Methods</p>
                <div className="flex flex-wrap gap-2">
                  {paymentMethods.map((m) => (
                    <span key={m.label} className="pay-pill flex items-center gap-1.5 text-xs font-medium border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg">
                      {m.icon} {m.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pincode */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Check Delivery</p>
                <div className="flex gap-2 max-w-xs">
                  <div className="flex-1 flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 focus-within:border-teal-400 transition-all">
                    <svg className="w-4 h-4 ml-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter pincode" maxLength={6}
                      className="flex-1 px-2 py-2.5 text-sm bg-transparent focus:outline-none" />
                  </div>
                  <button className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">Check</button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Enter pincode for exact delivery dates</p>
              </div>

            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
          <div className="divider" />
        </div>

        {/* ── TABS ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 mt-6">
          <div className="flex border-b border-gray-200 overflow-x-auto gap-0">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`tab-btn px-5 py-3 text-sm font-semibold whitespace-nowrap ${activeTab === t.key ? "tab-active" : "text-gray-500"}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="py-8 fade-in" key={activeTab}>

            {/* SPECS TAB */}
            {activeTab === "specs" && (
              <div className="max-w-4xl">
                <h2 className="pd-heading text-2xl text-gray-900 mb-1">Top Specifications</h2>
                <p className="text-sm text-gray-500 mb-6">Key technical details of the Vivo X90 Pro</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {specs.map((spec, i) => (
                    <div key={i} className="spec-card flex items-start gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <span className="text-2xl flex-shrink-0">{spec.icon}</span>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{spec.label}</p>
                        <p className="text-sm font-semibold text-gray-800">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 className="text-base font-bold text-gray-700 mb-3">Full Specifications</h3>
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  {[["Brand","Vivo"],["Model","X90 Pro"],["OS","Android 13, OriginOS 3"],["Display","6.78\" AMOLED, 120Hz, HDR10+"],["Processor","MediaTek Dimensity 9200"],["RAM","12 GB"],["Storage","256 GB UFS 3.1"],["Main Camera","50MP Zeiss + 12MP Telephoto"],["Battery","4870 mAh, 120W FlashCharge"],["Connectivity","5G, Wi-Fi 6E, BT 5.3, NFC"],["Weight","215 g"]].map(([label,val],i) => (
                    <div key={label} className={`flex text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <span className="w-44 px-4 py-3 text-gray-500 font-medium border-r border-gray-100 flex-shrink-0">{label}</span>
                      <span className="px-4 py-3 text-gray-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COSMETIC TAB */}
            {activeTab === "cosmetic" && (
              <div className="max-w-3xl">
                <h2 className="pd-heading text-2xl text-gray-900 mb-1">Cosmetic Condition</h2>
                <p className="text-sm text-gray-500 mb-5">Actual photos of the exact device you will receive</p>
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5 mb-6">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-sm text-amber-700"><strong>Chrome/Body</strong> – Minor signs of wear and light scratches. Invisible from a 20 cm distance. No damage to the screen.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[{ src: "./assets/img/Cosmetic1.png", label: "Side View" }, { src: "./assets/img/Cosmetic2.png", label: "Bottom View" }, { src: "./assets/img/Display.png", label: "Display" }, { src: "./assets/img/ScreenGlass.png", label: "Screen Glass" }].map((img) => (
                    <div key={img.label} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden group">
                      <div className="flex items-center justify-center h-40 p-4 bg-white">
                        <img src={img.src} alt={img.label} className="h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="border-t border-gray-100 px-3 py-2.5">
                        <p className="text-xs text-gray-500 font-semibold text-center">{img.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── YOU MAY ALSO LIKE ── */}
        <div className="border-t border-gray-100 mt-4">
          <BuyRefurbishedDevices title="You May Also Like" products={audioDevices} />
        </div>

        <PhonifyTrust />
        <WhyPhonify />

        {/* ── TOP SPECS SECTION ── */}
        <section className="bg-white px-4 md:px-10 py-14 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="pd-heading text-3xl text-center text-gray-900 mb-2">Top Specs</h2>
            <p className="text-center text-gray-400 text-sm mb-8">Quick glance at what makes this device stand out</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {specs.map((spec, i) => (
                <div key={i} className="spec-card bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                  <span className="text-3xl flex-shrink-0">{spec.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{spec.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ />

        <div id="reviews"><RatingReviews /></div>

        <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
          <img src="./assets/img/NewVsRefurbished.png" className="w-full h-auto rounded-2xl" alt="New vs Refurbished" />
        </div>

        <Footer />
      </div>
    </>
  );
}