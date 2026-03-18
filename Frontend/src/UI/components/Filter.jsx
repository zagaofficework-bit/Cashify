import { useState, useMemo } from "react";

// Spec field keys that auto-render as chips on the card and in the preview modal.
// Add any new device-specific field key here to make it appear automatically.
const SPEC_KEYS = [
  "ram", "storage", "battery", "os", "processor", "display",
  "megapixels", "sensor", "video", "connectivity", "waterproof", "resolution",
];

const TAG_STYLES = {
  NEW:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  HOT:  "bg-rose-50 text-rose-600 border-rose-200",
  SALE: "bg-amber-50 text-amber-700 border-amber-200",
};

const fmt = (v) => `₹${Number(v).toLocaleString("en-IN")}`;

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3 h-3 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── FILTER SECTION ───────────────────────────────────────────────────────────
function FilterSection({ filter, active, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <div className="px-4 pt-3 pb-1">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          {filter.label}
        </span>
      </div>
      <div className="px-4 pb-3">
        {filter.type === "pill" ? (
          <div className="flex flex-wrap gap-1.5">
            {filter.options.map((opt) => {
              const sel = active.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => onToggle(filter.key, opt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                    sel
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                      : "bg-white text-gray-500 border-gray-200 hover:border-teal-400 hover:text-teal-600"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-1">
            {filter.options.map((opt) => {
              const sel = active.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 cursor-pointer group py-0.5"
                  onClick={() => onToggle(filter.key, opt)}
                >
                  <div
                    className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${
                      sel ? "bg-teal-600 border-teal-600" : "border-gray-300 group-hover:border-teal-400"
                    }`}
                  >
                    {sel && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm transition-colors ${
                      sel ? "text-teal-700 font-semibold" : "text-gray-600 group-hover:text-gray-800"
                    }`}
                  >
                    {opt}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LEFT FILTER PANEL ────────────────────────────────────────────────────────
function FilterPanel({
  filterConfig, priceRange, activeFilters,
  priceMin, priceMax, onToggle, onPriceMin, onPriceMax, onReset, totalActive,
}) {
  return (
    <aside className="w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-[73px] self-start overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h4" />
          </svg>
          <span className="text-sm font-bold text-gray-800">Filters</span>
          {totalActive > 0 && (
            <span className="bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button onClick={onReset} className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">
            Reset
          </button>
        )}
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-140px)]">
        {/* Price Range */}
        <div className="border-b border-gray-100 px-4 pt-3 pb-4">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Price Range</span>
          <div className="mt-2 space-y-3">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={priceRange.step}
              value={priceMax}
              onChange={(e) => onPriceMax(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1">Min (₹)</p>
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => onPriceMin(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <span className="text-gray-300 mt-4 text-sm">—</span>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1">Max (₹)</p>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => onPriceMax(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>{fmt(priceMin)}</span>
              <span>{fmt(priceMax)}</span>
            </div>
          </div>
        </div>

        {/* Dynamic filter sections — driven entirely by filterConfig from data prop */}
        {filterConfig.map((filter) => (
          <FilterSection
            key={filter.key}
            filter={filter}
            active={activeFilters[filter.key] || []}
            onToggle={onToggle}
          />
        ))}
      </div>
    </aside>
  );
}

// ─── QUICK PREVIEW MODAL ──────────────────────────────────────────────────────
function PreviewModal({ device, onClose }) {
  const specs = SPEC_KEYS.filter((k) => device[k]).map((k) => ({ key: k, val: device[k] }));
  const tagClass = TAG_STYLES[device.tag] || TAG_STYLES.NEW;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image panel */}
        <div className="relative h-52 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.1)_0%,_transparent_70%)]" />
          {device.img
            ? <img src={device.img} alt={device.name} className="h-36 w-auto object-contain drop-shadow-lg relative z-10" />
            : <span className="text-8xl select-none drop-shadow-lg relative z-10">📱</span>
          }
          <span className={`absolute top-4 left-4 text-[9px] font-bold px-2 py-1 rounded-md border uppercase tracking-wider ${tagClass}`}>
            {device.tag}
          </span>
          <span className={`absolute top-4 right-14 text-[9px] font-semibold px-2.5 py-1 rounded-full border ${
            device.available
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-600 border-red-200"
          }`}>
            {device.available ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{device.brand}</p>
          <h2 className="text-2xl font-black text-gray-900 leading-tight mb-3 tracking-tight">{device.name}</h2>

          <div className="flex items-center gap-2 mb-4">
            <Stars rating={device.rating} />
            <span className="text-sm font-semibold text-gray-600">{device.rating}</span>
            <span className="text-sm text-gray-400">· {device.reviews.toLocaleString()} reviews</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">{device.description}</p>

          {specs.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-6">
              {specs.map(({ key, val }) => (
                <div key={key} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{key}</p>
                  <p className="text-xs font-bold text-slate-700">{val}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              {device.discount > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-md">
                    -{device.discount}% OFF
                  </span>
                  <span className="text-xs text-gray-400 line-through">{fmt(device.originalPrice)}</span>
                </div>
              )}
              <p className="text-3xl font-black text-teal-600 leading-none tracking-tight">{fmt(device.price)}</p>
              {device.discount > 0 && (
                <p className="text-xs text-green-600 font-semibold mt-1">
                  You save {fmt(device.originalPrice - device.price)}
                </p>
              )}
            </div>
            <button className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors shadow-lg shadow-teal-600/25">
              View Full Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DEVICE CARD ─────────────────────────────────────────────────────────────
function DeviceCard({ device, onPreview }) {
  const tagClass = TAG_STYLES[device.tag] || TAG_STYLES.NEW;
  const specs = SPEC_KEYS.filter((k) => device[k]).map((k) => device[k]);

  return (
    <div className="group relative flex items-stretch bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal-100 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-l-2xl" />

      {/* Image */}
      <div className="flex-shrink-0 ml-1 w-44 bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.07)_0%,_transparent_70%)]" />
        {device.img
          ? <img src={device.img} alt={device.name} className="w-28 h-28 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow relative z-10" />
          : <span className="text-6xl select-none drop-shadow relative z-10">📱</span>
        }
        <span className={`absolute top-3 left-3 text-[9px] font-bold px-1.5 py-0.5 rounded-md border uppercase tracking-wider ${tagClass}`}>
          {device.tag}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 px-5 py-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{device.brand}</span>
            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${
              device.available
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-600 border-red-200"
            }`}>
              {device.available ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <h3 className="text-[16px] font-bold text-gray-900 leading-snug mb-2 truncate">{device.name}</h3>

          <div className="flex items-center gap-1.5 mb-3">
            <Stars rating={device.rating} />
            <span className="text-xs font-semibold text-gray-500">{device.rating}</span>
            <span className="text-xs text-gray-400">({device.reviews.toLocaleString()} reviews)</span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 max-w-xl">
            {device.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {specs.map((spec, i) => (
            <span key={i} className="text-[10px] font-semibold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-md">
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex-shrink-0 w-44 px-5 py-5 flex flex-col items-end justify-between border-l border-gray-100">
        <div className="flex flex-col items-end gap-1">
          {device.discount > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-md">
                -{device.discount}%
              </span>
              <span className="text-xs text-gray-400 line-through">{fmt(device.originalPrice)}</span>
            </div>
          )}
          <p className="text-[22px] font-extrabold text-teal-600 leading-none tracking-tight">
            {fmt(device.price)}
          </p>
          {device.discount > 0 && (
            <p className="text-[10px] text-green-600 font-semibold">
              Save {fmt(device.originalPrice - device.price)}
            </p>
          )}
        </div>

        <div className="w-full space-y-2">
          <button className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-bold py-2.5 rounded-xl transition-colors duration-150 shadow-sm shadow-teal-600/20">
            View Details
          </button>
          <button
            onClick={() => onPreview(device)}
            className="w-full border border-teal-500 text-teal-600 hover:bg-teal-50 text-xs font-semibold py-2 rounded-xl transition-colors duration-150"
          >
            Quick Preview
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// Pass the entire category data object as the `data` prop.
//
//   import { phonesData } from "../../res/Data/DeviceDetail";
//   <SearchByModel data={phonesData} />
// ─────────────────────────────────────────────────────────────────────────────
export default function Filter({ data }) {
  // Safely destructure — component renders nothing useful without data
  const {
    pageTitle    = "Devices",
    filterConfig = [],
    devices      = [],
    priceRange   = { min: 0, max: 100000, step: 1000 },
  } = data || {};

  const [searchQuery,       setSearchQuery]       = useState("");
  const [sortBy,            setSortBy]            = useState("relevant");
  const [activeFilters,     setActiveFilters]     = useState({});
  const [priceMin,          setPriceMin]          = useState(priceRange.min);
  const [priceMax,          setPriceMax]          = useState(priceRange.max);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [previewDevice,     setPreviewDevice]     = useState(null);

  const toggleFilter = (key, val) =>
    setActiveFilters((prev) => {
      const cur = prev[key] || [];
      return { ...prev, [key]: cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val] };
    });

  const resetAll = () => {
    setActiveFilters({});
    setPriceMin(priceRange.min);
    setPriceMax(priceRange.max);
    setSearchQuery("");
  };

  const totalActive = Object.values(activeFilters).reduce((s, a) => s + a.length, 0);

  const filtered = useMemo(() => {
    let list = devices.filter((d) => {
      if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (d.price < priceMin || d.price > priceMax) return false;
      for (const [key, vals] of Object.entries(activeFilters)) {
        if (!vals.length) continue;
        if (key === "availability") {
          const status = d.available ? "In Stock" : "Out of Stock";
          if (!vals.includes(status)) return false;
          continue;
        }
        if (!vals.includes(d[key])) return false;
      }
      return true;
    });
    if (sortBy === "price_asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "discount")   list = [...list].sort((a, b) => b.discount - a.discount);
    return list;
  }, [devices, searchQuery, priceMin, priceMax, activeFilters, sortBy]);

  const activeChips = Object.entries(activeFilters).flatMap(([key, vals]) =>
    vals.map((val) => ({ key, val }))
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {previewDevice && (
        <PreviewModal device={previewDevice} onClose={() => setPreviewDevice(null)} />
      )}

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20 flex items-center gap-4 flex-wrap">
        <div className="mr-2 flex-shrink-0">
          <h1 className="text-lg font-extrabold text-gray-900 leading-none">
            {pageTitle}<span className="text-teal-600">.</span>
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5">Filter and find your device</p>
        </div>

        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${pageTitle.toLowerCase()}…`}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 bg-white focus:outline-none focus:border-teal-500 cursor-pointer"
        >
          <option value="relevant">Most Relevant</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Discount</option>
        </select>

        <button
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className="md:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 bg-white"
        >
          <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h4" />
          </svg>
          Filters
          {totalActive > 0 && (
            <span className="bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{totalActive}</span>
          )}
        </button>
      </div>

      {/* Body */}
      <div className="max-w-screen-xl mx-auto px-6 py-6 flex gap-6 items-start">

        {/* Filter panel */}
        <div className={`${mobileFiltersOpen ? "block" : "hidden"} md:block`}>
          <FilterPanel
            filterConfig={filterConfig}
            priceRange={priceRange}
            activeFilters={activeFilters}
            priceMin={priceMin}
            priceMax={priceMax}
            onToggle={toggleFilter}
            onPriceMin={setPriceMin}
            onPriceMax={setPriceMax}
            onReset={resetAll}
            totalActive={totalActive}
          />
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
            <p className="text-sm text-gray-500 pt-1">
              <span className="font-bold text-gray-900">{filtered.length}</span> of {devices.length} {pageTitle.toLowerCase()} found
            </p>

            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                {activeChips.map(({ key, val }) => (
                  <button
                    key={`${key}-${val}`}
                    onClick={() => toggleFilter(key, val)}
                    className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors"
                  >
                    {val}
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                <button onClick={resetAll} className="text-[10px] font-semibold text-red-400 hover:text-red-600 px-1 transition-colors">
                  Clear all
                </button>
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-5xl mb-4">🔍</span>
              <p className="text-gray-800 font-bold text-base mb-1">No {pageTitle.toLowerCase()} match your filters</p>
              <p className="text-gray-400 text-sm mb-5">Try relaxing or clearing your filters</p>
              <button onClick={resetAll} className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {filtered.map((device) => (
                <DeviceCard key={device.id} device={device} onPreview={setPreviewDevice} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}