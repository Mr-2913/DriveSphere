import { Link } from "react-router-dom";

import "./css/NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">

      <div className="not-found-content">

        {/* NUMBER */}
        <div className="not-found-number">
          404
        </div>

        {/* TITLE */}
        <h1>
          Road Not Found
        </h1>

        {/* DESCRIPTION */}
        <p>
          Looks like you've taken a wrong turn.
          The page you're looking for doesn't exist
          or may have been moved.
        </p>

        {/* ACTIONS */}
        <div className="not-found-actions">

          <Link
            to="/"
            className="not-found-primary"
          >
            ← Back to Home
          </Link>

          <Link
            to="/cars"
            className="not-found-secondary"
          >
            Explore Cars
          </Link>

        </div>

      </div>

    </main>
  );
}

export default NotFound;