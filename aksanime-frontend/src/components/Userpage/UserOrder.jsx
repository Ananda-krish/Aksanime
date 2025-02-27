import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FileTextIcon, PackageIcon, TruckIcon, CheckCircleIcon } from 'lucide-react';
import DefaultLayout from '../DefaultLayout/DefaultLayout';

const UserOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/cart/myorder', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setOrders(response.data?.orders || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filterOrders = (status) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const sidebarNavItems = [
    { icon: <FileTextIcon />, label: 'All Orders', value: 'all' },
    { icon: <PackageIcon />, label: 'In Progress', value: 'in progress' },
    { icon: <TruckIcon />, label: 'Shipped', value: 'shipped' },
    { icon: <CheckCircleIcon />, label: 'Delivered', value: 'delivered' }
  ];

  const renderOrderStatus = (status) => {
    const statusStyles = {
      'in progress': 'bg-yellow-100 text-yellow-800',
      'shipped': 'bg-blue-100 text-blue-800',
      'delivered': 'bg-green-100 text-green-800'
    };
    return <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status] || 'bg-gray-100'}`}>{status}</span>;
  };

  if (loading) return <DefaultLayout><div>Loading...</div></DefaultLayout>;
  if (error) return <DefaultLayout><div>Error: {error}</div></DefaultLayout>;

  return (
    <DefaultLayout>
      <div className="flex mr-94"> {/* Added margin-left */}
        {/* Sidebar Navigation */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="fixed top-0 left-0 w-64 h-full p-4 bg-white shadow-lg"
        >
          <h2 className="mb-6 text-2xl font-bold">My Orders</h2>
          {sidebarNavItems.map((item) => (
            <motion.div
              key={item.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.value)}
              className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all 
                ${activeTab === item.value ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Orders Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="flex-1 min-h-screen p-8 bg-gray-50"
        >
          {filterOrders(activeTab).length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500">
              No orders found
            </motion.div>
          ) : (
            <div className="grid max-w-4xl gap-6 mx-auto">
              {filterOrders(activeTab).map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                    {renderOrderStatus(order.status)}
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <img
                        src={`http://127.0.0.1:8000${order.product.image_url}`}
                        alt={order.product.title}
                        className="object-cover w-full h-48 mb-4 transition-transform rounded-lg hover:scale-105"
                      />
                      <p className="text-lg font-medium">{order.product.title}</p>
                      <p className="text-gray-600">
                        Ordered on: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="mb-3 text-lg font-semibold">Delivery Details</h3>
                      <div className="space-y-2">
                        <p className="flex items-center"><span className="w-24 font-medium">Name:</span> {order.name}</p>
                        <p className="flex items-center"><span className="w-24 font-medium">Address:</span> {order.rec_address}</p>
                        <p className="flex items-center"><span className="w-24 font-medium">Phone:</span> {order.phone}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DefaultLayout>
  );
};

export default UserOrderPage;