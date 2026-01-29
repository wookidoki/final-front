import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [auth, setAuth] = useState({
        memberId: null,
        memberName: null,
        email: null,
        accesstoken: null,
        refreshtoken: null,
        role: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        // 1. 로컬 스토리지에서 값을 읽어와 객체로 만듭니다.
        const storedAuth = {
            memberId: localStorage.getItem("memberId"),
            memberName: localStorage.getItem("memberName"),
            email: localStorage.getItem("email"),
            accesstoken: localStorage.getItem("accessToken"), // 'accessToken' 대소문자 주의 (axios.js와 일치 권장)
            refreshtoken: localStorage.getItem("refreshToken"),
            role: localStorage.getItem("role"),
        };

        // 2. 필수 값(Id와 토큰)이 있는지 확인합니다.
        if (storedAuth.memberId && storedAuth.accesstoken) {
            setAuth({ ...storedAuth, isAuthenticated: true });
        }
        
        setAuthLoading(false);
    }, []);

    const logout = () => {
        // 로컬 스토리지 비우기
        localStorage.clear();
        
        // 상태 초기화
        setAuth({
            memberId: null,
            memberName: null,
            email: null,
            accesstoken: null,
            refreshtoken: null,
            role: null,
            isAuthenticated: false,
        });
        
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
};