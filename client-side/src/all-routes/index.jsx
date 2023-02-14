<<<<<<< HEAD
import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import Home from '../pages/landing/home'
import Lms from '../pages/landing/lms'
import PracticeExam from '../pages/landing/practice-exams'
=======
import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUs from "../components/landing/about-us/temp";
import Pattern from "../components/landing/pattern/temp";
import Pricing from "../components/landing/pricing/temp";
import Syllabus from "../components/landing/syllabus/temp";
import Home from "../pages/landing/home";
import PracticeExam from "../pages/landing/practice-exams";
>>>>>>> bacfda700a5def449e1250e08d73c8bcea5fc0ab

export default function AllRoutes() {
  return (
    <Routes>
<<<<<<< HEAD
        {/* //////////.....Home.....////////// */}
        <Route path='/' element={<Home/>}/>
        <Route path='/practices' element={<PracticeExam/>}/>
        {/* //////////////.......Owner.....///////////// */}
        <Route path='/lms' element={<Lms/>}/>
=======
      {/* //////////.....Home.....////////// */}
      <Route path="/" element={<Home />} />
      <Route path="/practices" element={<PracticeExam />} />
      <Route path="/pattern" element={<Pattern />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="about" element={<AboutUs />} />

      {/* //////////////.......Owner.....///////////// */}
>>>>>>> bacfda700a5def449e1250e08d73c8bcea5fc0ab
    </Routes>
  );
}
