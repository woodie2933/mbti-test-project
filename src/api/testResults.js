import axios from "axios";

// json 서버
const API_URL = "http://localhost:5000/testResults";

// GET
export const getTestResults = async (token, userId) => {
  if (!token) throw new Error("사용자 토큰 만료");

  try {
    const response = await axios.get(`${API_URL}?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 데이터 없음 처리
    if (response.data.length === 0) {
      console.log("테스트 결과 없음");
      return null;
    }

    // 가장 최근 결과만 반환
    return response.data[0];
  } catch (error) {
    console.log("결과 불러오기 오류:", error);
    throw error;
  }
};

// POST
export const createTestResult = async (resultData) => {
  const response = await axios.post(API_URL, resultData);
  return response.data;
};

// DELETE
export const deleteTestResult = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// PATCH
export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, { visibility });
  return response.data;
};
