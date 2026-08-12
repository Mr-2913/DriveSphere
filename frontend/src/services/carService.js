import api from "./api";


// ========================================
// GET ALL CARS
// ========================================

export const getAllCars = async ({
  search = "",
  brand = "",
  fuelType = "",
  transmission = "",
  bodyType = "",
  minPrice = "",
  maxPrice = "",
  year = "",
  sort = "",
} = {}) => {

  const response = await api.get("/cars", {
    params: {
      search,
      brand,
      fuelType,
      transmission,
      bodyType,
      minPrice,
      maxPrice,
      year,
      sort,
    },
  });

  return response.data;
};


// ========================================
// GET CAR BY ID
// ========================================

export const getCarById = async (id) => {

  const response = await api.get(`/cars/${id}`);

  return response.data;
};