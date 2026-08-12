import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  // Wait until AuthContext checks localStorage
  if (loading) {
    return <p>Loading...</p>;
  }

  // Not logged in → login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow page
  return <Outlet />;
}

export default ProtectedRoute;