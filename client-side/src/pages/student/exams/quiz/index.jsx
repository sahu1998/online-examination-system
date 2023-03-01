import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Radio } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { getApiHandler } from "../../../../apiHandler";
import LandingLayout from "../../../../layouts/landing-layout";
import Timer from "./Timer";
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
    newUserAnswers[questionIndex] = optionIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Submit?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willPerform) => {
      if (willPerform) {
        let rightAns = 0;
        const temp = questions.map((question, index) => {
          if (question.answer === userAnswers[index]) {
            ++rightAns;
          }
        });
      }
    });
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
    <LandingLayout>
      <div className="background">
        <Container className="bg-white">
          <Timer duration={60 * 60} onTimeout={handleTimeout} />
          <form onSubmit={handleSubmit}>
            <div className="">
              <h1>{questions[currentQuestion]?.question}</h1>
            </div>
            {/* <Radio.Group label="Options"> */}
            <div className="px-5">
              {questions[currentQuestion]?.options.map((option, index) => (
                <div key={index} className="form-check py-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`option${index}`}
                    value={index}
                    checked={userAnswers[currentQuestion] === index}
                    onChange={() => handleOptionChange(currentQuestion, index)}
                  />
                  <label className="form-check-label" for={`option${index}`}>
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
            <div className="d-flex gap-3 justify-content-center py-3">
              <Button
                shadow
                color="primary"
                onClick={() => setCurrentQuestion((q) => q + 1)}
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
    </LandingLayout>
  );
}

export default Quiz;
