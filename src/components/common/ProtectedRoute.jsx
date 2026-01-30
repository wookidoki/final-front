import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import useModalStore from "../../store/useModalStore";

const ProtectedRoute = ({ children }) => {
  const { auth, authLoading } = useContext(AuthContext);
  const location = useLocation();
  const { openModal } = useModalStore();

  if (authLoading) return null;

  if (!auth.isAuthenticated) {
    // 로그인 모달을 열고 홈으로 리다이렉트
    setTimeout(() => openModal("login"), 100);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
