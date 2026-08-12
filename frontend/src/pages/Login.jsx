import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./css/Login.css";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // ========================================
  // LOGIN
  // ========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // Validation

    if (!email || !password) {

      setError(
        "Email and password are required."
      );

      return;
    }


    try {

      setLoading(true);


      await login(
        email.trim().toLowerCase(),
        password
      );


      // Login successful

      navigate("/");


    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <main className="login-page">

      <div className="login-card">


        {/* HEADER */}

        <div className="login-header">

          <p className="login-label">
            WELCOME BACK
          </p>

          <h1>
            Login
          </h1>

          <p>
            Login to continue to DriveSphere.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}


        {/* FORM */}

        <form onSubmit={handleSubmit}>


          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="login-email">
              Email
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              autoComplete="email"
            />

          </div>


          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"
            }

          </button>

        </form>


        {/* REGISTER */}

        <p className="register-link">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </p>

      </div>

    </main>
  );
}


export default Login;