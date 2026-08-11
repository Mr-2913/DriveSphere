import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import "./css/CompareBar.css";

function CompareBar() {
  const navigate = useNavigate();

  const {
    compareCars,
    removeFromCompare,
    clearCompare,
  } = useCompare();

  if (compareCars.length === 0) {
    return null;
  }

  const handleCompare = () => {
    if (compareCars.length !== 2) {
      return;
    }

    const car1 = compareCars[0]._id;
    const car2 = compareCars[1]._id;

    navigate(`/compare/${car1}/${car2}`);
  };

  return (
    <div className="compare-bar">

      {/* HEADER */}
      <div className="compare-bar-header">
        <div>
          <h3>Compare Cars</h3>

          <span>
            {compareCars.length}/2 cars selected
          </span>
        </div>

        <button
          type="button"
          className="compare-clear-btn"
          onClick={clearCompare}
        >
          Clear All
        </button>
      </div>


      {/* SELECTED CARS */}
      <div className="compare-selected-cars">

        {compareCars.map((car) => (

          <div
            className="compare-car-preview"
            key={car._id}
          >

            {/* IMAGE */}

            <div className="compare-car-image">

              {car.images?.thumbnail ||
              car.images?.gallery?.length > 0 ? (

                <img
                  src={
                    car.images?.thumbnail ||
                    car.images.gallery[0]
                  }
                  alt={`${car.brand} ${car.model}`}
                />

              ) : (

                <div className="compare-no-image">
                  No Image
                </div>

              )}

            </div>


            {/* DETAILS */}

            <div className="compare-car-details">

              <p className="compare-car-brand">
                {car.brand}
              </p>

              <h4>
                {car.model}
              </h4>

              {car.variant && (
                <p className="compare-car-variant">
                  {car.variant}
                </p>
              )}

              <p className="compare-car-price">
                ₹{Number(car.price).toLocaleString("en-IN")}
              </p>

            </div>


            {/* REMOVE */}

            <button
              type="button"
              className="compare-remove-btn"
              onClick={() =>
                removeFromCompare(car._id)
              }
              aria-label={`Remove ${car.brand} ${car.model}`}
            >
              ×
            </button>

          </div>

        ))}


        {/* EMPTY SLOT */}

        {compareCars.length === 1 && (

          <div className="compare-empty-slot">

            <span>+</span>

            <p>
              Select another car
            </p>

          </div>

        )}

      </div>


      {/* FOOTER */}

      <div className="compare-bar-footer">

        <p>
          Select 2 cars to compare their specifications
        </p>

        <button
          type="button"
          className="compare-now-btn"
          disabled={compareCars.length !== 2}
          onClick={handleCompare}
        >
          Compare Now →
        </button>

      </div>

    </div>
  );
}

export default CompareBar;