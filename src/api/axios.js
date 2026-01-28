import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/api", // 사용자 환경에 맞게 포트 수정
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키/세션 사용 시 필요
});

// [요청 인터셉터] 요청 보낼 때마다 토큰이 있다면 헤더에 자동 추가
instance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에 저장된 토큰이 있다면 가져옴 (저장 키값 확인 필요: 'accessToken' 등)
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
