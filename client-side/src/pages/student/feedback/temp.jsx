import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.css";
import swal from "sweetalert";
import { Grid } from "@mui/material";
import StudentLayout from "../../../layouts/student-layout";
import { postApiHandler } from "../../../apiHandler";

const theme = createTheme();

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Title is required"),
    subject: yup.string().required("Subject is required"),

    desc: yup.string().required("Description is required"),
  })
  .required();

export default function FeedbackStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    default: {
      title: "",
      subject: "",

      desc: "",
    },
  });
  const history = useNavigate();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const onSubmit = async (value) => {
    console.log("Value", value);
    const { title, subject, desc } = value;
    const temp = { title, subject, desc, id };
    const response = await postApiHandler(`/post-feedback/${token}`, temp);
    console.log("res!!!=======>", response.data);
    if (response.status === 200 && response.auth === "true") {
      swal("added  successfully!", "You clicked the button!", "success");
      history("/student");
    } else {
      localStorage.removeItem("token");
      history("/logIn");
    }
  };

  return (
    <StudentLayout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className="box-shadow">
            <Typography
              component="h1"
              variant="h6"
              style={{
                lineHeight: "4rem",
                color: "#666666",
                textAlign: "center",
              }}
            >
              GIVE FEEDBACK
            </Typography>
            <Box
              style={{ marginLeft: "2rem" }}
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography className="typography">Title</Typography>
              <Grid item xs={12}>
                <TextField
                  className="textfeild"
                  margin="normal"
                  required
                  placeholder="Title"
                  name="title"
                  type="title"
                  {...register("title")}
                  error={!!errors?.title}
                  helperText={errors?.title?.message}
                />
              </Grid>
              <Typography className="typography">Subject</Typography>
              <Grid item xs={12}>
                <TextField
                  className="textfeild"
                  margin="normal"
                  required
                  name="subject"
                  placeholder="Subject"
                  type="subject"
                  {...register("subject")}
                  error={!!errors?.subject}
                  helperText={errors?.subject?.message}
                />
              </Grid>
              <Typography className="typography">Description</Typography>
              <Grid item xs={12} style={{ height: "10rem" }}>
                <textarea
                  rows="4"
                  cols="65"
                  required
                  name="desc"
                  {...register("desc")}
                  error={!!errors?.desc}
                  helperText={errors?.desc?.message}
                  style={{ margin: "1rem", marginLeft: "0rem" }}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="register"
              >
                SEND
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </StudentLayout>
  );
}
