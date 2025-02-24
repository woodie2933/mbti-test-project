import axios from "axios";

// API 기본 URL 설정
// 회원가입, 로그인, 프로필 수정에 요청됨
const API_URL = "https://www.nbcamp-react-auth.link";

// 회원가입 API
// id, password, nickname 을 서버로 전송
// 회원가입 성공 시에 alert
export const register = async (userData) => {
  console.log("회원가입 요청 데이터:", userData);

  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // {message: '회원가입 완료', success: true}
  } catch (error) {
    console.log("회원가입 오류", error.response?.data || error.message);
    throw error;
  }
};

// 로그인 API
// id password 를 서버로 전송
// 로그인 성공 시 accessToken, userid, img, nickname을 반환
// 인증 상태 관리
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // {accessToken, userid, success, img, nickname}
  } catch (error) {
    console.log("로그인 오류:", error);
    throw error;
  }
};

// profile 가져오기
// 로그인된 사용자의 accessToken 을 사용하여 정보 조회
// header 에 Autherization 을 포함하여 GET 요청을 수행
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("사용자 정보 가져오기 오류:", error);
    throw error;
  }
};

// 사용자 프로필 정보 업데이트
// profile img, nickname 변경 시 사용
// FormData 를 이용, multipart/form-data 형식으로 서버에 전송
// 변경 후 새로운 응답 받아야 함
export const updateProfile = async (formData) => {
  console.log(formData);

  const token = JSON.parse(localStorage.getItem("userData")).accessToken;

  try {
    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("프로필 업데이트 실패:", error);
    throw error;
  }
};
