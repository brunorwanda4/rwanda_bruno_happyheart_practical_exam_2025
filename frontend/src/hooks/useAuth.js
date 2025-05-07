import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Install: npm install jwt-decode

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken = jwtDecode(storedToken); // Decode the token
        setUser(decodedToken);
        // if (decodedToken.role === 'admin' || decodedToken.isAdmin === true) {
        //   setIsAdmin(true);
        // } else {
        //   setIsAdmin(false);
        // }
        if (decodedToken) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        // Handle invalid token (e.g., clear it, logout user)
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
        setIsAdmin(false);
      }
    } else {
      setToken(null);
      setUser(null);
      setIsAdmin(false);
    }
  }, []); // Runs once on mount or when localStorage might change externally

  const login = (newToken) => {
    localStorage.setItem("authToken", newToken);
    console.log({data : newToken, message : "Hello is working 🌼"})
    setToken(newToken);
    try {
      const decodedToken = jwtDecode(newToken);
      setUser(decodedToken);
      // if (decodedToken.role === 'admin' || decodedToken.isAdmin === true) {
      //   setIsAdmin(true);
      // } else {
      //   setIsAdmin(false);
      // }
      if (decodedToken) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setIsAdmin(true);
    } catch (error) {
      console.error("Error decoding new token:", error);
      setIsAdmin(false); // Default to not admin if token is bad
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  return { token, user, isAdmin, login, logout };
};

export default useAuth;
