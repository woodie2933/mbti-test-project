import React, { useState } from "react";

// 회원가입인지 로그인인지 구분하기 위해 mode 를 props 로 받습니다.
// onSubmit 도 회원가입과 로그인 페이지에서 각각 구현을 하고 props 로 넘겨줄 겁니다.
const AuthForm = ({ mode, onSubmit }) => {
  // 무엇을 formData 에 넣어야할까요?
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData 객체
    const userData = {
      id: formData.id,
      password: formData.password,
      nickname: mode === "signup" ? formData.nickname : undefined,
    };

    onSubmit(userData);
    console.log("전송 데이터:", userData);
  };

  // id 입력을 위한 input 만 힌트로 만들어 두었습니다.
  // 참고해서 한번 만들어 봅시다!
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white px-6 py-2 rounded-lg space-y-4"
    >
      <input
        type="email"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="email"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7a7a]"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="password"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7a7a]"
      />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7a7a]"
        />
      )}
      <button
        type="submit"
        className="w-full py-3 bg-[#ff7a7a] text-white font-semibold rounded-lg hover:bg-[#454545] transition duration-300"
      >
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
