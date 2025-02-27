import React, { useState } from "react";
import "./CreateCategory.css"; // Optional: Create a CSS file for styling

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/categoryCard/categorycreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         name: categoryName,
         
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setCategoryName("");
        
      } else {
        setError(data.errors || { general: ["An error occurred. Please try again."] });
      }
    } catch (err) {
      setError({ general: ["Network error. Please try again."] });
    }
  };

  return (
    <div className="category-create">
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>
        
        <button type="submit">Submit</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && (
        <div className="error-message">
          {Object.values(error).map((err, index) => (
            <p key={index}>{err[0]}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
