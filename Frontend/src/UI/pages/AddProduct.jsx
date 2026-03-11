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
} from "lucide-react";
import { toast, Toaster } from "sonner";

// Categories with subcategories
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

// ButtonGroup Component
function ButtonGroup({ label, options, value, onChange, required }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              px-4 py-2 rounded-lg border-2 transition-all font-medium
              flex items-center gap-2
              ${
                value === option.value
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }
            `}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// FileUpload Component
function FileUpload({ label, accept, type, onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    onFileSelect?.(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {!preview ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="mb-1 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              {type === "image"
                ? "PNG, JPG, GIF up to 10MB"
                : "MP4, MOV, AVI up to 100MB"}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className="relative w-full h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
          {type === "image" ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <video src={preview} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              onClick={handleRemove}
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 truncate">
            {fileName}
          </div>
        </div>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
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

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("formDraft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTitle(draft.title || "");
        setDescription(draft.description || "");
        setCategory(draft.category || "");
        setSubCategory(draft.subCategory || "");
        setBrandName(draft.brandName || "");
        setDeviceType(draft.deviceType || "");
        setStorage(draft.storage || "");
        setColour(draft.colour || "");
        setPrice(draft.price || "");
        setOriginalPrice(draft.originalPrice || "");
        setPaymentMethod(draft.paymentMethod || "");
        toast.info("Draft loaded from previous session");
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  // Save draft to localStorage
  const handleSaveDraft = () => {
    const draftData = {
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
    };

    localStorage.setItem("formDraft", JSON.stringify(draftData));
    toast.success("Draft saved successfully!");
  };

  // Handle category change and reset subcategory
  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubCategory("");
  };

  // Validate price
  const handlePriceChange = (value) => {
    setPrice(value);
    if (
      originalPrice &&
      value &&
      parseFloat(value) > parseFloat(originalPrice)
    ) {
      setPriceError("Price cannot be greater than original price");
    } else {
      setPriceError("");
    }
  };

  // Validate original price
  const handleOriginalPriceChange = (value) => {
    setOriginalPrice(value);
    if (price && value && parseFloat(price) > parseFloat(value)) {
      setPriceError("Price cannot be greater than original price");
    } else {
      setPriceError("");
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Add Your Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Product Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Select a category</option>
                {Object.entries(categories).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category Dropdown */}
            {category && (
              <div className="space-y-2">
                <label
                  htmlFor="subcategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub-Category
                </label>
                <select
                  id="subcategory"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Select a sub-category</option>
                  {categories[category].subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Brand Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="brandName"
                className="block text-sm font-medium text-gray-700"
              >
                Brand Name
              </label>
              <input
                id="brandName"
                type="text"
                placeholder="Ex. Apple, Samsung, OnePlus, etc"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Device Type - Button Group */}
            <ButtonGroup
              label="Device Condition"
              options={[
                { value: "fair", label: "Fair" },
                { value: "good", label: "Good" },
                { value: "superb", label: "Superb" },
              ]}
              value={deviceType}
              onChange={setDeviceType}
              required
            />

            {/* Storage - Button Group */}
            <ButtonGroup
              label="Storage"
              options={[
                { value: "128gb", label: "128GB" },
                { value: "256gb", label: "256GB" },
                { value: "512gb", label: "512GB" },
                { value: "1tb", label: "1TB" },
                { value: "2tb", label: "2TB" },
              ]}
              value={storage}
              onChange={setStorage}
              required
            />

            {/* Colour Input */}
            <div className="space-y-2">
              <label
                htmlFor="colour"
                className="block text-sm font-medium text-gray-700"
              >
                Colour
              </label>
              <input
                id="colour"
                type="text"
                placeholder="Enter colour"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Expected Price
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {priceError && (
                <p className="text-sm text-red-600 mt-1">{priceError}</p>
              )}
            </div>

            {/* Original Price Input */}
            <div className="space-y-2">
              <label
                htmlFor="originalPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Original Price
              </label>
              <input
                id="originalPrice"
                type="number"
                step="0.01"
                placeholder="Enter original price"
                value={originalPrice}
                onChange={(e) => handleOriginalPriceChange(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Payment Method - Button Group with Icons */}
            <ButtonGroup
              label="Payment Method"
              options={[
                {
                  value: "cash",
                  label: "Cash",
                  icon: <Banknote className="w-5 h-5" />,
                },
                {
                  value: "upi",
                  label: "UPI",
                  icon: <Smartphone className="w-5 h-5" />,
                },
                {
                  value: "stripe",
                  label: "Stripe",
                  icon: <CreditCard className="w-5 h-5" />,
                },
              ]}
              value={paymentMethod}
              onChange={setPaymentMethod}
              required
            />

            {/* Image Upload */}
            <FileUpload
              label="Upload Image"
              accept="image/*"
              type="image"
              onFileSelect={setImageFile}
            />

            {/* Video Upload */}
            <FileUpload
              label="Upload Video"
              accept="video/*"
              type="video"
              onFileSelect={setVideoFile}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 min-w-[140px] px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 min-w-[140px] px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 min-w-[140px] px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
