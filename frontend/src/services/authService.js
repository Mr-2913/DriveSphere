import api from "./api";


// ========================================
// LOGIN
// ========================================

export const loginUser = async (email, password) => {

  const response = await api.post(
    "/users/login",
    {
      email,
      password,
    }
  );

  return response.data;
};


// ========================================
// GET PROFILE
// ========================================

export const getProfile = async () => {

  const response = await api.get(
    "/users/profile"
  );

  return response.data;
};


// ========================================
// UPDATE PROFILE
// ========================================

export const updateProfile = async (
  name,
  username
) => {

  const response = await api.put(
    "/users/profile",
    {
      name,
      username,
    }
  );

  return response.data;
};