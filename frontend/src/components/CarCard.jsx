import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import "./css/CarCard.css";

function CarCard({ car }) {
  const {
    compareCars,
    addToCompare,
    removeFromCompare,
  } = useCompare();

  // Check whether this car is already selected
  const isCompared = compareCars.some(
    (item) => item._id === car._id
  );

  // Check whether 2 cars are already selected
  const compareLimitReached =
    compareCars.length >= 2;

  const handleCompare = () => {
    // If already selected → remove
    if (isCompared) {
      removeFromCompare(car._id);
      return;
    }

    // Don't allow third car
    if (compareLimitReached) {
      return;
    }

    // Add car
    addToCompare(car);
  };

  return (
    <article className="car-card">
      {/* ================= IMAGE ================= */}
      <div className="car-image">
        {car.images?.gallery?.length > 0 ? (
          <img
            src={car.images.gallery[0]}
            alt={`${car.brand} ${car.model}`}
          />
        ) : (
          <div className="no-image">
            No Images Available
          </div>
        )}
      </div>

      {/* ================= INFORMATION ================= */}
      <div className="car-info">
        <p className="car-brand">
          {car.brand}
        </p>

        <h3 className="car-model">
          {car.model}
        </h3>

        {car.variant && (
          <p className="car-variant">
            {car.variant}
          </p>
        )}

        <p className="car-price">
          ₹
          {Number(car.price).toLocaleString("en-IN")}
        </p>

        {/* ================= SPECIFICATIONS ================= */}
        <div className="car-specifications">
          <span>
            {car.fuelType}
          </span>

          <span>
            {car.transmission}
          </span>
          <span>
            {car.seatingCapacity} Seats
          </span>
        </div>

        {/* ================= VIEW DETAILS ================= */}
        <Link
          to={`/cars/${car._id}`}
          className="car-details-btn"
        >
          View Details
        </Link>

        {/* ================= COMPARE ================= */}
        <button
          type="button"
          className={
            isCompared
              ? "compare-btn compared"
              : "compare-btn"
          }
          onClick={handleCompare}
          disabled={
            compareLimitReached && !isCompared
          }
        >
          {isCompared
            ? "✓ Added to Compare"
            : compareLimitReached
              ? "Compare Limit Reached"
              : "⚖ Add to Compare"
          }
        </button>
      </div>
    </article>
  );
}

export default CarCard;