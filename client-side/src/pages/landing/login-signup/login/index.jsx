import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postApiHandler } from "../../../../apiHandler";
import LandingLayout from "../../../../layouts/landing-layout";

const theme = createTheme();

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("email is required")
      .matches(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/),

    password: yup
      .string()

      .required("password is required"),
  })
  .required();

export default function LogIn() {
  const [message, setMessage] = React.useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    default: {
      email: "",
      password: "",
    },
  });
  const history = useNavigate();

  const onSubmit = async (value) => {
    console.log("Value", value);
    const response = await postApiHandler("/post-login", value);
    console.log("resss=======>", response);
    if (response.status === 200) {
      localStorage.setItem("token", response.temp.token);
      history("/demo");
    } else {
      setMessage(response.message);
    }
  };

  return (
    <LandingLayout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className="Box">
            <Typography component="h1" variant="h5" class="LOGIN">
              LogIn
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              class="loginn"
            >
              <div>
                <Typography className="typo">Email Address</Typography>
                <TextField
                  className="text"
                  margin="normal"
                  fullWidth
                  type="email"
                  required
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  {...register("email")}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                />
                <h6 class="message">
                  {message
                    ? message === "password not match"
                      ? ""
                      : message
                    : ""}
                </h6>
              </div>

              <div>
                <Typography className="typo">Password*</Typography>
                <TextField
                  className="text"
                  margin="normal"
                  fullWidth
                  required
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                />
                <h6 class="message">
                  {message
                    ? message === "password not match"
                      ? message
                      : ""
                    : ""}
                </h6>
              </div>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
                className="BUTTON"
              >
                Login
              </Button>

              <Grid container spacing={2}>
                <Grid xs={8}>
                  <Link
                    to={"/forgotPass"}
                    class="forgot-password"
                    href="#"
                    variant="body2"
                    style={{
                      textDecoration: "none",
                    }}
                    // onClick={handleOpen}
                  >
                    Forgot password
                  </Link>
                </Grid>
                <Grid xs={4}>
                  <Link
                    to={"/signUp"}
                    class="signup"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Box class="mainbox">
              <Typography variant="h6" className="login ">
                Login Us
              </Typography>
              <Box class="box">
                <Button class="button">Owner</Button>
                <Button class="button">Admin</Button>
                <Button class="button">Student</Button>
                <Button class="button">parent</Button>
                <Button class="button">Documentation</Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </LandingLayout>
  );
}