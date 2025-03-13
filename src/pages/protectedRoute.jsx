import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};
