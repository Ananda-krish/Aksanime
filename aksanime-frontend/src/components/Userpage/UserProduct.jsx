import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ShoppingCart, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { refreshToken } from '../../utils/authUtils.js';

const UserProduct = () => {
    const { animeId } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addingToCart, setAddingToCart] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!animeId) throw new Error('Anime ID is missing.');
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch(`http://localhost:8000/api/product/product/${animeId}/products`),
                    fetch('http://localhost:8000/api/productcategory/productcategorylist')
                ]);

                if (!productsResponse.ok || !categoriesResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const productsData = await productsResponse.json();
                const categoriesData = await categoriesResponse.json();

                setProducts(productsData);
                setCategories(categoriesData.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [animeId]);

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.product_category_id === parseInt(selectedCategory));

    const handleAddToCart = async (product) => {
        try {
            setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
            let token = localStorage.getItem('token');
        
            if (!token) {
                navigate('/login');
                return;
            }
        
            try {
                const response = await axios.post(
                    `http://localhost:8000/api/cart/add/${product.id}`,
                    { quantity: 1 },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
        
                toast.success('Added to cart successfully');
                navigate('/Productcart');
            } catch (error) {
                if (error.response?.status === 401) {
                    try {
                        const newToken = await refreshToken();
                        token = newToken;
        
                        await axios.post(
                            `http://localhost:8000/api/cart/add/${product.id}`,
                            { quantity: 1 },
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );
        
                        toast.success('Added to cart successfully');
                        navigate('/Productcart');
                    } catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        navigate('/login');
                    }
                } else {
                    toast.error(error.response?.data?.error || 'Failed to add to cart');
                }
            }
        } finally {
            setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
        }
    };

    // Animation variants for framer-motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    // Loading state
    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-amber-50">
            <div className="w-16 h-16 border-t-4 border-b-4 rounded-full border-amber-800 animate-spin"></div>
        </div>
    );

    // Error state
    if (error) return (
        <div className="p-4 text-center bg-amber-50">
            <div className="text-amber-800">{error}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-amber-50">
            {/* Vintage texture overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWI3YjRhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>

            <div className="container relative px-4 py-8 mx-auto sm:py-12 max-w-8xl">
                {/* Vintage Header */}
                <motion.h1 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative mb-8 font-serif text-3xl font-bold text-center sm:text-4xl md:text-5xl sm:mb-12"
                >
                    <span className="relative z-10 text-amber-900">
                        Vintage Collection
                    </span>
                    <div className="absolute inset-0 bg-amber-100 -rotate-2 -z-10"></div>
                </motion.h1>

                {/* Category Filter with vintage style */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-wrap items-center justify-center gap-2 mb-5 sm:gap-4"
                >
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-3 py-2 text-sm font-serif border-2 border-amber-900 transition-all duration-300 transform sm:px-6 sm:py-3 sm:text-lg hover:scale-105 ${
                            selectedCategory === 'all'
                                ? 'bg-amber-900 text-amber-50'
                                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                        }`}
                    >
                        All Products
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id.toString())}
                            className={`px-3 py-2 text-sm font-serif border-2 border-amber-900 transition-all duration-300 transform sm:px-6 sm:py-3 sm:text-lg hover:scale-105 ${
                                selectedCategory === category.id.toString()
                                    ? 'bg-amber-900 text-amber-50'
                                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Products Grid or No Products Message */}
                {filteredProducts.length === 0 ? (
                    <div className="p-8 font-serif text-lg text-center text-amber-900 sm:text-xl">
                        No products available in this category.
                    </div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-4 px-2 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:px-4"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                                className="relative w-full mx-auto overflow-hidden border-4 rounded sm:border-6 border-amber-900 bg-amber-100"
                                style={{
                                    boxShadow: '6px 6px 0 rgba(120, 53, 15, 0.3)',
                                }}
                            >
                                {/* Product Title Banner */}
                                <div className="relative px-3 py-1 font-serif text-base font-bold text-amber-50 sm:px-4 sm:py-2 sm:text-lg bg-amber-900">
                                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2I4ODc0YSI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNhMjc5M2YiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNhMjc5M2YiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=')]"></div>
                                    <span className="line-clamp-1">{product.title}</span>
                                </div>

                                {/* Product Image */}
                                <div className="relative h-48 pt-0 group sm:h-64 border-y-2 sm:border-y-4 border-amber-900">
                                    <img
                                        src={`http://127.0.0.1:8000${product.image_url}`}
                                        alt={product.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 transition-opacity opacity-0 bg-amber-900 group-hover:opacity-20"></div>
                                </div>

                                {/* Product Details */}
                                <div className="p-4 bg-amber-50 sm:p-6">
                                    {/* Description */}
                                    <p className="mb-3 font-serif text-xs transition-all duration-300 sm:text-sm text-amber-900 line-clamp-2 hover:line-clamp-none">
                                        {product.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                                        <div className="flex items-center transform scale-125 sm:scale-150">
                                            {[...Array(5)].map((_, index) => (
                                                <motion.svg
                                                    key={index}
                                                    whileHover={{ scale: 1.2 }}
                                                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                                                        index < Math.floor(product.product_rating)
                                                            ? 'text-amber-900'
                                                            : 'text-amber-200'
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </motion.svg>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Warranty Info */}
                                    <div className="p-1 mb-2 text-xs border border-amber-900 sm:text-sm sm:border-2 sm:mb-3 bg-amber-100">
                                        <p className="font-serif font-semibold text-amber-900">Warranty:</p>
                                        <p className="transition-all text-amber-800 line-clamp-2 hover:line-clamp-none">
                                            <b>{product.warranty_details}: YEAR</b>  
                                        </p>
                                    </div>

                                    {/* Price and Action */}
                                    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                                        <motion.div 
                                            whileHover={{ scale: 1.1 }}
                                            className="px-3 py-1 font-serif text-xl font-bold border-2 rounded sm:px-4 sm:py-2 sm:text-2xl md:text-3xl text-amber-900 bg-amber-200 border-amber-900"
                                            style={{
                                                backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2ZmZGU4OCI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNmZmQ3NzAiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNmZmQ3NzAiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=')",
                                                backgroundSize: '50px 50px',
                                            }}
                                        >
                                            ${product.price}
                                        </motion.div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleAddToCart(product)}
                                            disabled={addingToCart[product.id]}
                                            className="flex items-center justify-center gap-1 px-4 py-2 font-serif text-sm transition-all border-2 rounded sm:text-base sm:gap-2 sm:px-6 sm:py-3 text-amber-50 bg-amber-900 border-amber-900 hover:bg-amber-800 disabled:opacity-50"
                                        >
                                            {addingToCart[product.id] ? (
                                                <>
                                                    <Loader className="w-3 h-3 animate-spin sm:w-4 sm:h-4" />
                                                    <span>Adding...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span>Add to Cart</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default UserProduct;