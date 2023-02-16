import React, { useState, useEffect } from "react";
import { Container, Grid, Divider } from "@mui/material";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { getApiHandler, serverURL } from "../../../apiHandler";
import SubjectCard from "../../../components/landing/practice-exams/SubjectCard";
import "./home.m.css";
import LandingLayout from "../../../layouts/landing-layout";
import Banner from "../../../components/landing/home/Banner";
import { NavLink } from "react-router-dom";
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
    <>
      <LandingLayout>
        <Container maxWidth="xl" className="p-0">
          <Banner />
          {/* <div className=""> */}
          <Container>
            <Grid container spacing={2} className="">
              <Grid item xs={12} className="py-5 fw-bold fs-1 text-center ">
                Practice Exams
              </Grid>
              {subjects?.map((sub, index) => {
                return (
                  <Grid
                    key={`subject-${sub.subjectName}-${index}`}
                    item
                    xs={12}
                    md={3}
                    sm={6}
                  >
                    <SubjectCard
                      subject={sub}
                      url={`${serverURL}/subject`}
                      image={sub.subjectImg?.split("\\")[2]}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12} className="text-center py-5">
                <ChakraProvider>
                  <NavLink to="/practices">
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      className="fs-3 p-4"
                    >
                      Browse All Exams
                    </Button>
                  </NavLink>
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
                  <Grid key={`catg-${index}`} item xs={12} md={3} sm={6}>
                    <SubjectCard
                      subject={sub}
                      url={`${serverURL}/subject`}
                      image={sub.subjectImg?.split("\\")[2]}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12} className="text-center py-5">
                <ChakraProvider>
                  <NavLink to="/lms">
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      className="fs-3 p-4"
                    >
                      Browse All Categories
                    </Button>
                  </NavLink>
                </ChakraProvider>
              </Grid>
            </Grid>
          </Container>
          {/* <Container>
            <Grid container className="py-5 item-center">
              <Grid item xs={12} sm={12} md={4}>
                <div className="">
                  <img
                    src="assets/images/landing/onlineexam.png"
                    alt="Free Exams"
                    width={100}
                    className="m-auto"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div className="">
                  <img
                    src="assets/images/landing/onlinelearning.png"
                    alt="Free Learning"
                    width={100}
                    className="m-auto"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <img
                  src="assets/images/landing/onlinelearning.png"
                  alt="Free Learning"
                  width={100}
                  className="m-auto"
                />
              </Grid>
            </Grid>
          </Container> */}
          {/* </div> */}
        </Container>
      </LandingLayout>
    </>
  );
}

export default Home;
