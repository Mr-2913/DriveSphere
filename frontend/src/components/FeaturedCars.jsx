import { getAllCars } from "../services/carService";
import { useState, useEffect } from "react";
import CarCard from "./CarCard";
import SearchBar from "./SearchBar";
import "./css/FeaturedCars.css";

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [year, setYear] = useState("");
  // ---------------- DEBOUNCE ----------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounce(search);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ---------------- FETCH CARS ----------------

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
          year
        });

        setCars(result.data);
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
    year
  ]);

  // ---------------- UI ----------------

  return (
    <section className="featured-cars">
      <h2>Featured Cars</h2>

      {/* SEARCH ALWAYS VISIBLE */}
<div className="car-filters">

  <SearchBar
    search={search}
    setSearch={setSearch}
  />

  <select
    value={brand}
    onChange={(e) => setBrand(e.target.value)}
  >
    <option value="">All Brands</option>
    <option value="Toyota">Toyota</option>
    <option value="BMW">BMW</option>
    <option value="Honda">Honda</option>
    <option value="Tata">Tata</option>
    <option value="Mercedes">Mercedes</option>
    <option value="Volkswagen">Volkswagen</option>
  </select>


  <select
    value={fuelType}
    onChange={(e) => setFuelType(e.target.value)}
  >
    <option value="">All Fuel Types</option>
    <option value="Petrol">Petrol</option>
    <option value="Diesel">Diesel</option>
    <option value="Electric">Electric</option>
    <option value="Hybrid">Hybrid</option>
  </select>


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


  <select
    value={bodyType}
    onChange={(e) => setBodyType(e.target.value)}
  >
    <option value="">All Body Types</option>
    <option value="SUV">SUV</option>
    <option value="Sedan">Sedan</option>
    <option value="Hatchback">Hatchback</option>
    <option value="MUV">MUV</option>
    <option value="Coupe">Coupe</option>
    <option value="Convertible">Convertible</option>
  </select>


  <input
    type="number"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
    placeholder="Min Price"
  />


  <input
    type="number"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
    placeholder="Max Price"
  />

<select
  value={year}
  onChange={(e) => setYear(e.target.value)}
>
  <option value="">All Years</option>
  <option value="2026">2026</option>
  <option value="2025">2025</option>
  <option value="2024">2024</option>
  <option value="2023">2023</option>
  <option value="2022">2022</option>
</select>
</div>
      
      {/* LOADING */}
      {loading && <p>Loading Cars...</p>}

      {/* ERROR */}
      {!loading && error && <p>{error}</p>}

      {/* NO RESULTS */}
      {!loading && !error && cars.length === 0 && <p>No Cars Found</p>}

      {/* CARS */}
      {!loading && !error && cars.length > 0 && (
        <div className="car-grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedCars;
