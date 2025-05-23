import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = UseAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { username, password } = formData;

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3004/api/login", {
        username,
        password,
      });

      const { token } = res.data;
      login(token);
      setSuccess(res.data.message || "Login successful!");
      navigate("/admin");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
      setSuccess("");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="p-6 border  card">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back </h2>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-4">
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/signup" className="link link-primary">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
