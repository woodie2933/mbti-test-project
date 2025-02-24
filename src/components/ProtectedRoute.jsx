import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  const data = JSON.parse(localStorage.getItem("userData"));
  // 사용자가 로그인하지 않았다면 로그인 페이지로 리디렉션
  if (!!data) {
    // 로그인된 경우 현재 라우트의 자식 컴포넌트 렌더링
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
