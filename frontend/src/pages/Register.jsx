import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "./css/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ========================================
  // REGISTER
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const {
      name,
      username,
      email,
      password,
    } = formData;

    // Validation
    if (!name || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3100/api/users/register",
        {
          name: name.trim(),
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password,
        }
      );

      console.log("Registration successful:", response.data);

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error("Registration error:", error);

      console.error(
        "Backend response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to create account."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">

      <div className="register-card">

        {/* HEADER */}

        <div className="register-header">

          <p className="register-label">
            JOIN DRIVESPHERE
          </p>

          <h1>
            Create Account
          </h1>

          <p>
            Create your account and start
            exploring cars.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="register-error">
            {error}
          </div>
        )}


        {/* SUCCESS */}

        {success && (
          <div className="register-success">
            {success}
          </div>
        )}


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
            />

          </div>


          {/* USERNAME */}

          <div className="form-group">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              autoComplete="username"
            />

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />

          </div>


          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"
            }
          </button>

        </form>


        {/* LOGIN */}

        <p className="login-link">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </main>
  );
}

export default Register;