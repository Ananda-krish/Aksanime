import React, { useEffect, useState } from 'react';
import './ProductList.css'; // Make sure to create this CSS file for styles
import { Link, useNavigate } from 'react-router-dom';

const AnimecardList = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/admin-dashboard/editanimecard/${id}`);
    };

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [categoryResponse, productResponse] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/categoryCard/categorylist'),
                    fetch('http://127.0.0.1:8000/api/animecard/animelist'),
                ]);

                if (!categoryResponse.ok || !productResponse.ok) {
                    throw new Error('Failed to fetch categories or anime');
                }

                const categoryData = await categoryResponse.json();
                const productData = await productResponse.json();
                setCategories(categoryData.data);
                setProducts(productData.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:8000/api/animecard/animedelete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to delete product');
                }

                setProducts(products.filter(product => product.id !== id));
                alert(result.message);
            } catch (error) {
                setError(error.message || 'An error occurred while deleting the product.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const categorizedProducts = categories.map((category) => {
        const categoryProducts = products.filter(product => product.anime_category_id === category.id);
        return { ...category, products: categoryProducts };
    });

    return (
        <div className="admin-product-table">
            <h2>Workshop Management</h2>
            <Link to="/admin-dashboard/create/animecard" className="link-button create-product-btn">
                Create Animecard
            </Link>
            {error && <div className="error-message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Image</th>
                        <th>anime Title</th>
                        <th>short id</th>
                        <th>description</th>
                        <th>latest episode</th>
                        <th>seasons</th>
                        <th>status</th>
                        <th>rating</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categorizedProducts.map(category =>
                        category.products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
  {product.image_url && (
    <div className="w-20 h-20 overflow-hidden">
      <img
        src={`http://127.0.0.1:8000${product.image_url}`}
        alt={product.title}
        className="object-cover object-center w-full h-full"
        style={{ maxWidth: '100px', maxHeight: '100px' }} // Backup fixed size
      />
    </div>
  )}
</td>
                                <td>{product.title}</td>
                                <td>{product.short_id}</td>
                                <td>{product.description}</td>
                                <td>{product.latest_episode}</td>
                                <td>{product.seasons}</td>
                                <td>{product.status}</td>
                                <td>{product.rating}</td>
                               <td>{category.name}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(product.id)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AnimecardList;
