import { useState, useEffect } from "react";
import { getAllProducts } from "../../services/product.api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getDiscountPercent = (price, originalPrice) => {
  if (!price || !originalPrice) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

const formatINR = (amount) =>
  amount?.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const getGoldPrice = (price) => (price ? Math.round(price * 0.982) : null);

// ─── Star Rating ──────────────────────────────────────────────────────────────

const StarRating = ({ rating }) => {
  if (!rating || rating <= 0) return null;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < full ? "text-yellow-400" : i === full && half ? "text-yellow-300" : "text-gray-200"}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const CashifyLogo = () => (
  <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#00C389" />
    <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 3a9 9 0 110 18A9 9 0 0120 11zm-1 4v2.07A4.003 4.003 0 0020 25a4 4 0 001-7.93V15h-2zm1 4a2 2 0 110 4 2 2 0 010-4z" fill="white" />
  </svg>
);

const AssuredShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" fill="#c8860a" />
    <path d="M10 14.4l-2.4-2.4-1.2 1.2 3.6 3.6 7.2-7.2-1.2-1.2L10 14.4z" fill="white" />
  </svg>
);

// ─── Skeleton Card ────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="flex-shrink-0 w-[230px] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
    <div className="h-[200px] bg-gray-100" />
    <div className="p-4 space-y-2.5">
      <div className="h-3 bg-gray-100 rounded w-2/3" />
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-5 bg-gray-100 rounded w-2/3" />
      <div className="h-3 bg-gray-100 rounded w-1/4" />
      <div className="h-8 bg-gray-100 rounded-xl w-full mt-3" />
    </div>
  </div>
);

// ─── Laptop Card ──────────────────────────────────────────────────────────────

const LaptopCard = ({ product }) => {
  const discountPercent = getDiscountPercent(product.price, product.originalPrice);
  const savedAmount     = product.originalPrice ? product.originalPrice - product.price : null;
  const goldPrice       = getGoldPrice(product.price);

  return (
    <div className="flex-shrink-0 w-[230px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group">
      <div className="relative bg-white px-6 pt-5 pb-3 h-[200px] flex items-center justify-center">
        {savedAmount && (
          <div className="absolute top-0 left-0 z-10">
            <div className="bg-[#1a6b3c] text-white text-[11px] font-bold px-3 py-1.5 rounded-br-xl rounded-tl-2xl leading-tight" style={{ letterSpacing: "0.02em" }}>
              ₹{formatINR(savedAmount)} OFF
            </div>
          </div>
        )}
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="max-h-[165px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => { e.target.src = "https://placehold.co/160x160/f9fafb/9ca3af?text=No+Image"; }}
        />
      </div>

      <div className="h-px bg-gray-100 mx-4" />

      <div className="px-4 pt-3 pb-4 flex flex-col gap-0 flex-grow">
        <h3 className="text-[13.5px] font-bold text-gray-900 leading-snug line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {product.title}
        </h3>

        {product.subtitle && <p className="text-xs text-gray-500 mt-0.5 leading-tight">{product.subtitle}</p>}

        <div className="flex items-center gap-2 mt-2">
          {product.saleTag && (
            <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-[10.5px] font-semibold px-2 py-0.5 rounded-md">{product.saleTag}</span>
          )}
          {product.rating > 0 && (
            <>
              <StarRating rating={product.rating} />
              <span className="text-[11px] font-semibold text-gray-600">{product.rating}</span>
            </>
          )}
        </div>

        {discountPercent && <p className="text-red-500 font-bold text-sm mt-2">-{discountPercent}%</p>}

        <p className="text-[22px] font-extrabold text-gray-900 leading-tight mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>
          ₹{formatINR(product.price)}
        </p>

        {product.originalPrice && (
          <p className="text-sm text-gray-400 line-through leading-tight mt-0.5">₹{formatINR(product.originalPrice)}</p>
        )}

        {goldPrice && (
          <p className="text-sm font-bold text-[#00a86b] leading-tight mt-1">
            ₹{formatINR(goldPrice)} <span className="font-semibold">with GOLD</span>
          </p>
        )}

        {product.quantity > 0 && product.quantity <= 10 && (
          <p className="text-[11.5px] text-gray-500 mt-1.5">Only {product.quantity} left</p>
        )}

        <div className="flex-grow" />

        <div className="mt-3 flex items-center gap-1.5 bg-[#fdf6e3] border border-[#f0d98a] rounded-xl px-3 py-2">
          <AssuredShield />
          <span className="text-[12.5px] font-bold text-[#b07d0d]">Cashify Assured</span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="text-[11px] text-gray-400 font-medium">Sold by:</span>
          <div className="flex items-center gap-1">
            <CashifyLogo />
            <span className="text-[12px] font-extrabold text-[#00a86b]" style={{ letterSpacing: "0.05em" }}>
              {product.listedBy?.firstname} {product.listedBy?.lastname}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Arrow Button ─────────────────────────────────────────────────────────────

const ArrowButton = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "prev" ? "Previous" : "Next"}
    className={`absolute ${direction === "prev" ? "-left-5" : "-right-5"} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg z-20 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:shadow-xl hover:scale-105 disabled:opacity-25 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200`}
  >
    {direction === "prev" ? (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
    ) : (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
    )}
  </button>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RefurbishedLaptops({ title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts]         = useState([]);   // ← local state
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const CARD_WIDTH = 230;
  const CARD_GAP   = 16;
  const VISIBLE    = 5;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllProducts({
          deviceType: "refurbished",
          category:   "laptop",
          sortBy:     "newest",
          page:       1,
          limit:      10,
        });
        setProducts(res.products ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < products.length - VISIBLE;

  return (
    <section className="py-12 bg-[#f5f5f5]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>
            {title || "Refurbished Laptops"}
          </h2>
          <a href="#" className="text-sm font-semibold text-[#00a86b] hover:underline flex items-center gap-1">
            View all
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>

        <div className="relative px-5">
          {loading && (
            <div className="flex gap-4">{[...Array(VISIBLE)].map((_, i) => <SkeletonCard key={i} />)}</div>
          )}
          {!loading && error && (
            <p className="text-red-500 text-sm">Failed to load laptops: {error}</p>
          )}
          {!loading && !error && products.length === 0 && (
            <p className="text-gray-500 text-sm">No refurbished laptops available right now.</p>
          )}
          {!loading && !error && products.length > 0 && (
            <>
              <div className="overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (CARD_WIDTH + CARD_GAP)}px)` }}
                >
                  {products.map((product, i) => <LaptopCard key={product._id || i} product={product} />)}
                </div>
              </div>
              <ArrowButton direction="prev" onClick={() => canPrev && setCurrentIndex((p) => p - 1)} disabled={!canPrev} />
              <ArrowButton direction="next" onClick={() => canNext && setCurrentIndex((p) => p + 1)} disabled={!canNext} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}