import React, { useState, useEffect } from "react";
import { Container, Grid, Divider } from "@mui/material";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { getApiHandler, serverURL } from "../../../apiHandler";
import banner from "../../../assets/images/landing/banner3.png";
import SubjectCard from "../../../components/landing/practice-exams/Card/SubjectCard";
import "./home.m.css";
function Home() {
  const [subjects, setSubjects] = useState();
  const getPracticeExams = async () => {
    const temp = await getApiHandler("/get-random-subjects");
    console.log("qwerty: ", temp);
    setSubjects(temp.response);
  };

  useEffect(() => {
    getPracticeExams();
  }, []);
  return (
    <div className="">
      <div className="banner">
        <Container className="">
          <div className="py-5 fw-bold fs-1 text-center">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12}>
                <img src={banner} className="w-75 m-auto" />
              </Grid>
              <Grid item xs={12} md={6} sm={12} className="m-auto text-white">
                Online Learning and Examination System
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className="">
        <Container>
          <Grid container spacing={2} className="">
            <Grid item xs={12} className="py-5 fw-bold fs-1 text-center ">
              Practice Exams
            </Grid>
            {subjects?.map((sub, index) => {
              return (
                <Grid key={index} item xs={12} md={3} sm={6}>
                  <SubjectCard
                    subject={sub}
                    url={`${serverURL}/subject`}
                    image={sub.subjectImg?.split("\\")[2]}
                  />
                </Grid>
              );
            })}
            <Grid xs={12} className="text-center py-5">
              <ChakraProvider>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  className="fs-3 p-4"
                >
                  Browse All Exams
                </Button>
              </ChakraProvider>
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <Container>
          <Grid container spacing={2} className="">
            <Grid item xs={12} className="py-5 fw-bold fs-1 text-center ">
              LMS
            </Grid>
            {subjects?.map((sub, index) => {
              return (
                <Grid key={index} item xs={12} md={3} sm={6}>
                  <SubjectCard
                    subject={sub}
                    url={`${serverURL}/subject`}
                    image={sub.subjectImg?.split("\\")[2]}
                  />
                </Grid>
              );
            })}
            <Grid xs={12} className="text-center py-5">
              <ChakraProvider>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  className="fs-3 p-4"
                >
                  Browse All Categories
                </Button>
              </ChakraProvider>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Home;