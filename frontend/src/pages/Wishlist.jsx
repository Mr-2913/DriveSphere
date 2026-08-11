import React from "react";
import "./css/Wishlist.css";

function Wishlist() {

  const wishlistCars = [
    {
      id: 1,
      brand: "Toyota",
      model: "Fortuner",
      year: 2026,
      price: 4250000,
      fuelType: "Diesel",
      transmission: "Automatic",
      seatingCapacity: 7
    },
    {
      id: 2,
      brand: "BMW",
      model: "X5",
      year: 2026,
      price: 9500000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seatingCapacity: 5
    }
  ];


  return (

    <main className="wishlist-page">

      <div className="wishlist-container">

        <div className="wishlist-header">

          <div>

            <p className="wishlist-label">
              DRIVE SPHERE
            </p>

            <h1>
              My Wishlist
            </h1>

            <p>
              Cars you've saved for later.
            </p>

          </div>


          <span className="wishlist-count">
            {wishlistCars.length} Cars
          </span>

        </div>


        {wishlistCars.length > 0 ? (

          <div className="wishlist-grid">

            {wishlistCars.map((car) => (

              <article
                className="wishlist-card"
                key={car.id}
              >

                <div className="wishlist-image">
                  No Image
                </div>


                <div className="wishlist-info">

                  <p className="wishlist-brand">
                    {car.brand}
                  </p>

                  <h2>
                    {car.model}
                  </h2>

                  <p className="wishlist-year">
                    {car.year}
                  </p>


                  <p className="wishlist-price">
                    ₹{car.price.toLocaleString("en-IN")}
                  </p>


                  <div className="wishlist-specs">

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


                  <div className="wishlist-actions">

                    <button className="wishlist-view-btn">
                      View Details
                    </button>

                    <button className="wishlist-remove-btn">
                      ♡
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              ♡
            </div>

            <h2>
              Your wishlist is empty
            </h2>

            <p>
              Save cars you're interested in
              and find them here later.
            </p>

            <button>
              Explore Cars
            </button>

          </div>

        )}

      </div>

    </main>
  );
}

export default Wishlist;