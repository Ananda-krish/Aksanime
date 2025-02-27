import React, { useState, useEffect } from "react";
import "./AdminCategory.css";
import { Link, useNavigate } from "react-router-dom";

const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const navigate= useNavigate();

    const handleEdit = (id) => {
       navigate(`/admin-dashboard/edit/category/${id}`); // Navigate to edit page with category ID
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/categoryCard/categorylist");
                const data = await response.json();
                console.log(data); // Log the response to check its structure
                
                // Set categories from the response data
                setCategories(data.data); // Corrected this line
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Failed to load categories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`http://localhost:8000/api/categoryCard/categorydelete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.error || 'Failed to delete category');
                }

                // Correctly filter the categories array
                setCategories(categories.filter(category => category.id !== id));
            } catch (error) {
                setError(error.message || 'An error occurred while deleting the category.');
            }
        }
    };

    return (
        <div className="admin-category-table">
            <h2>Category Management</h2>
            <Link to="/admin-dashboard/create/category" className="link-button create-category-btn">
                Create Category
            </Link>
            {error && <div className="error-message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(categories) && categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(category.id)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCategory;
