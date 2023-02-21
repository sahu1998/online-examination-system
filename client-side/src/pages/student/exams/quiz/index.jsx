import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiHandler } from "../../../../apiHandler";
import Timer from "./Timer";
// import Timer from "./Timer";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  function handleTimeout() {
    // do something when time runs out
    console.log("Time's up");
  }

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newUserAnswers = [...userAnswers];
    console.log("asdfsdfds: ", optionIndex);
    newUserAnswers[questionIndex] = optionIndex ? optionIndex : null;
    setUserAnswers(newUserAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let rightAns = 0;
    const temp = questions.map((question, index) => {
      if (question.answer === userAnswers[index]) {
        ++rightAns;
      }
    });
    console.log("rsdfsdfsa: ", temp);
    console.log("right ans: ", rightAns);
  };
  console.log("user answers: ", userAnswers);

  // console.log(userAnswers);
  const getQuestions = async () => {
    const temp = await getApiHandler(`/get-practice-ques/${id}`);
    setQuestions(temp.response.subjectQues);
    // console.log("que. ", temp.response.subjectQues);
  };

  console.log("questions: ", questions);
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Container>
      {/* <Timer duration={60} onTimeout={handleTimeout} /> */}
      <form onSubmit={handleSubmit}>
        <h1>{questions[currentQuestion]?.question}</h1>
        {questions[currentQuestion]?.options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name={`question${currentQuestion}`}
                value={index}
                checked={userAnswers[currentQuestion] === index}
                onChange={() => handleOptionChange(currentQuestion, index)}
              />
              {option}
            </label>
          </div>
        ))}
        <button onClick={() => setCurrentQuestion((q) => q + 1)}>Next</button>
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default Quiz;
