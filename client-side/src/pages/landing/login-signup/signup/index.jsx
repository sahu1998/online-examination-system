import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
import { postApiHandler } from "../../../../apiHandler";
import LandingLayout from "../../../../layouts/landing-layout";
import swal from "sweetalert";

const theme = createTheme();

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    userName: yup.string().required("Name is required"),

    email: yup
      .string()
      .required("Email is required")
      .matches(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/),

    password: yup
      .string()

      .required("Password is required"),

    confirmPassword: yup
      .string()

      .required("Confirm Password is required"),
  })
  .required();

export default function SignUp() {
  const [message, setMessage] = React.useState();
  const [reCaptcha, setRecaptcha] = React.useState("");
  const captchaRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    default: {
      name: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const history = useNavigate();
  React.useEffect(() => {
    if (reCaptcha) {
      setError("reCaptcha", {
        type: "custom",
        message: "",
      });
    }
  }, [reCaptcha]);
  const onSubmit = async (value) => {
    if (!reCaptcha) {
      setError("reCaptcha", {
        type: "custom",
        message: "please check",
      });
      return;
    }
    console.log("Value", { ...value, reCaptcha });

    const response = await postApiHandler("/post-signup", {
      ...value,
      reCaptcha,
    });

    console.log("res!!!=======>", response);
    setMessage("");
    if (response.status === 200) {
      swal("Registration successfully!", "You clicked the button!", "success");
      history("/logIn");
    } else {
      setMessage(response.message);
    }
  };
  const onChange = (value) => {
    console.log("Captcha value:", value);
    setRecaptcha(value);
  };

  React.useEffect(() => {
    {
      message
        ? message === "password not match"
          ? setError("confirmPassword", {
              type: "custom",
              message: message ?? "",
            })
          : message === "email already exits"
          ? setError("email", { type: "custom", message: message ?? "" })
          : message === "recaptcha is not valid"
          ? setError("reCaptcha", {
              type: "custom",
              message: "recaptcha is not valid",
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
          <Box className="box-shadow">
            <Typography
              component="h1"
              variant="h6"
              style={{ fontWeight: "bold", lineHeight: "4rem" }}
            >
              Create Account
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              // style={{ marginLeft: "0rem" }}
            >
              <Typography className="typography">Name*</Typography>

              <TextField
                className="textfeild"
                margin="normal"
                required
                placeholder="Name"
                name="name"
                type="name"
                {...register("name")}
                error={!!errors?.name}
                helperText={errors?.name?.message}
              />
              <Typography className="typography">Username*</Typography>
              <TextField
                className="textfeild"
                margin="normal"
                required
                name="userName"
                placeholder="Username"
                type="userName"
                {...register("userName")}
                error={!!errors?.userName}
                helperText={errors?.userName?.message}
              />
              <Typography className="typography">Email*</Typography>
              <TextField
                className="textfeild"
                margin="normal"
                required
                name="email"
                placeholder="Email"
                type="email"
                {...register("email")}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />

              <Typography className="typography">Password*</Typography>
              <TextField
                className="textfeild"
                margin="normal"
                required
                name="password"
                placeholder="Password"
                type="password"
                {...register("password")}
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
              <Typography className="typography">
                Password Confirmation*
              </Typography>
              <TextField
                className="textfeild"
                margin="normal"
                required
                name="confirmPassword"
                placeholder="Confirm Password"
                type="confirmPassword"
                {...register("confirmPassword")}
                error={!!errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
              />

              <ReCAPTCHA
                sitekey="6LeHNZokAAAAAC5sRNYDUeqWL8Asc4KW_lCKP-5N"
                onChange={onChange}
                ref={captchaRef}
              />
              {errors?.reCaptcha && (
                <p className="text-danger text-small">
                  {errors?.reCaptcha?.message}
                </p>
              )}
              {console.log(errors)}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="register"
              >
                Register Now
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </LandingLayout>
  );
}
