import { Link } from "react-router-dom";

import "./css/ServerError.css";

function ServerError() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main className="server-error-page">

      <section className="server-error-content">

        <div className="server-error-number">
          500
        </div>

        <p className="server-error-label">
          SERVER ERROR
        </p>

        <h1>
          Something went wrong.
        </h1>

        <p className="server-error-description">
          We couldn't complete your request right now.
          Please try again or return to DriveSphere and
          continue exploring.
        </p>

        <div className="server-error-actions">

          <button
            type="button"
            className="server-error-primary"
            onClick={handleRefresh}
          >
            Try Again
          </button>

          <Link
            to="/"
            className="server-error-secondary"
          >
            Back to Home
          </Link>

        </div>

      </section>

    </main>
  );
}

export default ServerError;