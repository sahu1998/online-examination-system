import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { postApiHandler } from "../../../../apiHandler";
import LandingLayout from "../../../../layouts/landing-layout";

const theme = createTheme();

const schema = yup
  .object()
  .shape({
    password: yup
      .string()

      .required("password is required"),
    confirmPassword: yup
      .string()

      .required("password is required"),
  })
  .required();

export default function ResetPassword() {
  const history = useNavigate();
  const [message, setMessage] = React.useState();

  const { id, token } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    setError,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    default: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (value) => {
    console.log("VALUE====>", value);
    const res = await postApiHandler(`/resetPassword/${id}/${token}`, value);
    console.log("res=======>", res);
    reset();
    if (res.status === 200) {
      swal("Good job!", res.message, "success");
      history("/logIn");
    } else {
      if (res.message === "password does not match") {
        swal("opps!", res.message, "error");
      } else {
        swal("opps!", "somthing went wrong", "error");
      }
      setMessage(res.message);
    }
  };

  React.useEffect(() => {
    {
      message
        ? message === "password not match"
          ? setError("confirmPassword", {
              type: "custom",
              message: message ?? "",
            })
          : ""
        : null;
    }
  }, [message]);
  return (
    <LandingLayout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            // sx={{
            //   marginTop: 8,
            //   display: "flex",
            //   flexDirection: "column",
            //   alignItems: "center",
            //   boxShadow: "4px 6px 34px -6px grey",
            //   width: "30rem",
            //   height: "26rem",
            // }}
            className="boxess"
          >
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              class="reset"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography className="typo-graphy">New Paasword</Typography>
              <TextField
                className="Text"
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                placeholder="New Password"
                name="password"
                autoComplete="password"
                autoFocus
                {...register("password")}
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
              <Typography className="typo-graphy"> Confirm paasword</Typography>
              <TextField
                className="Text"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                placeholder="Confirm password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("confirmPassword")}
                error={!!errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                //   style={{ fontWeight: "600" }}
                className="Button"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </LandingLayout>
  );
}
