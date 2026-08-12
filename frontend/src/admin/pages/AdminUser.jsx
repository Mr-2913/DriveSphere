import { useEffect, useState } from "react";
import api from "../../services/api";
import "../css/AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // GET ALL USERS
  // ========================================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/users");

      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ========================================
  // CHANGE ROLE
  // ========================================

  const handleRoleChange = async (userId, role) => {
    try {
      const response = await api.put(
        `/admin/users/${userId}/role`,
        { role }
      );

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user._id === userId
            ? response.data.data
            : user
        )
      );
    } catch (error) {
      console.error("Failed to update role:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update user role."
      );
    }
  };

  // ========================================
  // DELETE USER
  // ========================================

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/users/${userId}`);

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => user._id !== userId
        )
      );
    } catch (error) {
      console.error("Failed to delete user:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete user."
      );
    }
  };

  // ========================================
  // UI
  // ========================================

  return (
    <section className="admin-users">

      {/* HEADER */}

      <div className="admin-page-header">

        <div>
          <p className="admin-eyebrow">
            User Management
          </p>

          <h1>Users</h1>

          <p>
            Manage DriveSphere users and
            administrator access.
          </p>
        </div>

      </div>


      {/* CONTENT */}

      <div className="admin-users-container">

        {loading && (
          <div className="admin-state">
            Loading users...
          </div>
        )}


        {!loading && error && (
          <div className="admin-state error">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          users.length === 0 && (
            <div className="admin-state">
              No users found.
            </div>
          )}


        {!loading &&
          !error &&
          users.length > 0 && (

          <div className="admin-user-table-wrapper">

            <table className="admin-user-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>


              <tbody>

                {users.map((user) => (

                  <tr key={user._id}>

                    <td>
                      <strong>
                        {user.name}
                      </strong>
                    </td>


                    <td>
                      @{user.username}
                    </td>


                    <td>
                      {user.email}
                    </td>


                    <td>

                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className="admin-role-select"
                      >

                        <option value="user">
                          User
                        </option>

                        <option value="admin">
                          Admin
                        </option>

                      </select>

                    </td>


                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </td>


                    <td>

                      <button
                        type="button"
                        className="admin-action delete"
                        onClick={() =>
                          handleDelete(user._id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </section>
  );
}

export default AdminUsers;