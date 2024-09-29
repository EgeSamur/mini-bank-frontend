// AuthRedirect.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
    const token = localStorage.getItem('token') || null

    if (token) {
        return <Navigate to="/dashboard" replace />; // Token varsa dashboard'a yönlendir
    }

    return children; // Token yoksa, login/register sayfasını göster
};

export default AuthRedirect;
