import { useState } from "react";
import { useNavigate } from "react-router-dom";

const devices = [
  {
    id: 1,
    name: "Xiaomi Mi A2",
    sold: "19,450+",
    img: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-mi-a2.jpg",
    variants: ["4 GB / 64 GB", "6 GB / 128 GB", "8 GB / 256 GB", "16 GB / 512 GB"],
  },
];



export default function ChooseVariant() {
  const [selectedVariant, setSelectedVariant] = useState({});

  const handleVariant = (deviceId, variant) => {
    setSelectedVariant((prev) => ({ ...prev, [deviceId]: variant }));
  };
 const navigate = useNavigate()
  

  return (
    <div className="max-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-5">

        {devices.map((device) => {
          const selected = selectedVariant[device.id];
          return (
            <div
              key={device.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-9 items-start"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-20 h-24 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
                <img
                  src={device.img}
                  alt={device.name}
                  className="w-16 h-20 object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Title + sold count */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{device.name}</h3>
                </div>

                {/* Variant selector */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-2.5">Choose a variant</p>
                  <div className="flex flex-wrap gap-2">
                    {device.variants.map((v) => (
                      <button
                        key={v}
                        onClick={() => handleVariant(device.id, v)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                          selected === v
                            ? "border-teal-500 bg-teal-50 text-teal-700 shadow-sm"
                            : "border-gray-200 bg-white text-gray-600 hover:border-teal-300 hover:text-teal-600"
                        }`}
                      >
                        {/* Radio dot */}
                        <span
                          className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            selected === v ? "border-teal-500" : "border-gray-300"
                          }`}
                        >
                          {selected === v && (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          )}
                        </span>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  disabled={!selected}
                  onClick={() => navigate(`/base`)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selected
                      ? "bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"  
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`
                }
                  
                >
                  Get Exact Value
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}