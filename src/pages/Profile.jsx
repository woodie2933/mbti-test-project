// import React, { useEffect, useState } from "react";
// import { getUserProfile, updateProfile } from "../api/auth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Profile = ({ user, setUser }) => {
//   const [nickname, setNickname] = useState(user?.nickname || "");
//   const navigate = useNavigate();
//   const data = JSON.parse(localStorage.getItem("userData"));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 토큰 유효 여부 확인에 대한 로직
//         //  userData 불러오기 오류 처리
//         const storedUserData = localStorage.getItem("userData");
//         if (!storedUserData) {
//           throw new Error("No user data");
//         }

//         // 토큰 만료 오류 처리
//         const data = JSON.parse(storedUserData);
//         if (!data.accessToken) {
//           throw new Error("No accessToken");
//         }

//         // 토큰이 없을 시, 로그인 페이지로 이동
//         const userData = await getUserProfile(data.accessToken);
//         setNickname(userData.nickname);
//       } catch (error) {
//         console.log("프로필 정보 불러오기 오류", error.message);
//         alert("로그인 세션 만료");
//         navigate("/login");
//       }
//     };
//     fetchData();
//   }, []);

//   const handleNicknameChange = (e) => {
//     setNickname(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     const formData = new FormData();
//     formData.append("nickname", nickname);
//     const formDataObject = Object.fromEntries(formData.entries());

//     e.preventDefault();
//     console.log("submitHandler", formDataObject);
//     try {
//       const updatedUser = await updateProfile(formDataObject);
//       setNickname(updatedUser.nickname);
//       alert("프로필이 업데이트 되었습니다.");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] text-[#343434]">
//       <div className="flex flex-col items-center justify-center bg-[#e9e9e9] w-[500px] h-72 p-10 rounded-lg shadow-lg">
//         <h1 className="english-text text-4xl font-bold text-center text-[#343434] mb-10">
//           My Profile
//         </h1>
//         <form
//           onSubmit={handleSubmit}
//           className="w-96 h-40 bg-white text-[#343434] p-6 rounded-xl flex flex-col justify-center items-center"
//         >
//           <div className="w-full flex justify-center">
//             <input
//               type="text"
//               value={nickname}
//               onChange={handleNicknameChange}
//               defaultValue={nickname}
//               className="w-64 p-2 border-none rounded-md text-[#343434] text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#f56d6d] text-center"
//             />
//           </div>
//           <button
//             type="submit"
//             className="mt-4 px-6 py-3 bg-[#f56d6d] text-white font-bold rounded-full shadow-md hover:bg-[#454545] transition duration-300"
//           >
//             프로필 업데이트
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { getTestResults } from "../api/testResults"; // 추가된 API 호출
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [testResult, setTestResult] = useState(null); // 사용자 MBTI 테스트 결과 저장
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage에서 유저 정보 가져오기
        const storedUserData = localStorage.getItem("userData");
        if (!storedUserData) {
          throw new Error("No user data");
        }

        const data = JSON.parse(storedUserData);
        if (!data.accessToken) {
          throw new Error("No accessToken");
        }

        // 사용자 프로필 가져오기
        const userData = await getUserProfile(data.accessToken);
        setNickname(userData.nickname);

        // MBTI 테스트 결과 가져오기
        const userTestResult = await getTestResults(data.accessToken);

        setTestResult(userTestResult); // 결과 저장
      } catch (error) {
        console.log("프로필 정보 불러오기 오류", error.message);
        alert("로그인 세션 만료");
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { nickname };
      const updatedUser = await updateProfile(formData);
      setNickname(updatedUser.nickname);
      alert("프로필이 업데이트 되었습니다.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] text-[#343434]">
      <div className="flex flex-col items-center justify-center bg-[#e9e9e9] w-[500px] h-auto p-10 rounded-lg shadow-lg">
        <h1 className="english-text text-4xl font-bold text-center text-[#343434] mb-10">
          My Profile
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-96 h-40 bg-white text-[#343434] p-6 rounded-xl flex flex-col justify-center items-center"
        >
          <div className="w-full flex justify-center">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="w-64 p-2 border-none rounded-md text-[#343434] text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#f56d6d] text-center"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-[#f56d6d] text-white font-bold rounded-full shadow-md hover:bg-[#454545] transition duration-300"
          >
            프로필 업데이트
          </button>
        </form>

        {/* 테스트 결과 섹션 */}
        <div className="w-full mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#343434] text-center mb-4">
            내 테스트 결과
          </h2>
          {testResult ? (
            <div className="text-center">
              <p className="text-xl font-bold">{testResult.mbtiType}</p>
              <p className="text-lg mt-2">{testResult.description}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              아직 테스트를 진행하지 않았습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
