import React, { useEffect, useState } from "react";

import { Modal, Input, Button, Text, Textarea, Grid } from "@nextui-org/react";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getApiHandler,
  postApiHandler,
  putApiHandler,
} from "../../../../apiHandler";

// import "./category.m.css";

const schema = yup.object().shape({
  subjectName: yup.string().required("*Subject Name is required"),
  // .matches(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/, "*Use only alphabats"),
  subjectDesc: yup.string().required("*Subject Description is required"),
  marks: yup
    .number()
    .typeError("*Marks must be a number")
    .required("*Mark is required"),
  timeLimit: yup
    .number()
    .typeError("*Time limit must be a number")
    .required("*Time limit is required"),
});

export default function PracticeSubjects() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [subjectId, setSubjectId] = useState();
  const [visible, setVisible] = useState(false);
  const [catg_list, setCatg_list] = useState([]);

  const { subject } = useParams();
  const file = watch("image");
  const quiz = watch("quiz");

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("subjectName", values.subjectName);
    formData.append("subjectDesc", values.subjectDesc);
    formData.append("marks", values.marks);
    formData.append("timeLimit", values.timeLimit);
    formData.append("categoryId", values.categoryId);
    formData.append("image", file[0]);
    formData.append("quiz", quiz[0]);
    if (subject) {
      console.log("updating... ", values);
      const result = await putApiHandler(
        `/update-practice-subj/${subject}`,
        values
      );
      console.log("updated.....", result);
    } else {
      const result = await postApiHandler("/postsubject", formData);
      console.log("data=>", result.data);
    }
    setVisible(false);
    reset();
  };

  const getCategories = async () => {
    const temp = await getApiHandler("/get-exam-catg");
    console.log("catg: ", temp.data);
    setCatg_list(temp.data);
  };

  const prefilledForm = async () => {
    if (subject) {
      const res = await getApiHandler(`/getsubjectbyid/${subject}`);
      console.log(res);
      setValue("subjectName", res.subjectName);
      setValue("subjectDesc", res.subjectDesc);
      setValue("marks", res.marks);
      setValue("timeLimit", res.timeLimit);
    } else {
      setValue("subjectName", "");
      setValue("subjectDesc", "");
      setValue("marks", "");
      setValue("timeLimit", "");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (subject) {
      prefilledForm();
    } else {
      setValue("subjectName", "");
      setValue("subjectDesc", "");
      setValue("marks", "");
      setValue("timeLimit", "");
    }
  }, [subject]);

  return (
    <div className="">
      <Modal
        blur
        preventClose
        open={visible}
        onClose={() => {
          setVisible(false);
        }}
        aria-labelledby="modal-title"
        width={750}
        height={500}
      >
        <Modal.Header aria-labelledby="modal-header">
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              {subject ? "Update Practice Subject" : "Add Practice Subject"}
            </Text>
          </Text>
        </Modal.Header>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Body aria-labelledby="modal-body">
            <Grid.Container gap={2}>
              <Grid xs={12}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color={errors?.subjectName ? "error" : "primary"}
                  size="lg"
                  placeholder="Title"
                  error={!!errors?.subjectName}
                  helperText={errors?.subjectName?.message}
                  helperColor="error"
                  {...register("subjectName")}
                />
              </Grid>
              <Grid xs={12}>
                <Textarea
                  clearable
                  bordered
                  fullWidth
                  color={errors?.subjectDesc ? "error" : "primary"}
                  size="lg"
                  placeholder="Description"
                  error={!!errors?.subjectDesc}
                  helperText={errors?.subjectDesc?.message}
                  helperColor="error"
                  {...register("subjectDesc")}
                />
              </Grid>

              <Grid xs={6}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color={errors?.marks ? "error" : "primary"}
                  size="lg"
                  placeholder="Total Marks"
                  error={!!errors?.marks}
                  helperText={errors?.marks?.message}
                  helperColor="error"
                  {...register("marks")}
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color={errors?.timeLimit ? "error" : "primary"}
                  size="lg"
                  placeholder="Time Limit"
                  error={!!errors?.timeLimit}
                  helperText={errors?.timeLimit?.message}
                  helperColor="error"
                  {...register("timeLimit")}
                />
              </Grid>
              <Grid xs={12}>
                <div className="w-100">
                  <select
                    {...register("categoryId")}
                    className="form-control rounded  w-100 p-1"
                  >
                    {catg_list.map((catg, index) => {
                      return (
                        <option key={index} value={catg._id}>
                          {catg.examName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Grid>
              <Grid xs={12}>
                <div class=" w-100">
                  <label for="formFile" class="form-label">
                    Image
                  </label>
                  <input
                    className="form-control border  border-3 rounded border-primary w-100 p-1"
                    id="formFile"
                    required
                    fullWidth
                    name="file"
                    type="file"
                    // inputProps={{
                    //   multiple: true,
                    // }}
                    {...register("image")}
                  />
                </div>
              </Grid>
              <Grid xs={12}>
                <div class=" w-100">
                  <label for="formFile" class="form-label">
                    Upload Excel File (<i>Quiz Questions</i>)
                    <Chip
                      icon={<TableChartIcon />}
                      label="Download Template"
                      component="a"
                      href="http://localhost:3000/assets/files/quiz-ques.xlsx"
                      variant="outlined"
                      clickable
                      download="quiz-ques.xlsx"
                      size="small"
                    />
                  </label>
                  <input
                    className="form-control border border-3 rounded border-primary p-1"
                    id="formFile"
                    required
                    fullWidth
                    name="quiz"
                    type="file"
                    // inputProps={{
                    //   multiple: true,
                    // }}
                    {...register("quiz")}
                  />
                </div>
              </Grid>
            </Grid.Container>
          </Modal.Body>
          <Modal.Footer aria-labelledby="modal-footer">
            <Button
              auto
              flat
              color="warning"
              onPress={() => {
                setVisible(false);
                reset();
              }}
            >
              Close
            </Button>
            <Button type="submit" color="success">
              {subject ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
