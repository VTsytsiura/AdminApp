import React, { useState } from "react";
import userIcon from "../../assets/user.svg";
import { useUser } from "../../context/UserContext";

const AccountSettings: React.FC = () => {
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    const updates: Record<string, any> = {};
    if (formData.first_name !== user?.first_name) updates.first_name = formData.first_name;
    if (formData.last_name !== user?.last_name) updates.last_name = formData.last_name;
    if (formData.username !== user?.username) updates.username = formData.username;
    if (formData.email !== user?.email) updates.email = formData.email;

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        (window as any).toast("Please enter your current password", "error");
        return;
      }
      updates.currentPassword = formData.currentPassword;
      updates.password = formData.newPassword;
    }

    if (Object.keys(updates).length === 0) {
      (window as any).toast("No changes to save", "warn");
      return;
    }

    try {
      const response = await fetch(`/api/update/users/${user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        (window as any).toast("User updated successfully", "success");
        setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
      } else {
        (window as any).toast(data.error || "Failed to update user", "error");
      }
    } catch (err) {
      (window as any).toast("Server error", "error");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <section>
        <p className="font-weight-bold margin_0">Account</p>
        <p className="margin_0">
          Real-time information and activities of your property
        </p>
        <div className="line"></div>
      </section>

      <section>
        <div className="account-picture">
          <img src={userIcon} alt="Account" />
        </div>
        <p className="font-weight-bold">Full Name</p>

        <div className="inline-group">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              className="input"
              type="text"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="input"
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">Contact Email</p>
        <input
          className="input"
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="line"></div>
      </section>

      <section>
        <p className="font-weight-bold">Password</p>

        <div className="inline-group">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              className="input"
              type="password"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              className="input"
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="line"></div>
      </section>

      <button className="btn btn-primary" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default AccountSettings;