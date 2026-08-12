import { Link } from "react-router-dom";

import "./css/About.css";

function About() {
  return (
    <main className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero">

        <p className="about-label">
          ABOUT DRIVESPERE
        </p>

        <h1>
          Discover. Compare. Drive.
        </h1>

        <p className="about-hero-text">
          DriveSphere is a modern car discovery platform designed
          to make finding, comparing, and exploring cars simple.
        </p>

      </section>


      {/* ================= ABOUT ================= */}

      <section className="about-section">

        <div className="about-section-heading">

          <p className="about-label">
            OUR PLATFORM
          </p>

          <h2>
            Everything you need to explore your next car.
          </h2>

        </div>


        <div className="about-content">

          <div className="about-text">

            <p>
              DriveSphere brings car information, specifications,
              comparisons, and personal car collections together
              in one place.
            </p>

            <p>
              Instead of searching through multiple websites,
              users can explore different cars, view detailed
              specifications, compare two cars, and save their
              favorite vehicles.
            </p>

            <p>
              The platform is designed with a simple goal:
              make car discovery easier and more enjoyable.
            </p>

          </div>


          <div className="about-highlight">

            <div>
              <strong>40+</strong>
              <span>Cars</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Car Comparison</span>
            </div>

            <div>
              <strong>1</strong>
              <span>Platform</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="about-features">

        <div className="about-section-heading">

          <p className="about-label">
            WHAT YOU CAN DO
          </p>

          <h2>
            Built around your car discovery journey.
          </h2>

        </div>


        <div className="about-feature-grid">

          <article className="about-feature-card">

            <span className="about-feature-icon">
              🔍
            </span>

            <h3>
              Discover Cars
            </h3>

            <p>
              Explore cars from different brands and filter
              them according to your requirements.
            </p>

          </article>


          <article className="about-feature-card">

            <span className="about-feature-icon">
              ⚖
            </span>

            <h3>
              Compare Cars
            </h3>

            <p>
              Compare two cars and understand their important
              specifications side by side.
            </p>

          </article>


          <article className="about-feature-card">

            <span className="about-feature-icon">
              ♡
            </span>

            <h3>
              Save Favorites
            </h3>

            <p>
              Add cars to your wishlist and easily access them
              whenever you want.
            </p>

          </article>


          <article className="about-feature-card">

            <span className="about-feature-icon">
              📋
            </span>

            <h3>
              Detailed Information
            </h3>

            <p>
              View engine, dimensions, safety, features,
              pricing, and other important car information.
            </p>

          </article>

        </div>

      </section>


      {/* ================= TECHNOLOGY ================= */}

      <section className="about-technology">

        <div>

          <p className="about-label">
            TECHNOLOGY
          </p>

          <h2>
            Built with modern web technologies.
          </h2>

          <p>
            DriveSphere uses a full-stack architecture designed
            to provide a responsive and scalable web experience.
          </p>

        </div>


        <div className="technology-list">

          <span>React.js</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>JavaScript</span>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <p className="about-label">
          READY TO EXPLORE?
        </p>

        <h2>
          Find your next car.
        </h2>

        <p>
          Explore the DriveSphere collection and start
          comparing cars today.
        </p>

        <Link
          to="/cars"
          className="about-cta-button"
        >
          Explore Cars →
        </Link>

      </section>

    </main>
  );
}

export default About;