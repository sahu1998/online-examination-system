import React from 'react';
import Footer from '../../components/structure/landing-struct/footer';
import Navbar from '../../components/structure/landing-struct/header';

export default function LandingLayout({children}) {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
}
