import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        about: '',
        password: '',
        confirm_password: '',
        image: null,
        imagePreview: ''
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/user/show/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFormData({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    phone_number: response.data.user.phone_number || '',
                    about: response.data.user.about || '',
                    password: '',
                    confirm_password: '',
                    image: null,
                    imagePreview: response.data.user.image || ''
                });
            } catch (error) {
                toast.error('Failed to fetch user data');
                console.error(error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setFormData({
                ...formData,
                image: e.target.files[0],
                imagePreview: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication required');
                navigate('/login');
                return;
            }

            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone_number', formData.phone_number);
            data.append('about', formData.about);
            
            if (formData.password) {
                data.append('password', formData.password);
                data.append('confirm_password', formData.confirm_password);
            }
            
            if (formData.image instanceof File) {
                data.append('image', formData.image);
            }

            const response = await axios.put(
                `http://localhost:8000/api/user/update/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            toast.success('User updated successfully');
            navigate('/admin/users');
        } 
            catch (error) {
                if (error.response?.status === 500) {
                    console.error('Server error details:', error.response?.data);
                    toast.error('An unexpected server error occurred. Please try again.');
                } else if (error.response?.status === 422) {
                    // Handle validation errors
                    setErrors(error.response.data.errors || {});
                    toast.error('Please check the form for errors');
                } else {
                    toast.error('Failed to update user');
                }
            }
    };

    if (loading) return <div className="flex items-center justify-center h-64">Loading user data...</div>;

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-6 text-2xl font-bold">Edit User</h1>
            
            <form onSubmit={handleSubmit} className="max-w-lg">
                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block mb-2">Profile Image</label>
                    {formData.imagePreview && (
                        <img 
                            src={formData.imagePreview} 
                            alt="Preview" 
                            className="object-cover w-32 h-32 mb-2 rounded-full"
                        />
                    )}
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block mb-2">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block mb-2">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                        required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label className="block mb-2">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.phone_number ? 'border-red-500' : ''}`}
                    />
                    {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number[0]}</p>}
                </div>

                {/* About */}
                <div className="mb-4">
                    <label className="block mb-2">About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.about ? 'border-red-500' : ''}`}
                        rows="3"
                    />
                    {errors.about && <p className="mt-1 text-sm text-red-500">{errors.about[0]}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block mb-2">New Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label className="block mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${errors.confirm_password ? 'border-red-500' : ''}`}
                    />
                    {errors.confirm_password && <p className="mt-1 text-sm text-red-500">{errors.confirm_password[0]}</p>}
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Update User
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/users')}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;