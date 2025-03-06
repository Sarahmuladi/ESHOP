/*import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setUser({ token: accessToken });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        return axios.post("/register", { name, email, password });
    };

    const logout = async () => {
        await axios.post("http://localhost:5000/api/authentication/logout", {}, { withCredentials: true });
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
*/
/*
import axios from "axios";

const API_URL = "http://localhost:6010"; 

// Register function
export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        return response.data; // Returns user data
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Login function
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // Returns user data
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export default { register, login  };
*/
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:6010";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

// Register function
const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        return response.data; // Returns user data
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}; 
    

//login function
    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:6010/login", { email, password });
            setUser(res.data.user);
            setAccessToken(res.data.accessToken);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("refreshToken", res.data.refreshToken);
        } catch (error) {
            console.error(error.response.data.error);
        }
    };


//logout function
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
    };

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) return logout();

            const res = await axios.post("http://localhost:6010/refresh", { refreshToken });
            setAccessToken(res.data.accessToken);
        } catch (error) {
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, accessToken, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

//export default { register, login };

