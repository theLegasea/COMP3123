import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

export default function RequireAuth({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}