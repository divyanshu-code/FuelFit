import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('tokens');

    if (!token) {
        toast.error("You must be logged In");
        return <Navigate to="/" replace />; 
    }

    return children; 
};

export default ProtectedRoute;
