import { Link } from "react-router-dom";

function RecentUsers({ users = [] }) {
  return (
    <section className="admin-recent-section">

      {/* HEADER */}

      <div className="admin-section-header">

        <div>
          <p className="admin-eyebrow">
            User Activity
          </p>

          <h2>
            Recent Users
          </h2>
        </div>

        <Link
          to="/admin/users"
          className="admin-section-link"
        >
          View All
        </Link>

      </div>


      {/* EMPTY STATE */}

      {users.length === 0 ? (

        <div className="admin-state">
          No users found.
        </div>

      ) : (

        <div className="admin-recent-table-wrapper">

          <table className="admin-recent-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user._id}>

                  {/* USER */}

                  <td>

                    <div className="admin-recent-user">

                      <div className="admin-user-avatar">
                        {user.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <strong>
                          {user.name}
                        </strong>

                        <span>
                          @{user.username}
                        </span>

                      </div>

                    </div>

                  </td>


                  {/* EMAIL */}

                  <td>
                    {user.email}
                  </td>


                  {/* ROLE */}

                  <td>

                    <span
                      className={`admin-role-badge ${
                        user.role
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>


                  {/* JOINED */}

                  <td>
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </section>
  );
}

export default RecentUsers;