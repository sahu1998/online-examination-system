import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import Home from '../pages/landing/home'
import Lms from '../pages/landing/lms'
import PracticeExam from '../pages/landing/practice-exams'

export default function AllRoutes() {
  return (
    <Routes>
        {/* //////////.....Home.....////////// */}
        <Route path='/' element={<Home/>}/>
        <Route path='/practices' element={<PracticeExam/>}/>
        {/* //////////////.......Owner.....///////////// */}
        <Route path='/lms' element={<Lms/>}/>
    </Routes>
  )
}