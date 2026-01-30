import axios from "axios";
//회원가입 API호출 , 로그인 API호출 비 인증 공개
const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
