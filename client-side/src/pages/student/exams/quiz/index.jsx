import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Radio } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { getApiHandler } from "../../../../apiHandler";
import LandingLayout from "../../../../layouts/landing-layout";
import Timer from "./Timer";
import "./index.m.css";
import StudentLayout from "../../../../layouts/student-layout";
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState();
  const history = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [queOver, setQueOver] = useState(false);

  function handleTimeout() {
    // do something when time runs out
    swal({
      title: "Time's Up",
      text: "you ran out of time",
      icon: "warning",
      dangerMode: true,
      button: "Submit",
    }).then((willPerform) => {
      // if (willPerform) {
      calculateScore();
      // }
    });
    console.log("Time's up");
  }

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newUserAnswers = [...userAnswers];
    console.log("asdfsdfds: ", optionIndex);
    newUserAnswers[questionIndex] = optionIndex;
    setUserAnswers(newUserAnswers);
  };

  const calculateScore = () => {
    let rightAns = 0;
    questions.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        ++rightAns;
      }
    });
    // setScore(rightAns);
    localStorage.setItem("userAnswer", userAnswers);
    localStorage.setItem("score", rightAns);
    history(`/result/${id}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // swal({
    //   title: "Are you sure?",
    //   text: "Are you sure that you want to Submit?",
    //   icon: "warning",
    //   dangerMode: true,
    //   buttons: true,
    // }).then((willPerform) => {
    //   if (willPerform) {
    calculateScore();
    //   }
    // });
  };
  console.log("user answers: ", userAnswers);

  const getQuestions = async () => {
    const temp = await getApiHandler(`/get-practice-ques/${id}`);
    setQuestions(temp.response.subjectQues);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <StudentLayout>
      <div className="background">
        <Container className="bg-white">
          <Timer h={0} m={10} s={0} onTimeout={handleTimeout} />
          <form onSubmit={handleSubmit}>
            {queOver ? (
              <div className="">
                <h1>You have answered all the question!!! Submit Quiz...</h1>
              </div>
            ) : (
              <>
                <div className="">
                  <h1>{questions[currentQuestion]?.question}</h1>
                </div>
                {/* <Radio.Group label="Options"> */}
                <div className="px-5">
                  {questions[currentQuestion]?.options.map((option, index) => (
                    <div
                      key={`que-${currentQuestion}-option-${index}`}
                      className="form-check py-2"
                    >
                      <input
                        className="form-check-input cursor-pointer"
                        type="radio"
                        name={`option${index}`}
                        value={index}
                        checked={userAnswers[currentQuestion] === index}
                        onChange={() => {
                          handleOptionChange(currentQuestion, index);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`option${index}`}
                      >
                        {option}
                      </label>
                      {/* <Radio
                    key={index}
                    name={`question${currentQuestion}`}
                    value={index}
                    checked={userAnswers[currentQuestion] === index}
                    onChange={() => handleOptionChange(currentQuestion, index)}
                  >
                    {option}
                  </Radio> */}
                    </div>
                  ))}
                </div>

                {/* </Radio.Group> */}
              </>
            )}
            <div className="d-flex gap-3 justify-content-center py-3">
              <Button
                shadow
                color="primary"
                onClick={() => {
                  if (currentQuestion >= questions.length - 1) {
                    setQueOver(true);
                  } else {
                    setCurrentQuestion((q) => q + 1);
                  }
                }}
                auto
              >
                Next
              </Button>
              <Button type="submit" shadow color="warning" auto>
                Submit
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </StudentLayout>
  );
}

export default Quiz;
