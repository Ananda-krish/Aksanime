import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditCategory = () => {
    const { id } = useParams(); // Get the category ID from the URL
    const [category, setCategory] = useState({}); // Initialize as an empty object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categoryCard/categoryshow/${id}`);
                if (!response.ok) throw new Error('Failed to fetch category details');
                
                const data = await response.json();
                setCategory(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/categoryCard/categoryupdate/${category.id}`, {
                method: 'POST', // Use POST for your route
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category), // Send the category object as JSON
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to update category');
            }
    
            const result = await response.json();
            alert(result.message); // Notify the user of success
            // Optionally redirect or update state here
        } catch (error) {
            setError(error.message || 'An error occurred while updating the category.');
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Edit Category</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={category.name || ''} // Fallback to empty string
                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                />
                
                <button type="submit">Update Category</button>
            </form>
        </div>
    );
};

export default EditCategory;
