import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiHandler } from "../../../../apiHandler";
import StudentLayout from "../../../../layouts/student-layout";

function QuizResult() {
  const { id } = useParams();
  const [questions, setQuestions] = useState();
  const [userAnswers, setUserAnswers] = useState();

  console.log("user answers: ", userAnswers);

  const getQuestions = async () => {
    const temp = await getApiHandler(`/get-practice-ques/${id}`);
    setQuestions(temp.response.subjectQues);
  };
  console.log(questions);
  console.log("userans: ", localStorage.getItem("userAnswer").split(","));
  console.log("sdkfldskk: ", userAnswers);
  useEffect(() => {
    setUserAnswers(localStorage.getItem("userAnswer").split(","));
    getQuestions();
  }, []);

  return (
    <StudentLayout>
      <Container maxWidth="xl" className="px-5">
        <div className="py-3 text-end fs-1">
          Score: <span>{localStorage.getItem("score")}</span> out of{" "}
          <span>10</span>
          <button className="rounded bg-light">Save Result</button>
        </div>
        {questions &&
          userAnswers &&
          // questions?.length === userAnswers?.length &&
          questions.map((value, i) => {
            return (
              <div key={`que-${i}`} className="">
                <h1>
                  {i + 1}.){value.question}
                </h1>
                {value.options.map((option, index) => (
                  <div key={index} className="form-check py-2">
                    <input
                      className="form-check-input"
                      disabled
                      type="radio"
                      name={`option${i}`}
                      id={`option${index}`}
                      value={index}
                      checked={userAnswers[i] == index}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option${index}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
                <div className="py-2 bg-info text-end fw-bold fs-5">
                  Correct Answer: {value.options[value.answer]}
                </div>
              </div>
            );
          })}
      </Container>
    </StudentLayout>
  );
}

export default QuizResult;
