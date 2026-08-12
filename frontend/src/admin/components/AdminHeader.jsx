import { useAuth } from "../../context/AuthContext";

function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="admin-header">

      <div className="admin-header-left">
        <p>DriveSphere</p>

        <h2>
          Administration
        </h2>
      </div>

      <div className="admin-header-right">

        <div className="admin-user-info">
          <span className="admin-user-name">
            {user?.name || "Admin"}
          </span>

          <span className="admin-user-role">
            Administrator
          </span>
        </div>

        <div className="admin-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </div>

      </div>

    </header>
  );
}

export default AdminHeader;