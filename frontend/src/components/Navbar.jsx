import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      className="fixed w-full top-0 left-0 z-50 bg-gray-600 shadow-md p-4 flex justify-between items-center"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Brand */}
      <Link
        to="/"
        className="font-extrabold text-2xl text-white tracking-wide hover:text-gray-200 transition"
      >
        PrimeTrade.ai
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow-sm
               hover:bg-gray-300 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold shadow-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full  bg-white text-black font-semibold shadow-sm  hover:bg-gray-300 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
