import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./css/Unauthorized.css";

function Unauthorized() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <main className="unauthorized-page">

      <section className="unauthorized-content">

        <div className="unauthorized-icon">
          🔒
        </div>

        <p className="unauthorized-label">
          ACCESS RESTRICTED
        </p>

        <h1>
          You can't access this road yet.
        </h1>

        <p className="unauthorized-description">
          This area is available only to authorized users.
          Please log in with an account that has permission
          to continue.
        </p>

        <div className="unauthorized-actions">

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="unauthorized-primary"
            >
              Login to Continue
            </Link>
          ) : (
            <button
              type="button"
              className="unauthorized-primary"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          )}

          <Link
            to="/cars"
            className="unauthorized-secondary"
          >
            Explore Cars
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Unauthorized;