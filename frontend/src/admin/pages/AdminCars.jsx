import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAdminCars,
  deleteAdminCar,
} from "../services/car.service";
import "../css/AdminCars.css";
function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const fetchCars = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await getAdminCars({
      limit: 100,
    });

    setCars(response.data || []);

  } catch (error) {

    console.error(
      "Failed to fetch cars:",
      error
    );

    setError(
      error.response?.data?.message ||
        "Failed to load cars."
    );

  } finally {
    setLoading(false);
  }
};
  

const handleDeleteCar = async (car) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${car.brand} ${car.model}?`
  );

  if (!confirmed) {
    return;
  }

  try {
    setError("");

    await deleteAdminCar(car._id);

    // Remove deleted car immediately from UI
    setCars((currentCars) =>
      currentCars.filter(
        (item) => item._id !== car._id
      )
    );

  } catch (error) {

    console.error(
      "Failed to delete car:",
      error
    );

    setError(
      error.response?.data?.message ||
        "Failed to delete car."
    );
  }
};
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <section className="admin-cars">

      {/* HEADER */}
      <div className="admin-page-header">

        <div>
          <p className="admin-eyebrow">
            Vehicle Management
          </p>

          <h1>Cars</h1>

          <p>
            Manage all vehicles available on DriveSphere.
          </p>
        </div>

        <Link
          to="/admin/cars/add"
          className="admin-primary-btn"
        >
          + Add Car
        </Link>

      </div>


      {/* CONTENT */}
      <div className="admin-cars-container">

        {loading && (
          <div className="admin-state">
            Loading cars...
          </div>
        )}

        {!loading && error && (
          <div className="admin-state error">
            {error}
          </div>
        )}

        {!loading && !error && cars.length === 0 && (
          <div className="admin-state">
            No cars found.
          </div>
        )}

        {!loading && !error && cars.length > 0 && (
          <div className="admin-car-table-wrapper">

            <table className="admin-car-table">

              <thead>
                <tr>
                  <th>Image</th>
                  <th>Car</th>
                  <th>Brand</th>
                  <th>Year</th>
                  <th>Price</th>
                  <th>Fuel</th>
                  <th>Transmission</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {cars.map((car) => (

                  <tr key={car._id}>

                    <td>
                      <img
                        className="admin-car-image"
                        src={
                          car.images?.thumbnail ||
                          car.images?.gallery?.[0]
                        }
                        alt={`${car.brand} ${car.model}`}
                      />
                    </td>

                    <td>
                      <div className="admin-car-name">
                        <strong>
                          {car.model}
                        </strong>

                        {car.variant && (
                          <span>
                            {car.variant}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      {car.brand}
                    </td>

                    <td>
                      {car.year}
                    </td>

                    <td>
                      ₹{Number(car.price).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {car.fuelType}
                    </td>

                    <td>
                      {car.transmission}
                    </td>

                    <td>
                      <div className="admin-car-actions">

                        <Link
                          to={`/cars/${car._id}`}
                          className="admin-action view"
                        >
                          View
                        </Link>

                        <Link
                          to={`/admin/cars/edit/${car._id}`}
                          className="admin-action edit"
                        >
                          Edit
                        </Link>

                         <button
    type="button"
    className="admin-action delete"
    onClick={() => handleDeleteCar(car)}
  >
    Delete
  </button>

                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </section>
  );
}

export default AdminCars;