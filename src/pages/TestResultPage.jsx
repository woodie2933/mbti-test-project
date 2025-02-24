import React, { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";

const TestResult = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestResults(); // 서버에서 결과 가져오기
        setResult(data); // 결과 저장
      } catch (error) {
        console.log("결과 불러오기 오류", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-[#343434] mb-12">테스트 결과</h1>

      {/* 결과 목록 정렬 */}
      <div className="grid grid-cols-1 gap-6">
        {result.length > 0 ? (
          result.map((e) => (
            <div
              key={e.id}
              className="bg-white shadow-lg rounded-lg p-6 w-[600px] flex flex-col items-center text-center"
            >
              <h2 className="text-2xl font-bold text-[#f56d6d] mb-4">
                {e.mbti}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {e.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-700">결과를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default TestResult;
