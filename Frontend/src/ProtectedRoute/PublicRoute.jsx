import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('tokens');

    if (token) {
        const hasFitnessDetails = localStorage.getItem('hasFitnessDetails') === 'true';
        if (!hasFitnessDetails) {
            return <Navigate to="/details" replace />;
        }
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default PublicRoute;
