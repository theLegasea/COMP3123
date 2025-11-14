import React, { createContext, useState } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;