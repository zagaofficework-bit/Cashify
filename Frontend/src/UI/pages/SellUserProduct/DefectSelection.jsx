import { useState } from "react";

const defects = [
  {
    id: "broken_screen",
    label: "Broken/Scratch on device screen",
    category: "Screen Condition",
    icon: (
      <svg viewBox="0 0 64 80" fill="none" className="w-14 h-16" stroke="#9ca3af" strokeWidth="1.5">
        <rect x="12" y="4" width="40" height="72" rx="5" />
        <line x1="28" y1="16" x2="20" y2="40" strokeWidth="1.5" />
        <line x1="20" y1="40" x2="30" y2="48" strokeWidth="1.5" />
        <line x1="30" y1="48" x2="22" y2="68" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "dead_spot",
    label: "Dead Spot/Visible line and Discoloration on screen",
    category: "Screen Condition",
    icon: (
      <svg viewBox="0 0 64 80" fill="none" className="w-14 h-16" stroke="#9ca3af" strokeWidth="1.5">
        <rect x="12" y="4" width="40" height="72" rx="5" />
        <line x1="32" y1="10" x2="32" y2="70" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "scratch_body",
    label: "Scratch/Dent on device body",
    category: "Body Condition",
    icon: (
      <svg viewBox="0 0 64 80" fill="none" className="w-14 h-16" stroke="#9ca3af" strokeWidth="1.5">
        <rect x="12" y="4" width="40" height="72" rx="5" />
        <line x1="44" y1="20" x2="52" y2="28" strokeWidth="1.5" />
        <line x1="44" y1="44" x2="54" y2="52" strokeWidth="1.5" />
        <line x1="10" y1="36" x2="18" y2="44" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "panel_broken",
    label: "Device panel missing/broken",
    category: "Body Condition",
    icon: (
      <svg viewBox="0 0 64 80" fill="none" className="w-14 h-16" stroke="#9ca3af" strokeWidth="1.5">
        <rect x="12" y="4" width="40" height="72" rx="5" />
        <path d="M52 30 Q62 40 52 50" strokeWidth="1.5" />
        <circle cx="56" cy="40" r="4" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const device = {
  name: "Xiaomi Mi A2",
  variant: "4 GB / 64 GB",
  img: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-mi-a2.jpg",
};

// Previous step's evaluation passed as prop (dummy here)
const prevEvaluation = {
  "Device Details": [
    { label: "Not Able to Make and Receive Calls", type: "no" },
    { label: "Touch Faulty", type: "no" },
  ],
};

export default function DefectSelection() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );

  // Build current step's evaluation grouped by category
  const currentEval = defects
    .filter((d) => selected.includes(d.id))
    .reduce((acc, d) => {
      if (!acc[d.category]) acc[d.category] = [];
      acc[d.category].push(d.label);
      return acc;
    }, {});

  // Merge previous + current for sidebar
  const fullEval = { ...prevEvaluation };
  Object.entries(currentEval).forEach(([cat, items]) => {
    fullEval[cat] = [
      ...(fullEval[cat] || []),
      ...items.map((label) => ({ label, type: "no" })),
    ];
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center gap-6">

      {/* ── LEFT: Defect cards ── */}
      <div className="flex-1 max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Select screen/body defects that are applicable!</h2>
          <p className="text-sm text-gray-400 mt-1.5">Please provide correct details</p>
        </div>

        {/* Defect grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {defects.map((d) => {
            const isSelected = selected.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggle(d.id)}
                className={`flex flex-col items-center justify-between p-4 pt-6 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-teal-500 bg-teal-500 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-teal-300 hover:shadow-sm"
                }`}
              >
                {/* Icon — tint white when selected */}
                <div className={`mb-3 transition-all ${isSelected ? "[&_svg]:stroke-white" : ""}`}>
                  {d.icon}
                </div>
                <p className={`text-xs font-medium leading-snug ${isSelected ? "text-white" : "text-gray-600"}`}>
                  {d.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Continue */}
        <div className="mt-10">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>

      {/* ── RIGHT: Sidebar ── */}
      <div className="w-72 space-y-4 sticky top-6">

        {/* Device card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-14 h-16 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0">
            <img src={device.img} alt={device.name} className="w-10 h-14 object-contain" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{device.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{device.variant}</p>
          </div>
        </div>

        {/* Evaluation */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-800 mb-4">Device Evaluation</p>

          <div className="space-y-4">
            {Object.entries(fullEval).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{category}</p>
                <ul className="space-y-1.5">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${item.type === "yes" ? "bg-green-400" : "bg-red-400"}`} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}