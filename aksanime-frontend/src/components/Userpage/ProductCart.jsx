import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ProductCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    fetchCartItems();
    extractUserDataFromToken();
  }, []);

  // Extract user data from the token in localStorage
  const extractUserDataFromToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Decode the JWT token to extract user data
      const base64Url = token.split('.')[1]; // Extract the payload part of the token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix base64 formatting
      const decodedToken = JSON.parse(window.atob(base64)); // Decode the payload

      // Pre-fill the form with user data from the token
      setFormData({
        name: decodedToken.name || '',
        phone: decodedToken.phone_number || '',
        address: '',
      });
    } catch (err) {
      console.error('Error extracting user data from token:', err);
    }
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Redirect to login if no token exists
        return;
      }

      const response = await axios.get('http://localhost:8000/api/cart/getCart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.cart_items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Redirect to login if no token exists
        return;
      }

      // Send the PUT request to update the cart item's quantity
      await axios.put(
        `http://localhost:8000/api/cart/update/${cartItemId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fetch the updated cart items
      fetchCartItems();
      toast.success('Cart updated successfully');
    } catch (err) {
      console.error('Error updating cart:', err);
      if (err.response?.status === 401) {
        window.location.href = '/login'; // Redirect to login if token is invalid
      } else if (err.response?.status === 400) {
        toast.error(err.response?.data?.error || 'Invalid quantity');
      } else {
        toast.error('Failed to update cart');
      }
    }
  };

  // Remove cart item
  const removeItem = async (cartItemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Redirect to login if no token exists
        return;
      }

      await axios.delete(`http://localhost:8000/api/cart/remove/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartItems();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Place order
  const placeOrder = async () => {
    try {
      setIsPlacingOrder(true);
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Redirect to login if no token exists
        return;
      }

      // Validate form data
      if (!formData.name || !formData.address || !formData.phone) {
        toast.error('Please fill out all fields');
        setIsPlacingOrder(false);
        return;
      }

      // Send the order confirmation request
      await axios.post(
        'http://localhost:8000/api/cart/confirmorder',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear the cart and show success message
      setCartItems([]);
      setTotal(0);
      toast.success('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order:', err);
      toast.error(err.response?.data?.error || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-amber-50">
        <div className="w-16 h-16 border-t-4 border-b-4 rounded-full border-amber-800 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center bg-amber-50">
        <div className="text-amber-800">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container max-w-4xl px-4 py-12 mx-auto">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 text-4xl font-bold text-center text-amber-900"
        >
          Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <div className="p-8 text-xl text-center text-amber-900">Your cart is empty</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="p-4 border-2 rounded-lg bg-amber-100 border-amber-900"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://127.0.0.1:8000${item.product.image_url}`}
                    alt={item.product.title}
                    className="object-cover w-24 h-24 border-2 rounded border-amber-900"
                  />

                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-amber-900">{item.product.title}</h3>
                    <p className="text-amber-800">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 border-2 rounded text-amber-900 border-amber-900 hover:bg-amber-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border-2 rounded text-amber-900 border-amber-900 hover:bg-amber-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 border-2 rounded text-amber-900 border-amber-900 hover:bg-amber-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              </motion.div>
            ))}

            <div className="p-4 mt-8 border-2 rounded-lg bg-amber-200 border-amber-900">
              <div className="flex justify-between text-xl font-bold text-amber-900">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Order Form */}
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-amber-900 border-amber-900 focus:outline-none focus:border-amber-800"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Delivery Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-amber-900 border-amber-900 focus:outline-none focus:border-amber-800"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-amber-900 border-amber-900 focus:outline-none focus:border-amber-800"
                  required
                />
                <button
                  onClick={placeOrder}
                  disabled={isPlacingOrder}
                  className="w-full px-6 py-3 font-bold text-center rounded-lg text-amber-50 bg-amber-900 hover:bg-amber-800 disabled:bg-amber-300 disabled:cursor-not-allowed"
                >
                  {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                </button>
                <button
                  
                  className="w-full px-6 py-3 font-bold text-center rounded-lg text-amber-50 bg-amber-900 hover:bg-amber-800 disabled:bg-amber-300 disabled:cursor-not-allowed"
                >
                <Link to={`/stripe/${total}`}>payment</Link>  
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductCart;