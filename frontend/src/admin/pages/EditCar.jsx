import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CarForm from "../components/CarForm";

import {
  getAdminCarById,
  updateAdminCar,
} from "../services/car.service";

import "../css/AddCar.css";


function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // ========================================
  // FETCH CAR
  // ========================================

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAdminCarById(id);

        setCar(response.data);

      } catch (error) {
        console.error(
          "Failed to fetch car:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load car."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);


  // ========================================
  // UPDATE CAR
  // ========================================

  const handleSubmit = async (carData) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateAdminCar(id, carData);

      setSuccess(
        "Car updated successfully."
      );

      setTimeout(() => {
        navigate("/admin/cars");
      }, 1000);

    } catch (error) {
      console.error(
        "Failed to update car:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update car."
      );

    } finally {
      setSaving(false);
    }
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <section className="admin-add-car">
        <div className="admin-state">
          Loading car...
        </div>
      </section>
    );
  }


  // ========================================
  // CAR NOT FOUND
  // ========================================

  if (!car) {
    return (
      <section className="admin-add-car">

        <div className="admin-form-message error">
          {error || "Car not found."}
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

      </section>
    );
  }


  // ========================================
  // PAGE
  // ========================================

  return (
    <section className="admin-add-car">

      {/* HEADER */}

      <div className="admin-page-header">

        <div>

          <p className="admin-eyebrow">
            Vehicle Management
          </p>

          <h1>
            Edit Car
          </h1>

          <p>
            Update {car.brand} {car.model}.
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


      {/* ERROR */}

      {error && (
        <div className="admin-form-message error">
          {error}
        </div>
      )}


      {/* SUCCESS */}

      {success && (
        <div className="admin-form-message success">
          {success}
        </div>
      )}


      {/* FORM */}

      <CarForm
        initialData={car}
        onSubmit={handleSubmit}
        loading={saving}
        submitText="Update Car"
      />

    </section>
  );
}


export default EditCar;