import React, { useState } from "react";
import { questions } from "../data/question";
import { useNavigate } from "react-router-dom";

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: "", answer: "" })
  );

  const navigate = useNavigate();

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer };
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 서버와 state에 결과 데이터를 저장
    const resultData = await onSubmit(answers);
    // 결과 페이지로 이동
    navigate("/result", { state: { latestResult: resultData } });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg text-[#292929]"
    >
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold text-lg mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, i) => (
              <label
                key={i}
                className={`block p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${
                  answers[index]?.answer === option ? "bg-gray-100" : ""
                } hover:bg-gray-100`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index]?.answer === option}
                  onChange={() => handleChange(index, option)}
                  className="mr-2 text-primary-color"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-[#f56d6d] text-white font-bold rounded-full shadow-md hover:bg-[#454545] transition duration-300]"
        >
          제출하기
        </button>
      </div>
    </form>
  );
};

export default TestForm;
