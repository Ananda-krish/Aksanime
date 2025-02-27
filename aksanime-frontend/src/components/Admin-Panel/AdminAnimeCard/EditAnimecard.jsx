import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAnimecard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        anime_category_id: '',
        title: '',
        short_id: '',
        description: '',
        rating: '',
        status: '',
        seasons: '',
        latest_episode: '',
        image_url: ''
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [animeResponse, categoriesResponse] = await Promise.all([
                fetch(`http://127.0.0.1:8000/api/animecard/animeshow/${id}`),
                fetch('http://127.0.0.1:8000/api/categoryCard/categorylist')
            ]);

            if (!animeResponse.ok || !categoriesResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const [categoriesData, animeData] = await animeResponse.json();
            const categoryList = await categoriesResponse.json();

            setFormData(animeData);
            setCategories(categoryList.data || []);
            setImagePreview(animeData.image_url ? `http://127.0.0.1:8000${animeData.image_url}` : null);
        } catch (err) {
            setError('Failed to load anime data. Please try again.');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.title?.trim()) errors.push('Title is required');
        if (!formData.description?.trim()) errors.push('Description is required');
        if (!formData.short_id) errors.push('Short ID is required');
        if (!formData.rating || formData.rating < 0 || formData.rating > 10) {
            errors.push('Rating must be between 0 and 10');
        }
        if (!formData.anime_category_id) errors.push('Category is required');
        if (!formData.seasons || formData.seasons < 1) errors.push('Seasons must be at least 1');
        if (!formData.latest_episode || formData.latest_episode < 1) {
            errors.push('Latest episode must be at least 1');
        }

        if (errors.length > 0) {
            setError(errors.join(', '));
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);
        
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined && key !== 'image_url') {
                formDataToSend.append(key, value);
            }
        });

        if (newImage) {
            formDataToSend.append('image_url', newImage);
        }

        formDataToSend.append('_method', 'PUT');

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/animecard/animeupdate/${id}`,
                {
                    method: 'POST',
                    body: formDataToSend,
                    headers: {
                        'Accept': 'application/json',
                        
                    },
                
                });
                    
               

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update anime');
            }

            setSuccessMessage('Anime updated successfully!');
            setTimeout(() => navigate('/admin-dashboard/animecard/list'), 1500);
        } catch (err) {
            setError(err.message);
            console.error('Update error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-4 text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl p-4 mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold">Edit Anime Card</h2>
                
                {error && (
                    <div className="p-4 mb-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
                        {error}
                    </div>
                )}
                
                {successMessage && (
                    <div className="p-4 mb-4 text-green-700 border border-green-200 rounded-lg bg-green-50">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Category
                        </label>
                        <select
                            name="anime_category_id"
                            value={formData.anime_category_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Short ID
                        </label>
                        <input
                            type="text"
                            name="short_id"
                            value={formData.short_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Rating (0-10)
                            </label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                min="0"
                                max="10"
                                step="0.1"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Seasons
                            </label>
                            <input
                                type="number"
                                name="seasons"
                                value={formData.seasons}
                                onChange={handleChange}
                                min="1"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Latest Episode
                        </label>
                        <input
                            type="number"
                            name="latest_episode"
                            value={formData.latest_episode}
                            onChange={handleChange}
                            min="1"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Status
                        </label>
                        <div className="flex space-x-4">
                            {['ongoing', 'completed', 'upcoming'].map((status) => (
                                <label key={status} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status}
                                        checked={formData.status === status}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    <span className="capitalize">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Current Image
                        </label>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="object-cover w-32 h-32 mb-2 rounded"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            New Image
                        </label>
                        <input
                            type="file"
                            name="image_url"
                            onChange={handleChange}
                            accept="image/*"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {loading ? "Updating..." : "Update Anime Card"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditAnimecard;