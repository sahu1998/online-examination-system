import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.css";
import swal from "sweetalert";
import { postApiHandler } from "../../../../apiHandler";
import LandingLayout from "../../../../layouts/landing-layout";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("email is required")
      .matches(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/),
  })
  .required();

export default function ForgotPass() {
  const [message, setMessage] = React.useState();
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    default: {
      email: "",
    },
  });

  const onSubmit = async (value) => {
    console.log("Value", value);
    const res = await postApiHandler("/verificationEmail", value);
    console.log("RESS", res);
    reset();
    if (res.status === 200) {
      swal("Good job!", res.message, "success");
    } else if (res.message === "email does not exits") {
      swal("opps!", res.message, "error");
    } else {
      res.message === "please enter your email";
      swal("opps!", res.message, "error");
      setMessage(res.message);
    }
  };

  const redirectToLogin = () => router("/logIn");

  React.useEffect(() => {
    {
      message
        ? message === "email does not exits"
          ? setError("email", {
              type: "custom",
              message: message ?? "",
            })
          : // : message === "email does not exits"
            // ? setError("email", { type: "custom", message: message ?? "" })
            ""
        : null;
    }
  }, [message]);

  return (
    <LandingLayout>
      <Box className="BOX">
        <Typography variant="h6" component="h2" class="typ">
          Forgot Password
        </Typography>
        <Box
          component="form"
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            name="email"
            type="email"
            label="Email Address"
            {...register("email")}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            className="TEXT"
          />
          <div className="actions">
            <Button
              variant="outlined"
              onClick={redirectToLogin}
              className="abc"
            >
              Back to Login
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </Box>
      </Box>
    </LandingLayout>
  );
}
