import { useState } from "react";

const allDevices = [
  {
    _id: "1",
    title: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    condition: "Superb",
    storage: "256 GB",
    color: "Titanium Black",
    price: 89999,
    score: 9.2,
    images: ["https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra5g.jpg"],
    specs: {
      performance: { chipsetFull: "Snapdragon 8 Elite", chipsetSub: "4nm, Adreno 830", ram: "12 GB", ramSub: "LPDDR5X" },
      display: { sizeInches: "6.9 inches", sizeSub: "453 ppi, QHD+", type: "Dynamic AMOLED 2X", refreshRate: "120 Hz", refreshSub: "LTPO adaptive" },
      rearCamera: { primary: "200 MP", primarySub: "8K @ 30fps, 4K @ 120fps", secondary: "50 MP", tertiary: "10 MP", quaternary: "50 MP" },
      frontCamera: "12 MP", frontCameraSub: "4K @ 60fps",
      battery: { capacity: "5000 mAh", wiredCharging: "45W", wiredSub: "Super Fast Charging 2.0" },
      storageType: "UFS 4.0", storageSub: "256GB / 512GB / 1TB",
    },
  },
  {
    _id: "2",
    title: "Apple iPhone 16 Pro Max",
    brand: "Apple",
    condition: "Good",
    storage: "512 GB",
    color: "Desert Titanium",
    price: 134900,
    score: 9.5,
    images: ["https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg"],
    specs: {
      performance: { chipsetFull: "Apple A18 Pro", chipsetSub: "3nm, Apple GPU 6-core", ram: "8 GB", ramSub: "LPDDR5" },
      display: { sizeInches: "6.9 inches", sizeSub: "460 ppi, Super Retina", type: "LTPO OLED", refreshRate: "120 Hz", refreshSub: "ProMotion adaptive" },
      rearCamera: { primary: "48 MP", primarySub: "4K @ 120fps, ProRes video", secondary: "48 MP", tertiary: "12 MP", quaternary: null },
      frontCamera: "12 MP", frontCameraSub: "4K @ 60fps, Face ID",
      battery: { capacity: "4685 mAh", wiredCharging: "30W", wiredSub: "MagSafe 25W Wireless" },
      storageType: "NVMe", storageSub: "128GB / 256GB / 512GB / 1TB",
    },
  },
  {
    _id: "3",
    title: "Google Pixel 9 Pro",
    brand: "Google",
    condition: "Superb",
    storage: "128 GB",
    color: "Obsidian",
    price: 109999,
    score: 8.8,
    images: ["https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-pro.jpg"],
    specs: {
      performance: { chipsetFull: "Google Tensor G4", chipsetSub: "4nm, Imagination GPU", ram: "16 GB", ramSub: "LPDDR5X" },
      display: { sizeInches: "6.3 inches", sizeSub: "495 ppi, QHD+", type: "LTPO OLED", refreshRate: "120 Hz", refreshSub: "LTPO adaptive" },
      rearCamera: { primary: "50 MP", primarySub: "4K @ 60fps, Night Sight", secondary: "48 MP", tertiary: "48 MP", quaternary: null },
      frontCamera: "42 MP", frontCameraSub: "4K @ 60fps",
      battery: { capacity: "4700 mAh", wiredCharging: "37W", wiredSub: "23W Wireless Charging" },
      storageType: "UFS 3.1", storageSub: "128GB / 256GB / 1TB",
    },
  },
  {
    _id: "4",
    title: "OnePlus 13",
    brand: "OnePlus",
    condition: "Fair",
    storage: "256 GB",
    color: "Midnight Ocean",
    price: 69999,
    score: 8.4,
    images: ["https://fdn2.gsmarena.com/vv/bigpic/oneplus-13.jpg"],
    specs: {
      performance: { chipsetFull: "Snapdragon 8 Elite", chipsetSub: "4nm, Adreno 830", ram: "12 GB", ramSub: "LPDDR5X" },
      display: { sizeInches: "6.82 inches", sizeSub: "510 ppi, QHD+", type: "LTPO AMOLED", refreshRate: "120 Hz", refreshSub: "LTPO 1-120Hz" },
      rearCamera: { primary: "50 MP", primarySub: "4K @ 60fps, Hasselblad", secondary: "50 MP", tertiary: "50 MP", quaternary: null },
      frontCamera: "32 MP", frontCameraSub: "1080p @ 30fps",
      battery: { capacity: "6000 mAh", wiredCharging: "100W", wiredSub: "SuperVOOC, 50W Wireless" },
      storageType: "UFS 4.0", storageSub: "256GB / 512GB",
    },
  },
];

// Score → bar width (max score ~10)
const scoreBar = (score) => Math.round((score / 10) * 100);

// Numeric value extraction for relative bar widths
const extractNum = (str) => {
  if (!str) return 0;
  const m = str.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
};

const conditionStyle = {
  Superb: "bg-emerald-100 text-emerald-700",
  Good:   "bg-sky-100 text-sky-700",
  Fair:   "bg-amber-100 text-amber-700",
};

// Per-slot accent colors
const slotAccent = [
  { bar: "bg-teal-500",   text: "text-teal-600",   bg: "bg-teal-50",   border: "border-teal-200",   score: "bg-teal-500"   },
  { bar: "bg-violet-500", text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", score: "bg-violet-500" },
  { bar: "bg-amber-500",  text: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200",  score: "bg-amber-500"  },
];

const MAX = 3;

// Relative bar: highest value gets full bar, others proportional
function RelativeBars({ rawValues, accentBars }) {
  const nums = rawValues.map(extractNum);
  const max = Math.max(...nums, 1);
  return (
    <div className="flex flex-col gap-1 mt-2">
      {nums.map((n, i) => (
        <div key={i} className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
          <div
            className={`h-full rounded-full transition-all duration-700 ${accentBars[i] || "bg-gray-300"}`}
            style={{ width: `${Math.round((n / max) * 100)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

// A single spec block (one card = one spec across all selected devices)
function SpecBlock({ label, values, subValues, accentBars, accentTexts }) {
  const hasValue = values.some((v) => v != null && v !== "");
  if (!hasValue) return null;

  return (
    <div className="grid border-b border-gray-100 last:border-0" style={{ gridTemplateColumns: `repeat(${MAX}, 1fr)` }}>
      {Array.from({ length: MAX }).map((_, i) => {
        const val = values[i];
        const sub = subValues?.[i];
        const accent = accentTexts[i];
        return (
          <div key={i} className={`px-5 py-4 border-r border-gray-100 last:border-r-0 ${i > 0 ? "border-l border-gray-100" : ""}`}>
            {val != null && val !== "" ? (
              <>
                <p className="text-sm font-bold text-gray-900">{val}</p>
                {sub && <p className={`text-xs mt-0.5 font-medium ${accent}`}>{sub}</p>}
              </>
            ) : (
              <p className="text-sm text-gray-200 font-medium">—</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Full spec card (label row + value blocks + bars)
function SpecCard({ label, values, subValues, showBars = true }) {
  const activeBars  = values.map((_, i) => slotAccent[i]?.bar  ?? "bg-gray-300");
  const activeTexts = values.map((_, i) => slotAccent[i]?.text ?? "text-gray-400");
  const hasAny = values.some((v) => v != null && v !== "");
  if (!hasAny) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-3">
      {/* Label strip */}
      <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      </div>

      {/* Values */}
      <SpecBlock
        label={label}
        values={values}
        subValues={subValues}
        accentBars={activeBars}
        accentTexts={activeTexts}
      />

      {/* Relative bars */}
      {showBars && (
        <div className="px-5 pb-4">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${MAX}, 1fr)`, gap: "12px" }}>
            {values.map((val, i) => (
              <div key={i} className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${activeBars[i]}`}
                  style={{ width: val != null && val !== "" ? `${Math.min(Math.round((extractNum(val) / Math.max(...values.map(extractNum), 1)) * 100), 100)}%` : "0%" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ label, icon }) {
  return (
    <div className="flex items-center gap-2.5 mb-3 mt-6">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-black text-gray-700 uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

export default function CompareDevices() {
  const [selected, setSelected] = useState([allDevices[0], allDevices[1]]);
  const [search, setSearch]     = useState("");
  const [addingSlot, setAddingSlot] = useState(null);
  const [diffOnly, setDiffOnly] = useState(false);

  const filteredDevices = allDevices.filter(
    (d) =>
      !selected.find((s) => s?._id === d._id) &&
      (d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.brand.toLowerCase().includes(search.toLowerCase()))
  );

  const addDevice = (device) => {
    if (addingSlot !== null) {
      const updated = [...selected];
      updated[addingSlot] = device;
      setSelected(updated);
    } else if (selected.length < MAX) {
      setSelected([...selected, device]);
    }
    setAddingSlot(null);
    setSearch("");
  };

  const removeDevice = (idx) =>
    setSelected(selected.filter((_, i) => i !== idx));

  const g = (device, path) =>
    path.reduce((o, k) => o?.[k] ?? null, device ?? {});

  const v  = (path)    => Array.from({ length: MAX }).map((_, i) => selected[i] ? g(selected[i], path) : null);
  const vs = (path)    => v(path);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-7 bg-teal-500 rounded-full" />
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Compare Devices</h1>
            </div>
            <p className="text-sm text-gray-400 ml-4">Up to 3 devices · side-by-side specs</p>
          </div>

          {/* Diff toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <span className="text-xs font-semibold text-gray-500">Differences only</span>
            <div
              onClick={() => setDiffOnly((v) => !v)}
              className={`w-10 h-5.5 rounded-full relative transition-colors duration-200 flex items-center px-0.5 ${diffOnly ? "bg-teal-500" : "bg-gray-200"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${diffOnly ? "translate-x-5" : "translate-x-0"}`} />
            </div>
          </label>
        </div>

        {/* ── Device header cards ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${MAX}, 1fr)` }}>
            {Array.from({ length: MAX }).map((_, idx) => {
              const device = selected[idx];
              const accent = slotAccent[idx];
              return (
                <div key={idx} className={`relative border-r border-gray-100 last:border-r-0 px-5 py-5 flex items-center gap-4 ${device ? "" : "bg-gray-50/50"}`}>
                  {device ? (
                    <>
                      {/* Score badge */}
                      <div className={`absolute top-3 left-3 w-8 h-8 rounded-xl ${accent.score} flex items-center justify-center`}>
                        <span className="text-[11px] font-black text-white">{device.score}</span>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeDevice(idx)}
                        className="absolute top-3 right-3 w-6 h-6 bg-gray-100 hover:bg-red-50 hover:text-red-400 text-gray-300 rounded-lg flex items-center justify-center transition-all text-xs font-bold"
                      >
                        ✕
                      </button>

                      {/* Image */}
                      <img src={device.images[0]} alt={device.title} className="h-16 w-12 object-contain flex-shrink-0 mt-3" />

                      {/* Info */}
                      <div className="flex-1 min-w-0 mt-3">
                        <p className="text-sm font-black text-gray-900 line-clamp-2 leading-snug">{device.title}</p>
                        <button
                          onClick={() => { setAddingSlot(idx); setSearch(""); }}
                          className={`text-xs font-bold mt-1 ${accent.text} hover:underline`}
                        >
                          Check Price ₹{device.price.toLocaleString()}
                        </button>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${conditionStyle[device.condition]}`}>
                            {device.condition}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                            {device.storage}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => { setAddingSlot(idx); setSearch(""); }}
                      className="w-full flex flex-col items-center justify-center gap-2 py-8 text-gray-300 hover:text-teal-500 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold">Add device</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Search picker ── */}
        {addingSlot !== null && (
          <div className="bg-white border border-teal-200 rounded-2xl shadow-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-teal-500 rounded-full" />
                <p className="text-sm font-bold text-gray-800">Select device for slot {addingSlot + 1}</p>
              </div>
              <button
                onClick={() => { setAddingSlot(null); setSearch(""); }}
                className="w-7 h-7 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-400 text-xs font-bold transition-all"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-2.5 bg-gray-50 mb-4 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
              <svg className="w-4 h-4 text-gray-400 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or brand..."
                className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-52 overflow-y-auto">
              {filteredDevices.map((d) => (
                <button
                  key={d._id}
                  onClick={() => addDevice(d)}
                  className="flex flex-col items-center text-center bg-gray-50 hover:bg-teal-50 border border-gray-100 hover:border-teal-300 rounded-2xl p-3 transition-all duration-200 group hover:shadow-sm"
                >
                  <img src={d.images[0]} alt={d.title} className="h-14 w-auto object-contain mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">{d.title}</p>
                  <p className="text-[10px] text-teal-600 font-black mt-1">₹{d.price.toLocaleString()}</p>
                </button>
              ))}
              {filteredDevices.length === 0 && (
                <p className="col-span-4 text-center text-sm text-gray-300 py-6">No devices found</p>
              )}
            </div>
          </div>
        )}

        {/* ── Spec sections ── */}
        {selected.length > 0 && (
          <>
            <SectionLabel label="Performance" icon="⚡" />
            <SpecCard label="Chipset"      values={v(["specs","performance","chipsetFull"])} subValues={v(["specs","performance","chipsetSub"])} showBars={false} />
            <SpecCard label="RAM"          values={v(["specs","performance","ram"])}         subValues={v(["specs","performance","ramSub"])} />

            <SectionLabel label="Display" icon="🖥️" />
            <SpecCard label="Screen Size"  values={v(["specs","display","sizeInches"])} subValues={v(["specs","display","sizeSub"])} />
            <SpecCard label="Panel Type"   values={v(["specs","display","type"])}       showBars={false} />
            <SpecCard label="Refresh Rate" values={v(["specs","display","refreshRate"])} subValues={v(["specs","display","refreshSub"])} />

            <SectionLabel label="Rear Camera" icon="📷" />
            <SpecCard label="Primary"    values={v(["specs","rearCamera","primary"])}    subValues={v(["specs","rearCamera","primarySub"])} />
            <SpecCard label="Secondary"  values={v(["specs","rearCamera","secondary"])}  />
            <SpecCard label="Tertiary"   values={v(["specs","rearCamera","tertiary"])}   />
            <SpecCard label="Quaternary" values={v(["specs","rearCamera","quaternary"])} />

            <SectionLabel label="Front Camera" icon="🤳" />
            <SpecCard label="Front Camera" values={v(["specs","frontCamera"])} subValues={Array.from({length:MAX}).map((_,i)=>selected[i]?.specs?.frontCameraSub??null)} />

            <SectionLabel label="Battery" icon="🔋" />
            <SpecCard label="Capacity" values={v(["specs","battery","capacity"])} />
            <SpecCard label="Charging" values={v(["specs","battery","wiredCharging"])} subValues={v(["specs","battery","wiredSub"])} />

            <SectionLabel label="Storage" icon="💾" />
            <SpecCard label="Storage Type" values={v(["specs","storageType"])} subValues={v(["specs","storageSub"])} showBars={false} />
          </>
        )}

      </div>
    </div>
  );
}