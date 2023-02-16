import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import Home from '../pages/landing/home'
import Lms from '../pages/landing/lms'
import PracticeExam from '../pages/landing/practice-exams'

import AboutUs from "../components/landing/about-us/temp";
import Pattern from "../components/landing/pattern/temp";
import Pricing from "../components/landing/pricing/temp";
import Syllabus from "../components/landing/syllabus/temp";

export default function AllRoutes() {
  return (
    <Routes>
      {/* //////////.....Home.....////////// */}
      <Route path="/" element={<Home />} />
      <Route path="/practices" element={<PracticeExam />} />
      <Route path="/pattern" element={<Pattern />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="about" element={<AboutUs />} />

    </Routes>
  );
}
