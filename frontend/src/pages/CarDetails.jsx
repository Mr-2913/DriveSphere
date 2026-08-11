import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCarById } from "../services/carService";
import "./css/CarDetails.css";

function CarDetails() {

  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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


  if (loading) {
    return (
      <section className="car-details-state">
        <p>Loading car details...</p>
      </section>
    );
  }


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


  if (!car) {
    return (
      <section className="car-details-state">
        <p>Car not found.</p>
      </section>
    );
  }


  const image =
    car.images?.gallery?.length > 0
      ? car.images.gallery[0]
      : null;


  return (
    <main className="car-details-page">

      <Link
        to="/cars"
        className="back-to-cars"
      >
        ← Back to Cars
      </Link>


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


        {/* INFORMATION */}

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
            ₹{car.price.toLocaleString("en-IN")}
          </p>


          <div className="details-specifications">

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


          <div className="details-actions">

            <button>
              ♡ Add to Wishlist
            </button>

            <button>
              Compare
            </button>

          </div>

        </div>

      </section>


      {/* SPECIFICATIONS */}

      <section className="car-specifications-section">

        <h2>
          Specifications
        </h2>


        <div className="specifications-grid">

          <div>
            <span>Brand</span>
            <strong>{car.brand}</strong>
          </div>

          <div>
            <span>Model</span>
            <strong>{car.model}</strong>
          </div>

          <div>
            <span>Year</span>
            <strong>{car.year}</strong>
          </div>

          <div>
            <span>Fuel Type</span>
            <strong>{car.fuelType}</strong>
          </div>

          <div>
            <span>Transmission</span>
            <strong>{car.transmission}</strong>
          </div>

          <div>
            <span>Seating Capacity</span>
            <strong>{car.seatingCapacity}</strong>
          </div>

        </div>

      </section>

    </main>
  );
}

export default CarDetails;