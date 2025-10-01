import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create account</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full py-2 bg-green-600 text-white rounded">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
