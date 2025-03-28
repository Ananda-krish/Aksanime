import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
        const response = await axios.get('http://localhost:8000/api/cart/vieworder', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Function to update status to "on the way"
  const updateStatusOnTheWay = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
      await axios.get(`http://localhost:8000/api/cart/ontheway/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the local state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: 'on the way' } : order
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to update status.');
    }
  };

  // Function to update status to "Delivered"
  const updateStatusDelivered = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
      await axios.get(`http://localhost:8000/api/cart/delivered/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the local state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: 'Delivered' } : order
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to update status.');
    }
  };

  // Updated PrintPdf function with correct PDF handling
  const PrintPdf = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
      
      const response = await axios.get(`http://localhost:8000/api/cart/printpdf/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
        },
        responseType: 'json',
      });

      // Convert base64 to binary
      const binaryStr = window.atob(response.data.pdf);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);
      
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      // Create blob with correct MIME type
      const blob = new Blob([bytes.buffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Open PDF in new tab
      window.open(url, '_blank');

      // Alternative: Download the PDF
      // const link = document.createElement('a');
      // link.href = url;
      //  link.download = response.data.filename;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (err) {
      console.error('PDF Error:', err);
      setError(err.message || 'Failed to generate PDF.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-b-4 rounded-full border-amber-900 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center bg-amber-50">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-amber-50">
      <h1 className="mb-8 text-3xl font-bold text-center text-amber-900">Order List</h1>
      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="bg-amber-200 text-amber-900">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Product Image</th>
              <th className="px-6 py-3">Product Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">payment Status</th>
              <th className="px-6 py-3">Change Status</th>
              <th className="px-6 py-3">Print PDF</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-amber-200 hover:bg-amber-100">
                <td className="px-6 py-4">{order.name}</td>
                <td className="px-6 py-4">{order.rec_address}</td>
                <td className="px-6 py-4">{order.phone}</td>
                <td className="px-6 py-4">
                  <img
                    src={`http://127.0.0.1:8000${order.product.image_url}`}
                    alt={order.product.title}
                    className="object-cover w-16 h-16 rounded"
                  />
                </td>
                <td className="px-6 py-4">{order.product.title}</td>
                <td className="px-6 py-4">{order.payment_status}</td>
                <td
                  className={`px-6 py-4 font-bold ${
                    order.status === 'inprogress'
                      ? 'text-red-600'
                      : order.status === 'on the way'
                      ? 'text-blue-600'
                      : 'text-green-600'
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => updateStatusOnTheWay(order.id)}
                  >
                    On the Way
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    onClick={() => updateStatusDelivered(order.id)}
                  >
                    Delivered
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
                    onClick={() => PrintPdf(order.id)}
                  >
                    Print PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;