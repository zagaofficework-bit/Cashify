import { useNavigate } from "react-router-dom";

export default function BasePrice() {
  const navigate = useNavigate();

  // Replace with real data passed via router state or props
  const device = {
    name: "Xiaomi Mi A2",
    variant: "4 GB / 64 GB",
    price: "₹2,530",
    sold: "17,050+",
    img: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-mi-a2.jpg",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex gap-8 items-center max-w-2xl mx-auto mt-10">

      {/* Phone image */}
      <div className="flex-shrink-0 w-24 h-32 flex items-center justify-center">
        <img src={device.img} alt={device.name} className="w-20 h-28 object-contain" />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">
          {device.name} ({device.variant})
        </h2>

        <p className="text-sm text-gray-500">Get Upto</p>

        <p className="text-5xl font-bold text-red-500">{device.price}</p>

        <p className="text-sm pt-1">
          <span className="text-teal-600 font-semibold">{device.sold}</span>
          <span className="text-gray-400"> already sold on Phonify</span>
        </p>

        <div className="pt-3 flex items-center gap-4" onClick={() => navigate('/yesno')}>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            Get Exact Value
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            Change variant
          </button>
        </div>
      </div>

    </div>
  );
}