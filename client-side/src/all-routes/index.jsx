import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/landing/home";
import PracticeExam from "../pages/landing/practice-exams";

export default function AllRoutes() {
  return (
    <Routes>
      {/* //////////.....Home.....////////// */}
      <Route path="/" element={<Home />} />
      <Route path="/practices" element={<PracticeExam />} />
      {/* //////////////.......Owner.....///////////// */}

      <Route path="*" element={<div>Page Not found</div>} />
    </Routes>
  );
}
