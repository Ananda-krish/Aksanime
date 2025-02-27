import React, { useEffect, useState } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ShoppingCart, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { refreshToken } from '../../utils/authUtils.js';;

const UserProduct = () => {
    const { animeId } = useParams();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addingToCart, setAddingToCart] = useState({});

const navigate=useNavigate();
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
              // Attempt to add the product to the cart
              await axios.post(
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
                // Token is expired or invalid, attempt to refresh it
                try {
                  const newToken = await refreshToken();
                  token = newToken; // Update the token
        
                  // Retry the original request with the new token
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
                  navigate('/login'); // Redirect to login if refresh fails
                }
              } else {
                // Handle other errors
                toast.error(error.response?.data?.error || 'Failed to add to cart');
              }
            }
          } finally {
            setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
          }
        };

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

   

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-amber-50">
            <div className="w-16 h-16 border-t-4 border-b-4 rounded-full border-amber-800 animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="p-4 text-center bg-amber-50">
            <div className="text-amber-800">{error}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-amber-50">
            {/* Vintage texture overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWI3YjRhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>

            <div className="container relative px-4 py-12 mx-auto max-w-8xl">
                {/* Vintage Header */}
                <motion.h1 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative mb-12 font-serif text-5xl font-bold text-center"
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
                    className="flex flex-wrap items-center justify-center gap-4 mb-5"
                >
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-3 text-lg font-serif border-2 border-amber-900 transition-all duration-300 transform hover:scale-105 ${
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
                            className={`px-6 py-3 text-lg font-serif border-2 border-amber-900 transition-all duration-300 transform hover:scale-105 ${
                                selectedCategory === category.id.toString()
                                    ? 'bg-amber-900 text-amber-50'
                                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {filteredProducts.length === 0 ? (
                    <div className="p-8 font-serif text-xl text-center text-amber-900">
                        No products available in this category.
                    </div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                         className="grid grid-cols-1 gap-6 px-4 mt-8 md:grid-cols-3 sm:grid-cols-2">

                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                                className="relative w-full max-w-sm  mx-auto overflow-hidden border-6 rounded-[8px] bg-amber-100 border-amber-900 "
                                style={{
                                    boxShadow: '8px 8px 0 rgba(120, 53, 15, 0.3)',
                                }}
                            >
                                {/* Product Title Banner */}
                                <div className="relative px-4 py-2 font-serif text-lg font-bold text-amber-50 bg-amber-900">
                                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI2I4ODc0YSI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNhMjc5M2YiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiNhMjc5M2YiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=')]"></div>
                                    {product.title}
                                </div>

                                {/* Product Image */}
                                <div className="relative h-64 pt-0 group border-y-4 border-amber-900">
                                    <img
                                        src={`http://127.0.0.1:8000${product.image_url}`}
                                        alt={product.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 transition-opacity opacity-0 bg-amber-900 group-hover:opacity-20"></div>
                                </div>

                                {/* Product Details */}
                                <div className="p-6 bg-amber-50">
                                    {/* Description */}
                                    <p className="mb-4 font-serif text-sm transition-all duration-300 text-amber-900 line-clamp-2 hover:line-clamp-none">
                                        {product.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="flex items-center transform scale-150">
                                            {[...Array(5)].map((_, index) => (
                                                <motion.svg
                                                    key={index}
                                                    whileHover={{ scale: 1.2 }}
                                                    className={`w-6 h-6 transition-colors ${
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
                                    <div className="p-1 mb-1 text-sm border-2 border-amber-900 bg-amber-100">
                                        <p className="font-serif font-semibold text-amber-900">Warranty:</p>
                                        <p className="transition-all text-amber-800 line-clamp-2 hover:line-clamp-none">
                                          <b>{product.warranty_details}: YEAR </b>  
                                        </p>
                                    </div>

                                    {/* Price and Action */}
                                    <div className="flex items-center justify-between gap-2">
                                        <motion.div 
                                            whileHover={{ scale: 1.1 }}
                                            className="px-4 py-2  font-serif text-3xl font-bold border-2 rounded-[8px] text-amber-900 bg-amber-200 border-amber-900"
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
                    className="flex items-center justify-center gap-2 px-6 py-3 font-serif transition-all border-2 rounded text-amber-50 bg-amber-900 border-amber-900 hover:bg-amber-800 disabled:opacity-50"
                  >
                    {addingToCart[product.id] ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
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