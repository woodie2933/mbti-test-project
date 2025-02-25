import axios from "axios";

// json 서버
const API_URL = "http://localhost:5000/testResults";

// GET
export const getTestResults = async (token) => {
  if (!token) throw new Error("사용자 토큰 만료");

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("테스트 결과:", response.data);

    // 데이터 없음 처리
    if (!response.data || response.data.length === 0) {
      console.log("테스트 결과 없음");
      return [];
    }

    // 가장 최근 결과만 반환
    return response.data;
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
// 기본 로직
// export const deleteTestResult = async (id) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// };

export const deleteTestResult = async (id, token) => {
  if (!token) throw new Error("사용자 토큰 만료");

  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("결과 삭제 오류:", error);
    throw error;
  }
};

// PATCH
// 기본 로직
// export const updateTestResultVisibility = async (id, visibility) => {
//   const response = await axios.patch(`${API_URL}/${id}`, { visibility });
//   return response.data;
// };

export const updateTestResultVisibility = async (id, visibility, token) => {
  if (!token) throw new Error("사용자 토큰 만료");

  try {
    const response = await axios.patch(
      `${API_URL}/${id}`,
      { visibility },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("결과 비공개 오류:", error);
    throw error;
  }
};
