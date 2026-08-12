import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminRoute() {
  const {
    user,
    loading,
    isLoggedIn,
  } = useAuth();

  // ==============================
  // CHECKING AUTHENTICATION
  // ==============================

  if (loading) {
    return (
      <div className="admin-route-loading">
        <p>Checking admin access...</p>
      </div>
    );
  }

  // ==============================
  // NOT LOGGED IN
  // ==============================

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ==============================
  // NOT ADMIN
  // ==============================

  if (user?.role !== "admin") {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  // ==============================
  // ADMIN
  // ==============================

  return <Outlet />;
}

export default AdminRoute;