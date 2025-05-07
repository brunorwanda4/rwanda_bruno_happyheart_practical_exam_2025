import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Install: npm install jwt-decode

const UseAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // New state

  const handleToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }

      setUser(decodedToken);
      // const adminStatus = decodedToken.role === "admin" || decodedToken.isAdmin === true;
      setIsAdmin(true);
    } catch (error) {
      console.error("Invalid or expired token:", error.message);
      localStorage.removeItem("authToken");
      setToken(null);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      handleToken(storedToken);
    } else {
      setToken(null);
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    handleToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    setLoading(false);
  };

  return { token, user, isAdmin, login, logout, loading };
};

export default UseAuth