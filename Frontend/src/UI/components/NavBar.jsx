import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";

const LocationDropdownContent = ({
  handleDetectLocation,
  loadingGPS,
  pincode,
  setPincode,
  handlePincodeSearch,
  loadingPincode,
  pincodeError,
  pincodeCity,
  handleConfirmPincode,
  setPincodeCity,
  setPincodeError
}) => (
  <div className="p-4">
    <p className="text-sm font-semibold text-gray-800 mb-3">Select your delivery location</p>
    <button onClick={handleDetectLocation} disabled={loadingGPS}
      className="w-full flex items-center justify-center gap-2 border border-teal-500 text-teal-600 rounded-lg py-2 px-3 text-sm font-medium hover:bg-teal-50 transition disabled:opacity-60 mb-4">
      {loadingGPS ? "Detecting..." : "Use my current location"}
    </button>
    <div className="flex items-center gap-2 mb-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400">or enter pincode</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
    <div className="flex gap-2">
      <input type="text" maxLength={6} value={pincode}
        onChange={(e) => { setPincode(e.target.value.replace(/\D/, "")); setPincodeCity(""); setPincodeError(""); }}
        onKeyDown={(e) => e.key === "Enter" && handlePincodeSearch()}
        placeholder="Enter 6-digit pincode"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-400" />
      <button onClick={handlePincodeSearch} disabled={loadingPincode}
        className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-teal-700 transition disabled:opacity-60">
        {loadingPincode ? "..." : "Check"}
      </button>
    </div>
    {pincodeError && <p className="text-xs text-red-500 mt-2">{pincodeError}</p>}
    {pincodeCity && (
      <div className="mt-3 flex items-center justify-between bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
        <div><p className="text-xs text-gray-500">City detected</p><p className="text-sm font-semibold text-teal-700">{pincodeCity}</p></div>
        <button onClick={handleConfirmPincode} className="bg-teal-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-teal-700 transition">Confirm</button>
      </div>
    )}
  </div>
);

export default function NavBar() {
  const navigate = useNavigate();

  const [locationLabel, setLocationLabel] = useState("Set Location");
  const [showDropdown, setShowDropdown] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeCity, setPincodeCity] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [loadingGPS, setLoadingGPS] = useState(false);
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    setLoadingGPS(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await res.json();
          const addr = data.address;
          const city =
            addr.city || addr.town || addr.village || addr.county || "Unknown";
          const postcode = addr.postcode || "";
          setLocationLabel(postcode ? `${city} - ${postcode}` : city);
          setShowDropdown(false);
        } catch {
          setLocationLabel("Location found");
          setShowDropdown(false);
        } finally {
          setLoadingGPS(false);
        }
      },
      (err) => {
        setLoadingGPS(false);
        alert(
          err.code === 1
            ? "Location denied. Enter pincode manually."
            : "Unable to get location.",
        );
      },
    );
  };

  const handlePincodeSearch = async () => {
    const trimmed = pincode.trim();
    if (!/^\d{6}$/.test(trimmed)) {
      setPincodeError("Please enter a valid 6-digit pincode.");
      setPincodeCity("");
      return;
    }
    setPincodeError("");
    setPincodeCity("");
    setLoadingPincode(true);
    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${trimmed}`,
      );
      const data = await res.json();
      if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        setPincodeCity(`${po.District || po.Name}, ${po.State}`);
      } else {
        setPincodeError("No city found for this pincode.");
      }
    } catch {
      setPincodeError("Error fetching pincode data.");
    } finally {
      setLoadingPincode(false);
    }
  };

  const handleConfirmPincode = () => {
    if (pincodeCity) {
      setLocationLabel(`${pincodeCity} - ${pincode}`);
      setPincode("");
      setPincodeCity("");
      setShowDropdown(false);
    }
  };


  return (
    <div className="sticky top-0 z-50" >
      <nav className="w-full bg-white shadow-md px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <img src="./assets/img/Phonify1.png"
            onClick={() => navigate("/")} alt="Phonify Logo" className="h-10 w-auto cursor-pointer flex-shrink-0 object-contain" />

          {/* Search — desktop */}
          <div className="hidden md:flex flex-1 items-center border rounded-lg px-3 py-2 bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input type="text" placeholder="Search for mobiles, accessories & More" className="w-full bg-transparent focus:outline-none text-gray-700" />
          </div>

          {/* Right — desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative" ref={dropdownRef}>
              <button className="flex items-center text-gray-700 hover:text-teal-600 transition" onClick={() => setShowDropdown((v) => !v)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z" />
                </svg>
                <span className="max-w-[140px] truncate text-sm font-medium">{locationLabel}</span>
                <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                  <LocationDropdownContent
                    handleDetectLocation={handleDetectLocation}
                    loadingGPS={loadingGPS}
                    pincode={pincode}
                    setPincode={setPincode}
                    handlePincodeSearch={handlePincodeSearch}
                    loadingPincode={loadingPincode}
                    pincodeError={pincodeError}
                    pincodeCity={pincodeCity}
                    handleConfirmPincode={handleConfirmPincode}
                    setPincodeCity={setPincodeCity}
                    setPincodeError={setPincodeError}
                  />
                </div>
              )}
            </div>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>

          {/* Mobile: hamburger */}
          <button className="md:hidden text-gray-700 p-1 flex-shrink-0" onClick={() => setMobileMenuOpen((v) => !v)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile: Search bar */}
        <div className="mt-3 md:hidden flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input type="text" placeholder="Search mobiles, accessories & more" className="w-full bg-transparent focus:outline-none text-gray-700 text-sm" />
        </div>

        {/* Mobile: Expanded menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 border-t pt-3 space-y-3">

            {/* Location */}
            <div ref={dropdownRef}>
              <button
                className="flex items-center w-full text-gray-700 py-2"
                onClick={() => setShowDropdown((v) => !v)}
              >
                <span className="text-sm font-medium">{locationLabel}</span>
              </button>

              {showDropdown && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl mt-1">
                  <LocationDropdownContent />
                </div>
              )}
            </div>

            {/* Login */}
            <button
              className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");

              }}
            >
              Login
            </button>


          </div>
        )}
      </nav>
      {mobileMenuOpen && (
        <NavMenu
          mobileOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen} />

      )}
    </div>
  );
}
