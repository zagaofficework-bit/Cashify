import { useState } from "react";

const items = [
  {
    id: 1,
    name: "Lenovo Thinkpad P Series P15s Gen 1 (Intel Core i7 10th Gen 15.6 Inch) - Refurbished",
    rating: 5.0,
    price: "₹36,399",
    original: "₹56,999",
    save: "₹20,600",
    img: "https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy Z Flip6 5G - Refurbished",
    rating: 4.9,
    price: "₹51,999",
    original: "₹1,09,999",
    save: "₹58,000",
    img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip6.jpg",
  },
  {
    id: 3,
    name: "Apple iPhone 14 Pro Max 256GB - Refurbished",
    rating: 4.8,
    price: "₹72,999",
    original: "₹1,39,900",
    save: "₹66,901",
    img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max.jpg",
  },
];

export default function Wishlist() {
  const [cart, setCart] = useState([]);

  const moveToCart = (id) => setCart((prev) => [...new Set([...prev, id])]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your items</h2>
          <span className="bg-teal-100 text-teal-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">
            {items.length}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const inCart = cart.includes(item.id);
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">

                {/* Image area */}
                <div className="relative bg-gradient-to-br from-gray-50 to-white p-6 flex items-center justify-center h-48">
                  {/* Assured badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white border border-teal-100 rounded-lg px-2 py-1 shadow-sm">
                    <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Phonify Assured</span>
                  </div>

                  <img src={item.img} alt={item.name} className="h-32 w-auto object-contain" />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{item.name}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg">
                      <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-amber-700">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">• Free Delivery • COD Available</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-end gap-2 flex-wrap mt-0.5">
                    <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    <span className="text-sm text-gray-400 line-through">{item.original}</span>
                    <span className="text-xs font-semibold text-teal-600">(Save {item.save})</span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => moveToCart(item.id)}
                    className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                      inCart
                        ? "bg-teal-500 border-teal-500 text-white"
                        : "bg-white border-gray-800 text-gray-900 hover:bg-gray-900 hover:text-white"
                    }`}
                  >
                    {inCart ? "✓ Added to Cart" : "Move to Cart"}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}