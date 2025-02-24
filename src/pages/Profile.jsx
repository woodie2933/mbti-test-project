import React, { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { toast } from "react-toastify";

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const data = JSON.parse(localStorage.getItem("userData"));
  console.log("8번째 줄", nickname);

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
    <div>
      <div>
        <h1>프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label>{nickname}</label> */}
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              defaultValue={nickname}
            />
          </div>
          <button type="submit">프로필 업데이트</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
