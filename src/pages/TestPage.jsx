import React, { useState } from "react";
import TestForm from "./TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";

const TestPage = ({ user }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const handleTestSubmit = async (answers) => {
    // MBTI 결과 계산
    const mbtiResult = calculateMBTI(answers);

    // 서버에 저장할 데이터 객체 생성
    const testResultData = {
      mbti: mbtiResult,
      description: mbtiDescriptions[mbtiResult],
      userId: user?.id, // user 정보가 있을 경우 포함 (필요 시)
    };

    try {
      // API 호출로 테스트 결과 저장 (POST)
      const savedResult = await createTestResult(testResultData);
      // 저장된 결과를 setState
      setResult(savedResult);
    } catch (error) {
      console.log("페이지 오류:", error);
    }
  };

  const handleNavigateToResults = () => {
    navigate("/result");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-primary-color text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
