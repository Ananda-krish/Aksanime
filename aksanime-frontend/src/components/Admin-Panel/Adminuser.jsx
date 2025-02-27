import React, { useState, useEffect } from "react";
import "./Adminuser.css";

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace this with a fetch call to your Laravel backend later
    const dummyUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
      { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Moderator" },
    ];
    setUsers(dummyUsers);
  }, []);

  return (
    <div className="admin-user-table">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;
