import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CarForm from "../components/CarForm";
import { createAdminCar } from "../services/car.service";

import "../css/AddCar.css";


function AddCar() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (carData) => {

    try {

      setLoading(true);
      setError("");

      await createAdminCar(carData);

      setSuccess("Car added successfully.");

      setTimeout(() => {
        navigate("/admin/cars");
      }, 1000);

    } catch (error) {

      console.error(
        "Failed to create car:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to add car."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <section className="admin-add-car">

      <div className="admin-page-header">

        <div>
          <p className="admin-eyebrow">
            Vehicle Management
          </p>

          <h1>Add New Car</h1>

          <p>
            Add a new vehicle to DriveSphere.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-btn"
          onClick={() =>
            navigate("/admin/cars")
          }
        >
          ← Back to Cars
        </button>

      </div>


      {error && (
        <div className="admin-form-message error">
          {error}
        </div>
      )}


      {success && (
        <div className="admin-form-message success">
          {success}
        </div>
      )}


      <CarForm
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Add Car"
      />

    </section>
  );
}


export default AddCar;