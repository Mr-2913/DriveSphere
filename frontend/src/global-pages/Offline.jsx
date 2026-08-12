import { Link } from "react-router-dom";

import "./css/Offline.css";

function Offline() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main className="offline-page">

      <section className="offline-content">

        <div className="offline-icon">
          ⌁
        </div>

        <p className="offline-label">
          CONNECTION LOST
        </p>

        <h1>
          You're off the road.
        </h1>

        <p className="offline-description">
          We couldn't connect to DriveSphere right now.
          Check your internet connection and try again.
        </p>

        <div className="offline-actions">

          <button
            type="button"
            className="offline-primary"
            onClick={handleRetry}
          >
            Try Again
          </button>

          <Link
            to="/"
            className="offline-secondary"
          >
            Back to Home
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Offline;