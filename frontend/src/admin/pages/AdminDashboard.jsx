import { useEffect, useState } from "react";
import "../css/AdminDashboard.css";
import {
  getDashboardStats,
} from "../services/dashboard.service";

import AdminStatCard from "../components/AdminStatCard";
import QuickActions from "../components/QuickActions";
import RecentCars from "../components/RecentCars";
import RecentUsers from "../components/RecentUsers";


function AdminDashboard() {

  const [stats, setStats] = useState({
    totalCars: 0,
    totalUsers: 0,
    totalAdmins: 0,
    recentCars: [],
    recentUsers: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ========================================
  // FETCH DASHBOARD DATA
  // ========================================

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await getDashboardStats();

        setStats(
          response.data || {
            totalCars: 0,
            totalUsers: 0,
            totalAdmins: 0,
            recentCars: [],
            recentUsers: [],
          }
        );

      } catch (error) {

        console.error(
          "Failed to load dashboard:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, []);


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (
      <section className="admin-dashboard">

        <div className="admin-dashboard-header">

          <div>

            <p className="admin-eyebrow">
              DriveSphere Administration
            </p>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage cars, users and the
              DriveSphere platform.
            </p>

          </div>

        </div>


        <div className="admin-state">
          Loading dashboard...
        </div>

      </section>
    );

  }


  // ========================================
  // ERROR
  // ========================================

  if (error) {

    return (
      <section className="admin-dashboard">

        <div className="admin-dashboard-header">

          <div>

            <p className="admin-eyebrow">
              DriveSphere Administration
            </p>

            <h1>
              Admin Dashboard
            </h1>

          </div>

        </div>


        <div className="admin-state error">
          {error}
        </div>

      </section>
    );

  }


  // ========================================
  // DASHBOARD
  // ========================================

  return (
    <section className="admin-dashboard">


      {/* ==================================
          HEADER
      ================================== */}

      <div className="admin-dashboard-header">

        <div>

          <p className="admin-eyebrow">
            DriveSphere Administration
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage cars, users and the
            DriveSphere platform.
          </p>

        </div>

      </div>


      {/* ==================================
          STATISTICS
      ================================== */}

      <div className="admin-stats-grid">

        <AdminStatCard
          title="Total Cars"
          value={stats.totalCars}
          icon="🚗"
          description="Vehicles in database"
        />


        <AdminStatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="◉"
          description="Registered users"
        />


        <AdminStatCard
          title="Total Admins"
          value={stats.totalAdmins}
          icon="🛡️"
          description="Platform administrators"
        />

      </div>


      {/* ==================================
          QUICK ACTIONS
      ================================== */}

      <QuickActions />




      {/* ==================================
          RECENT DATA
          
          We'll add:
          - RecentCars
          - RecentUsers
          
          here next.
      ================================== */}
<RecentCars
  cars={stats.recentCars}
/>

<RecentUsers
  users={stats.recentUsers}
/>

    </section>
  );
}


export default AdminDashboard;