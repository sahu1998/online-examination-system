import React from "react";
import Divider from "@mui/material/Divider";
import { ChakraProvider } from "@chakra-ui/react";
import CardMedia from "@mui/material/CardMedia";
import { Card, CardBody, CardFooter, Stack, Button } from "@chakra-ui/react";
import quizAlternateImg from "../../../assets/images/landing/quizAlternate.png";
import { NavLink } from "react-router-dom";

const SubjectCard = ({ subject, img }) => {
  console.log("subject id: ", subject._id);
  return (
    <Card className="rounded shadow p-2 bg-white">
      <CardBody>
        <CardMedia
          className="rounded"
          component="img"
          // height="194"
          image={
            subject.subjectImg ? img : "assets/images/landing/quizAlternate.png"
          }
          alt="Paella dish"
          style={{
            // width: "285px",
            height: "200px",
            objectFit: "fill",
          }}
        />
        <Stack mt="6" spacing="3">
          <div className="fw-bold fs-3">{subject.subjectName}</div>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="d-flex align-items-center w-100">
          <div className="flex-grow-1 ">
            <span>Marks: {subject.marks}</span>
            <br />
            <span>Time: {subject.timeLimit} mins</span>
          </div>
          <div className="flex-shrink-0">
            <ChakraProvider>
              <NavLink to={`/quiz/${subject._id}`}>
                <Button colorScheme="blue">Start Exam</Button>
              </NavLink>
            </ChakraProvider>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;
