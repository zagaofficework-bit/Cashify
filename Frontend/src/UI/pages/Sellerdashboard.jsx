import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/product.context";
import { useAuth } from "../hooks/useAuth";
import { useSellerPendingOrders } from "../hooks/useBuySell";

// ── Icons ──────────────────────────────────────────────────────────────────────
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);
const PlusIcon     = () => <Icon path="M12 4v16m8-8H4" />;
const OrdersIcon   = () => <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />;
const EditIcon     = () => <Icon path="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" className="w-4 h-4" />;
const TrashIcon    = () => <Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" className="w-4 h-4" />;
const PhoneIcon    = () => <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4" />;
const MailIcon     = () => <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" className="w-4 h-4" />;
const LocationIcon = () => <Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" className="w-4 h-4" />;
const PackageIcon  = () => <Icon path="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" className="w-5 h-5" />;
const ChevronRight = () => <Icon path="M9 5l7 7-7 7" className="w-4 h-4" />;

// ── Condition & status styles ──────────────────────────────────────────────────
const conditionStyle = {
  "like-new":  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "excellent": "bg-blue-50 text-blue-700 border-blue-200",
  "good":      "bg-amber-50 text-amber-700 border-amber-200",
  "fair":      "bg-orange-50 text-orange-700 border-orange-200",
  // backend values
  "Fair":      "bg-orange-50 text-orange-700 border-orange-200",
  "Good":      "bg-amber-50 text-amber-700 border-amber-200",
  "Superb":    "bg-emerald-50 text-emerald-700 border-emerald-200",
};
const statusStyle = {
  available: "bg-emerald-50 text-emerald-700",
  active:    "bg-emerald-50 text-emerald-700",
  sold:      "bg-slate-100 text-slate-500",
  reserved:  "bg-blue-50 text-blue-600",
  inactive:  "bg-red-50 text-red-600",
};

// ── Stat Card ──────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon, accent }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(17,50,212,0.06)] p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-extrabold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
      <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
      {sub && <p className="text-xs text-[#1132d4] font-semibold mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ── Product Row ────────────────────────────────────────────────────────────────
const ProductRow = ({ product, onDelete }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 hover:border-[#1132d4]/30 hover:shadow-[0_4px_20px_rgba(17,50,212,0.07)] transition-all duration-200">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center flex-shrink-0 border border-slate-100 overflow-hidden">
        {product.images?.[0]
          ? <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
          : <span className="text-2xl opacity-40">📱</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <p className="text-xs font-bold text-[#1132d4] tracking-wider uppercase">{product.brand}</p>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${conditionStyle[product.condition] || "bg-slate-100 text-slate-500 border-slate-200"}`}>
            {product.condition}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[product.status] || "bg-slate-100 text-slate-500"}`}>
            {product.status}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-800 mt-0.5 truncate">{product.title}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-base font-extrabold text-slate-900">₹{product.price?.toLocaleString()}</span>
          {product.originalPrice && <span className="text-xs text-slate-400 line-through">₹{product.originalPrice?.toLocaleString()}</span>}
          {discount > 0 && <span className="text-xs font-bold text-emerald-600">{discount}% off</span>}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:border-[#1132d4] hover:text-[#1132d4] hover:bg-blue-50 transition-all duration-150">
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

// ── Skeleton ───────────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 animate-pulse">
    <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-slate-100 rounded w-1/4" />
      <div className="h-4 bg-slate-100 rounded w-2/3" />
      <div className="h-3 bg-slate-100 rounded w-1/3" />
    </div>
  </div>
);

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function SellerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // ── Auth — seller profile ──────────────────────────────────────────────────
  const { user } = useAuth();

  // ── Products — seller's own listings ──────────────────────────────────────
  const {
    userListings,
    loading: productsLoading,
    fetchUserListings,
    removeProduct,
  } = useProductContext();

  // ── Orders — pending count for the badge on CTA button ────────────────────
  const { pendingOrders } = useSellerPendingOrders();

  useEffect(() => {
    fetchUserListings();
  }, []);

  // ── Derived data ───────────────────────────────────────────────────────────
  const products = userListings ?? [];

  const filteredProducts = activeTab === "all"
    ? products
    : products.filter(p => p.status === activeTab);

  const stats = {
    total:   products.length,
    active:  products.filter(p => p.status === "available" || p.status === "active").length,
    sold:    products.filter(p => p.status === "sold").length,
    revenue: products
      .filter(p => p.status === "sold")
      .reduce((s, p) => s + (p.price ?? 0), 0),
  };

  // ── Profile fields from auth context ──────────────────────────────────────
  const firstName  = user?.firstname  ?? user?.firstName  ?? "—";
  const lastName   = user?.lastname   ?? user?.lastName   ?? "";
  const email      = user?.email      ?? "—";
  const mobile     = user?.mobile     ?? user?.phone      ?? "—";
  const profilePic = user?.profilePic ?? user?.avatar     ?? null;
  const address    = user?.address    ?? null;
  const initials   = `${firstName[0] ?? "S"}${lastName[0] ?? ""}`.toUpperCase();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await removeProduct(id);
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-up   { animation: fadeUp 0.4s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.4s 0.05s ease forwards; opacity:0; }
        .fade-up-2 { animation: fadeUp 0.4s 0.1s  ease forwards; opacity:0; }
      `}</style>

      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-[0_1px_8px_rgba(17,50,212,0.05)]">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1132d4] flex items-center justify-center shadow-[0_2px_8px_rgba(17,50,212,0.4)]">
              <span className="text-white text-sm font-black">S</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Seller Portal</p>
              <p className="text-xs text-slate-400">Dashboard</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1132d4] to-[#3b5ef5] flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold">{initials}</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── Profile + CTA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 fade-up">

          {/* Profile Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(17,50,212,0.05)] overflow-hidden">
            <div className="px-6 pt-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl shadow-md bg-gradient-to-br from-[#1132d4] to-[#3b5ef5] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {profilePic
                      ? <img src={profilePic} alt="profile" className="w-full h-full object-cover" />
                      : <span className="text-white text-xl font-black">{initials}</span>}
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {firstName} {lastName}
                    </h2>
                    <p className="text-xs text-[#1132d4] font-semibold">Verified Seller</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1132d4] border border-[#1132d4]/30 bg-blue-50 px-3 py-1.5 rounded-xl hover:bg-[#1132d4] hover:text-white transition-all duration-200">
                  <EditIcon /> Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: <MailIcon />,  label: "Email",  value: email  },
                  { icon: <PhoneIcon />, label: "Mobile", value: mobile },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
                    <span className="text-[#1132d4]">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-slate-700 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="sm:col-span-2 flex items-start gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
                  <span className="text-[#1132d4] mt-0.5"><LocationIcon /></span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Default Address</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {address
                        ? [address.line1, address.line2, address.city, address.state, address.pincode]
                            .filter(Boolean).join(", ")
                        : user?.address ?? "No address saved"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Cards */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/add-product")}
              className="flex-1 group bg-[#1132d4] hover:bg-[#0d28b8] text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-[0_4px_20px_rgba(17,50,212,0.35)] hover:shadow-[0_8px_28px_rgba(17,50,212,0.45)] transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <PlusIcon />
              </div>
              <div>
                <p className="font-extrabold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Add New Product</p>
                <p className="text-blue-200 text-xs mt-0.5">List a refurbished phone</p>
              </div>
              <div className="flex items-center gap-1 text-blue-200 text-xs font-medium">
                Go to form <ChevronRight />
              </div>
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="flex-1 group bg-white border-2 border-[#1132d4]/20 hover:border-[#1132d4] text-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-[0_2px_12px_rgba(17,50,212,0.06)] hover:shadow-[0_6px_24px_rgba(17,50,212,0.12)] transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              <div className="relative w-12 h-12 rounded-xl bg-[#1132d4]/8 flex items-center justify-center group-hover:bg-[#1132d4]/12 transition-colors">
                <span className="text-[#1132d4]"><OrdersIcon /></span>
                {pendingOrders.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {pendingOrders.length}
                  </span>
                )}
              </div>
              <div>
                <p className="font-extrabold text-base text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Order Requests</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {pendingOrders.length > 0
                    ? `${pendingOrders.length} pending request${pendingOrders.length > 1 ? "s" : ""}`
                    : "Manage buyer orders"}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[#1132d4] text-xs font-semibold">
                View all <ChevronRight />
              </div>
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-up-1">
          <StatCard label="Total Listings"  value={stats.total}  icon={<span className="text-[#1132d4]"><PackageIcon /></span>} accent="bg-blue-50" />
          <StatCard label="Active Listings" value={stats.active} sub="Live now"
            icon={<span className="text-emerald-600"><Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" className="w-5 h-5" /></span>} accent="bg-emerald-50" />
          <StatCard label="Sold" value={stats.sold}
            icon={<span className="text-amber-600"><Icon path="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-5 h-5" /></span>} accent="bg-amber-50" />
          <StatCard label="Revenue Earned"  value={`₹${(stats.revenue / 1000).toFixed(0)}K`} sub="From sold items"
            icon={<span className="text-[#1132d4]"><Icon path="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" className="w-5 h-5" /></span>} accent="bg-blue-50" />
        </div>

        {/* ── Product Listings ── */}
        <div className="fade-up-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>My Listings</h2>
              <p className="text-xs text-slate-400 mt-0.5">{filteredProducts.length} products shown</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {["all", "available", "sold", "reserved"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all duration-150 ${
                    activeTab === tab
                      ? "bg-[#1132d4] text-white shadow-[0_2px_8px_rgba(17,50,212,0.35)]"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >{tab}</button>
              ))}
            </div>
          </div>

          {productsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
              <span className="text-5xl">📦</span>
              <p className="text-slate-600 font-semibold mt-3">No products in this category</p>
              <p className="text-slate-400 text-sm mt-1">Add your first listing to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProducts.map(product => (
                <ProductRow key={product._id} product={product} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}