import React from "react";
import { Link } from "react-router-dom";

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const onClickHandler = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] text-white">
      <div className="flex flex-col items-center justify-center bg-[#e9e9e9] w-[500px] h-72 p-10 rounded-lg shadow-lg">
        <h1 className="english-text text-4xl font-bold text-center text-[#343434] mb-8">
          MBTI TEST
        </h1>
        <p className="text-l text-center text-[#343434] mb-8">
          아직도 MBTI 테스트를 안 해본거야..?
        </p>
        <Link
          to="/login"
          className="bg-white text-[#ff4848] hover:text-[#ffffff] px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-[#454545] transition duration-300"
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
