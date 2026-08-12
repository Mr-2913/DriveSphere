import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  getProfile,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(true);


  // ========================================
  // GET CURRENT USER
  // ========================================

  const fetchUser = async () => {
    try {
      const response = await getProfile();

      setUser(response.data);

    } catch (error) {
      console.error(
        "Failed to get user:",
        error.response?.data || error.message
      );

      localStorage.removeItem("token");

      setToken(null);
      setUser(null);

    } finally {
      setLoading(false);
    }
  };


  // ========================================
  // CHECK LOGIN ON APP START
  // ========================================

  useEffect(() => {
    const savedToken =
      localStorage.getItem("token");

    if (savedToken) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);


  // ========================================
  // LOGIN
  // ========================================

  const login = async (email, password) => {
    try {
      const response = await loginUser(
        email,
        password
      );

      const newToken = response.token;

      localStorage.setItem(
        "token",
        newToken
      );

      setToken(newToken);

      // Get complete user information
      await fetchUser();

      return response;

    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data || error.message
      );

      throw error;
    }
  };


  // ========================================
  // UPDATE USER
  // ========================================

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };


  // ========================================
  // LOGOUT
  // ========================================

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };


  // ========================================
  // AUTH CONTEXT
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isLoggedIn: !!token,

        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// ========================================
// CUSTOM HOOK
// ========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};