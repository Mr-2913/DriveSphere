import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <section className="admin-quick-actions">

      <div className="admin-section-header">
        <div>
          <p className="admin-eyebrow">
            Quick Actions
          </p>

          <h2>
            Manage DriveSphere
          </h2>
        </div>
      </div>


      <div className="admin-quick-actions-grid">

        <Link
          to="/admin/cars/add"
          className="admin-quick-action"
        >
          <span className="admin-quick-action-icon">
            +
          </span>

          <div>
            <h3>Add New Car</h3>

            <p>
              Add a new vehicle to DriveSphere.
            </p>
          </div>
        </Link>


        <Link
          to="/admin/cars"
          className="admin-quick-action"
        >
          <span className="admin-quick-action-icon">
            🚗
          </span>

          <div>
            <h3>Manage Cars</h3>

            <p>
              View, edit and delete vehicles.
            </p>
          </div>
        </Link>


        <Link
          to="/admin/users"
          className="admin-quick-action"
        >
          <span className="admin-quick-action-icon">
            ◉
          </span>

          <div>
            <h3>Manage Users</h3>

            <p>
              Manage users and administrator roles.
            </p>
          </div>
        </Link>

      </div>

    </section>
  );
}

export default QuickActions;