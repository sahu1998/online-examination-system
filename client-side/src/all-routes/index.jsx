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



import PracticeCatg from "../pages/owner/exams/categories";
import PracticeSubjects from "../pages/owner/exams/subject-topics";
import LmsCategory from "../pages/owner/lms/categories";
import RecaptchaSetting from "../pages/owner/master-settings/google-recaptcha"
import QuestionBank from "../pages/owner/exams/question-bank";
import ChangePasswordAdmin from "../pages/admin/changePassword";
import ChangePasswordOwner from "../pages/owner/changePassword";
import ChangePasswordStudent from "../pages/student/changePassword";
import NotificationMsg from "../pages/student/notification";
import MyProfileOwner from "../pages/owner/myprofileOwner";
import MyProfileAdmin from "../pages/admin/myprofileAdmin";
import MyProfileStudent from "../pages/student/myProfileStudent";

import ContactUs from "../pages/landing/contact-us";
import UsersOwner from "../pages/owner/users/temp";
import FeedbackOwner from "../pages/owner/feedbackTable";
import NotificationOwner from "../pages/owner/notification";
import FeedbackStudent from "../pages/student/feedback/temp";

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
      <Route path="/lms/category" element={<LmsCategory />} />
      <Route path="/mastersetting/recaptcha-setting" element={<RecaptchaSetting />} />
      {/* //////////.....Home.....////////// */}
      <Route path="/pattern" element={<Pattern />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/owner" element={<OwnerDasboad />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/owneruser" element={<UsersOwner />} />
      <Route path="/feedback" element={<FeedbackStudent />} />
      <Route path="/ownerfeedback" element={<FeedbackOwner />} />
      <Route path="/myprofileStudent" element={<MyProfileStudent />} />
      <Route path="/ownernotification" element={<NotificationOwner />} />
      <Route path="/myprofileAdmin" element={<MyProfileAdmin />} />
      <Route path="/ownerprofile" element={<MyProfileOwner />} />
      <Route path="/studentNotification" element={<NotificationMsg />} />
      <Route path="/studentPassword" element={<ChangePasswordStudent />} />
      <Route path="/ownerPassword" element={<ChangePasswordOwner />} />
      <Route path="/adminPassword" element={<ChangePasswordAdmin />} />
      <Route path="/contactUs" element={<ContactUs />} />

      <Route path="/exams/categories" element={<PracticeCatg />} />
      <Route path="/exams/subjects" element={<PracticeSubjects />} />
      <Route path="/exams/questionbank" element={<QuestionBank />} />
    </Routes>
  );
}
