import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dotenv from 'dotenv';


const API_URL = "http://localhost:5000";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                const storedAccessToken = localStorage.getItem("accessToken");
                const storedRefreshToken = localStorage.getItem("refreshToken");
            
                // Check if storedUser is valid before parsing
                let parsedUser = null;
                if (storedUser) {
                    try {
                        parsedUser = JSON.parse(storedUser);
                    } catch (error) {
                        console.error("Error parsing stored user:", error);
                        localStorage.removeItem("user"); // Remove corrupt data
                    }
                }
            
                if (parsedUser && storedAccessToken && storedRefreshToken) {
                    setUser(parsedUser);
                    setAccessToken(storedAccessToken);
                    await validateAccessToken(storedAccessToken, storedRefreshToken);
                }
            } catch (err) {
                console.error("Auth initialization error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);
    

    const validateAccessToken = async (accessToken, refreshToken) => {
        try {
            const res = await axios.get(`${API_URL}/api/validate`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (res.status === 200) {
                setAccessToken(accessToken);
                return true;
            } else {
                return await refreshAccessToken(refreshToken);
            }
        } catch (error) {
            return await refreshAccessToken(refreshToken);
        }
    };

    const refreshAccessToken = async (refreshToken) => {
        try {
            const res = await axios.post(`${API_URL}/api/refresh`, { refreshToken });
            setAccessToken(res.data.accessToken);
            localStorage.setItem("accessToken", res.data.accessToken);
            return true;
        } catch (error) {
            logout();
            return false;
        }
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            setError(null);
            const response = await axios.post(`${API_URL}/api/register`, { name, email, password });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Registration failed";
            setError(errorMessage);
            throw errorMessage;
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            setError(null);
            const res = await axios.post(`${API_URL}/api/login`, { email, password });
            
            if (!res.data.user) {
                throw new Error("User data not received from server");
            }
            
            setUser(res.data.user);
            setAccessToken(res.data.accessToken);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            navigate('/');
            return res.data.user;
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Login failed";
            setError(errorMessage);
            console.error(errorMessage);
            throw errorMessage;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                await axios.post(`${API_URL}/api/logout`, { refreshToken });
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setAccessToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            accessToken, 
            loading,
            error,
            setUser,  // Added setUser to the context
            register, 
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};