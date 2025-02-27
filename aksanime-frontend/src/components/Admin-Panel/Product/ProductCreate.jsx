import React, { useState, useEffect } from "react";

export default function ProductCreate() {
  const initialFormState = {
    product_category_id: "",
    title: "",
    description: "",
    product_rating: "",
    price: "",
    anime_card_id: "",
    warranty_details: "",
    image_url: null,
    stock: "", // Add stock field
  };

  const [categories, setCategories] = useState([]);
  const [animecard, setAnimeCard] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/productcategory/productcategorylist"
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchAnimeCard();
  }, []);

  const fetchAnimeCard = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/animecard/animelist");
      if (!response.ok) throw new Error("Failed to fetch anime card");
      const data = await response.json();
      setAnimeCard(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching anime card:", error);
      setError("Failed to load anime card");
      setAnimeCard([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      // Handle price conversion to float
      if (name === "price") {
        setFormData({ ...formData, [name]: value ? parseFloat(value).toFixed(2) : "" });
      } else if (name === "stock") {
        // Ensure stock is treated as an integer
        setFormData({ ...formData, [name]: value ? parseInt(value, 10) : "" });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          form.append(key, value);
        }
      });

      const response = await fetch("http://127.0.0.1:8000/api/product/productcreate", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      setSuccessMessage("Product created successfully!");
      setFormData(initialFormState);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-2xl font-bold">Create New Product</h2>

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
            <label className="block mb-1 text-sm font-medium">Anime</label>
            <select
              name="anime_card_id"
              value={formData.anime_card_id}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Anime</option>
              {animecard.map((anime) => (
                <option key={anime.id} value={anime.id}>
                  {anime.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="product_category_id"
              value={formData.product_category_id}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Rating (0-10)</label>
            <input
              type="number"
              name="product_rating"
              value={formData.product_rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Warranty Details (Years)</label>
            <input
              type="number"
              name="warranty_details"
              value={formData.warranty_details}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Image</label>
            <input
              type="file"
              name="image_url"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}