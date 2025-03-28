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
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            // Fetch anime data and categories in parallel
            const [animeResponse, categoriesResponse] = await Promise.all([
                fetch(`http://127.0.0.1:8000/api/animecard/animeshow/${id}`),
                fetch('http://127.0.0.1:8000/api/categoryCard/categorylist')
            ]);

            if (!animeResponse.ok) {
                throw new Error('Failed to fetch anime data');
            }

            if (!categoriesResponse.ok) {
                throw new Error('Failed to fetch categories');
            }

            const animeData = await animeResponse.json();
            const categoriesData = await categoriesResponse.json();

            // Check if animeData is properly structured
            if (!animeData || !animeData.data) {
                throw new Error('Invalid anime data format');
            }

            setFormData(animeData.data);
            setCategories(Array.isArray(categoriesData.data) ? categoriesData.data : []);
            
            // Set image preview with correct URL path
            if (animeData.data.image_url) {
                const imageUrl = animeData.data.image_url.startsWith('http') 
                    ? animeData.data.image_url 
                    : `http://127.0.0.1:8000${animeData.data.image_url}`;
                setImagePreview(imageUrl);
            }
        } catch (err) {
            setError(`Failed to load data: ${err.message}`);
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.title?.trim()) {
            errors.title = 'Title is required';
        }
        
        if (!formData.short_id?.trim()) {
            errors.short_id = 'Short ID is required';
        }
        
        if (!formData.description?.trim()) {
            errors.description = 'Description is required';
        }
        
        if (!formData.rating || parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 10) {
            errors.rating = 'Rating must be between 0 and 10';
        }
        
        if (!formData.anime_category_id) {
            errors.anime_category_id = 'Category is required';
        }
        
        if (!formData.seasons || parseInt(formData.seasons) < 1) {
            errors.seasons = 'Seasons must be at least 1';
        }
        
        if (!formData.latest_episode || parseInt(formData.latest_episode) < 1) {
            errors.latest_episode = 'Latest episode must be at least 1';
        }
        
        if (!formData.status) {
            errors.status = 'Status is required';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        // Clear validation error when field is edited
        if (validationErrors[name]) {
            setValidationErrors({
                ...validationErrors,
                [name]: null
            });
        }
        
        if (type === 'file' && files.length > 0) {
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
        
        // Reset error states
        setError(null);
        setValidationErrors({});
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        
        const formDataToSend = new FormData();
        
        // Append all form fields except image_url (which we'll handle separately)
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined && key !== 'image_url' && value !== '') {
                formDataToSend.append(key, value);
            }
        });

        // Append new image if selected
        if (newImage) {
            formDataToSend.append('image_url', newImage);
        }

        // Laravel requires _method for form PUT requests
        formDataToSend.append('_method', 'PUT');

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/animecard/animeupdate/${id}`,
                {
                    method: 'POST', // Always POST when using FormData with _method
                    body: formDataToSend,
                    headers: {
                        'Accept': 'application/json',
                        // Don't set Content-Type when using FormData
                    }
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                // Handle validation errors from server
                if (response.status === 422 && responseData.errors) {
                    setValidationErrors(responseData.errors);
                    throw new Error("Please correct the form errors");
                }
                throw new Error(responseData.message || 'Failed to update anime card');
            }

            setSuccessMessage('Anime card updated successfully!');
            setTimeout(() => navigate('/admin-dashboard/animecard/list'), 1500);
        } catch (err) {
            setError(err.message);
            console.error('Update error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const renderFieldError = (fieldName) => {
        if (validationErrors[fieldName]) {
            return (
                <p className="mt-1 text-sm text-red-600">{validationErrors[fieldName]}</p>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin"></div>
                    <p className="mt-2">Loading anime data...</p>
                </div>
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
                            value={formData.anime_category_id || ''}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                                validationErrors.anime_category_id ? "border-red-500" : ""
                            }`}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {renderFieldError("anime_category_id")}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                                validationErrors.title ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {renderFieldError("title")}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Short ID
                        </label>
                        <input
                            type="text"
                            name="short_id"
                            value={formData.short_id || ''}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                                validationErrors.short_id ? "border-red-500" : ""
                            }`}
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            A unique identifier for the anime (e.g., "naruto", "aot")
                        </p>
                        {renderFieldError("short_id")}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                                validationErrors.description ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {renderFieldError("description")}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Rating (0-10)
                            </label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating || ''}
                                onChange={handleChange}
                                min="0"
                                max="10"
                                step="0.1"
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.rating ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {renderFieldError("rating")}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Seasons
                            </label>
                            <input
                                type="number"
                                name="seasons"
                                value={formData.seasons || ''}
                                onChange={handleChange}
                                min="1"
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.seasons ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {renderFieldError("seasons")}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Latest Episode
                        </label>
                        <input
                            type="number"
                            name="latest_episode"
                            value={formData.latest_episode || ''}
                            onChange={handleChange}
                            min="1"
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                                validationErrors.latest_episode ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {renderFieldError("latest_episode")}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Status
                        </label>
                        <div className="flex flex-wrap gap-4">
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
                        {renderFieldError("status")}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Current Image
                        </label>
                        {imagePreview ? (
                            <div className="relative inline-block">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="object-cover w-48 h-48 mb-2 border rounded"
                                />
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No image available</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            {newImage ? "Replace Image" : "Upload New Image"}
                        </label>
                        <input
                            type="file"
                            name="image_url"
                            onChange={handleChange}
                            accept="image/*"
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                                validationErrors.image_url ? "border-red-500" : ""
                            }`}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Leave empty to keep the current image
                        </p>
                        {renderFieldError("image_url")}
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/admin-dashboard/animecard/list')}
                            className="w-full px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </span>
                            ) : "Update Anime Card"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAnimecard;