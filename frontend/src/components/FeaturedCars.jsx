import { getAllCars } from "../services/carService";
import { useState, useEffect } from "react";
import CarCard from "./CarCard";
import SearchBar from "./SearchBar";
import "./css/FeaturedCars.css";

function FeaturedCars() {
  // ---------------- CAR DATA ----------------
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- SEARCH ----------------
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");

  // ---------------- FILTERS ----------------
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [year, setYear] = useState("");

  // ---------------- SORT ----------------
  const [sort, setSort] = useState("");

  // ---------------- PAGINATION ----------------
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  // =================================================
  // SEARCH DEBOUNCE
  // =================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounce(search);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // =================================================
  // RESET PAGE WHEN FILTER / SEARCH / SORT CHANGES
  // =================================================

  useEffect(() => {
    setPage(1);
  }, [
    searchDebounce,
    brand,
    fuelType,
    transmission,
    bodyType,
    minPrice,
    maxPrice,
    year,
    sort,
  ]);

  // =================================================
  // FETCH CARS
  // =================================================

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getAllCars({
          search: searchDebounce,
          brand,
          fuelType,
          transmission,
          bodyType,
          minPrice,
          maxPrice,
          year,
          sort,
          page,
          limit,
        });

        setCars(result.data);

        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Failed to fetch cars:", error);

        setError("Unable to Load Cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [
    searchDebounce,
    brand,
    fuelType,
    transmission,
    bodyType,
    minPrice,
    maxPrice,
    year,
    sort,
    page,
  ]);

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

  // =================================================
  // UI
  // =================================================

  return (
    <section className="featured-cars">
      <h2>Featured Cars</h2>

      {/* ================= SEARCH + FILTERS ================= */}

      <div className="car-filters">
        {/* SEARCH */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* BRAND */}
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">All Brands</option>
          <option value="Toyota">Toyota</option>
          <option value="BMW">BMW</option>
          <option value="Honda">Honda</option>
          <option value="Tata">Tata</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Volkswagen">Volkswagen</option>
        </select>

        {/* FUEL TYPE */}
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        {/* TRANSMISSION */}
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
          <option value="AMT">AMT</option>
          <option value="CVT">CVT</option>
          <option value="DCT">DCT</option>
        </select>

        {/* BODY TYPE */}
        <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
          <option value="">All Body Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="MUV">MUV</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
        </select>

        {/* MIN PRICE */}
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
        />

        {/* MAX PRICE */}
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
        />

        {/* YEAR */}

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>

        {/* SORT */}

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* ================= LOADING ================= */}

      {loading && <p>Loading Cars...</p>}

      {/* ================= ERROR ================= */}

      {!loading && error && <p>{error}</p>}

      {/* ================= NO RESULTS ================= */}

      {!loading && !error && cars.length === 0 && <p>No Cars Found</p>}

      {/* ================= CAR GRID ================= */}

      {!loading && !error && cars.length > 0 && (
        <div className="car-grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}

      {/* ================= PAGINATION ================= */}
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
    </section>
  );
}

export default FeaturedCars;
