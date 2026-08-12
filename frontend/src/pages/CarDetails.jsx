import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getCarById } from "../services/carService";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";

import "./css/CarDetails.css";

function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    compareCars,
    addToCompare,
    removeFromCompare,
  } = useCompare();

  /* =====================================================
     FETCH CAR
  ===================================================== */

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getCarById(id);

        setCar(result.data);
      } catch (error) {
        console.error("Failed to fetch car:", error);

        setError("Unable to load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="car-details-state">
        <p>Loading car details...</p>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <section className="car-details-state">
        <p>{error}</p>

        <Link to="/cars">
          Back to Cars
        </Link>
      </section>
    );
  }

  /* =====================================================
     CAR NOT FOUND
  ===================================================== */

  if (!car) {
    return (
      <section className="car-details-state">
        <p>Car not found.</p>

        <Link to="/cars">
          Back to Cars
        </Link>
      </section>
    );
  }

  /* =====================================================
     IMAGE
  ===================================================== */

  const image =
    car.images?.gallery?.length > 0
      ? car.images.gallery[0]
      : null;

  /* =====================================================
     WISHLIST
  ===================================================== */

  const isWishlisted = isInWishlist(car._id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(car._id);
    } else {
      addToWishlist(car);
    }
  };

  /* =====================================================
     COMPARE
  ===================================================== */

  const isCompared = compareCars.some(
    (item) => item._id === car._id
  );

  const compareLimitReached =
    compareCars.length >= 2;

  const handleCompare = () => {
    if (isCompared) {
      removeFromCompare(car._id);
      return;
    }

    if (compareLimitReached) {
      return;
    }

    addToCompare(car);
  };

  /* =====================================================
     BOOLEAN DISPLAY
  ===================================================== */

  const showYesNo = (value) => {
    return value ? (
      <span className="detail-status yes">
        Yes
      </span>
    ) : (
      <span className="detail-status no">
        No
      </span>
    );
  };

  return (
    <main className="car-details-page">

      {/* =================================================
          BACK
      ================================================= */}

      <Link
        to="/cars"
        className="back-to-cars"
      >
        ← Back to Cars
      </Link>


      {/* =================================================
          MAIN CAR INFORMATION
      ================================================= */}

      <section className="car-details-main">

        {/* IMAGE */}

        <div className="car-details-image">

          {image ? (
            <img
              src={image}
              alt={`${car.brand} ${car.model}`}
            />
          ) : (
            <div className="no-detail-image">
              No Image Available
            </div>
          )}

        </div>


        {/* BASIC MAIN INFO */}

        <div className="car-details-info">

          <p className="details-brand">
            {car.brand}
          </p>

          <h1>
            {car.model}
          </h1>

          {car.variant && (
            <p className="details-variant">
              {car.variant}
            </p>
          )}

          <p className="details-price">
            ₹
            {Number(car.price).toLocaleString(
              "en-IN"
            )}
          </p>


          {/* QUICK INFORMATION */}

          <div className="details-specifications">

            <span>
              {car.bodyType}
            </span>

            <span>
              {car.fuelType}
            </span>

            <span>
              {car.transmission}
            </span>

            <span>
              {car.seatingCapacity} Seats
            </span>

            <span>
              {car.year}
            </span>

          </div>


          {/* ACTIONS */}

          <div className="details-actions">

            <button
              type="button"
              onClick={handleWishlist}
            >
              {isWishlisted
                ? "♥ Added to Wishlist"
                : "♡ Add to Wishlist"}
            </button>


            <button
              type="button"
              onClick={handleCompare}
              disabled={
                compareLimitReached &&
                !isCompared
              }
            >
              {isCompared
                ? "✓ Added to Compare"
                : compareLimitReached
                ? "Compare Limit Reached"
                : "⚖ Add to Compare"}
            </button>

          </div>

        </div>

      </section>


      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <section className="car-basic-section">

        <div className="car-section-header">

          <p className="car-section-label">
            OVERVIEW
          </p>

          <h2>
            Basic Information
          </h2>

          <p>
            Everything you need to know at a glance.
          </p>

        </div>


        <div className="basic-information-grid">

          <div className="basic-information-card price-card">
            <span>Price</span>

            <strong>
              ₹
              {Number(car.price).toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>


          <div className="basic-information-card">
            <span>Brand</span>

            <strong>
              {car.brand}
            </strong>
          </div>


          <div className="basic-information-card">
            <span>Model</span>

            <strong>
              {car.model}
            </strong>
          </div>


          <div className="basic-information-card">
            <span>Variant</span>

            <strong>
              {car.variant || "N/A"}
            </strong>
          </div>


          <div className="basic-information-card">
            <span>Year</span>

            <strong>
              {car.year}
            </strong>
          </div>


          <div className="basic-information-card">
            <span>Body Type</span>

            <strong>
              {car.bodyType}
            </strong>
          </div>


          <div className="basic-information-card">
            <span>Fuel Type</span>

            <strong>
              {car.fuelType}
            </strong>
          </div>


          <div className="basic-information-card">
            <span>Transmission</span>

            <strong>
              {car.transmission}
            </strong>
          </div>


          <div className="basic-information-card">
            <span>Seating Capacity</span>

            <strong>
              {car.seatingCapacity} Seats
            </strong>
          </div>

        </div>

      </section>


      {/* =================================================
          COMPLETE DETAILS
      ================================================= */}

      <section className="car-complete-details">


        {/* =================================================
            ENGINE
        ================================================= */}

        <div className="detail-category">

          <h2 className="detail-category-title">
            Engine & Performance
          </h2>


          <div className="detail-grid">

            <div className="detail-card">
              <span>Engine</span>

              <strong>
                {car.engine?.cc
                  ? `${car.engine.cc} cc`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Horsepower</span>

              <strong>
                {car.engine?.horsepower
                  ? `${car.engine.horsepower} HP`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Torque</span>

              <strong>
                {car.engine?.torque
                  ? `${car.engine.torque} Nm`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Mileage</span>

              <strong>
                {car.engine?.mileage
                  ? `${car.engine.mileage} km/l`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Top Speed</span>

              <strong>
                {car.engine?.topSpeed
                  ? `${car.engine.topSpeed} km/h`
                  : "N/A"}
              </strong>
            </div>

          </div>

        </div>


        {/* =================================================
            DIMENSIONS
        ================================================= */}

        <div className="detail-category">

          <h2 className="detail-category-title">
            Dimensions
          </h2>


          <div className="detail-grid">

            <div className="detail-card">
              <span>Length</span>

              <strong>
                {car.dimensions?.length
                  ? `${car.dimensions.length} mm`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Width</span>

              <strong>
                {car.dimensions?.width
                  ? `${car.dimensions.width} mm`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Height</span>

              <strong>
                {car.dimensions?.height
                  ? `${car.dimensions.height} mm`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Wheelbase</span>

              <strong>
                {car.dimensions?.wheelbase
                  ? `${car.dimensions.wheelbase} mm`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Ground Clearance</span>

              <strong>
                {car.dimensions?.groundClearance
                  ? `${car.dimensions.groundClearance} mm`
                  : "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>Boot Space</span>

              <strong>
                {car.dimensions?.bootSpace
                  ? `${car.dimensions.bootSpace} L`
                  : "N/A"}
              </strong>
            </div>

          </div>

        </div>


        {/* =================================================
            SAFETY
        ================================================= */}

        <div className="detail-category">

          <h2 className="detail-category-title">
            Safety
          </h2>


          <div className="detail-grid">

            <div className="detail-card">
              <span>Airbags</span>

              <strong>
                {car.safety?.airbags ?? "N/A"}
              </strong>
            </div>


            <div className="detail-card">
              <span>ABS</span>

              {showYesNo(car.safety?.abs)}
            </div>


            <div className="detail-card">
              <span>ESP</span>

              {showYesNo(car.safety?.esp)}
            </div>


            <div className="detail-card">
              <span>Hill Assist</span>

              {showYesNo(
                car.safety?.hillAssist
              )}
            </div>


            <div className="detail-card">
              <span>Traction Control</span>

              {showYesNo(
                car.safety?.tractionControl
              )}
            </div>


            <div className="detail-card">
              <span>NCAP Rating</span>

              <strong>
                {car.safety?.ncapRating
                  ? `${car.safety.ncapRating}/5`
                  : "N/A"}
              </strong>
            </div>

          </div>

        </div>


        {/* =================================================
            FEATURES
        ================================================= */}

        <div className="detail-category">

          <h2 className="detail-category-title">
            Features
          </h2>


          <div className="detail-grid">

            <div className="detail-card">
              <span>Sunroof</span>

              {showYesNo(
                car.features?.sunroof
              )}
            </div>


            <div className="detail-card">
              <span>Touchscreen</span>

              {showYesNo(
                car.features?.touchscreen
              )}
            </div>


            <div className="detail-card">
              <span>ADAS</span>

              {showYesNo(
                car.features?.adas
              )}
            </div>


            <div className="detail-card">
              <span>Cruise Control</span>

              {showYesNo(
                car.features?.cruiseControl
              )}
            </div>


            <div className="detail-card">
              <span>Wireless Charging</span>

              {showYesNo(
                car.features?.wirelessCharging
              )}
            </div>


            <div className="detail-card">
              <span>Ventilated Seats</span>

              {showYesNo(
                car.features?.ventilatedSeats
              )}
            </div>


            <div className="detail-card">
              <span>Panoramic Sunroof</span>

              {showYesNo(
                car.features?.panoramicSunroof
              )}
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default CarDetails;