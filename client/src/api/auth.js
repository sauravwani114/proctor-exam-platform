import axios from 'axios';

// Get the API URL from environment variables or default to local
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth`;

// Function to register a user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    // CHANGE: Use sessionStorage instead of localStorage
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    sessionStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Function to login a user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    // CHANGE: Use sessionStorage instead of localStorage
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    sessionStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Function to logout a user
export const logout = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
};

// Update Profile
export const updateProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/profile`, userData, config);
  
  if (response.data.user) {
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};