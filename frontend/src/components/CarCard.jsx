import React from "react";
import { Link } from "react-router-dom";

import { useCompare } from "../context/CompareContext";
import { useWishlist } from "../context/WishlistContext";

import "./css/CarCard.css";

function CarCard({ car }) {
  // ==============================
  // COMPARE
  // ==============================

  const {
    compareCars,
    addToCompare,
    removeFromCompare,
  } = useCompare();

  // Check if this car is already compared
  const isCompared = compareCars.some(
    (item) => item._id === car._id
  );

  // Maximum 2 cars can be compared
  const compareLimitReached =
    compareCars.length >= 2;

  // Handle compare button
  const handleCompare = () => {
    // If already compared → remove
    if (isCompared) {
      removeFromCompare(car._id);
      return;
    }

    // Don't allow third car
    if (compareLimitReached) {
      return;
    }

    // Add car to compare
    addToCompare(car);
  };


  // ==============================
  // WISHLIST
  // ==============================

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  // Check if car is already in wishlist
  const isWishlisted = isInWishlist(car._id);

  // Handle heart click
  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(car._id);
    } else {
      addToWishlist(car);
    }
  };


  // ==============================
  // UI
  // ==============================

  return (
    <article className="car-card">

      {/* ==============================
          CAR IMAGE
      ============================== */}

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


        {/* ==============================
            WISHLIST HEART
        ============================== */}

        <button
          type="button"
          className={`wishlist-heart ${
            isWishlisted ? "active" : ""
          }`}
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

      </div>


      {/* ==============================
          CAR INFORMATION
      ============================== */}

      <div className="car-info">

        {/* BRAND */}

        <p className="car-brand">
          {car.brand}
        </p>


        {/* MODEL */}

        <h3 className="car-model">
          {car.model}
        </h3>


        {/* VARIANT */}

        {car.variant && (
          <p className="car-variant">
            {car.variant}
          </p>
        )}


        {/* PRICE */}

        <p className="car-price">
          ₹{Number(car.price).toLocaleString("en-IN")}
        </p>


        {/* ==============================
            SPECIFICATIONS
        ============================== */}

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


        {/* ==============================
            VIEW DETAILS
        ============================== */}

        <Link
          to={`/cars/${car._id}`}
          className="car-details-btn"
        >
          View Details
        </Link>


        {/* ==============================
            COMPARE BUTTON
        ============================== */}

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