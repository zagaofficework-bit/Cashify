import { useState } from "react";

export default function SearchByModel() {
  const [priceSort, setPriceSort] = useState("asc");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(150000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedDeviceTypes, setSelectedDeviceTypes] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedRAM, setSelectedRAM] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    deviceType: true, availability: true, brand: true,
    price: true, ram: true, storage: true, battery: true,
  });

  const phones = [
    { name: "Motorola Moto E15", price: 12999, tag: "NEW", img: "/images/moto-e15.png", brand: "Motorola", rating: 4.2, reviews: 128, type: "Budget", available: true, ram: "4GB", storage: "64GB", battery: "5000mAh" },
    { name: "Apple iPhone 17e", price: 64900, tag: "NEW", img: "/images/iphone-17e.png", brand: "Apple", rating: 4.8, reviews: 342, type: "Flagship", available: true, ram: "8GB", storage: "128GB", battery: "3500mAh" },
    { name: "Samsung Galaxy S26", price: 87999, tag: "HOT", img: "/images/galaxy-s26.png", brand: "Samsung", rating: 4.6, reviews: 215, type: "Flagship", available: true, ram: "12GB", storage: "256GB", battery: "5000mAh" },
    { name: "OnePlus 14 Pro", price: 72999, tag: "NEW", img: "/images/oneplus14.png", brand: "OnePlus", rating: 4.5, reviews: 189, type: "Flagship", available: false, ram: "12GB", storage: "256GB", battery: "5500mAh" },
    { name: "Google Pixel 9", price: 79999, tag: "SALE", img: "/images/pixel9.png", brand: "Google", rating: 4.7, reviews: 267, type: "Flagship", available: true, ram: "12GB", storage: "128GB", battery: "4700mAh" },
    { name: "Xiaomi 15 Ultra", price: 59999, tag: "NEW", img: "/images/xiaomi15.png", brand: "Xiaomi (MI)", rating: 4.4, reviews: 156, type: "Flagship", available: true, ram: "16GB", storage: "512GB", battery: "5300mAh" },
  ];

  const brands = ["Apple", "Samsung", "Xiaomi (MI)", "Motorola", "Google", "OnePlus", "Oppo", "Vivo"];
  const deviceTypes = ["Smartphone", "Flagship", "Budget", "Tablet", "Refurbished"];
  const availabilityOpts = ["In Stock", "Out of Stock", "Pre-order"];
  const ramOpts = ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"];
  const storageOpts = ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"];
  const batteryOpts = ["3000–4000mAh", "4000–5000mAh", "5000mAh+"];
  const tagColors = { NEW: "bg-emerald-500", HOT: "bg-rose-500", SALE: "bg-amber-500" };

  const toggle = (setter, val) => setter((p) => p.includes(val) ? p.filter((x) => x !== val) : [...p, val]);
  const toggleSection = (key) => setExpandedSections((p) => ({ ...p, [key]: !p[key] }));
  const formatPrice = (v) => `₹${v.toLocaleString("en-IN")}`;

  const totalActiveFilters = selectedBrands.length + selectedDeviceTypes.length +
    selectedAvailability.length + selectedRAM.length + selectedStorage.length + selectedBattery.length;

  const resetAll = () => {
    setSelectedBrands([]); setSelectedDeviceTypes([]); setSelectedAvailability([]);
    setSelectedRAM([]); setSelectedStorage([]); setSelectedBattery([]);
    setPriceMin(0); setPriceMax(150000); setSearchQuery("");
  };

  const filteredPhones = phones
    .filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (selectedDeviceTypes.length && !selectedDeviceTypes.includes(p.type)) return false;
      if (selectedAvailability.length) {
        const status = p.available ? "In Stock" : "Out of Stock";
        if (!selectedAvailability.includes(status)) return false;
      }
      if (selectedRAM.length && !selectedRAM.includes(p.ram)) return false;
      if (selectedStorage.length && !selectedStorage.includes(p.storage)) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      return true;
    })
    .sort((a, b) => priceSort === "asc" ? a.price - b.price : b.price - a.price);

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const SectionHeader = ({ label, sectionKey }) => (
    <button onClick={() => toggleSection(sectionKey)} className="w-full flex items-center justify-between py-3 text-left">
      <span className="text-sm font-semibold text-gray-800">{label}</span>
      <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedSections[sectionKey] ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  const CheckOption = ({ label, selected, onToggle }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <div onClick={onToggle}
        className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${selected ? "bg-teal-600 border-teal-600" : "border-gray-300 group-hover:border-teal-400"}`}>
        {selected && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span onClick={onToggle} className={`text-sm transition-colors ${selected ? "text-teal-700 font-medium" : "text-gray-600 group-hover:text-gray-800"}`}>{label}</span>
    </label>
  );

  const FilterPanel = () => (
    <div className="divide-y divide-gray-100">
      {/* Device Type */}
      <div className="px-4"><SectionHeader label="Device Type" sectionKey="deviceType" />
        {expandedSections.deviceType && <div className="pb-3 space-y-0.5">{deviceTypes.map((t) => <CheckOption key={t} label={t} selected={selectedDeviceTypes.includes(t)} onToggle={() => toggle(setSelectedDeviceTypes, t)} />)}</div>}
      </div>

      {/* Availability */}
      <div className="px-4"><SectionHeader label="Availability" sectionKey="availability" />
        {expandedSections.availability && <div className="pb-3 space-y-0.5">{availabilityOpts.map((a) => <CheckOption key={a} label={a} selected={selectedAvailability.includes(a)} onToggle={() => toggle(setSelectedAvailability, a)} />)}</div>}
      </div>

      {/* Brand */}
      <div className="px-4"><SectionHeader label="Brand" sectionKey="brand" />
        {expandedSections.brand && <div className="pb-3 space-y-0.5">{brands.map((b) => <CheckOption key={b} label={b} selected={selectedBrands.includes(b)} onToggle={() => toggle(setSelectedBrands, b)} />)}</div>}
      </div>

      {/* Price Range */}
      <div className="px-4"><SectionHeader label="Price Range" sectionKey="price" />
        {expandedSections.price && (
          <div className="pb-4 space-y-3">
            <div className="flex gap-2">
              <button onClick={() => setPriceSort("asc")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1 ${priceSort === "asc" ? "bg-teal-600 text-white border-teal-600" : "text-gray-500 border-gray-200 hover:border-teal-400"}`}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                Low → High
              </button>
              <button onClick={() => setPriceSort("desc")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-1 ${priceSort === "desc" ? "bg-teal-600 text-white border-teal-600" : "text-gray-500 border-gray-200 hover:border-teal-400"}`}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" /></svg>
                High → Low
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1">Min (₹)</p>
                <input type="number" value={priceMin} onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-teal-500 text-gray-700" />
              </div>
              <div className="mt-4 text-gray-300 text-sm">—</div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1">Max (₹)</p>
                <input type="number" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-teal-500 text-gray-700" />
              </div>
            </div>
            <input type="range" min="0" max="150000" step="1000" value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatPrice(priceMin)}</span><span>{formatPrice(priceMax)}</span>
            </div>
          </div>
        )}
      </div>

      {/* RAM */}
      <div className="px-4"><SectionHeader label="RAM" sectionKey="ram" />
        {expandedSections.ram && (
          <div className="pb-3 flex flex-wrap gap-2">
            {ramOpts.map((r) => (
              <button key={r} onClick={() => toggle(setSelectedRAM, r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedRAM.includes(r) ? "bg-teal-600 text-white border-teal-600" : "text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600"}`}>{r}</button>
            ))}
          </div>
        )}
      </div>

      {/* Storage */}
      <div className="px-4"><SectionHeader label="Storage" sectionKey="storage" />
        {expandedSections.storage && (
          <div className="pb-3 flex flex-wrap gap-2">
            {storageOpts.map((s) => (
              <button key={s} onClick={() => toggle(setSelectedStorage, s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedStorage.includes(s) ? "bg-teal-600 text-white border-teal-600" : "text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600"}`}>{s}</button>
            ))}
          </div>
        )}
      </div>

      {/* Battery */}
      <div className="px-4"><SectionHeader label="Battery Capacity" sectionKey="battery" />
        {expandedSections.battery && <div className="pb-3 space-y-0.5">{batteryOpts.map((b) => <CheckOption key={b} label={b} selected={selectedBattery.includes(b)} onToggle={() => toggle(setSelectedBattery, b)} />)}</div>}
      </div>

      {/* Actions */}
      <div className="px-4 py-4">
        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-all">Apply Filters</button>
        {totalActiveFilters > 0 && (
          <button onClick={resetAll} className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 transition-colors py-1">Clear all filters</button>
        )}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-white px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Find Your Phone</h1>
          <p className="text-gray-400 text-sm mt-1">Filter through devices that match your exact needs</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model name e.g. iPhone 17, Galaxy S26..."
            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all bg-gray-50" />
        </div>

        <div className="flex gap-5 items-start">

          {/* Mobile filter toggle */}
          <div className="md:hidden w-full mb-2">
            <button onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center justify-between w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h4" /></svg>
                Filters {totalActiveFilters > 0 && <span className="bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{totalActiveFilters}</span>}
              </span>
              <svg className={`h-4 w-4 text-gray-400 transition-transform ${filtersOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {filtersOpen && <div className="mt-2 bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"><FilterPanel /></div>}
          </div>

          {/* Desktop sidebar LEFT */}
          <div className="hidden md:block w-60 flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h4" /></svg>
                <h2 className="text-sm font-bold text-gray-800">Filters</h2>
                {totalActiveFilters > 0 && <span className="bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{totalActiveFilters}</span>}
              </div>
              {totalActiveFilters > 0 && <button onClick={resetAll} className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium">Reset</button>}
            </div>
            <div className="max-h-[80vh] overflow-y-auto"><FilterPanel /></div>
          </div>

          {/* Results RIGHT */}
          <div className="flex-1 w-full min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500"><span className="font-semibold text-gray-800">{filteredPhones.length}</span> phones found</p>
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                <span>Sort by price:</span>
                <button onClick={() => setPriceSort("asc")} className={`px-2.5 py-1 rounded-lg border transition-all ${priceSort === "asc" ? "bg-teal-600 text-white border-teal-600" : "border-gray-200 text-gray-600 hover:border-teal-400"}`}>↑ Asc</button>
                <button onClick={() => setPriceSort("desc")} className={`px-2.5 py-1 rounded-lg border transition-all ${priceSort === "desc" ? "bg-teal-600 text-white border-teal-600" : "border-gray-200 text-gray-600 hover:border-teal-400"}`}>↓ Desc</button>
              </div>
            </div>

            {filteredPhones.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 font-medium">No phones match your filters</p>
                <button onClick={resetAll} className="mt-3 text-sm text-teal-600 hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {filteredPhones.map((phone, i) => (
                  <div key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer">
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center h-40 md:h-44">
                      <img src={phone.img} alt={phone.name} className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
                      <span className={`absolute top-3 left-3 ${tagColors[phone.tag] || "bg-teal-500"} text-white text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wide uppercase`}>{phone.tag}</span>
                      <span className={`absolute top-3 right-3 text-[9px] font-semibold px-2 py-0.5 rounded-full ${phone.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {phone.available ? "In Stock" : "Sold Out"}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">{phone.brand}</p>
                      <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2 line-clamp-2">{phone.name}</h3>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <StarRating rating={phone.rating} />
                        <span className="text-[10px] text-gray-400">({phone.reviews})</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {[phone.ram, phone.storage, phone.battery].map((spec, si) => (
                          <span key={si} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium">{spec}</span>
                        ))}
                      </div>
                      <p className="text-teal-600 font-bold text-lg leading-none mb-3">{formatPrice(phone.price)}</p>
                      <button className="w-full border border-teal-500 text-teal-600 text-xs font-semibold py-2 rounded-xl hover:bg-teal-600 hover:text-white transition-all duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}