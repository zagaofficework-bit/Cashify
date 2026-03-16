import { useState, useEffect } from "react";
import { useAdminSellers, useAdminOrders, useSellerControls } from "../hooks/useAdmin";

// ─── Map backend subscription fields → UI fields ─────────────────────────────
// Backend: { plan, price, adminStatus, isActive, isExpired, daysRemaining, ... }
// UI needs: subscriptionStatus (active | paused | banned | expired | revoked)

const normalizeSellerEntry = (entry) => {
  const sub = entry.subscription ?? {};

  let subscriptionStatus = "active";
  if (sub.adminStatus === "banned")       subscriptionStatus = "revoked";
  else if (sub.adminStatus === "paused")  subscriptionStatus = "revoked";
  else if (sub.isExpired)                 subscriptionStatus = "expired";
  else if (!sub.isActive)                 subscriptionStatus = "revoked";
  else                                    subscriptionStatus = "active";

  return {
    subscriptionId: entry.subscriptionId,
    productsListed: entry.productsListed ?? 0,
    seller: {
      id:               entry.seller?.id,
      name:             entry.seller?.name             ?? "—",
      email:            entry.seller?.email            ?? "—",
      mobile:           entry.seller?.phone            ?? "—",   // backend returns "phone"
      role:             "seller",
      joinedAt:         entry.seller?.joinedAt         ?? new Date().toISOString(),
      accountStatus:    entry.seller?.accountStatus    ?? "active",
      suspensionReason: entry.seller?.suspensionReason ?? null,
      banReason:        entry.seller?.banReason        ?? null,
      profilePic:       null,
    },
    subscription: {
      plan:               sub.plan               ?? "—",
      price:              sub.price              ?? 0,
      isActive:           sub.isActive           ?? false,
      adminStatus:        sub.adminStatus        ?? "active",
      subscriptionStatus,                             // derived above
      daysRemaining:      sub.daysRemaining      ?? 0,
      startDate:          sub.startDate          ?? null,
      endDate:            sub.endDate            ?? null,
      paymentMethod:      sub.paymentMethod      ?? "—",
      activeListingsLimit: sub.activeListingsLimit ?? 0,
      prioritySupport:    sub.prioritySupport    ?? false,
      supportType:        sub.supportType        ?? "none",
    },
  };
};

// ─── Map backend order fields → UI fields ────────────────────────────────────
const normalizeOrder = (o) => ({
  id:      o._id,
  buyer:   o.buyer  ? `${o.buyer.firstname} ${o.buyer.lastname}`.trim()   : "—",
  seller:  o.seller ? `${o.seller.firstname} ${o.seller.lastname}`.trim() : "—",
  product: o.product?.title ?? "—",
  amount:  o.salePrice ?? o.product?.price ?? 0,
  status:  o.status ?? "pending",
  date:    o.createdAt ? new Date(o.createdAt).toISOString().slice(0, 10) : "—",
});

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const Skeleton = ({ w = "100%", h = 16, radius = 6 }) => (
  <div style={{
    width: w, height: h, borderRadius: radius,
    background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  }} />
);

const PLAN_COLORS = { basic: "#059669", standard: "#d97706", premium: "#4f46e5" };

const Avatar = ({ name, size = 36 }) => {
  const initials = name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "??";
  const hue = name?.charCodeAt(0) * 15 % 360 || 200;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `hsl(${hue}, 60%, 90%)`, border: `2px solid hsl(${hue}, 55%, 78%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 700, color: `hsl(${hue}, 55%, 35%)`,
      fontFamily: "'DM Mono', monospace", flexShrink: 0, letterSpacing: "0.05em",
    }}>
      {initials}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    active:    { bg: "rgba(5,150,105,0.08)",   color: "#059669", border: "rgba(5,150,105,0.2)",   label: "Active" },
    suspended: { bg: "rgba(217,119,6,0.08)",   color: "#d97706", border: "rgba(217,119,6,0.2)",   label: "Suspended" },
    banned:    { bg: "rgba(220,38,38,0.08)",   color: "#dc2626", border: "rgba(220,38,38,0.2)",   label: "Banned" },
    expired:   { bg: "rgba(100,116,139,0.08)", color: "#64748b", border: "rgba(100,116,139,0.2)", label: "Expired" },
    revoked:   { bg: "rgba(220,38,38,0.06)",   color: "#dc2626", border: "rgba(220,38,38,0.18)",  label: "Revoked" },
    paused:    { bg: "rgba(217,119,6,0.08)",   color: "#d97706", border: "rgba(217,119,6,0.2)",   label: "Paused" },
    pending:   { bg: "rgba(217,119,6,0.08)",   color: "#d97706", border: "rgba(217,119,6,0.2)",   label: "Pending" },
    completed: { bg: "rgba(5,150,105,0.08)",   color: "#059669", border: "rgba(5,150,105,0.2)",   label: "Completed" },
    refunded:  { bg: "rgba(100,116,139,0.08)", color: "#64748b", border: "rgba(100,116,139,0.2)", label: "Refunded" },
    confirmed: { bg: "rgba(5,150,105,0.08)",   color: "#059669", border: "rgba(5,150,105,0.2)",   label: "Confirmed" },
    cancelled: { bg: "rgba(100,116,139,0.08)", color: "#64748b", border: "rgba(100,116,139,0.2)", label: "Cancelled" },
  };
  const s = map[status] || map.active;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
      textTransform: "uppercase", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {s.label}
    </span>
  );
};

const ActionModal = ({ seller, action, onClose, onConfirm, loading }) => {
  const [reason, setReason] = useState("");
  const [note,   setNote]   = useState("");
  if (!seller) return null;

  const config = {
    pause:     { title: "Pause Subscription",     color: "#d97706", icon: "⏸", needsReason: true,  label: "Pause" },
    ban:       { title: "Permanently Ban Seller", color: "#dc2626", icon: "🚫", needsReason: true,  label: "Ban Seller" },
    reinstate: { title: "Reinstate Seller",        color: "#059669", icon: "✓", needsReason: false, label: "Reinstate" },
  }[action] || {};

  const handleSubmit = () => {
    if (config.needsReason && !reason.trim()) return;
    onConfirm(reason.trim() || note.trim());
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, maxWidth: 460, width: "100%", boxShadow: "0 20px 60px rgba(15,23,42,0.15)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${config.color}12`, border: `1px solid ${config.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{config.icon}</div>
          <div>
            <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 16, fontFamily: "'Syne', sans-serif" }}>{config.title}</div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>{seller.name}</div>
          </div>
        </div>

        {config.needsReason && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#64748b", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>Reason *</label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Describe the reason for this action..." rows={3}
              style={{ width: "100%", background: "#f8fafc", border: `1px solid ${reason.trim() ? "#e2e8f0" : "rgba(220,38,38,0.3)"}`, borderRadius: 8, padding: "10px 14px", color: "#0f172a", fontSize: 14, fontFamily: "inherit", resize: "vertical", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = config.color} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
            {config.needsReason && !reason.trim() && <div style={{ color: "#dc2626", fontSize: 11, marginTop: 4 }}>Reason is required</div>}
          </div>
        )}

        {action === "reinstate" && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#64748b", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>Note (optional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note about this reinstatement..." rows={2}
              style={{ width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", color: "#0f172a", fontSize: 14, fontFamily: "inherit", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button onClick={onClose} disabled={loading} style={{ flex: 1, padding: "10px 0", borderRadius: 8, background: "transparent", border: "1px solid #e2e8f0", color: "#64748b", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading || (config.needsReason && !reason.trim())}
            style={{ flex: 1, padding: "10px 0", borderRadius: 8, background: loading ? "#94a3b8" : config.color, border: "none", color: "#fff", cursor: loading ? "not-allowed" : "pointer", fontWeight: 700, fontFamily: "inherit", fontSize: 14, transition: "background 0.2s" }}>
            {loading ? "Processing…" : config.label}
          </button>
        </div>
      </div>
    </div>
  );
};

const SellerDetailPanel = ({ seller: s, onClose, onAction }) => {
  if (!s) return null;
  const sub = s.subscription;
  const planColor = PLAN_COLORS[sub.plan?.toLowerCase()] || "#4f46e5";
  const progressPct = sub.subscriptionStatus === "active"
    ? Math.min(100, Math.round((sub.daysRemaining / 365) * 100))
    : 0;

  const infoRows = [
    ["Mobile",          s.seller.mobile],
    ["Role",            s.seller.role],
    ["Joined",          s.seller.joinedAt ? new Date(s.seller.joinedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"],
    ["Products Listed", s.productsListed],
  ];

  const subRows = [
    ["Price",          `₹${sub.price}/yr`],
    ["Start",          sub.startDate  ? new Date(sub.startDate).toLocaleDateString()  : "—"],
    ["End",            sub.endDate    ? new Date(sub.endDate).toLocaleDateString()    : "—"],
    ["Listings Limit", sub.activeListingsLimit === -1 ? "Unlimited" : sub.activeListingsLimit],
    ["Payment",        sub.paymentMethod],
    ["Support",        sub.supportType],
  ];

  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 420, background: "#fff", borderLeft: "1px solid #e2e8f0", zIndex: 500, overflowY: "auto", padding: 28, boxShadow: "-8px 0 40px rgba(15,23,42,0.08)" }}>
      <button onClick={onClose} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#64748b", cursor: "pointer", borderRadius: 8, padding: "6px 12px", marginBottom: 24, fontSize: 13, fontFamily: "inherit" }}>← Back</button>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
        <Avatar name={s.seller.name} size={52} />
        <div>
          <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 18, fontFamily: "'Syne', sans-serif" }}>{s.seller.name}</div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}>{s.seller.email}</div>
          <div style={{ marginTop: 6 }}><StatusBadge status={s.seller.accountStatus} /></div>
        </div>
      </div>

      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 18, marginBottom: 16 }}>
        <div style={{ color: "#94a3b8", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>Seller Info</div>
        {infoRows.map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{k}</span>
            <span style={{ color: "#334155", fontSize: 13, fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 18, marginBottom: 16 }}>
        <div style={{ color: "#94a3b8", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>Subscription</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ color: planColor, fontWeight: 700, fontSize: 16, fontFamily: "'Syne', sans-serif", textTransform: "capitalize" }}>{sub.plan}</span>
          <StatusBadge status={sub.subscriptionStatus} />
        </div>
        {subRows.map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{k}</span>
            <span style={{ color: "#334155", fontSize: 13 }}>{v}</span>
          </div>
        ))}
        {sub.subscriptionStatus === "active" && (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#94a3b8", fontSize: 12 }}>Days Remaining</span>
              <span style={{ color: planColor, fontSize: 12, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{sub.daysRemaining}d</span>
            </div>
            <div style={{ background: "#e2e8f0", borderRadius: 4, height: 5, overflow: "hidden" }}>
              <div style={{ width: `${progressPct}%`, height: "100%", background: planColor, borderRadius: 4, transition: "width 0.6s ease" }} />
            </div>
          </div>
        )}
      </div>

      {(s.seller.accountStatus === "suspended" || s.seller.accountStatus === "banned") && (
        <div style={{ background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ color: "#dc2626", fontSize: 12, fontWeight: 700, marginBottom: 6, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {s.seller.accountStatus === "banned" ? "Ban Reason" : "Suspension Reason"}
          </div>
          <div style={{ color: "#7f1d1d", fontSize: 13, lineHeight: 1.5 }}>
            {s.seller.suspensionReason || s.seller.banReason || "—"}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {s.seller.accountStatus === "active" && (
          <button onClick={() => onAction("pause", s)} style={{ padding: 11, borderRadius: 8, border: "1px solid rgba(217,119,6,0.3)", background: "rgba(217,119,6,0.06)", color: "#d97706", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "inherit" }}>⏸ Pause Subscription</button>
        )}
        {s.seller.accountStatus === "suspended" && (
          <button onClick={() => onAction("reinstate", s)} style={{ padding: 11, borderRadius: 8, border: "1px solid rgba(5,150,105,0.3)", background: "rgba(5,150,105,0.06)", color: "#059669", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "inherit" }}>✓ Reinstate Seller</button>
        )}
        {s.seller.accountStatus !== "banned" && (
          <button onClick={() => onAction("ban", s)} style={{ padding: 11, borderRadius: 8, border: "1px solid rgba(220,38,38,0.25)", background: "rgba(220,38,38,0.04)", color: "#dc2626", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "inherit" }}>🚫 Permanently Ban</button>
        )}
      </div>
    </div>
  );
};

// ─── Loading skeleton for table rows ─────────────────────────────────────────
const TableSkeletonRows = ({ cols = 7, rows = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
        {Array.from({ length: cols }).map((_, j) => (
          <td key={j} style={{ padding: "16px 16px" }}>
            <Skeleton h={14} w={j === 0 ? "80%" : j === cols - 1 ? 60 : "60%"} />
          </td>
        ))}
      </tr>
    ))}
  </>
);

// ─── Error banner ─────────────────────────────────────────────────────────────
const ErrorBanner = ({ message, onRetry }) => (
  <div style={{ background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
    <span style={{ color: "#dc2626", fontSize: 13 }}>⚠ {message}</span>
    {onRetry && <button onClick={onRetry} style={{ background: "transparent", border: "1px solid rgba(220,38,38,0.3)", color: "#dc2626", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Retry</button>}
  </div>
);

////////////////////////////////////////////////////////////////////
//// MAIN DASHBOARD
////////////////////////////////////////////////////////////////////

export default function AdminDashboard() {
  const [activeTab,     setActiveTab]     = useState("subscriptions");
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [modalState,    setModalState]    = useState({ open: false, action: null, seller: null });
  const [filter,        setFilter]        = useState("all");
  const [toast,         setToast]         = useState(null);

  // ─── Hooks ──────────────────────────────────────────────────────────────────
  const {
    sellers: rawSellers,
    sellerPagination,
    loading:  sellersLoading,
    error:    sellersError,
    fetchSellers,
  } = useAdminSellers();

  const {
    orders: rawOrders,
    commissionSummary,
    loading: ordersLoading,
    error:   ordersError,
    fetchOrders,
  } = useAdminOrders();

  const {
    pauseSeller,
    banSeller,
    reinstateSeller,
    loading: actionLoading,
    error:   actionError,
    clearError,
  } = useSellerControls();

  // ─── Normalize data ──────────────────────────────────────────────────────────
  const sellers = (rawSellers ?? []).map(normalizeSellerEntry);
  const orders  = (rawOrders  ?? []).map(normalizeOrder);

  // ─── Fetch on tab switch ─────────────────────────────────────────────────────
  useEffect(() => {
    if (activeTab === "orders") fetchOrders({ limit: 20 });
  }, [activeTab]);

  // ─── Toast helper ────────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Filter counts (computed from normalized sellers) ────────────────────────
  const filterCounts = {
    all:       sellers.length,
    active:    sellers.filter(s => s.seller.accountStatus === "active"    && s.subscription.subscriptionStatus === "active").length,
    suspended: sellers.filter(s => s.seller.accountStatus === "suspended").length,
    banned:    sellers.filter(s => s.seller.accountStatus === "banned").length,
    expired:   sellers.filter(s => s.subscription.subscriptionStatus     === "expired").length,
  };

  const filteredSellers = sellers.filter(s => {
    if (filter === "all")       return true;
    if (filter === "active")    return s.seller.accountStatus === "active" && s.subscription.subscriptionStatus === "active";
    if (filter === "suspended") return s.seller.accountStatus === "suspended";
    if (filter === "banned")    return s.seller.accountStatus === "banned";
    if (filter === "expired")   return s.subscription.subscriptionStatus === "expired";
    return true;
  });

  // ─── Commission summary (fallback to zeros while loading) ────────────────────
  const commission = commissionSummary ?? {
    totalCommissionEarned: 0,
    totalCompletedOrders:  0,
    totalPlatformSales:    0,
  };

  // ─── Action handlers ─────────────────────────────────────────────────────────
  const handleAction = (action, sellerEntry) => {
    clearError();
    setModalState({ open: true, action, seller: sellerEntry });
  };

  const handleConfirm = async (reasonOrNote) => {
    const { action, seller } = modalState;
    const sellerId = seller.seller.id;
    let res = null;

    if (action === "pause")     res = await pauseSeller(sellerId, reasonOrNote);
    if (action === "ban")       res = await banSeller(sellerId, reasonOrNote);
    if (action === "reinstate") res = await reinstateSeller(sellerId, reasonOrNote);

    if (!res) {
      showToast(actionError || "Action failed", "error");
      return;
    }

    // Close panel + modal, refetch list
    setSelectedSeller(null);
    setModalState({ open: false, action: null, seller: null });
    await fetchSellers();

    showToast({
      pause:     "Subscription paused",
      ban:       "Seller permanently banned",
      reinstate: "Seller reinstated",
    }[action] || "Done");
  };

  // ─── Sidebar commission display ───────────────────────────────────────────────
  const sidebarStats = [
    ["Commission", commission.totalCommissionEarned  > 0 ? `₹${(commission.totalCommissionEarned / 1000).toFixed(1)}k`  : "—", "#059669"],
    ["Orders",     commission.totalCompletedOrders   > 0 ? commission.totalCompletedOrders.toLocaleString()               : "—", "#4f46e5"],
    ["Sales",      commission.totalPlatformSales     > 0 ? `₹${(commission.totalPlatformSales / 1000).toFixed(0)}k`      : "—", "#d97706"],
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=Jost:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #f1f5f9; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .row-hover:hover { background: #f8fafc !important; cursor: pointer; }
        .filter-btn:hover { border-color: #94a3b8 !important; }
        .action-btn:hover { opacity: 0.72 !important; }
        .nav-btn:hover { color: #334155 !important; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Jost', sans-serif", color: "#0f172a" }}>

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>A</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#0f172a", letterSpacing: "-0.02em" }}>AdminPanel</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#94a3b8", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
              {new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
            </span>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#f1f5f9", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#64748b" }}>⚙</div>
          </div>
        </div>

        <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>

          {/* ── Sidebar ────────────────────────────────────────────────────────── */}
          <div style={{ width: 210, background: "#fff", borderRight: "1px solid #e2e8f0", padding: "24px 0", flexShrink: 0 }}>
            {[{ id: "subscriptions", icon: "◈", label: "Subscriptions" }, { id: "orders", icon: "◎", label: "Orders" }].map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className="nav-btn" style={{
                display: "flex", alignItems: "center", gap: 10,
                width: "100%", padding: "10px 20px", border: "none",
                background: activeTab === item.id ? "rgba(99,102,241,0.07)" : "transparent",
                color: activeTab === item.id ? "#4f46e5" : "#94a3b8",
                cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 14, fontWeight: 500,
                borderLeft: `2px solid ${activeTab === item.id ? "#6366f1" : "transparent"}`,
                transition: "all 0.15s",
              }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>{item.label}
              </button>
            ))}

            <div style={{ margin: "24px 14px 0", padding: 16, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10 }}>
              <div style={{ color: "#94a3b8", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>Platform</div>
              {sidebarStats.map(([k, v, c]) => (
                <div key={k} style={{ marginBottom: 10 }}>
                  <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 2 }}>{k}</div>
                  {ordersLoading
                    ? <Skeleton h={20} w="60%" />
                    : <div style={{ color: c, fontSize: 16, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{v}</div>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* ── Main content ───────────────────────────────────────────────────── */}
          <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto", animation: "fadeIn 0.3s ease" }}>

            {/* ════ SUBSCRIPTIONS TAB ════ */}
            {activeTab === "subscriptions" && (
              <>
                <div style={{ marginBottom: 24 }}>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 4 }}>Seller Subscriptions</h1>
                  <p style={{ color: "#94a3b8", fontSize: 14 }}>Manage and monitor all seller subscription accounts</p>
                </div>

                {sellersError && <ErrorBanner message={sellersError} onRetry={() => fetchSellers()} />}

                {/* Stat cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
                  {[
                    { label: "Total Sellers", value: sellerPagination.total ?? sellers.length, color: "#4f46e5", border: "#e0e7ff", bg: "#f5f3ff" },
                    { label: "Active",         value: filterCounts.active,                       color: "#059669", border: "#d1fae5", bg: "#f0fdf4" },
                    { label: "Suspended",      value: filterCounts.suspended,                    color: "#d97706", border: "#fef3c7", bg: "#fffbeb" },
                    { label: "Banned",         value: filterCounts.banned,                       color: "#dc2626", border: "#fee2e2", bg: "#fff5f5" },
                  ].map(({ label, value, color, border, bg }) => (
                    <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "16px 18px" }}>
                      <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 6, fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
                      {sellersLoading
                        ? <Skeleton h={28} w="50%" />
                        : <div style={{ color, fontWeight: 800, fontSize: 26, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{value}</div>
                      }
                    </div>
                  ))}
                </div>

                {/* Filter pills */}
                <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
                  {["all", "active", "suspended", "banned", "expired"].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className="filter-btn" style={{
                      padding: "6px 14px", borderRadius: 20,
                      border: `1px solid ${filter === f ? "#6366f1" : "#e2e8f0"}`,
                      background: filter === f ? "rgba(99,102,241,0.07)" : "#fff",
                      color: filter === f ? "#4f46e5" : "#64748b",
                      cursor: "pointer", fontFamily: "inherit", fontSize: 13,
                      display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
                    }}>
                      <span style={{ textTransform: "capitalize" }}>{f}</span>
                      <span style={{ background: filter === f ? "#6366f1" : "#f1f5f9", color: filter === f ? "#fff" : "#64748b", borderRadius: 10, padding: "0 6px", fontSize: 10, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{filterCounts[f]}</span>
                    </button>
                  ))}
                </div>

                {/* Table */}
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                          {["Seller", "Plan", "Account Status", "Sub Status", "Days Left", "Products", "Actions"].map(h => (
                            <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sellersLoading
                          ? <TableSkeletonRows cols={7} rows={5} />
                          : filteredSellers.map((s, i) => {
                              const planColor = PLAN_COLORS[s.subscription.plan?.toLowerCase()] || "#4f46e5";
                              return (
                                <tr key={s.subscriptionId} className="row-hover"
                                  onClick={() => setSelectedSeller(s)}
                                  style={{ borderBottom: i < filteredSellers.length - 1 ? "1px solid #f1f5f9" : "none", transition: "background 0.1s", animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                                  <td style={{ padding: "14px 16px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                      <Avatar name={s.seller.name} size={34} />
                                      <div>
                                        <div style={{ color: "#0f172a", fontWeight: 600, fontSize: 14 }}>{s.seller.name}</div>
                                        <div style={{ color: "#94a3b8", fontSize: 12 }}>{s.seller.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{ padding: "14px 16px" }}>
                                    <span style={{ color: planColor, fontWeight: 700, fontSize: 13, fontFamily: "'Syne', sans-serif", textTransform: "capitalize" }}>{s.subscription.plan}</span>
                                    <div style={{ color: "#94a3b8", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>₹{s.subscription.price}/yr</div>
                                  </td>
                                  <td style={{ padding: "14px 16px" }}><StatusBadge status={s.seller.accountStatus} /></td>
                                  <td style={{ padding: "14px 16px" }}><StatusBadge status={s.subscription.subscriptionStatus} /></td>
                                  <td style={{ padding: "14px 16px" }}>
                                    <span style={{ color: s.subscription.daysRemaining > 30 ? "#059669" : s.subscription.daysRemaining > 0 ? "#d97706" : "#dc2626", fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 600 }}>
                                      {s.subscription.daysRemaining > 0 ? `${s.subscription.daysRemaining}d` : "—"}
                                    </span>
                                  </td>
                                  <td style={{ padding: "14px 16px" }}>
                                    <span style={{ color: "#475569", fontFamily: "'DM Mono', monospace", fontSize: 14 }}>{s.productsListed}</span>
                                  </td>
                                  <td style={{ padding: "14px 16px" }} onClick={e => e.stopPropagation()}>
                                    <div style={{ display: "flex", gap: 6 }}>
                                      {s.seller.accountStatus === "active" && (
                                        <button onClick={() => handleAction("pause", s)} className="action-btn" style={{ padding: "5px 10px", borderRadius: 6, fontSize: 11, background: "rgba(217,119,6,0.07)", border: "1px solid rgba(217,119,6,0.22)", color: "#d97706", cursor: "pointer", fontFamily: "inherit" }}>Pause</button>
                                      )}
                                      {s.seller.accountStatus === "suspended" && (
                                        <button onClick={() => handleAction("reinstate", s)} className="action-btn" style={{ padding: "5px 10px", borderRadius: 6, fontSize: 11, background: "rgba(5,150,105,0.07)", border: "1px solid rgba(5,150,105,0.22)", color: "#059669", cursor: "pointer", fontFamily: "inherit" }}>Reinstate</button>
                                      )}
                                      {s.seller.accountStatus !== "banned" && (
                                        <button onClick={() => handleAction("ban", s)} className="action-btn" style={{ padding: "5px 10px", borderRadius: 6, fontSize: 11, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.18)", color: "#dc2626", cursor: "pointer", fontFamily: "inherit" }}>Ban</button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                        }
                      </tbody>
                    </table>
                  </div>

                  {!sellersLoading && filteredSellers.length === 0 && (
                    <div style={{ padding: "48px 0", textAlign: "center" }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>◈</div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, color: "#94a3b8" }}>No sellers match this filter</div>
                    </div>
                  )}

                  {/* Pagination info */}
                  {!sellersLoading && sellerPagination.totalPages > 1 && (
                    <div style={{ padding: "14px 20px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ color: "#94a3b8", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
                        Page {sellerPagination.page} of {sellerPagination.totalPages} · {sellerPagination.total} sellers
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button disabled={!sellerPagination.hasPrev} onClick={() => fetchSellers({ page: sellerPagination.page - 1 })}
                          style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", color: sellerPagination.hasPrev ? "#4f46e5" : "#cbd5e1", cursor: sellerPagination.hasPrev ? "pointer" : "not-allowed", fontSize: 12, fontFamily: "inherit" }}>← Prev</button>
                        <button disabled={!sellerPagination.hasNext} onClick={() => fetchSellers({ page: sellerPagination.page + 1 })}
                          style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", color: sellerPagination.hasNext ? "#4f46e5" : "#cbd5e1", cursor: sellerPagination.hasNext ? "pointer" : "not-allowed", fontSize: 12, fontFamily: "inherit" }}>Next →</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ════ ORDERS TAB ════ */}
            {activeTab === "orders" && (
              <>
                <div style={{ marginBottom: 24 }}>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 4 }}>Orders Overview</h1>
                  <p style={{ color: "#94a3b8", fontSize: 14 }}>Platform-wide transaction summary and commission tracking</p>
                </div>

                {ordersError && <ErrorBanner message={ordersError} onRetry={() => fetchOrders({ limit: 20 })} />}

                {/* Commission cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
                  {[
                    { label: "Total Commission", value: `₹${commission.totalCommissionEarned.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`, sub: "All time earnings",     color: "#059669", border: "#d1fae5", bg: "#f0fdf4" },
                    { label: "Completed Orders", value: commission.totalCompletedOrders.toLocaleString(),                                                sub: "Successful transactions", color: "#4f46e5", border: "#e0e7ff", bg: "#f5f3ff" },
                    { label: "Platform Sales",   value: `₹${commission.totalPlatformSales.toLocaleString("en-IN")}`,                                    sub: "Total GMV",               color: "#d97706", border: "#fef3c7", bg: "#fffbeb" },
                  ].map(({ label, value, sub, color, border, bg }) => (
                    <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: "20px 22px" }}>
                      <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
                      {ordersLoading
                        ? <Skeleton h={28} w="70%" />
                        : <div style={{ color, fontWeight: 800, fontSize: 24, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>{value}</div>
                      }
                      <div style={{ color: "#94a3b8", fontSize: 12 }}>{sub}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                        {["Order ID", "Buyer", "Seller", "Product", "Amount", "Status", "Date"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ordersLoading
                        ? <TableSkeletonRows cols={7} rows={5} />
                        : orders.map((o, i) => (
                            <tr key={o.id} className="row-hover" style={{ borderBottom: i < orders.length - 1 ? "1px solid #f1f5f9" : "none", animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                              <td style={{ padding: "14px 16px", color: "#4f46e5", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{o.id?.slice(-8)}</td>
                              <td style={{ padding: "14px 16px", color: "#64748b", fontSize: 14 }}>{o.buyer}</td>
                              <td style={{ padding: "14px 16px", color: "#64748b", fontSize: 14 }}>{o.seller}</td>
                              <td style={{ padding: "14px 16px", color: "#0f172a", fontSize: 14, fontWeight: 500 }}>{o.product}</td>
                              <td style={{ padding: "14px 16px", color: "#059669", fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 600 }}>₹{o.amount}</td>
                              <td style={{ padding: "14px 16px" }}><StatusBadge status={o.status} /></td>
                              <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{o.date}</td>
                            </tr>
                          ))
                      }
                    </tbody>
                  </table>
                  {!ordersLoading && orders.length === 0 && (
                    <div style={{ padding: "48px 0", textAlign: "center" }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>◎</div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, color: "#94a3b8" }}>No orders found</div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Detail panel ──────────────────────────────────────────────────────── */}
        {selectedSeller && (
          <SellerDetailPanel seller={selectedSeller} onClose={() => setSelectedSeller(null)} onAction={handleAction} />
        )}

        {/* ── Action modal ──────────────────────────────────────────────────────── */}
        {modalState.open && (
          <ActionModal
            seller={modalState.seller?.seller}
            action={modalState.action}
            loading={actionLoading}
            onClose={() => { if (!actionLoading) setModalState({ open: false, action: null, seller: null }); }}
            onConfirm={handleConfirm}
          />
        )}

        {/* ── Toast ─────────────────────────────────────────────────────────────── */}
        {toast && (
          <div style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            background: toast.type === "success" ? "#f0fdf4" : "#fff5f5",
            border: `1px solid ${toast.type === "success" ? "#bbf7d0" : "#fecaca"}`,
            color: toast.type === "success" ? "#059669" : "#dc2626",
            borderRadius: 10, padding: "12px 24px", fontWeight: 600, fontSize: 14,
            zIndex: 2000, animation: "toastIn 0.3s ease", boxShadow: "0 8px 24px rgba(15,23,42,0.1)",
            whiteSpace: "nowrap",
          }}>
            {toast.type === "success" ? "✓ " : "✗ "}{toast.msg}
          </div>
        )}
      </div>
    </>
  );
}