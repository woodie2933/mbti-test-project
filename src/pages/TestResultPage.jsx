import React, { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";

const TestResult = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTestResults();
        setResult(result);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  console.log(result);
  return (
    <div>
      <h1>테스트 결과 페이지</h1>
      {result.map((e) => (
        <div key={e.id}>{e.mbti}</div>
      ))}
    </div>
  );
};

export default TestResult;
