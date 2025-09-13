import React, { useEffect, useState } from "react";
import "./UsersSettings.css";
import UserCard from "../user/UserCard";
import { useUser } from "../../context/UserContext"; // make sure you have this

interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}

const UsersSettings: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { user: currentUser } = useUser();

  const fetchUsers = async () => {
    try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        const filteredUsers = (data.users || []).filter(u => u.id !== currentUser?.id);
        setUsers(filteredUsers);
    } catch (err) {
        console.error(err);
        (window as any).toast("Failed to fetch users", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => setEditingUser(user);

  const handleClose = () => {
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (userId?: number) => {
    if (!userId) return;
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
        const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        });
        if (!res.ok) throw new Error("Delete failed");

        (window as any).toast("User deleted successfully", "success");
        fetchUsers();
    } catch (err) {
        console.error(err);
        (window as any).toast("Failed to delete user", "error");
    }
  };


  const handleCreateClick = () => {
    setEditingUser({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      role: "user",
      password: "",
    });
  };

  return (
    <div className={editingUser ? "overlay-disabled" : ""}>
      <section>
        <p className="font-weight-bold margin_0">Active Users</p>
        <p className="margin_0">Information about activated users accounts</p>
        <div className="line"></div>

        <table className="table-container">
          <thead>
            <tr>
              <th data-size="4"><div>Name</div></th>
              <th data-size="4"><div>Email</div></th>
              <th data-size="2"><div>Role</div></th>
              <th data-size="2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                onDoubleClick={() => handleEdit(user)}
                className={editingUser ? "disabled-row" : ""}
              >
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="td_actions">
                    <button onClick={() => handleEdit(user)}>✏️ Edit</button>
                    <button className="us_delete_button" onClick={() => handleDelete(user.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="line"></div>

      <section className="create-user-section">
        <section className="create-user-section">
            <button className="btn btn-primary us_button" onClick={handleCreateClick}>
                Create New User
            </button>
        </section>

        {editingUser && (
            <div className="modal-overlay">
            <div className="modal-content">
                <UserCard
                    user={editingUser}
                    onClose={handleClose}
                    isNew={!editingUser.id}
                />
            </div>
            </div>
        )}
      </section>
    </div>
  );
};

export default UsersSettings;