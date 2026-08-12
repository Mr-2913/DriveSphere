import React from "react";
import { Link } from "react-router-dom";

import CarCard from "../components/CarCard";
import { useWishlist } from "../context/WishlistContext";

import "./css/Wishlist.css";

function Wishlist() {
  const {
    wishlistCars,
    clearWishlist,
    loading,
  } = useWishlist();

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <main className="wishlist-page">
        <section className="wishlist-state">
          <div className="wishlist-loader"></div>

          <h2>Loading Wishlist...</h2>

          <p>
            Please wait while we load your saved cars.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="wishlist-page">

      {/* ================= HEADER ================= */}

      <div className="wishlist-header">

        <div>
          <p className="wishlist-label">
            YOUR COLLECTION
          </p>

          <h1>
            My Wishlist
          </h1>

          <p className="wishlist-count">
            {wishlistCars.length}{" "}
            {wishlistCars.length === 1
              ? "car"
              : "cars"}{" "}
            saved
          </p>
        </div>


        {/* ================= CLEAR ALL ================= */}

        {wishlistCars.length > 0 && (
          <button
            type="button"
            className="clear-wishlist-btn"
            onClick={clearWishlist}
          >
            Clear Wishlist
          </button>
        )}

      </div>


      {/* ================= EMPTY STATE ================= */}

      {wishlistCars.length === 0 && (
        <section className="wishlist-empty">

          <div className="empty-heart">
            ♡
          </div>

          <h2>
            Your wishlist is empty
          </h2>

          <p>
            Save cars you like by clicking the
            heart icon on any car.
          </p>

          <Link
            to="/cars"
            className="browse-cars-btn"
          >
            Browse Cars
          </Link>

        </section>
      )}


      {/* ================= WISHLIST CARS ================= */}

      {wishlistCars.length > 0 && (
        <section className="wishlist-content">

          <div className="wishlist-grid">

            {wishlistCars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
              />
            ))}

          </div>

        </section>
      )}

    </main>
  );
}

export default Wishlist;