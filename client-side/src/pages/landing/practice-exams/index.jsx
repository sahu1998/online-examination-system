import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import MenuList from "@mui/material/MenuList";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Box, Container, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  ChakraProvider,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import LinearProgress from "@mui/material/LinearProgress";
import { Result } from "antd";
import "./practice-exam.m.css";
import { getApiHandler, serverURL } from "../../../apiHandler";
import SubjectCard from "../../../components/landing/practice-exams/Card/SubjectCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function PracticeExam() {
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [loading, setLoading] = useState(false);

  const getExamCategory = async () => {
    const temp = await getApiHandler("/getexam");
    if (temp.status === 200) {
      setExams(temp.response);
      setSelectedIndex(temp.response[0]._id);
      setSelectedExam(temp.response[0].examName);
      await getSubjectByCategory(temp.response[0]._id);
    }
  };

  const getSubjectByCategory = async (id) => {
    setLoading(true);
    const temp = await getApiHandler(`/getsubject?id=${id}`);
    setSubjects(temp.response);
    setLoading(false);
  };
  console.log(subjects);
  useEffect(() => {
    getExamCategory();
  }, []);

  return (
    <div className="background py-5">
      <Container className="my-3">
        <Grid container spacing={2}>
          <Grid item xs={12} md={2} sm={12}>
            <Paper sx={{ width: "100%", maxWidth: "100%" }}>
              <MenuList>
                <List
                  // key={exam.examName}
                  component="nav"
                  aria-label="main mailbox folders"
                  sx={{
                    width: "100%",
                    // maxWidth: 360,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 300,
                    // "& ul": { padding: 0 },
                  }}
                >
                  {exams.map((exam, index) => {
                    return (
                      <ListItemButton
                        key={exam.examName}
                        selected={selectedIndex === exam._id}
                        onClick={() => {
                          setSelectedIndex(exam._id);
                          setSelectedExam(exam.examName);
                          getSubjectByCategory(exam._id);
                        }}
                      >
                        <ListItemText>{exam.examName}</ListItemText>
                      </ListItemButton>
                    );
                  })}
                </List>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item container spacing={3} xs={12} md={10} sm={12}>
            <Grid item xs={12}>
              <ChakraProvider>
                <InputGroup size="lg">
                  <Input
                    pr="4.5rem"
                    type="text"
                    placeholder="Search Subject..."
                    className="bg-white"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="2rem"
                      size="md"
                      colorScheme="blue"
                      onClick={() => {
                        console.log("hello");
                      }}
                    >
                      <SearchIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </ChakraProvider>
            </Grid>
            <Grid item xs={12}>
              <div className="bg-white p-3 fw-bold rounded border text-black-50">
                {selectedExam}
              </div>
            </Grid>
            {loading ? (
              <Grid item xs={12}>
                {/* <Box> */}
                <LinearProgress />
                {/* </Box> */}
              </Grid>
            ) : subjects.length ? (
              subjects.map((sub, index) => {
                return (
                  <Grid key={index} item xs={12} md={4} sm={6}>
                    <SubjectCard
                      subject={sub}
                      url={`${serverURL}/subject`}
                      image={sub.subjectImg?.split("\\")[2]}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12} md={12} sm={12}>
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, No Data Found..."
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
