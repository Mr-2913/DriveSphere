import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// ========================================
// COMPONENTS
// ========================================
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoutes";
import CompareBar from "./components/CompareBar.jsx";

// ========================================
// PAGES
// ========================================

import Home from "./pages/Home";
import CompareCars from "./pages/CompareCars";
import Cars from "./pages/Cars";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CarDetails from "./pages/CarDetails";
import About from "./pages/About";

// ========================================
// GLOBAL PAGES
// ========================================

import NotFound from "./global-pages/NotFound";
import ServerError from "./global-pages/ServerError";
import Offline from "./global-pages/Offline";
import Unauthorized from "./global-pages/Unauthorized";

// ========================================
// ADMIN PAGES
// ========================================

import AdminRoute from "./admin/middleware/AdminRoutes.jsx";
import AdminLayout from "./admin/components/AdminLayout.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AdminCars from "./admin/pages/AdminCars";
import AddCar from "./admin/pages/AddCar";
import EditCar from "./admin/pages/EditCar";
import AdminUsers from "./admin/pages/AdminUser";

// ========================================
// APP
// ========================================

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate("/unauthorized");
    };

    const handleServerError = () => {
      navigate("/server-error");
    };

    const handleOffline = () => {
      navigate("/offline");
    };

    window.addEventListener(
      "auth:unauthorized",
      handleUnauthorized
    );

    window.addEventListener(
      "api:server-error",
      handleServerError
    );

    window.addEventListener(
      "api:offline",
      handleOffline
    );

    return () => {
      window.removeEventListener(
        "auth:unauthorized",
        handleUnauthorized
      );

      window.removeEventListener(
        "api:server-error",
        handleServerError
      );

      window.removeEventListener(
        "api:offline",
        handleOffline
      );
    };
  }, [navigate]);

  return (
    <Routes>

      {/* ==================================
          PUBLIC / USER LAYOUT
      ================================== */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cars"
          element={<Cars />}
        />

        <Route
          path="/cars/:id"
          element={<CarDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        <Route
          path="/server-error"
          element={<ServerError />}
        />

        <Route
          path="/offline"
          element={<Offline />}
        />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/compare"
            element={<CompareCars />}
          />

          <Route
            path="/compare/:car1/:car2"
            element={<CompareCars />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Route>


      {/* ==================================
          ADMIN LAYOUT
      ================================== */}

      <Route element={<AdminRoute />}>

        <Route element={<AdminLayout />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/cars"
            element={<AdminCars />}
          />

          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

        </Route>

      </Route>


      {/* ==================================
          404
      ================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;
