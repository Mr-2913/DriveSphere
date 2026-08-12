import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import "../css/AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="admin-main">

        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;