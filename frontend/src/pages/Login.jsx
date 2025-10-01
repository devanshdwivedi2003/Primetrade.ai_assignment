import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-brfrom-gray-200 via-gray-400 to-neutral-600 px-4">
      <motion.div
        className="w-full max-w-md p-8 bg-gray-200 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <motion.button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
