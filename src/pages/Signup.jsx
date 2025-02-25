import React from "react";
import AuthForm from "../components/Authform";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  // 완성된 로직들이 아니에요! 참고만 하세요!
  const handleSignup = async (formData) => {
    console.log("회원가입 요청 데이터:", formData);

    try {
      await register(formData);
      alert("회원 가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.log("회원가입 오류:", error.response?.data || error.message);
      alert("회원가입 오류. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#343434] text-center mb-5">
          회원가입
        </h1>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?
            <Link to="/login" className="text-blue-500 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
