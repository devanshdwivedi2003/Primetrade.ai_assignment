import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../API";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true); // true until we check token

  // Set token in API headers whenever it changes
  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Fetch user profile if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        logout(); // clear token and user if invalid
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  // Login
  const login = async (credentials) => {
    try {
      const res = await API.post("/auth/login", credentials);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user); // immediately set user
    } catch (err) {
      throw err.response?.data?.msg || "Login failed";
    }
  };

  // Signup
  const signup = async (data) => {
    try {
      const res = await API.post("/auth/signup", data);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user); // immediately set user
    } catch (err) {
      throw err.response?.data?.msg || "Signup failed";
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
