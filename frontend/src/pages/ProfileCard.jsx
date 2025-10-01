import React, { useState, useEffect } from "react";
import API from "../API";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function ProfileCard() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", avatar: "" });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user)
      setForm({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
  }, [user]);

  const saveProfile = async () => {
    try {
      const res = await API.put("/auth/profile", form);
      setUser(res.data);
      setMsg("Profile updated successfully");
      setEditing(false);
      setTimeout(() => setMsg(null), 2000);
    } catch (err) {
      setMsg(err?.response?.data?.msg || "Failed to update profile");
    }
  };

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-6 border-t-4 border-black hover:shadow-gray-200 transition-shadow duration-300 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-bold mb-5 text-blue-700 text-center">
        My Profile
      </h3>

      {/* Avatar */}
      <div className="flex justify-center mb-5">
        {form.avatar ? (
          <img
            src={form.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-black shadow-md object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-black shadow-md">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}
      </div>

      {editing ? (
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:border-black transition"
            placeholder="Avatar URL"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          />

          <div className="flex gap-4 mt-2">
            <button
              className="flex-1 py-2 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
              onClick={saveProfile}
            >
              Save
            </button>
            <button
              className="flex-1 py-2 border border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition"
              onClick={() => {
                setEditing(false);
                setForm({
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar || "",
                });
              }}
            >
              Cancel
            </button>
          </div>
          {msg && (
            <div className="text-sm text-green-600 mt-2 text-center">{msg}</div>
          )}
        </div>
      ) : (
        <div className="space-y-3 text-center">
          <div>
            <span className="font-medium text-blue-600">Name:</span>{" "}
            <span className="font-semibold text-gray-700">{user?.name}</span>
          </div>
          <div>
            <span className="font-medium text-blue-600">Email:</span>{" "}
            <span className="font-semibold text-gray-700">{user?.email}</span>
          </div>
          <button
            className="mt-5 w-full py-2 bg-blue-700 text-gray-100 rounded-xl font-semibold hover:bg-blue-500 transition"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
          {msg && (
            <div className="text-sm text-green-600 mt-2 text-center">{msg}</div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default ProfileCard;
