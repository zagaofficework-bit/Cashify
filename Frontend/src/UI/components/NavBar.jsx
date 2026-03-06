import React from "react";
import {useNavigate} from "react-router-dom"

export default function Header() {
    const navigate = useNavigate()
    
    const onclick = () => {
        console.log("Clicked")
        navigate("/login")
        
    }
  return (
    <>
    
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-kMUpk3knKvstr4FF-v4BGDqvVFJ3xxCbQ&s" // replace with actual logo path
          alt="Cashify Logo"
          className="h-10 w-15"
        />
        
      </div>

      {/* Center: Search bar */}
      <div className="flex-1 mx-6">
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for mobiles, accessories & More"
            className="w-full bg-transparent focus:outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Right: Location + Login */}
      <div className="flex items-center space-x-6">
        {/* Location */}
        <div className="flex items-center text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-teal-600 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 22s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
            />
          </svg>
          <span>Gurgaon</span>
        </div>

        {/* Login Button */}
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition" onClick={onclick}>
          Login
        </button>
      </div>
    </nav>
    </>
  );
}
