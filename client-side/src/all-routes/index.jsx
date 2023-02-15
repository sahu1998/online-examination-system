import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/landing/home";
import ForgotPass from "../pages/landing/login-signup/forgotpass";
import LogIn from "../pages/landing/login-signup/login";
import ResetPassword from "../pages/landing/login-signup/resetpass";
import SignUp from "../pages/landing/login-signup/signup";
import PracticeExam from "../pages/landing/practice-exams";

export default function AllRoutes() {
  return (
    <Routes>
      {/* //////////.....Home.....////////// */}
      <Route path="/" element={<Home />} />
      <Route path="/practices" element={<PracticeExam />} />
      {/* //////////////.......Owner.....///////////// */}
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/forgotPass" element={<ForgotPass />} />

      <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
    </Routes>
  );
}
