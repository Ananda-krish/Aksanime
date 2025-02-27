import React, { useState, useEffect } from "react";
import "./Adminproduct.css";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace this with a fetch call to your Laravel backend later
    const dummyProducts = [
      { id: 1, name: "Laptop", price: "$1200", category: "Electronics", stock: 25 },
      { id: 2, name: "Headphones", price: "$150", category: "Accessories", stock: 50 },
      { id: 3, name: "Chair", price: "$80", category: "Furniture", stock: 10 },
    ];
    setProducts(dummyProducts);
  }, []);

  return (
    <div className="admin-product-table">
      <h2>Product Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
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

export default AdminProduct;
