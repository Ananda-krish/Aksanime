import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css';

export default function ProductList() {
    const [categories, setCategories] = useState([]);
    const [animecard, setAnimecard] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/admin-dashboard/edit/product/${id}`);
    };

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [categoryResponse, productResponse, animeResponse] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/productcategory/productcategorylist'),
                    fetch('http://127.0.0.1:8000/api/product/productlist'),
                    fetch('http://127.0.0.1:8000/api/animecard/animelist'),
                ]);

                if (!categoryResponse.ok || !productResponse.ok || !animeResponse.ok) {
                    throw new Error('Failed to fetch categories or anime or product');
                }

                const [categoryData, productData, animeData] = await Promise.all([
                    categoryResponse.json(),
                    productResponse.json(),
                    animeResponse.json()
                ]);

                setCategories(categoryData.data);
                setProducts(productData.data);
                setAnimecard(animeData.data);
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

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    const categorizedProducts = categories.map((category) => ({
        ...category,
        products: products.filter(product => product.product_category_id === category.id)
    }));

    const animizedProducts = animecard.map((anime) => ({
        ...anime,
        products: products.filter(product => product.anime_card_id === anime.id)
    }));

    return (
        <div className="admin-product-table">
            <div className="header">
                <h2>Product Management</h2>
                <Link to="/admin-dashboard/create/product" className="create-button">
                    Create Animecard
                </Link>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Warranty</th>
                            <th>Rating</th>
                            <th>Anime</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            const category = categories.find(c => c.id === product.product_category_id);
                            const anime = animecard.find(a => a.id === product.anime_card_id);
                            
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        {product.image_url && (
                                            <div className="image-container">
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
                                    <td className="description">{product.description}</td>
                                    <td>${product.price}</td>
                                    <td>{product.warranty_details}</td>
                                    <td>{product.product_rating}</td>
                                    <td>{anime?.title || 'N/A'}</td>
                                    <td>{category?.name || 'N/A'}</td>
                                    <td className="actions">
                                        <button 
                                            className="edit-button"
                                            onClick={() => handleEdit(product.id)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}