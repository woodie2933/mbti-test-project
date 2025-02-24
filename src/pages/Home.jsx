import React from "react";
import { Link } from "react-router-dom";

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const onClickHandler = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffd79b] text-white">
      <div className="flex flex-col items-center justify-center bg-[#ffffff] w-[600px] h-80 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 mb-12">
          무료 성격 테스트
        </h1>
        <Link
          to="/login"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-gray-200 transition duration-300"
        >
          {!!isAuthenticated ? (
            <div onClick={onClickHandler}>로그아웃</div>
          ) : (
            "로그인"
          )}
        </Link>
      </div>
    </div>
  );
};

export default Home;
