import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminProductVariant.css";

const AnimeEpisodeList = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [categoryResponse, productResponse] = await Promise.all([
                    fetch('http://127.0.0.1:8000/api/animecard/animelist'),
                    fetch('http://127.0.0.1:8000/api/animeepisode/episodelist'),
                ]);

                if (!categoryResponse.ok || !productResponse.ok) {
                    throw new Error('Failed to fetch data from the server');
                }

                const [categoryData, productData] = await Promise.all([
                    categoryResponse.json(),
                    productResponse.json(),
                ]);

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

    const handleEdit = (id) => {
        navigate(`/admin-dashboard/editanimeepisode/${id}`);
    };

    const handleDelete = async (videoId) => {
        if (!window.confirm('Are you sure you want to delete this video?')) {
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/workshopvideo/videodelete/${videoId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete video');
            }

            const result = await response.json();
            setProducts(products.filter(product => product.id !== videoId));
            alert(result.message);
        } catch (error) {
            console.error('Delete error:', error);
            setError(error.message || 'An error occurred while deleting the video');
        }
    };

    const VideoPlayer = ({ videoUrl }) => (
        <video controls width="250">
            <source
                src={`http://127.0.0.1:8000/storage/${videoUrl}`}
                type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>
    );

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    const categorizedProducts = categories.map((category) => ({
        ...category,
        products: products.filter(product => product.anime_card_id === category.id),
    }));

    return (
        <div className="admin-product-table">
            <div className="header-container">
                <h2>Workshop Management</h2>
                <Link
                    to="/admin-dashboard/create/animeepisode"
                    className="link-button create-product-btn"
                >
                    Create Workshop Video
                </Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <table>
                <thead>
                    <tr>
                        <th>Video ID</th>
                        <th>Video</th>
                        <th>title</th>
                        <th>Description</th>
                        <th> episode_number</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categorizedProducts.map((category) =>
                        category.products.map((product) => (
                            <tr key={`${category.id}-${product.id}`}>
                                <td>{product.id}</td>
                                <td>
                                    {product.video_url && (
                                        <VideoPlayer videoUrl={product.video_url} />
                                    )}
                                </td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.episode_number}</td>
                                <td>{category.title}</td>
                                <td className="action-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AnimeEpisodeList;
