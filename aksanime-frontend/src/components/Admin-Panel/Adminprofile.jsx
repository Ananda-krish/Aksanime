import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const AdminProfile = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/login/index', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDashboardData(response.data.stats);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const orderData = {
    labels: ['Delivered Orders', 'Pending Orders'],
    datasets: [
      {
        data: [dashboardData.deliveredOrders, dashboardData.pendingOrders],
        backgroundColor: ['#4caf50', '#ffc107'],
        borderColor: ['#43a047', '#ffb300'],
        borderWidth: 1,
      },
    ],
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/login/logout",
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      ).catch(() => {});

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Header Section */}
      <div className="p-6 mb-8 overflow-hidden transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold tracking-tight">Welcome, Admin!</h1>
            <p className="mt-1 text-blue-100">Manage and monitor your dashboard</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 font-semibold text-blue-600 transition-all bg-white rounded-lg shadow-sm hover:bg-blue-50">
              Edit Profile
            </button>
            <button 
              className="px-6 py-2 font-semibold text-white transition-all bg-red-500 rounded-lg shadow-sm hover:bg-red-600" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 transition-all transform bg-white rounded-lg shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="mt-4 text-4xl font-bold text-blue-600">{dashboardData.totalUsers}</p>
          <div className="w-full h-1 mt-2 bg-blue-100">
            <div className="w-1/2 h-1 bg-blue-500"></div>
          </div>
        </div>

        <div className="p-6 transition-all transform bg-white rounded-lg shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
          <p className="mt-4 text-4xl font-bold text-green-600">{dashboardData.totalProducts}</p>
          <div className="w-full h-1 mt-2 bg-green-100">
            <div className="w-2/3 h-1 bg-green-500"></div>
          </div>
        </div>

        <div className="p-6 transition-all transform bg-white rounded-lg shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
          <p className="mt-4 text-4xl font-bold text-purple-600">{dashboardData.totalOrders}</p>
          <div className="w-full h-1 mt-2 bg-purple-100">
            <div className="w-3/4 h-1 bg-purple-500"></div>
          </div>
        </div>

        <div className="p-6 transition-all transform bg-white rounded-lg shadow-md hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Pending Orders</h3>
          <p className="mt-4 text-4xl font-bold text-orange-600">{dashboardData.pendingOrders}</p>
          <div className="w-full h-1 mt-2 bg-orange-100">
            <div className="w-1/4 h-1 bg-orange-500"></div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="p-6 transition-all transform bg-white rounded-lg shadow-lg hover:shadow-xl">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">Order Status Distribution</h2>
          <div className="h-64">
            <Doughnut 
              data={orderData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20,
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="p-6 transition-all transform bg-white rounded-lg shadow-lg hover:shadow-xl">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 font-semibold text-left text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-right text-gray-600">Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="p-4 text-gray-800">
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                      Delivered
                    </span>
                  </td>
                  <td className="p-4 font-medium text-right text-gray-800">{dashboardData.deliveredOrders}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 text-gray-800">
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                      Pending
                    </span>
                  </td>
                  <td className="p-4 font-medium text-right text-gray-800">{dashboardData.pendingOrders}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;