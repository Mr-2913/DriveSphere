import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3100/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// ========================================
// REQUEST INTERCEPTOR
// ========================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ========================================
// RESPONSE INTERCEPTOR
// ========================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {

    const status = error.response?.status;

    // ========================================
    // UNAUTHORIZED
    // ========================================

    if (status === 401) {

      localStorage.removeItem("token");

      window.dispatchEvent(
        new Event("auth:unauthorized")
      );
    }

    // ========================================
    // SERVER ERROR
    // ========================================

    if (status >= 500) {

      window.dispatchEvent(
        new Event("api:server-error")
      );
    }

    // ========================================
    // NETWORK / OFFLINE
    // ========================================

    if (!error.response) {

      window.dispatchEvent(
        new Event("api:offline")
      );
    }

    return Promise.reject(error);
  }
);


export default api;