import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

// Function to register a user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Function to login a user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Function to logout a user
export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// --- NEW FUNCTION: Update Profile ---
export const updateProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/profile`, userData, config);
  // Update local storage with new user data
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};