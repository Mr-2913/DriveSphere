import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: "▦",
    },
    {
      label: "Cars",
      path: "/admin/cars",
      icon: "🚗",
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: "◉",
    },
  ];

  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="admin-sidebar-logo">
        <span>Drive</span>
        <strong>Sphere</strong>
      </div>

      <p className="admin-sidebar-label">
        ADMIN PANEL
      </p>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `admin-nav-item ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="admin-nav-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default AdminSidebar;