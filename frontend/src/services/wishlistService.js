import api from "./api";


// ========================================
// GET WISHLIST
// ========================================

export const getWishlist = async () => {

  const response = await api.get(
    "/wishlist"
  );

  return response.data;
};


// ========================================
// ADD TO WISHLIST
// ========================================

export const addWishlist = async (carId) => {

  const response = await api.post(
    `/wishlist/${carId}`
  );

  return response.data;
};


// ========================================
// REMOVE FROM WISHLIST
// ========================================

export const removeWishlist = async (carId) => {

  const response = await api.delete(
    `/wishlist/${carId}`
  );

  return response.data;
};


// ========================================
// CLEAR WISHLIST
// ========================================

export const clearWishlist = async () => {

  const response = await api.delete(
    "/wishlist"
  );

  return response.data;
};