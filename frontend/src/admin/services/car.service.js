import api from "../../services/api";


// ========================================
// GET ALL CARS
// ========================================

export const getAdminCars = async (params = {}) => {
  const response = await api.get("/cars", {
    params,
  });

  return response.data;
};


// ========================================
// DELETE CAR
// ========================================

export const deleteAdminCar = async (id) => {
  const response = await api.delete(`/cars/${id}`);

  return response.data;
};


// ========================================
// GET CAR BY ID
// ========================================

export const getAdminCarById = async (id) => {
  const response = await api.get(`/cars/${id}`);

  return response.data;
};


// ========================================
// CREATE CAR
// ========================================

export const createAdminCar = async (carData) => {
  const response = await api.post(
    "/cars",
    carData
  );

  return response.data;
};


// ========================================
// UPDATE CAR
// ========================================

export const updateAdminCar = async (
  id,
  carData
) => {
  const response = await api.put(
    `/cars/${id}`,
    carData
  );

  return response.data;
};