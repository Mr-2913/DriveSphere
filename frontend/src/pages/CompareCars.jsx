import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import {
  getNestedValue,
  compareValue,
} from "../utils/compareUtils";
import "./css/CompareCar.css";

function CompareCars() {
  const navigate = useNavigate();

  const {
    compareCars,
    removeFromCompare,
  } = useCompare();

  const car1 = compareCars[0];
  const car2 = compareCars[1];

  // --------------------------------
  // ADD CAR
  // --------------------------------

  const handleAddCar = () => {
    navigate("/cars");
  };

  // --------------------------------
  // FORMAT VALUE
  // --------------------------------

  const formatValue = (value, unit = "") => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return "—";
    }

    return `${value}${unit}`;
  };

  // --------------------------------
  // FORMAT PRICE
  // --------------------------------

  const formatPrice = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return "—";
    }

    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  // --------------------------------
  // GET COMPARISON RESULT
  // --------------------------------

  const getResult = (path, direction) => {
    if (!car1 || !car2) {
      return "none";
    }

    const value1 = getNestedValue(car1, path);
    const value2 = getNestedValue(car2, path);

    return compareValue(
      value1,
      value2,
      direction
    );
  };

  // --------------------------------
  // SPECIFICATION ROW
  // --------------------------------

  const SpecificationRow = ({
    label,
    path,
    unit = "",
    direction = null,
    formatter = null,
  }) => {
    const value1 = car1
      ? getNestedValue(car1, path)
      : null;

    const value2 = car2
      ? getNestedValue(car2, path)
      : null;

    const result = direction
      ? getResult(path, direction)
      : "none";

    const display1 = formatter
      ? formatter(value1)
      : formatValue(value1, unit);

    const display2 = formatter
      ? formatter(value2)
      : formatValue(value2, unit);

    return (
      <div className="comparison-row">

        <div className="comparison-value">
          <span
            className={
              result === "first"
                ? "winner"
                : ""
            }
          >
            {display1}

            {result === "first" && (
              <span className="winner-badge">
                Better
              </span>
            )}
          </span>
        </div>

        <div className="comparison-label">
          {label}
        </div>

        <div className="comparison-value">
          <span
            className={
              result === "second"
                ? "winner"
                : ""
            }
          >
            {display2}

            {result === "second" && (
              <span className="winner-badge">
                Better
              </span>
            )}
          </span>
        </div>

      </div>
    );
  };

  // --------------------------------
  // BOOLEAN ROW
  // --------------------------------

  const BooleanRow = ({
    label,
    path,
  }) => {
    const value1 = car1
      ? getNestedValue(car1, path)
      : false;

    const value2 = car2
      ? getNestedValue(car2, path)
      : false;

    return (
      <div className="comparison-row">

        <div className="comparison-value boolean-value">
          {value1 ? (
            <span className="available">✓</span>
          ) : (
            <span className="not-available">✕</span>
          )}
        </div>

        <div className="comparison-label">
          {label}
        </div>

        <div className="comparison-value boolean-value">
          {value2 ? (
            <span className="available">✓</span>
          ) : (
            <span className="not-available">✕</span>
          )}
        </div>

      </div>
    );
  };

  // --------------------------------
  // RENDER
  // --------------------------------

  return (
    <section className="compare-page">

      {/* HEADER */}

      <div className="compare-header">
        <h1>Compare Cars</h1>

        <p>
          Compare performance, safety,
          features and specifications.
        </p>
      </div>


      {/* ==================================
          CAR HEADER
      ================================== */}

      <div className="comparison-cars">

        {/* CAR 1 */}

        <div className="comparison-car">

          {car1 ? (
            <>
              <div className="comparison-car-image">

                {car1.images?.gallery?.length > 0 ? (
                  <img
                    src={car1.images.gallery[0]}
                    alt={`${car1.brand} ${car1.model}`}
                  />
                ) : (
                  <div className="no-image">
                    No Image
                  </div>
                )}

              </div>

              <p className="comparison-brand">
                {car1.brand}
              </p>

              <h2>
                {car1.model}
              </h2>

              {car1.variant && (
                <p className="comparison-variant">
                  {car1.variant}
                </p>
              )}

              <p className="comparison-price">
                {formatPrice(car1.price)}
              </p>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCompare(car1._id)
                }
              >
                Remove
              </button>
            </>
          ) : (
            <button
              className="add-car-box"
              onClick={handleAddCar}
            >
              <span>+</span>
              <strong>Add Car</strong>
              <small>Select a car</small>
            </button>
          )}

        </div>


        {/* VS */}

        <div className="vs-circle">
          VS
        </div>


        {/* CAR 2 */}

        <div className="comparison-car">

          {car2 ? (
            <>
              <div className="comparison-car-image">

                {car2.images?.gallery?.length > 0 ? (
                  <img
                    src={car2.images.gallery[0]}
                    alt={`${car2.brand} ${car2.model}`}
                  />
                ) : (
                  <div className="no-image">
                    No Image
                  </div>
                )}

              </div>

              <p className="comparison-brand">
                {car2.brand}
              </p>

              <h2>
                {car2.model}
              </h2>

              {car2.variant && (
                <p className="comparison-variant">
                  {car2.variant}
                </p>
              )}

              <p className="comparison-price">
                {formatPrice(car2.price)}
              </p>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCompare(car2._id)
                }
              >
                Remove
              </button>
            </>
          ) : (
            <button
              className="add-car-box"
              onClick={handleAddCar}
            >
              <span>+</span>
              <strong>Add Car</strong>
              <small>Select a car</small>
            </button>
          )}

        </div>

      </div>


      {/* ==================================
          COMPARISON TABLE
      ================================== */}

      {car1 && car2 && (

        <div className="comparison-container">

          {/* BASIC */}

          <div className="comparison-section">

            <h2>Basic Information</h2>

            <SpecificationRow
              label="Price"
              path="price"
              direction="lower"
              formatter={formatPrice}
            />

            <SpecificationRow
              label="Year"
              path="year"
              direction="higher"
              unit=""
            />

            <SpecificationRow
              label="Fuel Type"
              path="fuelType"
            />

            <SpecificationRow
              label="Transmission"
              path="transmission"
            />

            <SpecificationRow
              label="Body Type"
              path="bodyType"
            />

            <SpecificationRow
              label="Seating Capacity"
              path="seatingCapacity"
              direction="higher"
              unit=" seats"
            />

          </div>


          {/* ENGINE */}

          <div className="comparison-section">

            <h2>Engine & Performance</h2>

            <SpecificationRow
              label="Engine"
              path="engine.cc"
              direction="higher"
              unit=" cc"
            />

            <SpecificationRow
              label="Horsepower"
              path="engine.horsepower"
              direction="higher"
              unit=" HP"
            />

            <SpecificationRow
              label="Torque"
              path="engine.torque"
              direction="higher"
              unit=" Nm"
            />

            <SpecificationRow
              label="Mileage"
              path="engine.mileage"
              direction="higher"
              unit=" km/l"
            />

            <SpecificationRow
              label="Top Speed"
              path="engine.topSpeed"
              direction="higher"
              unit=" km/h"
            />

          </div>


          {/* DIMENSIONS */}

          <div className="comparison-section">

            <h2>Dimensions</h2>

            <SpecificationRow
              label="Length"
              path="dimensions.length"
              direction="higher"
              unit=" mm"
            />

            <SpecificationRow
              label="Width"
              path="dimensions.width"
              direction="higher"
              unit=" mm"
            />

            <SpecificationRow
              label="Height"
              path="dimensions.height"
              direction="higher"
              unit=" mm"
            />

            <SpecificationRow
              label="Wheelbase"
              path="dimensions.wheelbase"
              direction="higher"
              unit=" mm"
            />

            <SpecificationRow
              label="Ground Clearance"
              path="dimensions.groundClearance"
              direction="higher"
              unit=" mm"
            />

            <SpecificationRow
              label="Boot Space"
              path="dimensions.bootSpace"
              direction="higher"
              unit=" L"
            />

          </div>


          {/* SAFETY */}

          <div className="comparison-section">

            <h2>Safety</h2>

            <SpecificationRow
              label="Airbags"
              path="safety.airbags"
              direction="higher"
            />

            <BooleanRow
              label="ABS"
              path="safety.abs"
            />

            <BooleanRow
              label="ESP"
              path="safety.esp"
            />

            <BooleanRow
              label="Hill Assist"
              path="safety.hillAssist"
            />

            <BooleanRow
              label="Traction Control"
              path="safety.tractionControl"
            />

            <SpecificationRow
              label="NCAP Rating"
              path="safety.ncapRating"
              direction="higher"
              unit=" ★"
            />

          </div>


          {/* FEATURES */}

          <div className="comparison-section">

            <h2>Features</h2>

            <BooleanRow
              label="Sunroof"
              path="features.sunroof"
            />

            <BooleanRow
              label="Touchscreen"
              path="features.touchscreen"
            />

            <BooleanRow
              label="ADAS"
              path="features.adas"
            />

            <BooleanRow
              label="Cruise Control"
              path="features.cruiseControl"
            />

            <BooleanRow
              label="Wireless Charging"
              path="features.wirelessCharging"
            />

            <BooleanRow
              label="Ventilated Seats"
              path="features.ventilatedSeats"
            />

            <BooleanRow
              label="Panoramic Sunroof"
              path="features.panoramicSunroof"
            />

          </div>

        </div>

      )}

    </section>
  );
}

export default CompareCars;