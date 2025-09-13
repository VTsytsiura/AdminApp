import React, { useState } from "react";
import "./UserCard.css";

interface UserCardProps {
  user: any; // pass empty object {} if creating new
  onClose: () => void;
  isNew?: boolean; // true if creating new user
}

const UserCard: React.FC<UserCardProps> = ({ user, onClose, isNew = false }) => {
  const [formData, setFormData] = useState({
    ...user,
    password: "", // always start with blank password
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    // Validate required fields only for new users
    if (isNew) {
      const requiredFields = ["first_name", "last_name", "username", "email", "password"];
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === "") {
          (window as any).toast(`Please fill in ${field.replace("_", " ")}`, "error");
          return;
        }
      }
    }

    const updates: any = {};
    for (const key in formData) {
      // Only send changed fields for existing users
      if (!isNew) {
        if (key === "password") {
          if (formData.password && formData.password.trim() !== "") {
            updates.password = formData.password; // only send new password if provided
          }
        } else if (formData[key] !== user[key]) {
          updates[key] = formData[key];
        }
      }
    }

    // If editing existing user and no changes, show message
    if (!isNew && Object.keys(updates).length === 0) {
      (window as any).toast("No changes, nothing to save", "success");
      onClose();
      return;
    }

    try {
      const url = isNew ? "/api/create/user" : `/api/update/users/${user.id}`;
      const method = isNew ? "POST" : "PUT";
      const bodyData = isNew ? formData : updates;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        (window as any).toast(errorData.error || "Operation failed", "error");
        return;
      }

      (window as any).toast(isNew ? "User created successfully" : "User updated successfully", "success");
      onClose();
    } catch (err) {
      console.error(err);
      (window as any).toast("Server error", "error");
    }
  };

  return (
    <div>
      <header className="uc_header">
        <h2 className="uc_margin_0">{isNew ? "Create New User" : `Edit User: ${user.username}`}</h2>
      </header>

      <div className="line"></div>

      <div className="uc_table-container">
        <table>
          <tbody>
            <tr>
              <td><label className="us_label">First Name:</label></td>
              <td><input id="first_name" className="uc_input" value={formData.first_name || ""} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label className="us_label">Last Name:</label></td>
              <td><input id="last_name" className="uc_input" value={formData.last_name || ""} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label className="us_label">Email:</label></td>
              <td><input id="email" className="uc_input" type="email" value={formData.email || ""} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label className="us_label">Username:</label></td>
              <td><input id="username" className="uc_input" value={formData.username || ""} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label className="us_label">{isNew ? "Password:" : "New Password:"}</label></td>
              <td><input id="password" className="uc_input" type="password" value={formData.password || ""} onChange={handleChange} placeholder={isNew ? "" : "Leave blank to keep current"} /></td>
            </tr>
            <tr>
              <td><label className="us_label">Role:</label></td>
              <td>
                <select id="role" className="uc_input" value={formData.role || "user"} onChange={handleChange}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="line"></div>

      <footer className="uc_footer">
        <button data-variant="success" onClick={handleSave}>Save</button>
        <button data-variant="destructive" onClick={onClose}>Cancel</button>
      </footer>
    </div>
  );
};

export default UserCard;