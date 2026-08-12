function AdminStatCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div className="admin-stat-card">

      <div className="admin-stat-card-top">
        <div className="admin-stat-icon">
          {icon}
        </div>
      </div>

      <div className="admin-stat-card-content">
        <p className="admin-stat-title">
          {title}
        </p>

        <h2 className="admin-stat-value">
          {value}
        </h2>

        {description && (
          <p className="admin-stat-description">
            {description}
          </p>
        )}
      </div>

    </div>
  );
}

export default AdminStatCard;