import React, { createContext, useState, useEffect } from 'react';
import { logout as logoutUser } from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // CHANGE: Check sessionStorage instead of localStorage
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CHANGE: Check sessionStorage
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    // CHANGE: Use sessionStorage
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('token', userToken);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
    // CHANGE: Clear sessionStorage
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const authContextValue = {
    user,
    token,
    login,
    logout,
    updateUser,
    isAuthenticated: !!token,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};