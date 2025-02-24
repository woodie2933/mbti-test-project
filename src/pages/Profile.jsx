import React, { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { toast } from "react-toastify";

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const data = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile(data.accessToken);
        setNickname(userData.nickname);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    const formDataObject = Object.fromEntries(formData.entries());

    e.preventDefault();
    console.log("submitHandler", formDataObject);
    try {
      const updatedUser = await updateProfile(formDataObject);
      setNickname(updatedUser.nickname);
      alert("프로필이 업데이트 되었습니다.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] text-[#343434]">
      <div className="flex flex-col items-center justify-center bg-[#e9e9e9] w-[500px] h-72 p-10 rounded-lg shadow-lg">
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
              defaultValue={nickname}
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
      </div>
    </div>
  );
};

export default Profile;
