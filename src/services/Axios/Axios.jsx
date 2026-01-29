import axios from "axios";

// Vite 환경에서는 import.meta.env를 사용해야 합니다.
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
});

// 토큰이 있을 때만 헤더에 담아 401 에러를 방지합니다.
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;