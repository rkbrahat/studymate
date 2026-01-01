import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

// Create Context
const AuthContext = createContext();

// Custom Hook for using the context
export const useAuth = () => useContext(AuthContext);

/**
 * AuthProvider Component
 * 
 * Manages global authentication state (user, token, loading).
 * Wraps the application to provide auth logic everywhere.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from local storage/validate token on mount
    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token with backend
                    const { data } = await authAPI.getCurrentUser();
                    setUser(data);
                } catch (error) {
                    // Token invalid/expired
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    // Login Action
    const login = async (email, password) => {
        const { data } = await authAPI.login({ email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
        return data; // Return data for UI redirect
    };

    // Register Action
    const register = async (name, email, password) => {
        const { data } = await authAPI.register({ name, email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
        return data;
    };

    // Logout Action
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        // Optional: Redirect handled by protected route mechanics or UI
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
