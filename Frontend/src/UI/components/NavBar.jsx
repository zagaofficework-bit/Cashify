import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PiCrown } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, handleLogout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const onLogout = async () => {
    setLoggingOut(true);
    await handleLogout();
    setLoggingOut(false);
    navigate("/");
  };

  const isAdmin = isAuthenticated && user?.role === "admin";
  const isSeller = isAuthenticated && user?.role === "seller";

  return (
    <nav className="w-full bg-white shadow-md px-8 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img src="/nav-logo.png" alt="Phonify Logo" className="h-13 w-28" />
      </div>

      {/* Center: Search bar — hidden for admins since they don't need it */}
      {!isAdmin && (
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
      )}

      {/* Right: actions */}
      {isAuthenticated ? (
        <div className="flex items-center space-x-4 ml-auto">
          {/* Subscribe crown — hide for admin */}
          {!isAdmin && (
            <div
              onClick={() => navigate("/subscribe")}
              className="cursor-pointer"
            >
              <PiCrown className="text-4xl" />
            </div>
          )}

          <div className="flex items-center space-x-3">
            {/* Greeting */}
            <span className="text-sm text-gray-600 hidden md:block">
              Hi, {user?.firstname}
              {isAdmin && (
                <span className="ml-1 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </span>

            {/* ── Admin Panel button — only for admins ── */}
            {isAdmin && (
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
              >
                <MdAdminPanelSettings className="text-lg" />
                Admin Panel
              </button>
            )}

            {/* Profile / Dashboard button — hide for admin
                seller → /seller-dashboard
                user   → /profile                          */}
            {!isAdmin && (
              <button
                onClick={() =>
                  navigate(isSeller ? "/seller-dashboard" : "/profile")
                }
                className="bg-[#1132d4] text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              >
                {isSeller ? "Dashboard" : "Profile"}
              </button>
            )}

            {/* Logout */}
            <button
              onClick={onLogout}
              disabled={loggingOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              {loggingOut ? "..." : "Logout"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-[#1132d4] text-white px-4 py-2 rounded-lg hover:bg-[#1132d4]/70 transition"
        >
          Login
        </button>
      )}
    </nav>
  );
}
