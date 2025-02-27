import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        product_category_id: "",
        title: "",
        description: "",
        product_rating: "",
        price: "",
        anime_card_id: "",
        warranty_details: "",
        image_url: ""
    });
    const [categories, setCategories] = useState([]);
    const [animecard, setAnimecard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/product/productshow/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                
                const productData = data[1];
                const categoriesData = data[0];
                const animeData = data[2];

                setFormData({
                    product_category_id: productData.product_category_id.toString(),
                    title: productData.title,
                    description: productData.description,
                    product_rating: productData.product_rating,
                    price: productData.price,
                    anime_card_id: productData.anime_card_id.toString(),
                    warranty_details: productData.warranty_details,
                    image_url: productData.image_url
                });

                setCategories(categoriesData);
                setAnimecard(animeData);
                setImagePreview(productData.image_url ? 
                    `http://127.0.0.1:8000${productData.image_url}` : null);

            } catch (err) {
                setError('Failed to load product data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError('Title is required');
            return false;
        }
        if (!formData.description.trim()) {
            setError('Description is required');
            return false;
        }
        if (!formData.product_category_id) {
            setError('Category is required');
            return false;
        }
        if (!formData.anime_card_id) {
            setError('Anime is required');
            return false;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            setError('Valid price is required');
            return false;
        }
        if (!formData.product_rating || parseFloat(formData.product_rating) < 0 || parseFloat(formData.product_rating) > 5) {
            setError('Rating must be between 0 and 5');
            return false;
        }
        if (!formData.warranty_details.trim()) {
            setError('Warranty details are required');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            if (file) {
                setNewImage(file);
                setImagePreview(URL.createObjectURL(file));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setLoading(true);
        setError(null);
        
        const formDataToSend = new FormData();
    
        // Append all form fields except image_url
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'image_url') {
                formDataToSend.append(key, value);
            }
        });
    
        // Append new image if it exists
        if (newImage) {
            formDataToSend.append('image_url', newImage);
        }
    
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/product/productupdate/${id}`,
                {
                    method: 'POST',
                    body: formDataToSend,
                    redirect: 'follow', // Handle redirects automatically
                }
            );
    
            // Handle redirect response
            if (response.redirected) {
                setSuccessMessage('Product updated successfully!');
                setTimeout(() => navigate('/admin-dashboard/list/product'), 1500);
                return;
            }
    
            // Try to parse JSON response
            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                // If response is not JSON, treat as success if status is 200-299
                if (response.ok) {
                    setSuccessMessage('Product updated successfully!');
                    setTimeout(() => navigate('/admin-dashboard/list/product'), 1500);
                    return;
                } else {
                    throw new Error('Server returned an invalid response');
                }
            }
    
            // Handle JSON response
            if (response.ok) {
                setSuccessMessage(data.message || 'Product updated successfully!');
                setTimeout(() => navigate('/admin-dashboard/list/product'), 1500);
            } else {
                throw new Error(data.message || 'Failed to update product');
            }
        } catch (err) {
            setError('Failed to update product. Please try again.');
            console.error('Update error:', err);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="max-w-3xl p-6 mx-auto">
            <div className="p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold">Edit Product</h2>
                
                {error && (
                    <div className="p-4 mb-4 text-red-700 rounded-lg bg-red-50">
                        {error}
                    </div>
                )}
                
                {successMessage && (
                    <div className="p-4 mb-4 text-green-700 rounded-lg bg-green-50">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields remain the same, but update Rating field max value */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Anime
                            </label>
                            <select
                                name="anime_card_id"
                                value={formData.anime_card_id}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Anime</option>
                                {animecard.map(anime => (
                                    <option key={anime.id} value={anime.id}>
                                        {anime.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Category
                            </label>
                            <select
                                name="product_category_id"
                                value={formData.product_category_id}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Rating (0-5)
                            </label>
                            <input
                                type="number"
                                name="product_rating"
                                value={formData.product_rating}
                                onChange={handleChange}
                                min="0"
                                max="5"
                                step="0.01"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Warranty Details
                            </label>
                            <input
                                type="text"
                                name="warranty_details"
                                value={formData.warranty_details}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Current Image
                            </label>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="object-cover w-32 h-32 rounded-lg"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                New Image
                            </label>
                            <input
                                type="file"
                                name="image_url"
                                onChange={handleChange}
                                accept="image/*"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}