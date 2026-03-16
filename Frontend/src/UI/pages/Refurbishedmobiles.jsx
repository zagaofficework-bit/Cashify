import { useState, useEffect } from "react";
import { useProductContext } from "../../context/product.context";

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const GridIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);
const ListIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

// ─── Condition style map ──────────────────────────────────────────────────────
const conditionMap = {
  "superb": "bg-teal-50 text-teal-700 border border-teal-200",
  "good":      "bg-sky-50 text-sky-700 border border-sky-200",
  "fair":      "bg-amber-50 text-amber-700 border border-amber-200",
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, view }) => {
  const [liked, setLiked] = useState(false);
  const image = product.images?.[0];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  if (view === "list") {
    return (
      <div className="group flex gap-4 bg-white border border-slate-100 rounded-2xl p-4 hover:border-violet-200 hover:shadow-[0_4px_24px_rgba(124,58,237,0.08)] transition-all duration-300 cursor-pointer">
        <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50">
          {image
            ? <img src={image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            : <div className="w-full h-full flex items-center justify-center text-4xl">📱</div>}
          {discount && (
            <div className="absolute top-1.5 left-1.5 bg-rose-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">-{discount}%</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-violet-600 font-bold tracking-wider uppercase mb-0.5">{product.brand}</p>
              <h3 className="text-slate-800 font-semibold text-sm leading-tight line-clamp-2">{product.title}</h3>
            </div>
            <button onClick={() => setLiked(!liked)} className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${liked ? "text-rose-500" : "text-slate-300 hover:text-rose-400"}`}>
              <HeartIcon filled={liked} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.storage && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{product.storage}</span>}
            {product.condition && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${conditionMap[product.condition] || "bg-slate-100 text-slate-600"}`}>
                {product.condition.replace("-", " ")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-lg font-bold text-slate-900">₹{product.price?.toLocaleString()}</span>
            {product.originalPrice && <span className="text-sm text-slate-400 line-through">₹{product.originalPrice?.toLocaleString()}</span>}
            {discount && <span className="text-xs font-bold text-emerald-600">Save {discount}%</span>}
          </div>
          {product.city && (
            <p className="text-xs text-slate-400 mt-1">📍 {product.city}{product.state ? `, ${product.state}` : ""}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-violet-200 hover:shadow-[0_8px_32px_rgba(124,58,237,0.10)] transition-all duration-300 cursor-pointer hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {image
          ? <img src={image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1">
              <span className="text-5xl opacity-25">📱</span>
              <span className="text-xs text-slate-400">{product.brand}</span>
            </div>
          )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {discount && <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">-{discount}%</span>}
          <span className="bg-white/95 text-violet-600 border border-violet-100 text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">✓ Certified</span>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className={`absolute top-3 right-3 p-2 rounded-xl bg-white/95 border shadow-sm transition-all duration-200 ${liked ? "border-rose-200 text-rose-500" : "border-slate-200 text-slate-400 hover:text-rose-400 hover:border-rose-200"}`}
        >
          <HeartIcon filled={liked} />
        </button>

        {/* Condition badge */}
        {product.condition && (
          <div className={`absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg bg-white/95 border ${conditionMap[product.condition] || "text-slate-600"}`}>
            {product.condition.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-1">{product.brand}</p>
        <h3 className="text-slate-800 font-semibold text-sm leading-tight line-clamp-2 mb-3 group-hover:text-violet-700 transition-colors">
          {product.title}
        </h3>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.storage && <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{product.storage}</span>}
          {product.specs?.ram && <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{product.specs.ram} RAM</span>}
          {product.color && <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{product.color}</span>}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-extrabold text-slate-900">₹{product.price?.toLocaleString()}</div>
            {product.originalPrice && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice?.toLocaleString()}</span>
                {discount && <span className="text-xs text-emerald-600 font-bold">↓{discount}% off</span>}
              </div>
            )}
          </div>
          {product.city && <p className="text-xs text-slate-400">📍 {product.city}</p>}
        </div>
      </div>

      {/* Hover CTA */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4 pt-0 bg-white">
        <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm py-2.5 rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-[0_4px_14px_rgba(124,58,237,0.3)]">
          View Details
        </button>
      </div>
    </div>
  );
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-52 bg-slate-100" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-slate-100 rounded w-1/4" />
      <div className="h-4 bg-slate-100 rounded w-3/4" />
      <div className="h-4 bg-slate-100 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-slate-100 rounded-full w-16" />
        <div className="h-6 bg-slate-100 rounded-full w-16" />
      </div>
      <div className="h-6 bg-slate-100 rounded w-1/3" />
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RefurbishedMobiles() {
  const { products, loading, error, pagination, filters, fetchByDeviceType } = useProductContext();

  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchByDeviceType("refurbished", { page: 1, limit: 12, sortBy: "newest" });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchByDeviceType("refurbished", { search: searchQuery, sortBy, page: 1, limit: 12 });
  };

  const handleSort = (val) => {
    setSortBy(val);
    fetchByDeviceType("refurbished", { sortBy: val, search: searchQuery, page: 1, limit: 12 });
  };

  const handlePage = (page) => {
    fetchByDeviceType("refurbished", { ...filters, sortBy, search: searchQuery, page, limit: 12 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', 'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float { animation: float 4s ease-in-out infinite; }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeSlideUp 0.4s ease forwards; }
      `}</style>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-violet-50/80 via-fuchsia-50/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-32 bg-gradient-to-tr from-sky-50/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                Certified Refurbished
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Refurbished
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Smartphones</span>
              </h1>
              <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-md leading-relaxed">
                Premium quality phones, rigorously tested & certified. Flagship performance at a fraction of the cost.
              </p>
              {!loading && pagination.total && (
                <p className="text-violet-500 text-sm font-semibold mt-2">{pagination.total?.toLocaleString()} phones available</p>
              )}
            </div>

            <div className="flex gap-6 sm:gap-8">
              {[
                { label: "Brands", value: "15+", icon: "🏷️" },
                { label: "Quality Tested", value: "100%", icon: "✅" },
                { label: "Warranty", value: "6 mo", icon: "🛡️" },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mt-8 max-w-2xl">
            <div className="flex gap-2 bg-white rounded-2xl border border-slate-200 shadow-[0_2px_16px_rgba(0,0,0,0.05)] p-1.5">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
                <input
                  type="text"
                  placeholder="Search by model, brand, specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-700 placeholder-slate-400 text-sm pl-9 pr-3 py-2.5 outline-none"
                />
              </div>
              <button type="submit"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold px-6 py-2.5 rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all text-sm shadow-[0_2px_8px_rgba(124,58,237,0.28)]">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Products ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {!loading && (
            <p className="text-sm text-slate-500">
              <span className="text-slate-800 font-bold">{products.length}</span> results
              {pagination.total && <span className="text-slate-400"> of {pagination.total}</span>}
            </p>
          )}

          <div className="flex items-center gap-2.5 ml-auto">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="bg-white border border-slate-200 text-slate-600 text-sm px-3 py-2.5 rounded-xl outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all cursor-pointer appearance-none pr-8 shadow-sm hover:border-slate-300"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "14px" }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* View toggle */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 gap-0.5 shadow-sm">
              <button onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition-all duration-150 ${view === "grid" ? "bg-violet-100 text-violet-600" : "text-slate-400 hover:text-slate-600"}`}>
                <GridIcon />
              </button>
              <button onClick={() => setView("list")}
                className={`p-2 rounded-lg transition-all duration-150 ${view === "list" ? "bg-violet-100 text-violet-600" : "text-slate-400 hover:text-slate-600"}`}>
                <ListIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl p-4 mb-6 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Cards */}
        {loading ? (
          <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" : "space-y-4"}>
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-6xl mb-4 float inline-block">📱</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No phones found</h3>
            <p className="text-slate-400 text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className={`fade-in ${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" : "space-y-4"}`}>
            {products.map((product) => <ProductCard key={product._id} product={product} view={view} />)}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              disabled={pagination.currentPage <= 1}
              onClick={() => handlePage(pagination.currentPage - 1)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm rounded-xl disabled:opacity-40 hover:border-violet-300 hover:text-violet-600 transition-all disabled:cursor-not-allowed shadow-sm"
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
              const page = i + 1;
              const current = pagination.currentPage;
              if (pagination.totalPages > 7 && page > 3 && page < pagination.totalPages - 2 && Math.abs(page - current) > 1) {
                return i === 3 ? <span key="ellipsis" className="text-slate-400 px-1">···</span> : null;
              }
              return (
                <button key={page} onClick={() => handlePage(page)}
                  className={`w-9 h-9 text-sm rounded-xl font-semibold transition-all shadow-sm ${
                    page === current
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
                      : "bg-white border border-slate-200 text-slate-500 hover:border-violet-300 hover:text-violet-600"
                  }`}
                >{page}</button>
              );
            })}
            <button
              disabled={pagination.currentPage >= pagination.totalPages}
              onClick={() => handlePage(pagination.currentPage + 1)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm rounded-xl disabled:opacity-40 hover:border-violet-300 hover:text-violet-600 transition-all disabled:cursor-not-allowed shadow-sm"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}