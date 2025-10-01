import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="bg-gradient-to-br from-gray-200 via-gray-400 to-neutral-600 min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

// Separate LandingPage component for cleaner code
export default App;
