import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Adminuser.css";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/adminuser-edit/${id}`);
};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/user/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUsers(response.data.users);
        }
      } catch (err) {
        setError("Failed to fetch users");
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8000/api/user/delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        console.error("Failed to delete user:", err);
        alert("Failed to delete user");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-user-container">
      <h2>User Management</h2>
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Phone</th>
              <th>About</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name}
                      className="user-image"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = '/path/to/default/image.png';
                      }}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </td>
                <td>{user.phone_number || '-'}</td>
                <td>{user.about || '-'}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUser;