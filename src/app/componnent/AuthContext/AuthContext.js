import React, { createContext, useContext, useEffect, useState } from 'react';
// สร้าง Context
const AuthContext = createContext();
// สร้าง Provider Component
export const AuthProvider = ({ children }) => {
    // ดึงค่าจาก localStorage เมื่อคอมโพเนนต์ถูกโหลดครั้งแรก
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    // // ตรวจสอบว่ามี token ใน localStorage หรือไม่ เพื่อกำหนดค่า isLogged
    // // สร้าง state เพื่อเก็บข้อมูลการเข้าสู่ระบบและสิทธิ์ของผู้ใช้
    const [authData, setAuthData] = useState({
        id: id || null,
        role: role || null,
        token: token || null,
    });
    console.log(authData)
    return (
        // ใช้ Context.Provider เพื่อทำให้ข้อมูลสามารถเข้าถึงได้ทุกที่ใน Component Tree
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {/* <AuthContext.Provider> */}
            {children}
        </AuthContext.Provider>
    );
};
// สร้าง custom hook เพื่อใช้งาน Context ใน Component อื่น
export const UseAuth = () => useContext(AuthContext);
