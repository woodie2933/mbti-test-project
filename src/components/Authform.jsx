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

    // ✅ FormData에서 직접 값을 가져오는 대신 객체로 전달
    const userData = {
      id: formData.id,
      password: formData.password,
      nickname: mode === "signup" ? formData.nickname : undefined,
    };

    onSubmit(userData); // ✅ 올바른 데이터 전달
    console.log("전송 데이터:", userData);
  };

  // id 입력을 위한 input 만 힌트로 만들어 두었습니다.
  // 참고해서 한번 만들어 봅시다!
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="password"
        required
      />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
        />
      )}
      <button type="submit">{mode === "login" ? "로그인" : "회원가입"}</button>
    </form>
  );
};

export default AuthForm;
