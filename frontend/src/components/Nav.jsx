import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./css/Nav.css";

function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    isLoggedIn,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
        >
          DriveSphere
        </Link>

        {/* NAVIGATION */}
        <div className="navbar-links">

          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/cars">
            Cars
          </NavLink>

          <NavLink to="/wishlist">
            Wishlist
          </NavLink>

          <NavLink to="/compare">
            Compare
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          {/* ================= AUTH ================= */}

          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                Login
              </NavLink>

              <NavLink to="/register">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile">
                {user?.name || "Account"}
              </NavLink>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
