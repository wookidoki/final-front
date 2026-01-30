import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState({
    memberId: null,
    email: null,
    accesstoken: null,
    refreshtoken: null,
    role: null,
    isAuthenticated: false,
    isProfileCompleted: false,
  });

  useEffect(() => {
    const accesstoken = localStorage.getItem("accessToken");
    const memberId = localStorage.getItem("memberId");
    const nickName = localStorage.getItem("nickName");

    if (accesstoken && memberId) {
      setAuth({
        memberId,
        email: localStorage.getItem("email"),
        accesstoken,
        refreshtoken: localStorage.getItem("refreshToken"),
        role: localStorage.getItem("role"),
        isAuthenticated: true,
        isProfileCompleted: !!nickName,
      });
    }

    setAuthLoading(false);
  }, []);

  const logout = () => {
    localStorage.clear();
    setAuth({
      memberId: null,
      email: null,
      accesstoken: null,
      refreshtoken: null,
      role: null,
      isAuthenticated: false,
      isProfileCompleted: false,
    });
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
