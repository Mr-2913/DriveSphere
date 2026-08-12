import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishlist,
  addWishlist,
  removeWishlist,
  clearWishlist as clearWishlistApi,
} from "../services/wishlistService";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistCars, setWishlistCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // GET WISHLIST
  // ========================================

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      // User is not logged in
      if (!token) {
        setWishlistCars([]);
        setLoading(false);
        return;
      }

      const response = await getWishlist();

      setWishlistCars(response.data || []);

    } catch (error) {
      console.error(
        "Failed to fetch wishlist:",
        error.response?.data || error.message
      );

      setWishlistCars([]);

    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD WISHLIST
  // ========================================

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ========================================
  // ADD TO WISHLIST
  // ========================================

  const addToWishlist = async (car) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert(
          "Please login to add cars to wishlist."
        );
        return;
      }

      await addWishlist(car._id);

      // Refresh from backend
      await fetchWishlist();

    } catch (error) {
      console.error(
        "Failed to add car to wishlist:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to add car to wishlist."
      );
    }
  };

  // ========================================
  // REMOVE FROM WISHLIST
  // ========================================

  const removeFromWishlist = async (carId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      await removeWishlist(carId);

      // Update UI immediately
      setWishlistCars((previousCars) =>
        previousCars.filter(
          (car) => car._id !== carId
        )
      );

    } catch (error) {
      console.error(
        "Failed to remove car from wishlist:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to remove car from wishlist."
      );
    }
  };

  // ========================================
  // CHECK WISHLIST
  // ========================================

  const isInWishlist = (carId) => {
    return wishlistCars.some(
      (car) => car._id === carId
    );
  };

  // ========================================
  // CLEAR WISHLIST
  // ========================================

  const clearWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      await clearWishlistApi();

      setWishlistCars([]);

    } catch (error) {
      console.error(
        "Failed to clear wishlist:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to clear wishlist."
      );
    }
  };

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <WishlistContext.Provider
      value={{
        wishlistCars,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        loading,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};


// ========================================
// CUSTOM HOOK
// ========================================

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};