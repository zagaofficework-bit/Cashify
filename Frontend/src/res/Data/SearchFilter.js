// ─────────────────────────────────────────────────────────────────────────────
// SearchFilterData.js
//
// Data for the SearchByModelFilter component.
// Each category export contains:
//   - brands        : { id, name, logo (text/emoji fallback) }[]
//   - usageFilters  : { id, label, icon }[]
//   - priceList     : { label, max }[]   — quick price buttons
//   - priceRange    : { min, max, step }
//
// Usage:
//   import { laptopsFilterData } from "./SearchFilterData";
//   <SearchByModelFilter data={laptopsFilterData} />
// ─────────────────────────────────────────────────────────────────────────────

// ── LAPTOPS ──────────────────────────────────────────────────────────────────
export const laptopsFilterData = {
  deviceType: "Laptops",
  priceRange: { min: 0, max: 200000, step: 1000 },
  priceList: [
    { label: "Below 30,000",   max: 30000 },
    { label: "Below 50,000",   max: 50000 },
    { label: "Below 60,000",   max: 60000 },
    { label: "Below 80,000",   max: 80000 },
    { label: "Below 1,00,000", max: 100000 },
    { label: "Below 2,00,000", max: 200000 },
  ],
  brands: [
    { id: "acer",      name: "Acer",      logo: "🖥️",  abbr: "acer" },
    { id: "apple",     name: "Apple",     logo: "🍎",  abbr: "Apple" },
    { id: "asus",      name: "Asus",      logo: "💻",  abbr: "ASUS" },
    { id: "dell",      name: "Dell",      logo: "🖱️",  abbr: "DELL" },
    { id: "hp",        name: "HP",        logo: "🖨️",  abbr: "HP" },
    { id: "lenovo",    name: "Lenovo",    logo: "⌨️",  abbr: "lenovo" },
    { id: "microsoft", name: "Microsoft", logo: "🪟",  abbr: "Microsoft" },
    { id: "samsung",   name: "Samsung",   logo: "📺",  abbr: "SAMSUNG" },
  ],
  usageFilters: [
    { id: "budget",    label: "Budget",    icon: "💰" },
    { id: "all",       label: "All",       icon: "🏆" },
    { id: "battery",   label: "Battery",   icon: "🔋" },
    { id: "performer", label: "Performer", icon: "⚡" },
    { id: "flagship",  label: "Flagship",  icon: "👑" },
    { id: "vfm",       label: "VFM",       icon: "🏷️" },
  ],
};

// ── PHONES ───────────────────────────────────────────────────────────────────
export const phonesFilterData = {
  deviceType: "Phones",
  priceRange: { min: 0, max: 200000, step: 1000 },
  priceList: [
    { label: "Below 10,000",  max: 10000 },
    { label: "Below 15,000",  max: 15000 },
    { label: "Below 20,000",  max: 20000 },
    { label: "Below 30,000",  max: 30000 },
    { label: "Below 50,000",  max: 50000 },
    { label: "Below 1,00,000", max: 100000 },
  ],
  brands: [
    { id: "apple",   name: "Apple",   logo: "🍎", abbr: "Apple" },
    { id: "samsung", name: "Samsung", logo: "📱", abbr: "SAMSUNG" },
    { id: "oneplus", name: "OnePlus", logo: "1️⃣", abbr: "OnePlus" },
    { id: "xiaomi",  name: "Xiaomi",  logo: "📲", abbr: "Xiaomi" },
    { id: "google",  name: "Google",  logo: "🔍", abbr: "Google" },
    { id: "vivo",    name: "Vivo",    logo: "📷", abbr: "vivo" },
    { id: "oppo",    name: "Oppo",    logo: "🎯", abbr: "OPPO" },
    { id: "realme",  name: "Realme",  logo: "⚡", abbr: "realme" },
  ],
  usageFilters: [
    { id: "budget",    label: "Budget",    icon: "💰" },
    { id: "camera",    label: "Camera",    icon: "📸" },
    { id: "gaming",    label: "Gaming",    icon: "🎮" },
    { id: "battery",   label: "Battery",   icon: "🔋" },
    { id: "flagship",  label: "Flagship",  icon: "👑" },
    { id: "5g",        label: "5G",        icon: "📶" },
  ],
};

// ── CAMERAS ──────────────────────────────────────────────────────────────────
export const camerasFilterData = {
  deviceType: "Cameras",
  priceRange: { min: 0, max: 600000, step: 5000 },
  priceList: [
    { label: "Below 20,000",  max: 20000 },
    { label: "Below 50,000",  max: 50000 },
    { label: "Below 1,00,000", max: 100000 },
    { label: "Below 2,00,000", max: 200000 },
    { label: "Below 3,00,000", max: 300000 },
    { label: "Below 6,00,000", max: 600000 },
  ],
  brands: [
    { id: "sony",      name: "Sony",      logo: "🎥", abbr: "SONY" },
    { id: "canon",     name: "Canon",     logo: "📷", abbr: "Canon" },
    { id: "nikon",     name: "Nikon",     logo: "🔭", abbr: "Nikon" },
    { id: "fujifilm",  name: "Fujifilm",  logo: "🎞️", abbr: "FUJIFILM" },
    { id: "panasonic", name: "Panasonic", logo: "📹", abbr: "Panasonic" },
    { id: "gopro",     name: "GoPro",     logo: "🏄", abbr: "GoPro" },
  ],
  usageFilters: [
    { id: "beginner",    label: "Beginner",    icon: "🌱" },
    { id: "travel",      label: "Travel",      icon: "✈️" },
    { id: "portrait",    label: "Portrait",    icon: "🤳" },
    { id: "wildlife",    label: "Wildlife",    icon: "🦁" },
    { id: "video",       label: "Video",       icon: "🎬" },
    { id: "professional",label: "Pro",         icon: "🏆" },
  ],
};

// ── SPEAKERS ─────────────────────────────────────────────────────────────────
export const speakersFilterData = {
  deviceType: "Speakers",
  priceRange: { min: 0, max: 150000, step: 500 },
  priceList: [
    { label: "Below 2,000",  max: 2000 },
    { label: "Below 5,000",  max: 5000 },
    { label: "Below 10,000", max: 10000 },
    { label: "Below 20,000", max: 20000 },
    { label: "Below 50,000", max: 50000 },
    { label: "Below 1,50,000", max: 150000 },
  ],
  brands: [
    { id: "jbl",           name: "JBL",            logo: "🔊", abbr: "JBL" },
    { id: "bose",          name: "Bose",            logo: "🎵", abbr: "Bose" },
    { id: "sony",          name: "Sony",            logo: "🎶", abbr: "SONY" },
    { id: "marshall",      name: "Marshall",        logo: "🎸", abbr: "Marshall" },
    { id: "harman",        name: "Harman Kardon",   logo: "🎼", abbr: "Harman" },
    { id: "apple",         name: "Apple",           logo: "🍎", abbr: "Apple" },
  ],
  usageFilters: [
    { id: "portable",  label: "Portable",   icon: "🎒" },
    { id: "home",      label: "Home",       icon: "🏠" },
    { id: "outdoor",   label: "Outdoor",    icon: "⛰️" },
    { id: "party",     label: "Party",      icon: "🎉" },
    { id: "soundbar",  label: "Soundbar",   icon: "📻" },
    { id: "smart",     label: "Smart",      icon: "🤖" },
  ],
};

// ── GAMING CONSOLES ───────────────────────────────────────────────────────────
export const consolesFilterData = {
  deviceType: "Gaming Consoles",
  priceRange: { min: 0, max: 100000, step: 500 },
  priceList: [
    { label: "Below 15,000", max: 15000 },
    { label: "Below 25,000", max: 25000 },
    { label: "Below 35,000", max: 35000 },
    { label: "Below 50,000", max: 50000 },
    { label: "Below 65,000", max: 65000 },
    { label: "Below 1,00,000", max: 100000 },
  ],
  brands: [
    { id: "sony",      name: "Sony",      logo: "🎮", abbr: "SONY" },
    { id: "microsoft", name: "Microsoft", logo: "🟢", abbr: "Xbox" },
    { id: "nintendo",  name: "Nintendo",  logo: "🕹️", abbr: "Nintendo" },
    { id: "valve",     name: "Valve",     logo: "♠️", abbr: "Valve" },
    { id: "asus",      name: "Asus ROG",  logo: "🔴", abbr: "ROG" },
  ],
  usageFilters: [
    { id: "handheld",  label: "Handheld",  icon: "🤲" },
    { id: "home",      label: "Home",      icon: "📺" },
    { id: "vr",        label: "VR",        icon: "🥽" },
    { id: "casual",    label: "Casual",    icon: "😊" },
    { id: "hardcore",  label: "Hardcore",  icon: "💀" },
    { id: "family",    label: "Family",    icon: "👨‍👩‍👧" },
  ],
};