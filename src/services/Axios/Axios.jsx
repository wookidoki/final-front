import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081",
  timeout: 60000, // 60초 (비디오 업로드 고려)
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 1. 토큰 가져오기
    const token = localStorage.getItem("accessToken");

    //토큰이 있다면 해더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("토큰이 없습니다.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
