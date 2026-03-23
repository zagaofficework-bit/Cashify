import { useState, useEffect } from "react";
import {
  Save,
  Send,
  Trash2,
  Banknote,
  Smartphone,
  CreditCard,
  Upload,
  X,
  ChevronDown,
  Package,
  AlignLeft,
  Layers,
  Tag,
  ShieldCheck,
  HardDrive,
  Palette,
  IndianRupee,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const categories = {
  phones: {
    label: "Mobile Phones",
    subcategories: [
      "iPhone",
      "Samsung",
      "Xiaomi / Redmi",
      "OnePlus",
      "Realme",
      "Oppo",
      "Vivo",
      "Google Pixel",
      "Motorola",
      "Nokia",
      "Asus",
      "Nothing",
      "Other Smartphones",
    ],
  },
  laptops: {
    label: "Laptops",
    subcategories: [
      "MacBook",
      "Dell",
      "HP",
      "Lenovo",
      "Asus",
      "Acer",
      "MSI",
      "Microsoft Surface",
      "Samsung",
      "Other Laptops",
    ],
  },
  tablets: {
    label: "Tablets",
    subcategories: [
      "Apple iPad",
      "Samsung Tablets",
      "Lenovo Tablets",
      "Xiaomi Tablets",
      "Huawei Tablets",
      "Other Tablets",
    ],
  },
  consoles: {
    label: "Gaming Consoles",
    subcategories: [
      "PlayStation 4",
      "PlayStation 5",
      "Xbox One",
      "Xbox Series X / S",
      "Nintendo Switch",
    ],
  },
  desktop: {
    label: "Desktop / PC Components",
    subcategories: [
      "CPU / Desktop",
      "Graphics Card (GPU)",
      "RAM",
      "Hard Disk / SSD",
      "Motherboard",
      "Monitor",
    ],
  },
};

function SectionHead({ title }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-1 h-4 bg-teal-500 rounded-full" />
      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
        {title}
      </span>
    </div>
  );
}

function FieldLabel({ text, required }) {
  return (
    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
      {text}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

// Input with left icon
function IconInput({ icon: Icon, iconColor = "text-gray-400", ...props }) {
  return (
    <div className="relative">
      <Icon
        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${iconColor} flex-shrink-0 pointer-events-none`}
      />
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-gray-50 focus:bg-white transition-all duration-150 font-medium"
      />
    </div>
  );
}

// Textarea with left icon
function IconTextarea({ icon: Icon, iconColor = "text-gray-400", ...props }) {
  return (
    <div className="relative">
      <Icon
        className={`absolute left-3.5 top-3.5 w-4 h-4 ${iconColor} flex-shrink-0 pointer-events-none`}
      />
      <textarea
        {...props}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-gray-50 focus:bg-white transition-all duration-150 font-medium resize-none"
      />
    </div>
  );
}

// Select with left icon
function IconSelect({
  icon: Icon,
  iconColor = "text-gray-400",
  children,
  ...props
}) {
  return (
    <div className="relative">
      <Icon
        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${iconColor} flex-shrink-0 pointer-events-none z-10`}
      />
      <select
        {...props}
        className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-gray-50 focus:bg-white transition-all duration-150 font-medium appearance-none cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

function FileUpload({ label, accept, type, onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    onFileSelect?.(null);
  };

  return (
    <div>
      <FieldLabel text={label} />
      {!preview ? (
        <label className="flex flex-col items-center justify-center w-full h-28 border border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-teal-50 hover:border-teal-400 transition-all duration-200 group">
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 group-hover:border-teal-300 flex items-center justify-center mb-2 shadow-sm transition-all">
            <Upload className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition-colors" />
          </div>
          <p className="text-xs font-semibold text-gray-500 group-hover:text-teal-600 transition-colors">
            Click to upload
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {type === "image" ? "PNG, JPG up to 10MB" : "MP4, MOV up to 100MB"}
          </p>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className="relative w-full h-28 border border-teal-200 rounded-xl overflow-hidden">
          {type === "image" ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <video src={preview} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-red-600"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-2.5 py-1 truncate">
            {fileName}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [storage, setStorage] = useState("");
  const [colour, setColour] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("formDraft");
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setTitle(d.title || "");
        setDescription(d.description || "");
        setCategory(d.category || "");
        setSubCategory(d.subCategory || "");
        setBrandName(d.brandName || "");
        setDeviceType(d.deviceType || "");
        setStorage(d.storage || "");
        setColour(d.colour || "");
        setPrice(d.price || "");
        setOriginalPrice(d.originalPrice || "");
        setPaymentMethod(d.paymentMethod || "");
        toast.info("Draft loaded from previous session");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveDraft = () => {
    localStorage.setItem(
      "formDraft",
      JSON.stringify({
        title,
        description,
        category,
        subCategory,
        brandName,
        deviceType,
        storage,
        colour,
        price,
        originalPrice,
        paymentMethod,
        savedAt: new Date().toISOString(),
      }),
    );
    toast.success("Draft saved successfully!");
  };

  const handleCategoryChange = (v) => {
    setCategory(v);
    setSubCategory("");
  };

  const handlePriceChange = (v) => {
    setPrice(v);
    setPriceError(
      originalPrice && v && parseFloat(v) > parseFloat(originalPrice)
        ? "Price cannot be greater than original price"
        : "",
    );
  };

  const handleOriginalPriceChange = (v) => {
    setOriginalPrice(v);
    setPriceError(
      price && v && parseFloat(price) > parseFloat(v)
        ? "Price cannot be greater than original price"
        : "",
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (priceError) {
      alert("Please fix the price validation error");
      return;
    }
    console.log({
      title,
      description,
      category,
      subCategory,
      brandName,
      deviceType,
      storage,
      colour,
      price,
      originalPrice,
      paymentMethod,
      imageFile,
      videoFile,
    });
    toast.success("Form submitted! Check console for details.");
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setSubCategory("");
    setBrandName("");
    setDeviceType("");
    setStorage("");
    setColour("");
    setPrice("");
    setOriginalPrice("");
    setPaymentMethod("");
    setImageFile(null);
    setVideoFile(null);
    setPriceError("");
    localStorage.removeItem("formDraft");
    toast.info("Form cleared and draft removed");
  };

  const discount =
    price && originalPrice && !priceError && parseFloat(originalPrice) > 0
      ? Math.round(
          ((parseFloat(originalPrice) - parseFloat(price)) /
            parseFloat(originalPrice)) *
            100,
        )
      : 0;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');`}</style>
      <div
        className="min-h-screen bg-gray-50 py-10 px-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Page header */}
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-7 bg-teal-500 rounded-full" />
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                List Your Device
              </h1>
            </div>
            <p className="text-sm text-gray-400 ml-4">
              Fill in the details to list your device on Phonify
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ── Basic Info ── */}
              <div>
                <SectionHead title="Basic Information" />
                <div className="space-y-4">
                  <div>
                    <FieldLabel text="Product Name" required />
                    <IconInput
                      icon={Package}
                      iconColor="text-teal-500"
                      type="text"
                      placeholder="e.g. iPhone 14 Pro Max 256GB"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel text="Description" required />
                    <IconTextarea
                      icon={AlignLeft}
                      iconColor="text-teal-500"
                      placeholder="Describe condition, accessories included, reason for selling..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* ── Category ── */}
              <div>
                <SectionHead title="Category" />
                <div className="space-y-4">
                  <div>
                    <FieldLabel text="Product Category" required />
                    <IconSelect
                      icon={Layers}
                      iconColor="text-teal-500"
                      value={category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      required
                    >
                      <option value="">Select a category</option>
                      {Object.entries(categories).map(([k, { label }]) => (
                        <option key={k} value={k}>
                          {label}
                        </option>
                      ))}
                    </IconSelect>
                  </div>

                  {category && (
                    <div>
                      <FieldLabel text="Sub-Category" required />
                      <IconSelect
                        icon={Layers}
                        iconColor="text-gray-400"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        required
                      >
                        <option value="">Select a sub-category</option>
                        {categories[category].subcategories.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </IconSelect>
                    </div>
                  )}

                  <div>
                    <FieldLabel text="Brand Name" required />
                    <IconInput
                      icon={Tag}
                      iconColor="text-teal-500"
                      type="text"
                      placeholder="e.g. Apple, Samsung, OnePlus"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* ── Device Specs ── */}
              <div>
                <SectionHead title="Device Specs" />
                <div className="space-y-5">
                  {/* Condition */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-teal-500" />
                      <FieldLabel text="Device Condition" required />
                    </div>
                    <div className="flex gap-2">
                      {[
                        {
                          v: "fair",
                          l: "Fair",
                          sub: "Visible wear",
                          sel: "border-amber-400 bg-amber-50 text-amber-700",
                        },
                        {
                          v: "good",
                          l: "Good",
                          sub: "Minor signs",
                          sel: "border-blue-400 bg-blue-50 text-blue-700",
                        },
                        {
                          v: "superb",
                          l: "Superb",
                          sub: "Like new",
                          sel: "border-emerald-500 bg-emerald-50 text-emerald-700",
                        },
                      ].map(({ v, l, sub, sel }) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setDeviceType(v)}
                          className={`flex-1 flex flex-col items-center py-3 rounded-xl border-2 transition-all duration-150 ${
                            deviceType === v
                              ? sel
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-sm font-bold">{l}</span>
                          <span className="text-[10px] opacity-60 mt-0.5">
                            {sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storage */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="w-4 h-4 text-teal-500" />
                      <FieldLabel text="Storage" required />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { v: "128gb", l: "128 GB" },
                        { v: "256gb", l: "256 GB" },
                        { v: "512gb", l: "512 GB" },
                        { v: "1tb", l: "1 TB" },
                        { v: "2tb", l: "2 TB" },
                      ].map(({ v, l }) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setStorage(v)}
                          className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-150 ${
                            storage === v
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colour */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-4 h-4 text-teal-500" />
                      <FieldLabel text="Colour" required />
                    </div>
                    <IconInput
                      icon={Palette}
                      iconColor="text-teal-500"
                      type="text"
                      placeholder="e.g. Midnight Black, Space Grey, Gold"
                      value={colour}
                      onChange={(e) => setColour(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* ── Pricing ── */}
              <div>
                <SectionHead title="Pricing" />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <IndianRupee className="w-4 h-4 text-teal-500" />
                        <FieldLabel text="Expected Price" required />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">
                          ₹
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={price}
                          onChange={(e) => handlePriceChange(e.target.value)}
                          required
                          className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-gray-50 focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <FieldLabel text="Original Price" required />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">
                          ₹
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={originalPrice}
                          onChange={(e) =>
                            handleOriginalPriceChange(e.target.value)
                          }
                          required
                          className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 bg-gray-50 focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {priceError && (
                    <p className="text-red-500 text-xs font-medium flex items-center gap-1.5">
                      <svg
                        className="w-3 h-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {priceError}
                    </p>
                  )}

                  {discount > 0 && !priceError && (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-700">
                          Buyer saves {discount}%
                        </p>
                        <p className="text-[10px] text-green-600">
                          ₹
                          {(
                            parseFloat(originalPrice) - parseFloat(price)
                          ).toLocaleString()}{" "}
                          off the original price
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Payment Method */}
                  <div>
                    <FieldLabel text="Payment Method" required />
                    <div className="flex gap-2">
                      {[
                        {
                          v: "cash",
                          l: "Cash",
                          icon: <Banknote className="w-4 h-4" />,
                        },
                        {
                          v: "upi",
                          l: "UPI",
                          icon: <Smartphone className="w-4 h-4" />,
                        },
                        {
                          v: "stripe",
                          l: "Stripe",
                          icon: <CreditCard className="w-4 h-4" />,
                        },
                      ].map(({ v, l, icon }) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setPaymentMethod(v)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all duration-150 ${
                            paymentMethod === v
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {icon}
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* ── Media ── */}
              <div>
                <SectionHead title="Photos & Videos" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUpload
                    label="Upload Image"
                    accept="image/*"
                    type="image"
                    onFileSelect={setImageFile}
                  />
                  <FileUpload
                    label="Upload Video"
                    accept="video/*"
                    type="video"
                    onFileSelect={setVideoFile}
                  />
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* ── Actions ── */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="flex-1 min-w-[130px] px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:shadow-teal-200"
                >
                  <Send className="w-4 h-4" /> Submit
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex-1 min-w-[130px] px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Save className="w-4 h-4" /> Save Draft
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 min-w-[130px] px-6 py-3 bg-white text-gray-600 border border-gray-200 rounded-xl hover:border-red-300 hover:text-red-500 hover:bg-red-50 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" /> Clear
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}
