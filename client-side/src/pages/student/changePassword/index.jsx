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
import { putApiHandler } from "../../../apiHandler";
import StudentLayout from "../../../layouts/student-layout";

const theme = createTheme();

const schema = yup
  .object()
  .shape({
    oldPassword: yup
      .string()

      .required("oldPassword is required"),
    newPassword: yup
      .string()

      .required("newPassword is required"),
    retypePassword: yup
      .string()

      .required("retypePassword is required"),
  })
  .required();

export default function ChangePasswordStudent() {
  const history = useNavigate();
  const [message, setMessage] = React.useState();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    default: {
      oldPassword: "",
      newPassword: "",
      retypePassword: "",
    },
  });
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const onSubmit = async (value) => {
    console.log("VALUE====>", value);
    console.log("id==>", id);

    const res = await putApiHandler(
      `/put-changePassword/${id}/${token}`,
      value
    );
    console.log("res=======>", res);
    reset();
    if (res.status === 200) {
      swal("updated  successfully!", "You clicked the button!", "success");

      history("/logIn");
    } else {
      setMessage(res.message);
    }
    // if (res.status === 200) {
    //   swal("Good job!", res.message, "success");
    //   history("/student");
    // } else {
    //   if (res.message === "password does not match") {
    //     swal("opps!", res.message, "error");
    //   } else {
    //     swal("opps!", "somthing went wrong", "error");
    //   }
    //   setMessage(res.message);
    // }
  };
  React.useEffect(() => {
    {
      message
        ? message === "password not match"
          ? setError("oldPassword", { type: "custom", message: message ?? "" })
          : setError("retypePassword", {
              type: "custom",
              message: message ?? "",
            })
        : null;
    }
  }, [message]);
  return (
    <StudentLayout>
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
            className="boxes"
          >
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              className="reset"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography>CHANGE PASSWORD</Typography>

              <Typography className="typo-graphy">Old Paasword*</Typography>
              <TextField
                className="Text"
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                placeholder="Old Password"
                name="password"
                autoComplete="password"
                autoFocus
                {...register("oldPassword")}
                error={!!errors?.oldPassword}
                helperText={errors?.oldPassword?.message}
              />
              <Typography className="typo-graphy">New Paasword*</Typography>
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
                {...register("newPassword")}
                error={!!errors?.newPassword}
                helperText={errors?.newPassword?.message}
              />
              <Typography className="typo-graphy">
                {" "}
                Retype Password *
              </Typography>
              <TextField
                className="Text"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                placeholder="Retype Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("retypePassword")}
                error={!!errors?.retypePassword}
                helperText={errors?.retypePassword?.message}
              />

              {/* <h6 style={{ color: "red", textAlign: "initial" }}>
                {message ? message : ""}
              </h6> */}

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                //   style={{ fontWeight: "600" }}
                className="Button"
              >
                UPDATE
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </StudentLayout>
  );
}
