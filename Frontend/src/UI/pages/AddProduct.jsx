import { useState, useRef } from "react";
import { useProductContext } from "../../context/product.context";

// ─── ENUMS — match backend model exactly ──────────────────────────────────────
const CATEGORIES   = ["mobile", "laptop", "tablet", "smartwatch", "camera", "other"];
const DEVICE_TYPES = ["new", "refurbished", "old"];
const CONDITIONS   = ["Fair", "Good", "Superb"];
const PAYMENTS     = ["Cash", "UPI", "Card", "NetBanking"];

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const fmt      = (n) => n ? "₹" + Number(n).toLocaleString("en-IN") : "—";
const calcDisc = (orig, price) => orig > price ? Math.round(((orig - price) / orig) * 100) : 0;
const fmtDate  = (d) => new Date(d).toLocaleDateString("en-IN", {
  day: "2-digit", month: "short", year: "numeric",
  hour: "2-digit", minute: "2-digit",
});

// ─── SHARED UI ATOMS ───────────────────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1.5">
    {children}{required && <span className="text-rose-400 ml-0.5">*</span>}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-800
      placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-[#1132d4]
      transition-all ${className}`}
    {...props}
  />
);

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-800
      focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-[#1132d4] transition-all ${className}`}
    {...props}
  >
    {children}
  </select>
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-800
      placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-[#1132d4]
      transition-all resize-none ${className}`}
    {...props}
  />
);

const ErrMsg = ({ msg }) =>
  msg ? <p className="mt-1.5 text-xs text-rose-500 font-semibold">{msg}</p> : null;

const Badge = ({ children, color = "blue" }) => {
  const c = {
    blue:    "bg-blue-50    text-[#1132d4]  border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    sky:     "bg-sky-50     text-sky-600     border-sky-200",
    rose:    "bg-rose-50    text-rose-600    border-rose-200",
    indigo:  "bg-indigo-50  text-indigo-600  border-indigo-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wide uppercase ${c[color] || c.blue}`}>
      {children}
    </span>
  );
};

const SectionCard = ({ title, icon, accent, children }) => (
  <div className={`bg-white border rounded-2xl shadow-sm overflow-hidden ${accent ? "border-blue-200" : "border-zinc-200"}`}>
    <div className={`flex items-center gap-2.5 px-5 py-3.5 border-b ${accent ? "border-blue-100 bg-blue-50/60" : "border-zinc-100 bg-zinc-50/70"}`}>
      <span className="text-base">{icon}</span>
      <h3 className={`text-xs font-bold tracking-widest uppercase ${accent ? "text-[#1132d4]" : "text-zinc-500"}`}>{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const InfoRow = ({ label, value, highlight }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-zinc-100 last:border-0">
    <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">{label}</span>
    <span className={`text-sm font-semibold ${highlight ? "text-[#1132d4]" : "text-zinc-700"}`}>{value || "—"}</span>
  </div>
);

const SpecRow = ({ label, value }) => {
  if (!value || value === "null") return null;
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-zinc-100 last:border-0">
      <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium w-32 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-zinc-700 text-right font-semibold leading-snug">{value}</span>
    </div>
  );
};

// ─── STEP BAR ─────────────────────────────────────────────────────────────────
const StepBar = ({ step }) => (
  <div className="flex items-center gap-3 mb-10">
    {[{ n: 1, label: "Product Details" }, { n: 2, label: "Tech Specs" }].map(({ n, label }, i) => (
      <div key={n} className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-500
          ${step === n ? "bg-[#1132d4] text-white shadow-md shadow-blue-200"
          : step > n   ? "bg-emerald-500 text-white"
          : "bg-zinc-100 text-zinc-400 border border-zinc-200"}`}>
          {step > n ? "✓" : n}
        </div>
        <span className={`text-xs font-bold tracking-widest uppercase
          ${step === n ? "text-[#1132d4]" : step > n ? "text-emerald-500" : "text-zinc-400"}`}>
          {label}
        </span>
        {i < 1 && <div className={`w-16 h-px transition-all duration-700 ${step > 1 ? "bg-emerald-400" : "bg-zinc-200"}`} />}
      </div>
    ))}
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// STEP 1 — PRODUCT DETAILS FORM
// ══════════════════════════════════════════════════════════════════════════════
const ProductDetailsForm = ({ form, setForm, previews, setPreviews, imageFiles, setImageFiles, videoFile, setVideoFile, videoName, setVideoName, errors, onNext }) => {
  const imgRef = useRef();
  const vidRef = useRef();
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 5 - imageFiles.length;
    const toAdd = files.slice(0, remaining);
    setImageFiles((prev) => [...prev, ...toAdd]);
    setPreviews((prev) => [...prev, ...toAdd.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (i) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Notice */}
      <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-3.5">
        <span className="text-[#1132d4] text-lg shrink-0">💡</span>
        <p className="text-[#1132d4] text-sm font-medium">
          You must complete <strong>both steps</strong> before your product is listed. Specs are required.
        </p>
      </div>

      {/* Basic Info */}
      <SectionCard title="Basic Information" icon="📋">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label required>Product Title</Label>
            <Input value={form.title} onChange={set("title")} placeholder="e.g. Samsung Galaxy S24 Ultra 12GB/256GB" />
            <ErrMsg msg={errors.title} />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea rows={3} value={form.description} onChange={set("description")}
              placeholder="Condition, accessories included, reason for selling..." />
          </div>
          <div>
            <Label required>Category</Label>
            <Select value={form.category} onChange={set("category")}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </Select>
            <ErrMsg msg={errors.category} />
          </div>
          <div>
            <Label required>Subcategory / Model Line</Label>
            <Input value={form.subcategory} onChange={set("subcategory")} placeholder="e.g. Galaxy S, Pixel, iQOO" />
            <ErrMsg msg={errors.subcategory} />
          </div>
          <div>
            <Label required>Brand</Label>
            <Input value={form.brand} onChange={set("brand")} placeholder="e.g. Samsung, Apple" />
            <ErrMsg msg={errors.brand} />
          </div>
          <div>
            <Label required>Device Type</Label>
            <Select value={form.deviceType} onChange={set("deviceType")}>
              <option value="">Select type</option>
              {DEVICE_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </Select>
            <ErrMsg msg={errors.deviceType} />
          </div>
        </div>
      </SectionCard>

      {/* Device Details */}
      <SectionCard title="Device Details" icon="📱">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label required>Condition</Label>
            <Select value={form.condition} onChange={set("condition")}>
              <option value="">Select condition</option>
              {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
            <ErrMsg msg={errors.condition} />
          </div>
          <div>
            <Label required>Storage Capacity</Label>
            <Input value={form.storage} onChange={set("storage")} placeholder="e.g. 256GB" />
            <ErrMsg msg={errors.storage} />
          </div>
          <div>
            <Label required>Color</Label>
            <Input value={form.color} onChange={set("color")} placeholder="e.g. Titanium Black" />
            <ErrMsg msg={errors.color} />
          </div>
        </div>
      </SectionCard>

      {/* Pricing */}
      <SectionCard title="Pricing & Payment" icon="💰">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label required>Selling Price (₹)</Label>
            <Input type="number" min="0" value={form.price} onChange={set("price")} placeholder="120000" />
            <ErrMsg msg={errors.price} />
          </div>
          <div>
            <Label required>Original / MRP (₹)</Label>
            <Input type="number" min="0" value={form.originalPrice} onChange={set("originalPrice")} placeholder="139999" />
            <ErrMsg msg={errors.originalPrice} />
          </div>
          <div>
            <Label required>Payment Method</Label>
            <Select value={form.payment} onChange={set("payment")}>
              <option value="">Select method</option>
              {PAYMENTS.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
            <ErrMsg msg={errors.payment} />
          </div>
        </div>
        {form.price && form.originalPrice && Number(form.originalPrice) > Number(form.price) && (
          <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
            <span className="text-emerald-600 font-bold text-sm">
              🎉 {calcDisc(Number(form.originalPrice), Number(form.price))}% discount
            </span>
            <span className="text-zinc-400 text-xs">
              — buyer saves {fmt(Number(form.originalPrice) - Number(form.price))}
            </span>
          </div>
        )}
      </SectionCard>

      {/* Media */}
      <SectionCard title="Photos & Video" icon="📷">
        <div className="space-y-4">
          <div>
            <Label required>Product Images (1–5)</Label>
            <div
              onClick={() => imgRef.current.click()}
              className="mt-1 border-2 border-dashed border-zinc-300 hover:border-[#1132d4] rounded-2xl p-8
                text-center cursor-pointer transition-all hover:bg-blue-50/40 group"
            >
              <div className="text-4xl mb-2 transition-transform group-hover:scale-110">📸</div>
              <p className="text-sm text-zinc-500 font-semibold">Click to upload images</p>
              <p className="text-xs text-zinc-400 mt-1">PNG, JPG, WEBP — max 5 files</p>
            </div>
            <input ref={imgRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
            <ErrMsg msg={errors.images} />
            {previews.length > 0 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {previews.map((src, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                    <button
                      onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-xs
                        items-center justify-center hidden group-hover:flex font-bold shadow"
                    >×</button>
                  </div>
                ))}
                {previews.length < 5 && (
                  <div
                    onClick={() => imgRef.current.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-zinc-300 hover:border-[#1132d4]
                      flex items-center justify-center cursor-pointer transition-colors text-zinc-300
                      hover:text-[#1132d4] text-2xl font-light"
                  >+</div>
                )}
              </div>
            )}
          </div>
          <div>
            <Label>Product Video (optional)</Label>
            <div
              onClick={() => vidRef.current.click()}
              className="border-2 border-dashed border-zinc-300 hover:border-[#1132d4] rounded-2xl p-5
                text-center cursor-pointer transition-all hover:bg-blue-50/40"
            >
              {videoName
                ? <p className="text-sm text-emerald-600 font-semibold">✓ {videoName}</p>
                : <p className="text-sm text-zinc-400 font-medium">📹 Click to upload a video (optional)</p>
              }
            </div>
            <input ref={vidRef} type="file" accept="video/*" className="hidden"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) { setVideoFile(f); setVideoName(f.name); }
              }}
            />
          </div>
        </div>
      </SectionCard>

      {/* Location */}
      <SectionCard title="Location" icon="📍">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>City</Label>
            <Input value={form.city} onChange={set("city")} placeholder="Mumbai" />
          </div>
          <div>
            <Label>State</Label>
            <Input value={form.state} onChange={set("state")} placeholder="Maharashtra" />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input value={form.pincode} onChange={set("pincode")} placeholder="400001" />
          </div>
          <div>
            <Label>Full Address</Label>
            <Input value={form.address} onChange={set("address")} placeholder="Area, Landmark, Street" />
          </div>
        </div>
        <p className="text-xs text-zinc-400 mt-3 bg-zinc-50 border border-zinc-100 rounded-xl px-3 py-2">
          📌 Coordinates are auto-filled from your saved profile location.
        </p>
      </SectionCard>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="group flex items-center gap-3 bg-[#1132d4] hover:bg-[#0d28b8] text-white font-bold
            px-8 py-4 rounded-2xl transition-all duration-200 shadow-md shadow-blue-200
            hover:shadow-lg hover:scale-105 active:scale-95 text-sm tracking-wide uppercase"
        >
          <span>Next: Add Tech Specs</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// STEP 2 — TECH SPECS FORM
// ══════════════════════════════════════════════════════════════════════════════
const TechSpecsForm = ({ form, setForm, productTitle, productStorage, errors, loading, apiError, onBack, onSubmit }) => {
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="animate-fade-in space-y-5">
      {/* Context banner */}
      <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 shadow-sm">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-xl">⚡</div>
        <div className="flex-1">
          <p className="text-[#1132d4] text-sm font-bold">
            Adding specs for: <span className="text-zinc-700">{productTitle || "Your product"}</span>
          </p>
          <p className="text-zinc-400 text-xs mt-0.5">These will be submitted together with your listing in one request</p>
        </div>
        <Badge color="blue">Step 2 of 2</Badge>
      </div>

      {/* API Error */}
      {apiError && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-2xl px-5 py-3.5">
          <span className="text-rose-400 text-lg shrink-0">⚠️</span>
          <div>
            <p className="text-rose-700 text-sm font-bold">Failed to list product</p>
            <p className="text-rose-600 text-xs mt-0.5">{apiError}</p>
          </div>
        </div>
      )}

      {/* Performance */}
      <SectionCard title="Performance" icon="🧠" accent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label required>Chipset (Full Name)</Label>
            <Input value={form.chipsetFull} onChange={set("chipsetFull")}
              placeholder="e.g. Qualcomm Snapdragon 8 Elite Gen 5 SM8850-AC" />
            <ErrMsg msg={errors.chipsetFull} />
          </div>
          <div>
            <Label required>RAM</Label>
            <Input value={form.ram} onChange={set("ram")} placeholder="e.g. 12 GB" />
            <ErrMsg msg={errors.ram} />
          </div>
        </div>
      </SectionCard>

      {/* Display */}
      <SectionCard title="Display" icon="🖥️" accent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label required>Size (inches)</Label>
            <Input value={form.sizeInches} onChange={set("sizeInches")} placeholder="e.g. 6.9 inches" />
            <ErrMsg msg={errors.sizeInches} />
          </div>
          <div>
            <Label>Size (cm)</Label>
            <Input value={form.sizeCm} onChange={set("sizeCm")} placeholder="e.g. 17.53 cm" />
          </div>
          <div>
            <Label required>Display Type</Label>
            <Input value={form.displayType} onChange={set("displayType")} placeholder="e.g. Dynamic AMOLED 2x" />
            <ErrMsg msg={errors.displayType} />
          </div>
          <div>
            <Label>Resolution</Label>
            <Input value={form.resolution} onChange={set("resolution")} placeholder="e.g. 1440x3120 px" />
          </div>
          <div>
            <Label>Resolution Type</Label>
            <Input value={form.resolutionType} onChange={set("resolutionType")} placeholder="e.g. QHD+" />
          </div>
          <div>
            <Label required>Refresh Rate</Label>
            <Input value={form.refreshRate} onChange={set("refreshRate")} placeholder="e.g. 120 Hz" />
            <ErrMsg msg={errors.refreshRate} />
          </div>
        </div>
      </SectionCard>

      {/* Camera */}
      <SectionCard title="Camera" icon="📷" accent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label required>Primary Rear Camera</Label>
            <Input value={form.primaryCam} onChange={set("primaryCam")} placeholder="e.g. 200 MP" />
            <ErrMsg msg={errors.primaryCam} />
          </div>
          <div>
            <Label>Secondary Rear Camera</Label>
            <Input value={form.secondaryCam} onChange={set("secondaryCam")} placeholder="e.g. 10 MP" />
          </div>
          <div>
            <Label>Tertiary Rear Camera</Label>
            <Input value={form.tertiaryCam} onChange={set("tertiaryCam")} placeholder="e.g. 8 MP" />
          </div>
          <div>
            <Label>Quaternary Rear Camera</Label>
            <Input value={form.quaternaryCam} onChange={set("quaternaryCam")} placeholder="e.g. 50 MP (optional)" />
          </div>
          <div className="md:col-span-2">
            <Label required>Front Camera</Label>
            <Input value={form.frontCamera} onChange={set("frontCamera")} placeholder="e.g. 12 MP" />
            <ErrMsg msg={errors.frontCamera} />
          </div>
        </div>
      </SectionCard>

      {/* Battery */}
      <SectionCard title="Battery" icon="🔋" accent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label required>Capacity</Label>
            <Input value={form.capacity} onChange={set("capacity")} placeholder="e.g. 5000 mAh" />
            <ErrMsg msg={errors.capacity} />
          </div>
          <div>
            <Label>Wired Charging</Label>
            <Input value={form.wiredCharging} onChange={set("wiredCharging")} placeholder="e.g. 60W Super Fast Charging" />
          </div>
        </div>
      </SectionCard>

      {/* Storage Type */}
      <SectionCard title="Storage" icon="💾" accent>
        <div className="max-w-sm">
          <Label>Storage Type</Label>
          <Input value={form.storageType} onChange={set("storageType")} placeholder="e.g. UFS 4.0" />
          <p className="text-xs text-zinc-400 mt-2 bg-zinc-50 border border-zinc-100 rounded-xl px-3 py-2">
            💡 Storage capacity <strong>({productStorage || "—"})</strong> is already set from the previous step.
          </p>
        </div>
      </SectionCard>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-800 border border-zinc-200
            hover:border-zinc-400 bg-white px-6 py-3.5 rounded-2xl transition-all duration-200
            text-sm font-semibold uppercase tracking-wide shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>←</span><span>Back</span>
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="group flex items-center gap-3 bg-[#1132d4] hover:bg-[#0d28b8] disabled:bg-blue-200
            text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-md shadow-blue-200
            hover:shadow-lg hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed
            text-sm tracking-wide uppercase"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
              <span>Listing Product...</span>
            </>
          ) : (
            <span>🚀 List Product</span>
          )}
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SUCCESS PAGE — renders real API response (product + embedded specs)
// ══════════════════════════════════════════════════════════════════════════════
const SuccessPage = ({ product, onReset }) => {
  const s = product.specs || {};
  const d = calcDisc(product.originalPrice, product.price);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Banner */}
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 shadow-sm">
        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold text-lg">✓</div>
        <div className="flex-1">
          <p className="text-emerald-700 text-sm font-bold">Product listed successfully with all specs!</p>
          <p className="text-zinc-400 text-xs mt-0.5 font-mono">ID: {product._id}</p>
        </div>
        <Badge color="emerald">Live</Badge>
      </div>

      {/* ── PRODUCT ─────────────────────────────────────── */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold mb-4">Product Listing</p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 aspect-square shadow-sm">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl text-zinc-300">📱</div>
              )}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <Badge color="blue">{product.deviceType}</Badge>
                <Badge color="indigo">{product.category}</Badge>
              </div>
              {d > 0 && (
                <div className="absolute bottom-3 right-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  -{d}% OFF
                </div>
              )}
            </div>
            <SectionCard title="Pricing" icon="💰">
              <div className="flex items-end gap-3 mb-3">
                <span className="text-3xl font-bold text-[#1132d4] tracking-tight">{fmt(product.price)}</span>
                {product.originalPrice > 0 && (
                  <span className="text-zinc-400 line-through text-base mb-0.5">{fmt(product.originalPrice)}</span>
                )}
              </div>
              <InfoRow label="Commission" value={`${product.commissionRate}%`} highlight />
              <InfoRow label="Payment"    value={product.payment} />
              <InfoRow label="Quantity"   value={product.quantity} />
            </SectionCard>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <SectionCard title="Product Info" icon="📋">
              <h2 className="text-2xl font-bold text-zinc-900 mb-1 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.title}
              </h2>
              {product.description && (
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{product.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {product.brand       && <Badge color="sky">{product.brand}</Badge>}
                {product.subcategory && <Badge color="indigo">{product.subcategory}</Badge>}
                {product.condition   && <Badge color="emerald">{product.condition}</Badge>}
                <Badge color="blue">{product.status}</Badge>
              </div>
            </SectionCard>
            <SectionCard title="Device Details" icon="📱">
              <InfoRow label="Storage"     value={product.storage} />
              <InfoRow label="Color"       value={product.color} />
              <InfoRow label="Device Type" value={product.deviceType} highlight />
              <InfoRow label="Listed By"   value={product.listedByRole?.toUpperCase()} highlight />
            </SectionCard>
            <SectionCard title="Location" icon="📍">
              <p className="text-zinc-700 font-semibold text-sm mb-3">{product.address?.full}</p>
              <div className="flex gap-2 flex-wrap">
                {[product.address?.city, product.address?.state, product.address?.pincode]
                  .filter(Boolean)
                  .map((v) => (
                    <span key={v} className="text-xs bg-zinc-100 text-zinc-500 px-2.5 py-1 rounded-lg border border-zinc-200 font-medium">{v}</span>
                  ))}
              </div>
              {product.location?.coordinates && (
                <p className="text-xs text-zinc-400 mt-2 font-mono">
                  [{product.location.coordinates[1]}°N, {product.location.coordinates[0]}°E]
                </p>
              )}
            </SectionCard>
            <SectionCard title="Timestamps" icon="🕐">
              <InfoRow label="Created" value={fmtDate(product.createdAt)} />
              <InfoRow label="Updated" value={fmtDate(product.updatedAt)} />
            </SectionCard>
          </div>
        </div>
      </div>

      {/* ── SPECS ─────────────────────────────────────────── */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold mb-4">Technical Specifications</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {s.performance && (
            <SectionCard title="Performance" icon="🧠">
              <SpecRow label="Chipset" value={s.performance.chipsetFull} />
              <SpecRow label="RAM"     value={s.performance.ram} />
            </SectionCard>
          )}
          {s.display && (
            <SectionCard title="Display" icon="🖥️">
              <SpecRow label="Size"         value={[s.display.sizeInches, s.display.sizeCm].filter(Boolean).join(" / ")} />
              <SpecRow label="Type"         value={s.display.type} />
              <SpecRow label="Resolution"   value={[s.display.resolution, s.display.resolutionType].filter(Boolean).join(" ")} />
              <SpecRow label="Refresh Rate" value={s.display.refreshRate} />
            </SectionCard>
          )}
          {(s.rearCamera || s.frontCamera) && (
            <SectionCard title="Camera" icon="📷">
              <SpecRow label="Primary"    value={s.rearCamera?.primary} />
              <SpecRow label="Secondary"  value={s.rearCamera?.secondary} />
              <SpecRow label="Tertiary"   value={s.rearCamera?.tertiary} />
              <SpecRow label="Quaternary" value={s.rearCamera?.quaternary} />
              <SpecRow label="Front"      value={s.frontCamera} />
            </SectionCard>
          )}
          {s.battery && (
            <SectionCard title="Battery" icon="🔋">
              <SpecRow label="Capacity" value={s.battery.capacity} />
              <SpecRow label="Charging" value={s.battery.wiredCharging} />
            </SectionCard>
          )}
          <SectionCard title="Storage" icon="💾">
            <SpecRow label="Capacity" value={product.storage} />
            <SpecRow label="Type"     value={s.storageType} />
          </SectionCard>
          <SectionCard title="Record" icon="📋">
            <SpecRow label="Product ID" value={product._id?.slice(-8).toUpperCase()} />
            <SpecRow label="Created At" value={fmtDate(product.createdAt)} />
          </SectionCard>
        </div>

        {/* Highlights */}
        <div className="mt-5 bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-zinc-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-5 font-bold">⚡ Highlights at a glance</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: "🧠", label: "RAM",     value: s.performance?.ram },
              { icon: "🖥️", label: "Display", value: s.display?.refreshRate },
              { icon: "🔋", label: "Battery", value: s.battery?.capacity },
              { icon: "💾", label: "Storage", value: product.storage },
            ].filter(({ value }) => value).map(({ icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-xl mx-auto mb-2">{icon}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 font-medium">{label}</div>
                <div className="text-sm font-bold text-[#1132d4]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onReset}
          className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold
            px-8 py-4 rounded-2xl transition-all duration-200 shadow-md shadow-emerald-200
            hover:shadow-lg hover:scale-105 active:scale-95 text-sm tracking-wide uppercase"
        >
          <span>＋</span><span>List Another Product</span>
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// ROOT — wired to ProductContext via addProductSeller
// ══════════════════════════════════════════════════════════════════════════════
export default function CashifyListingFlow() {
  const { addProductSeller, loading, error: contextError } = useProductContext();

  const [page, setPage]       = useState("form");
  const [substep, setSubstep] = useState("product");
  const [result, setResult]   = useState(null);
  const [apiError, setApiError] = useState("");

  const [productForm, setProductForm] = useState({
    title: "", description: "", category: "", subcategory: "", brand: "",
    deviceType: "", condition: "", storage: "", color: "",
    price: "", originalPrice: "", payment: "",
    city: "", state: "", pincode: "", address: "",
  });
  const [specsForm, setSpecsForm] = useState({
    chipsetFull: "", ram: "",
    sizeInches: "", sizeCm: "", displayType: "", resolution: "", resolutionType: "", refreshRate: "",
    primaryCam: "", secondaryCam: "", tertiaryCam: "", quaternaryCam: "",
    frontCamera: "",
    capacity: "", wiredCharging: "",
    storageType: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews]     = useState([]);
  const [videoFile, setVideoFile]   = useState(null);
  const [videoName, setVideoName]   = useState("");
  const [productErrors, setProductErrors] = useState({});
  const [specsErrors, setSpecsErrors]     = useState({});

  const validateProduct = () => {
    const e = {};
    if (!productForm.title.trim())   e.title      = "Title is required";
    if (!productForm.category)       e.category   = "Please select a category";
    if (!productForm.deviceType)     e.deviceType = "Please select a device type";
    if (!productForm.condition)      e.condition  = "Please select condition";
    if (!productForm.storage.trim()) e.storage    = "Storage capacity is required";
    if (!productForm.color.trim())   e.color      = "Color is required";
    if (!productForm.price)          e.price      = "Price is required";
    else if (isNaN(Number(productForm.price)) || Number(productForm.price) < 0)
      e.price = "Enter a valid price";
    if (!productForm.payment)        e.payment    = "Payment method is required";
    if (imageFiles.length === 0)     e.images     = "Upload at least 1 image";
    setProductErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateSpecs = () => {
    const e = {};
    if (!specsForm.chipsetFull.trim()) e.chipsetFull  = "Chipset is required";
    if (!specsForm.ram.trim())         e.ram          = "RAM is required";
    if (!specsForm.sizeInches.trim())  e.sizeInches   = "Display size is required";
    if (!specsForm.displayType.trim()) e.displayType  = "Display type is required";
    if (!specsForm.refreshRate.trim()) e.refreshRate  = "Refresh rate is required";
    if (!specsForm.primaryCam.trim())  e.primaryCam   = "Primary camera is required";
    if (!specsForm.frontCamera.trim()) e.frontCamera  = "Front camera is required";
    if (!specsForm.capacity.trim())    e.capacity     = "Battery capacity is required";
    setSpecsErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleProductNext = () => {
    if (!validateProduct()) return;
    setSubstep("specs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    if (!validateSpecs()) return;
    setApiError("");

    const specs = {
      performance: {
        chipsetFull: specsForm.chipsetFull || null,
        ram:         specsForm.ram         || null,
      },
      display: {
        sizeInches:     specsForm.sizeInches     || null,
        sizeCm:         specsForm.sizeCm         || null,
        type:           specsForm.displayType    || null,
        resolution:     specsForm.resolution     || null,
        resolutionType: specsForm.resolutionType || null,
        refreshRate:    specsForm.refreshRate    || null,
      },
      rearCamera: {
        primary:    specsForm.primaryCam    || null,
        secondary:  specsForm.secondaryCam  || null,
        tertiary:   specsForm.tertiaryCam   || null,
        quaternary: specsForm.quaternaryCam || null,
      },
      frontCamera: specsForm.frontCamera || null,
      battery: {
        capacity:      specsForm.capacity      || null,
        wiredCharging: specsForm.wiredCharging || null,
      },
      storageType: specsForm.storageType || null,
    };

    const payload = {
      ...productForm,
      price:         Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      images:        imageFiles,
      video:         videoFile,
      specs,
    };

    const newProduct = await addProductSeller(payload);

    if (newProduct) {
      setResult(newProduct);
      setPage("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setApiError(contextError || "Something went wrong. Please try again.");
    }
  };

  const reset = () => {
    setPage("form");
    setSubstep("product");
    setResult(null);
    setApiError("");
    setProductForm({ title: "", description: "", category: "", subcategory: "", brand: "", deviceType: "", condition: "", storage: "", color: "", price: "", originalPrice: "", payment: "", city: "", state: "", pincode: "", address: "" });
    setSpecsForm({ chipsetFull: "", ram: "", sizeInches: "", sizeCm: "", displayType: "", resolution: "", resolutionType: "", refreshRate: "", primaryCam: "", secondaryCam: "", tertiaryCam: "", quaternaryCam: "", frontCamera: "", capacity: "", wiredCharging: "", storageType: "" });
    setImageFiles([]);
    setPreviews([]);
    setVideoFile(null);
    setVideoName("");
    setProductErrors({});
    setSpecsErrors({});
  };

  const stepBarStep = substep === "product" ? 1 : 2;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; font-family: 'DM Sans', sans-serif; background: #f5f5f5; }
        .cashify-root {
          min-height: 100vh;
          background: #f5f5f5;
          background-image:
            radial-gradient(ellipse 80% 40% at 50% -10%, rgba(17,50,212,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 90% 90%, rgba(17,50,212,0.04) 0%, transparent 50%);
          font-family: 'DM Sans', sans-serif;
          color: #18181b;
        }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.7s linear infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 4px; }
      `}</style>

      <div className="cashify-root">
        {/* Navbar */}
        <div className="bg-white border-b border-zinc-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1132d4] flex items-center justify-center shadow-[0_2px_8px_rgba(17,50,212,0.4)]">
              <span className="text-white text-xs font-black">S</span>
            </div>
            <span className="text-sm font-bold text-zinc-800"
              style={{ fontFamily: "'Playfair Display', serif" }}>Seller Portal</span>
            <span className="text-zinc-300 mx-1">/</span>
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-widest">Add Product</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-[#1132d4] animate-pulse" />
            <span className="text-xs text-[#1132d4] font-semibold">Seller Dashboard</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Page header */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#1132d4] font-bold mb-1">New Listing</p>
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {page === "done" ? "Listing Published!"
                : substep === "product" ? "Product Details"
                : "Tech Specifications"}
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              {page === "done"             && "Your product is live with full specs attached."}
              {page === "form" && substep === "product" && "Fill in all details — specs are required before listing."}
              {page === "form" && substep === "specs"   && "Specs are submitted together with the listing in one API call."}
            </p>
          </div>

          {page === "form" && <StepBar step={stepBarStep} />}

          {page === "form" && substep === "product" && (
            <ProductDetailsForm
              form={productForm}         setForm={setProductForm}
              previews={previews}        setPreviews={setPreviews}
              imageFiles={imageFiles}    setImageFiles={setImageFiles}
              videoFile={videoFile}      setVideoFile={setVideoFile}
              videoName={videoName}      setVideoName={setVideoName}
              errors={productErrors}
              onNext={handleProductNext}
            />
          )}

          {page === "form" && substep === "specs" && (
            <TechSpecsForm
              form={specsForm}           setForm={setSpecsForm}
              productTitle={productForm.title}
              productStorage={productForm.storage}
              errors={specsErrors}
              loading={loading}
              apiError={apiError}
              onBack={() => { setSubstep("product"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onSubmit={handleFinalSubmit}
            />
          )}

          {page === "done" && result && (
            <SuccessPage product={result} onReset={reset} />
          )}
        </div>
      </div>
    </>
  );
}