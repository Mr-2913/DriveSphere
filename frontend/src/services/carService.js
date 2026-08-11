import axios from "axios";

const API_URL = "http://localhost:3100/api/cars";


export const getAllCars = async ({
  search = "",
  brand = "",
  fuelType = "",
  transmission = "",
  bodyType = "",
  minPrice = "",
  maxPrice = "",
  year=""
} = {}) => {

  const response = await axios.get(API_URL, {
    params: {
      search,
      brand,
      fuelType,
      transmission,
      bodyType,
      minPrice,
      maxPrice,
      year
    },
  });

  return response.data;
};


export const getCarById = async (id) => {

  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};