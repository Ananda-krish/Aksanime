import React, { useState, useEffect } from "react";

const CreateAnimeCard = () => {
  const initialFormState = {
    anime_category_id: "",
    title: "",
    short_id: "",
    description: "",
    rating: "",
    status: "ongoing", // Set a default value
    seasons: "",
    latest_episode: "",
    image_url: null,
  };

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/categoryCard/categorylist");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // Clear any validation errors when the field is edited
    setValidationErrors({
      ...validationErrors,
      [name]: null
    });

    if (type === "file") {
      if (files.length > 0) {
        setFormData({ ...formData, [name]: files[0] });
        
        // Create preview URL for the selected image
        const previewUrl = URL.createObjectURL(files[0]);
        setPreviewImage(previewUrl);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.short_id.trim()) {
      errors.short_id = "Short ID is required";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    
    if (!formData.rating) {
      errors.rating = "Rating is required";
    } else if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 10) {
      errors.rating = "Rating must be between 0 and 10";
    }
    
    if (!formData.seasons || parseInt(formData.seasons) < 1) {
      errors.seasons = "Seasons must be at least 1";
    }
    
    if (!formData.latest_episode || parseInt(formData.latest_episode) < 1) {
      errors.latest_episode = "Latest episode must be at least 1";
    }
    
    if (!formData.anime_category_id) {
      errors.anime_category_id = "Please select a category";
    }
    
    if (!formData.image_url) {
      errors.image_url = "Please upload an image";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setSuccessMessage("");
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setLoading(true);

    try {
      const form = new FormData();
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          form.append(key, value);
        }
      });

      const response = await fetch("http://127.0.0.1:8000/api/animecard/animecreate", {
        method: "POST",
        body: form,
        // Not setting Content-Type header as FormData sets it automatically with boundary
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle validation errors from the server
        if (response.status === 422 && responseData.errors) {
          setValidationErrors(responseData.errors);
          throw new Error("Please correct the form errors");
        }
        throw new Error(responseData.message || "Failed to create anime card");
      }

      // Success handling
      setSuccessMessage("Anime card created successfully!");
      setFormData(initialFormState);
      setPreviewImage(null);
      setValidationErrors({});
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error("Error creating anime card:", error);
      setError(error.message);
    } finally {
      setLoading(false);
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

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-2xl font-bold">Create New Anime Card</h2>
        
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
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="anime_category_id"
              value={formData.anime_category_id}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
            <label className="block mb-1 text-sm font-medium">Anime Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.title ? "border-red-500" : ""
              }`}
              required
            />
            {renderFieldError("title")}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Short ID</label>
            <input
              type="text"
              name="short_id"
              value={formData.short_id}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.description ? "border-red-500" : ""
              }`}
              required
            />
            {renderFieldError("description")}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Rating (0-10)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.rating ? "border-red-500" : ""
              }`}
              required
            />
            {renderFieldError("rating")}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Latest Episode</label>
            <input
              type="number"
              name="latest_episode"
              value={formData.latest_episode}
              onChange={handleChange}
              min="1"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.latest_episode ? "border-red-500" : ""
              }`}
              required
            />
            {renderFieldError("latest_episode")}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Seasons</label>
            <input
              type="number"
              name="seasons"
              value={formData.seasons}
              onChange={handleChange}
              min="1"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.seasons ? "border-red-500" : ""
              }`}
              required
            />
            {renderFieldError("seasons")}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <div className="flex flex-wrap gap-4">
              {["ongoing", "completed", "upcoming"].map((status) => (
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
            <label className="block mb-1 text-sm font-medium">Image</label>
            <input
              type="file"
              name="image_url"
              onChange={handleChange}
              accept="image/*"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.image_url ? "border-red-500" : ""
              }`}
              required
            />
            {renderFieldError("image_url")}
            
            {previewImage && (
              <div className="mt-2">
                <p className="mb-1 text-sm font-medium">Preview:</p>
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="object-cover w-48 h-48 border rounded"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Anime Card"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnimeCard;