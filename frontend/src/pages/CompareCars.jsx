import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../services/carService";
import compareRules from "../utils/carCompareRules.js";
import {
  getNestedValue,
  compareValues,
} from "../utils/compareHelper";
import "./css/CompareCar.css";

function Compare() {

  // ==========================================
  // GET CAR IDS FROM URL
  // ==========================================
  const { car1: car1Id, car2: car2Id } = useParams();

  // ==========================================
  // STATE
  // ==========================================
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH CARS
  // ==========================================
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError("");

        // Check IDs
        if (!car1Id || !car2Id) {
          setError("Two cars are required for comparison.");
          return;
        }

        // Fetch both cars at the same time
        const [result1, result2] = await Promise.all([
          getCarById(car1Id),
          getCarById(car2Id),
        ]);

        // Save cars
        setCar1(result1.data);
        setCar2(result2.data);
      } catch (error) {
        console.error(
          "Failed to load comparison cars:",
          error
        );
        setError("Unable to load cars for comparison.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [car1Id, car2Id]);

  // ==========================================
  // FORMAT VALUE
  // ==========================================
  const formatValue = (value, rule) => {

    // Missing value
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return "—";
    }

    // Zero
    if (value === 0) {
      return "N/A";
    }

    // Price
    if (rule.unit === "₹") {
      return `₹${Number(value).toLocaleString("en-IN")}`;
    }

    // Normal value
    return `${value} ${rule.unit}`.trim();
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <main className="compare-page">
        <div className="compare-container">
          <div className="compare-state">
            <p>
              Loading comparison...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <main className="compare-page">
        <div className="compare-container">
          <div className="compare-state error">
            <p>
              {error}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // CARS NOT FOUND
  // =========================================
  if (!car1 || !car2) {
    return (
      <main className="compare-page">
        <div className="compare-container">
          <div className="compare-state">
            <p>
              Cars not found.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <main className="compare-page">
      <div className="compare-container">

        {/* ======================================
            HEADER
            ====================================== */}
        <div className="compare-header">
          <p className="compare-label">
            DRIVE SPHERE
          </p>
          <h1>
            Compare Cars
          </h1>
          <p className="compare-description">
            Compare two cars side by side and
            find the one that fits you best.
          </p>
        </div>

        {/* ======================================
            COMPARISON TABLE
            ====================================== */}
        <div className="compare-table">

          {/* ====================================
              CAR HEADER
              ==================================== */}
          <div className="compare-row compare-car-header">

            {/* FEATURE COLUMN */}
            <div className="compare-feature">
              Specifications
            </div>

            {/* CAR 1 */}
            <div className="compare-car">
              <div className="compare-car-image">
                {car1.images?.thumbnail ? (
                  <img
                    src={car1.images.thumbnail}
                    alt={`${car1.brand} ${car1.model}`}
                  />
                ) : (
                  <span>
                    No Image
                  </span>
                )}
              </div>

              <p className="compare-car-brand">
                {car1.brand}
              </p>

              <h2>
                {car1.model}
              </h2>

              {car1.variant && (
                <p className="compare-car-variant">
                  {car1.variant}
                </p>
              )}

              <p className="compare-car-price">
                ₹
                {Number(car1.price).toLocaleString("en-IN")}
              </p>
            </div>

            {/* CAR 2 */}
            <div className="compare-car">
              <div className="compare-car-image">
                {car2.images?.thumbnail ? (
                  <img
                    src={car2.images.thumbnail}
                    alt={`${car2.brand} ${car2.model}`}
                  />
                ) : (
                  <span>
                    No Image
                  </span>
                )}
              </div>

              <p className="compare-car-brand">
                {car2.brand}
              </p>

              <h2>
                {car2.model}
              </h2>

              {car2.variant && (
                <p className="compare-car-variant">
                  {car2.variant}
                </p>
              )}

              <p className="compare-car-price">
                ₹
                {Number(car2.price).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* ====================================
              COMPARISON ROWS
              ==================================== */}
          {Object.entries(compareRules).map(
            ([key, rule]) => {
              // Get value
              const value1 =
                getNestedValue(car1, key);
              const value2 =
                getNestedValue(car2, key);

              // Compare
              const result =
                compareValues(
                  value1,
                  value2,
                  rule.direction
                );

              return (
                <div
                  className="compare-row"
                  key={key}
                >

                  {/* ==========================
                      SPECIFICATION NAME
                      ========================== */}
                  <div className="compare-feature">
                    {rule.label}
                  </div>

                  {/* ==========================
                      CAR 1 VALUE
                      ========================== */}
                  <div
                    className={
                      result === "first"
                        ? "comparison-value winner"
                        : "comparison-value"
                    }
                  >
                    <span>
                      {formatValue(
                        value1,
                        rule
                      )}
                    </span>

                    {result === "first" && (
                      <span className="winner-badge">
                        Better
                      </span>

                    )}
                  </div>

                  {/* ==========================
                      CAR 2 VALUE
                      ========================== */}
                  <div
                    className={
                      result === "second"
                        ? "comparison-value winner"
                        : "comparison-value"
                    }
                  >
                    <span>
                      {formatValue(
                        value2,
                        rule
                      )}
                    </span>

                    {result === "second" && (
                      <span className="winner-badge">
                        Better
                      </span>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </main>
  );
}

export default Compare;