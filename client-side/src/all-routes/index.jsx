import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/landing/home";
import ForgotPass from "../pages/landing/login-signup/forgotpass";
import LogIn from "../pages/landing/login-signup/login";
import ResetPassword from "../pages/landing/login-signup/resetpass";
import SignUp from "../pages/landing/login-signup/signup";
import PracticeExam from "../pages/landing/practice-exams";

import Lms from "../pages/landing/lms";

import AboutUs from "../components/landing/about-us/temp";
import Pattern from "../components/landing/pattern/temp";
import Pricing from "../components/landing/pricing/temp";
import Syllabus from "../components/landing/syllabus/temp";
import Quiz from "../pages/student/exams/quiz";
import AdminDashboard from "../pages/admin/dashboard";
import StudentDashboard from "../pages/student/dashboard";
import OwnerDasboad from "../pages/owner/dashboard";
import CategoryTable from "../pages/owner/exams/categories";

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

      <Route path="/lms" element={<Lms />} />
      {/* //////////.....Home.....////////// */}
      <Route path="/pattern" element={<Pattern />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/owner" element={<OwnerDasboad />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />

      <Route path="/practice-exam-catg" element={<CategoryTable />} />
    </Routes>
  );
}
