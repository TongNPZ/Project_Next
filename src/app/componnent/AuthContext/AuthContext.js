import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState({
        id: localStorage.getItem('id') || null,
        role: localStorage.getItem('role') || null,
        token: localStorage.getItem('token') || null,
    });

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);
