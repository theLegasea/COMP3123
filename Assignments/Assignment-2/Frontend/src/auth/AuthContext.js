import React, { createContext, useState, useEffect, useCallback } from 'react';

//Citation
// https://blog.logrocket.com/authentication-react-router-v6/#creating-protected-routes
// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-without-using-a-library


const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

// Token time validation
function parseJwt(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (e) {
        return null;
    }
}
function tokenIsValid(token) {
    const payload = parseJwt(token);
    return payload && payload.exp && payload.exp * 1000 > Date.now();
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        window.location.href = '/login';
    }, []);

    // TODO: auto timeout

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;