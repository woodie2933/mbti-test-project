import React, { useEffect } from "react";
import AuthForm from "../components/Authform";
import { login, getUserProfile } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = async ({ id, password }) => {
    console.log(id, password);
    try {
      // JSON 데이터 전송
      const userData = await login({ id, password });
      setIsAuthenticated(JSON.stringify(userData));
      console.log(userData);
      localStorage.setItem("userData", JSON.stringify(userData));

      console.log("성공!");
      navigate("/"); // 로그인 성공 => 홈으로 이동
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#343434] text-center mb-5">
          로그인
        </h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
