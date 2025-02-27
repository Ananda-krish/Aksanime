// utils/authUtils.js
import axios from 'axios';

export const refreshToken = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const newToken = response.data.token;
    localStorage.setItem('token', newToken); // Update the token in local storage
    return newToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};