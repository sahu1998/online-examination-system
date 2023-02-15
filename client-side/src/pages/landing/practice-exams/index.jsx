import React, { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";
import { Result } from "antd";
import "./practice-exam.m.css";
import { getApiHandler, serverURL } from "../../../apiHandler";
import SubjectCard from "../../../components/landing/practice-exams/SubjectCard";
import PracticeCategory from "../../../components/landing/practice-exams/PracticeCategory";
import SearchPracticeExam from "../../../components/landing/practice-exams/SearchPracticeExam";
import LandingLayout from "../../../layouts/landing-layout";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
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
    const temp = await getApiHandler(`/getsubjectbycatg/${id}`);
    setSubjects(temp.response);
    setLoading(false);
  };
  console.log(subjects);
  useEffect(() => {
    getExamCategory();
  }, []);

  return (
    <LandingLayout>
      <Container maxWidth="xl" className="p-0">
        <div className="background py-5">
          <Container className="my-3">
            <Grid container spacing={2}>
              <Grid item xs={12} md={2} sm={12}>
                <PracticeCategory
                  exams={exams}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  setSelectedExam={setSelectedExam}
                  getSubjectByCategory={getSubjectByCategory}
                />
              </Grid>
              <Grid item container spacing={3} xs={12} md={10} sm={12}>
                <Grid item xs={12}>
                  <SearchPracticeExam />
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
                      <Grid
                        key={`practice-${selectedExam}-${index}`}
                        item
                        xs={12}
                        md={4}
                        sm={6}
                      >
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
      </Container>
    </LandingLayout>
  );
}
