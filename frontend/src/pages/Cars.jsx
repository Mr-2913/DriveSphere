import { useEffect, useState } from "react";
import Loading from "../global-pages/Loading";
import CarCard from "../components/CarCard";
import { getAllCars } from "../services/carService";

import "./css/Cars.css";

function Cars() {
  // ========================================
  // CARS
  // ========================================

  const [cars, setCars] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ========================================
  // SEARCH
  // ========================================

  const [search, setSearch] = useState("");

  // ========================================
  // FILTER PANEL
  // ========================================

  const [showFilters, setShowFilters] = useState(false);

// pagination
    const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);
  // ========================================
  // FILTER VALUES
  // ========================================

  const [filters, setFilters] = useState({
    brand: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
    minPrice: "",
    maxPrice: "",
    year: "",
    sort: "",
  });

  // ========================================
  // FETCH CARS
  // ========================================

  const fetchCars = async (currentFilters = filters) => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCars({
        search,
        ...currentFilters,
      });

      setCars(response.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch cars:",
        error.response?.data || error.message,
      );

      setError("Unable to load cars.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    fetchCars();
  }, []);

  // ========================================
  // FILTER CHANGE
  // ========================================

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================
  // APPLY FILTERS
  // ========================================

  const handleApplyFilters = () => {
    fetchCars(filters);
  };

  // ========================================
  // CLEAR FILTERS
  // ========================================

  const handleClearFilters = () => {
    const emptyFilters = {
      brand: "",
      fuelType: "",
      transmission: "",
      bodyType: "",
      minPrice: "",
      maxPrice: "",
      year: "",
      sort: "",
    };

    setFilters(emptyFilters);

    fetchCars(emptyFilters);
  };

  // ========================================
  // SEARCH
  // ========================================

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchCars(filters);
  };

  if (loading) {
  return (
    
    <Loading message="Loading cars..." />
  );
}

// =================================================
  // NEXT PAGE
  // =================================================

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // =================================================
  // PREVIOUS PAGE
  // =================================================

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  // ========================================
  // UI
  // ========================================

  return (
    <main className="cars-page">
      {/* ========================================
          HEADER
      ======================================== */}

      <section className="cars-header">
        <div>
          <p className="cars-label">EXPLORE</p>

          <h1>Find Your Perfect Car</h1>

          <p className="cars-subtitle">
            Discover, compare and choose from our collection of cars.
          </p>
        </div>
      </section>

      {/* ========================================
          SEARCH + FILTER BAR
      ======================================== */}

      <section className="cars-toolbar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            placeholder="Search by brand, model or variant..."
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => {
                setSearch("");
                fetchCars(filters);
              }}
            >
              ×
            </button>
          )}
        </div>

        <button
          type="button"
          className={`filter-toggle ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters((previous) => !previous)}
        >
          <span>⚙</span>
          Filters
          <span className={`filter-arrow ${showFilters ? "rotate" : ""}`}>
            ▼
          </span>
        </button>
      </section>

      {/* ========================================
          FILTER PANEL
      ======================================== */}

      <section
        className={`filters-container ${showFilters ? "filters-open" : ""}`}
      >
        <div className="filters-inner">
          <div className="filter-grid">
            {/* BRAND */}

            <div className="filter-group">
              <label>Brand</label>

              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
              >
                <option value="">All Brands</option>

                <option value="Toyota">Toyota</option>

                <option value="BMW">BMW</option>

                <option value="Mercedes">Mercedes</option>

                <option value="Honda">Honda</option>

                <option value="Tata">Tata</option>

                <option value="Maruti Suzuki">Maruti Suzuki</option>

                <option value="Hyundai">Hyundai</option>

                <option value="Mahindra">Mahindra</option>

                <option value="Volkswagen">Volkswagen</option>

                <option value="Skoda">Skoda</option>
              </select>
            </div>

            {/* BODY TYPE */}

            <div className="filter-group">
              <label>Body Type</label>

              <select
                name="bodyType"
                value={filters.bodyType}
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>

                <option value="SUV">SUV</option>

                <option value="Sedan">Sedan</option>

                <option value="Hatchback">Hatchback</option>

                <option value="MUV">MUV</option>
              </select>
            </div>

            {/* FUEL */}

            <div className="filter-group">
              <label>Fuel Type</label>

              <select
                name="fuelType"
                value={filters.fuelType}
                onChange={handleFilterChange}
              >
                <option value="">All Fuel</option>

                <option value="Petrol">Petrol</option>

                <option value="Diesel">Diesel</option>

                <option value="Electric">Electric</option>

                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* TRANSMISSION */}

            <div className="filter-group">
              <label>Transmission</label>

              <select
                name="transmission"
                value={filters.transmission}
                onChange={handleFilterChange}
              >
                <option value="">All</option>

                <option value="Automatic">Automatic</option>

                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* MIN PRICE */}

            <div className="filter-group">
              <label>Minimum Price</label>

              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="₹ Minimum"
              />
            </div>

            {/* MAX PRICE */}

            <div className="filter-group">
              <label>Maximum Price</label>

              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="₹ Maximum"
              />
            </div>

            {/* YEAR */}

            <div className="filter-group">
              <label>Year</label>

              <select
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
              >
                <option value="">All Years</option>

                <option value="2026">2026</option>

                <option value="2025">2025</option>

                <option value="2024">2024</option>

                <option value="2023">2023</option>

                <option value="2022">2022</option>
              </select>
            </div>

            {/* SORT */}

            <div className="filter-group">
              <label>Sort By</label>

              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
              >
                <option value="">Default</option>

                <option value="priceLow">Price: Low to High</option>

                <option value="priceHigh">Price: High to Low</option>

                <option value="yearNew">Newest First</option>

                <option value="yearOld">Oldest First</option>
              </select>
            </div>
          </div>

          {/* FILTER ACTIONS */}

          <div className="filter-actions">
            <button
              type="button"
              className="clear-filters-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>

            <button
              type="button"
              className="apply-filters-btn"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      <br />
      {/* ========================================
          RESULT HEADER
      ======================================== */}

      <section className="cars-result-header">
        <div>
          <h2>Cars</h2>

          {!loading && <p>{cars.length} cars found</p>}
        </div>
      </section>
      <br />

      {/* ========================================
          ERROR
      ======================================== */}

      {error && <div className="cars-error">{error}</div>}

      {/* ========================================
          LOADING
      ======================================== */}

      {loading ? (
        <div className="cars-state">
          <div className="loading-spinner"></div>
          <p>Finding cars...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="cars-state">
          <div className="empty-icon">🚗</div>

          <h3>No cars found</h3>

          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        /* ========================================
           CAR GRID
        ======================================== */

        <section className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </section>
      )}

            {!loading && !error && cars.length > 0 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </main>
  );
}

export default Cars;
