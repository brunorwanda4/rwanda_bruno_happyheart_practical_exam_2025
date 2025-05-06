import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error as user types
    setSuccess("");
  };

  const validateForm = () => {
    const { username, password, confirmPassword } = formData;
    if (!username || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { username, password } = formData;

      const response = await axios.post("http://localhost:3004/api/signup", {
        username,
        password,
      });

      if (!response.data) {
        setError("some thing went wrong to create account");
      }

      setSuccess("Registration successful!");
      setError("");
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Server error occurred.";
      setError(err);
      setSuccess("");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Signup Form</h2>

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
          className="input input-bordered w-full"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered w-full"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered w-full"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Sign Up
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/" className="link link-primary">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
