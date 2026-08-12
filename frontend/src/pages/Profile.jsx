import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/authService";

import { useAuth } from "../context/AuthContext";

import "./css/Profile.css";

function Profile() {
  const navigate = useNavigate();

const {
  user,
  logout,
  updateUser,
} = useAuth();

  // ========================================
  // STATES
  // ========================================

  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  // ========================================
  // LOADING
  // ========================================

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          Loading profile...
        </div>
      </main>
    );
  }

  // ========================================
  // START EDIT PROFILE
  // ========================================

  const startEditing = () => {
    setName(user.name || "");
    setUsername(user.username || "");

    setError("");
    setSuccess("");

    setChangingPassword(false);
    setEditing(true);
  };

  // ========================================
  // CANCEL EDIT PROFILE
  // ========================================

  const cancelEditing = () => {
    setEditing(false);

    setName(user.name || "");
    setUsername(user.username || "");

    setError("");
    setSuccess("");
  };

  // ========================================
  // UPDATE PROFILE
  // ========================================

const handleUpdate = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!name.trim() || !username.trim()) {
    setError("Name and username are required.");
    return;
  }

  try {
    setLoading(true);

    const response = await updateProfile(
      name.trim(),
      username.trim()
    );

    updateUser(response.data);

    setSuccess("Profile updated successfully.");

    setEditing(false);

  } catch (error) {
    console.error(
      "Profile update failed:",
      error.response?.data || error.message
    );

    setError(
      error.response?.data?.message ||
      "Unable to update profile."
    );

  } finally {
    setLoading(false);
  }
};

  // ========================================
  // START CHANGE PASSWORD
  // ========================================

  const startChangingPassword = () => {
    setError("");
    setSuccess("");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setEditing(false);
    setChangingPassword(true);
  };

  // ========================================
  // CANCEL CHANGE PASSWORD
  // ========================================

  const cancelChangingPassword = () => {
    setChangingPassword(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setError("");
    setSuccess("");
  };

  // ========================================
  // CHANGE PASSWORD
  // ========================================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check empty fields
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("All password fields are required.");
      return;
    }

    // Check minimum password length
    if (newPassword.length < 6) {
      setError(
        "New password must be at least 6 characters."
      );
      return;
    }

    // Check password confirmation
    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirm password do not match."
      );
      return;
    }

    // Prevent same password
    if (currentPassword === newPassword) {
      setError(
        "New password must be different from current password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        "http://localhost:3100/api/users/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        response.data.message ||
          "Password changed successfully."
      );

      // Clear fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setChangingPassword(false);

    } catch (error) {
      console.error(
        "Password change failed:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to change password."
      );

    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  // ========================================
  // JSX
  // ========================================

  return (
    <main className="profile-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="profile-header">

        <p className="profile-label">
          YOUR ACCOUNT
        </p>

        <h1>
          My Profile
        </h1>

        <p>
          Manage your DriveSphere account.
        </p>

      </div>

      {/* ========================================
          MESSAGES
      ======================================== */}

      {error && (
        <div className="profile-error">
          {error}
        </div>
      )}

      {success && (
        <div className="profile-success">
          {success}
        </div>
      )}

      {/* ========================================
          CHANGE PASSWORD
      ======================================== */}

      {changingPassword && (

        <section className="profile-card password-card">

          <form
            className="profile-edit-form"
            onSubmit={handleChangePassword}
          >

            {/* PASSWORD ICON */}

            <div className="profile-avatar password-avatar">
              🔒
            </div>

            {/* TITLE */}

            <div className="password-title">

              <h2>
                Change Password
              </h2>

              <p>
                Update your account password.
              </p>

            </div>

            {/* CURRENT PASSWORD */}

            <div className="profile-form-group">

              <label htmlFor="current-password">
                Current Password
              </label>

              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
                autoComplete="current-password"
              />

            </div>

            {/* NEW PASSWORD */}

            <div className="profile-form-group">

              <label htmlFor="new-password">
                New Password
              </label>

              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                autoComplete="new-password"
              />

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="profile-form-group">

              <label htmlFor="confirm-password">
                Confirm New Password
              </label>

              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                autoComplete="new-password"
              />

            </div>

            {/* BUTTONS */}

            <div className="profile-edit-actions">

              <button
                type="submit"
                className="profile-action-btn"
                disabled={loading}
              >
                {loading
                  ? "Changing Password..."
                  : "Change Password"}
              </button>

              <button
                type="button"
                className="profile-cancel-btn"
                onClick={cancelChangingPassword}
              >
                Cancel
              </button>

            </div>

          </form>

        </section>

      )}

      {/* ========================================
          EDIT PROFILE
      ======================================== */}

      {editing && !changingPassword && (

        <section className="profile-card edit-profile-card">

          <form
            className="profile-edit-form"
            onSubmit={handleUpdate}
          >

            {/* AVATAR */}

            <div className="profile-avatar">
              {user.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            {/* TITLE */}

            <div className="password-title">

              <h2>
                Edit Profile
              </h2>

              <p>
                Update your personal information.
              </p>

            </div>

            {/* NAME */}

            <div className="profile-form-group">

              <label htmlFor="profile-name">
                Full Name
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
              />

            </div>

            {/* USERNAME */}

            <div className="profile-form-group">

              <label htmlFor="profile-username">
                Username
              </label>

              <input
                id="profile-username"
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Enter username"
              />

            </div>

            {/* EMAIL */}

            <div className="profile-field">

              <span>
                Email
              </span>

              <strong>
                {user.email}
              </strong>

            </div>

            {/* BUTTONS */}

            <div className="profile-edit-actions">

              <button
                type="submit"
                className="profile-action-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                type="button"
                className="profile-cancel-btn"
                onClick={cancelEditing}
              >
                Cancel
              </button>

            </div>

          </form>

        </section>

      )}

      {/* ========================================
          VIEW PROFILE
      ======================================== */}

      {!editing && !changingPassword && (

        <section className="profile-card">

          {/* AVATAR */}

          <div className="profile-avatar">
            {user.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          {/* INFORMATION */}

          <div className="profile-info">

            {/* NAME */}

            <div className="profile-field">

              <span>
                Name
              </span>

              <strong>
                {user.name}
              </strong>

            </div>

            {/* USERNAME */}

            <div className="profile-field">

              <span>
                Username
              </span>

              <strong>
                @{user.username}
              </strong>

            </div>

            {/* EMAIL */}

            <div className="profile-field">

              <span>
                Email
              </span>

              <strong>
                {user.email}
              </strong>

            </div>

            {/* ROLE */}

            <div className="profile-field">

              <span>
                Account Type
              </span>

              <strong>
                {user.role}
              </strong>

            </div>

            {/* MEMBER SINCE */}

            <div className="profile-field">

              <span>
                Member Since
              </span>

              <strong>
                {user.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString(
                      "en-IN"
                    )
                  : "N/A"}
              </strong>

            </div>

          </div>

        </section>

      )}

      {/* ========================================
          ACTION BUTTONS
      ======================================== */}

      {!editing && !changingPassword && (

        <section className="profile-actions">

          <button
            type="button"
            className="profile-action-btn"
            onClick={startEditing}
          >
            Edit Profile
          </button>

          <button
            type="button"
            className="profile-action-btn"
            onClick={startChangingPassword}
          >
            Change Password
          </button>

          <button
            type="button"
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </section>

      )}

    </main>
  );
}

export default Profile;