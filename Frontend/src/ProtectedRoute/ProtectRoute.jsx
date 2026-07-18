import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('tokens');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error("You must be logged in to access this page!");
            setRedirect(true);
        }
    }, [token]);

    if (!token) {
        if (redirect) {
            return <Navigate to="/" replace />;
        }
        return null; // Render nothing while waiting for the effect to fire
    }

    return children; 
};

export default ProtectedRoute;
