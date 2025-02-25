import React, { useEffect, useState } from "react";
import {
  getTestResults,
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";

const TestResult = () => {
  const [result, setResult] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage 에서 user 데이터 가져오기
        const storedUserData = localStorage.getItem("userData");
        if (!storedUserData) {
          throw new Error("로그인이 필요한 페이지입니다.");
        }

        const data = JSON.parse(storedUserData);
        if (!data.accessToken) {
          throw new Error("유효하지 않은 토큰");
        }

        // 모든 결과 가져오기
        const testResults = await getTestResults(data.accessToken);
        console.log("테스트 결과:", testResults);

        setResult(testResults || []);
      } catch (error) {
        console.log("결과 불러오기 오류:", error.message);

        // 토큰 만료 또는 인증 오류 시 로그인으로 이동
        if (error.response && error.response.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [refresh]);

  // 결과 삭제 기능
  const handleDelete = async (id) => {
    try {
      // localStorage에서 user 데이터 가져오기
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) throw new Error("로그인 정보가 없습니다.");

      const data = JSON.parse(storedUserData);
      if (!data.accessToken) throw new Error("유효하지 않은 토큰");

      await deleteTestResult(id, data.accessToken);
      setResult((prevResult) =>
        prevResult.filter((result) => result.id !== id)
      );
    } catch (error) {
      console.log("삭제할 수 없습니다", error);
    }
  };

  // 결과 비공개
  const handleVisibilityToggle = async (id, currentVisibility) => {
    try {
      // localStorage에서 user 데이터 가져오기
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) throw new Error("로그인 정보가 없습니다.");

      const data = JSON.parse(storedUserData);
      if (!data.accessToken) throw new Error("토큰이 없습니다.");

      const newVisibility = !currentVisibility;
      await updateTestResultVisibility(id, newVisibility, data.accessToken);

      setResult((prevResult) =>
        prevResult.map((result) =>
          result.id === id ? { ...result, visibility: newVisibility } : result
        )
      );
    } catch (error) {
      console.log("비공개할 수 없습니다.", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-[#343434] mb-12">테스트 결과</h1>

      {/* 결과 목록 정렬 */}
      <div className="grid grid-cols-1 gap-6">
        {result.length > 0 ? (
          result.map((e) => (
            <div
              key={e.id}
              className="bg-white shadow-lg rounded-lg p-6 w-[550px] flex flex-col items-center text-center"
            >
              <h2 className="text-2xl font-bold text-[#f56d6d] mb-4">
                {e.mbti}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {e.description}
              </p>

              <div className="mt-4 flex space-x-4">
                {/* 삭제 버튼 */}
                <button
                  onClick={() => handleDelete(e.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-[#454545] transition duration-300"
                >
                  삭제
                </button>
                {/* 비공개 버튼 */}
                <button
                  onClick={() => handleVisibilityToggle(e.id, e.visibility)}
                  className={`px-3 py-1 rounded-lg hover:bg-[#454545] transition duration-300 ${
                    e.visibility
                      ? "bg-gray-500 text-white hover:bg-[#454545] transition duration-300"
                      : "bg-[#48b6ff] text-white hover:bg-[#454545] transition duration-300"
                  }`}
                >
                  {e.visibility ? "비공개" : "공개"}
                </button>
              </div>
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
