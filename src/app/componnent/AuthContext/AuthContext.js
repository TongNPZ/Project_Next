import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['id', 'role', 'token']);

    const id = cookies.id;
    const role = cookies.role;
    const token = cookies.token;

    const [authData, setAuthData] = useState({
        id: id || null,
        role: role || null,
        token: token || null,
    });

    console.log(authData)

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);
