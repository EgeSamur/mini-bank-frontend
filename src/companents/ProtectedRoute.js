// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') || null

  if (!token) {
    return <Navigate to="/login" replace />; // Token yoksa login sayfasına yönlendir
  }

  return children; // Token varsa, istenilen sayfaya erişim ver
};

export default ProtectedRoute;
