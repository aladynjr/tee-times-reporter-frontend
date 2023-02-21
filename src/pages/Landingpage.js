import React, { useEffect, useState } from 'react'

import { auth } from "../firebase-config";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AlertDemoSection from '../components/AlertDemoSection';
import GuideSection from '../components/GuideSection';
import TipsSection from '../components/TipsSection';
import Footer from '../components/Footer';
import InsightsSection from '../components/InsightsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import LoggedInOrNot from '../utilities/LoggedInOrNot';

function Landingpage() {
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(()=>{
    if(window.location.pathname.includes('landing')) return
    setIsUserLoggedIn(LoggedInOrNot())
  },[])
  
  if (!isUserLoggedIn) {
   // console.log('%c user is not logged in !', 'color: red; font-size: 20px;')
      //navigate('/login')
    } else{
     // console.log('%c user is logged in !', 'color: green; font-size: 20px;')
      navigate('/home')
 
  }
  const navLinks = [
    'Home',
    'How It Works',
    'Quick Tips',
    'Testimonials',
    'Featured Course',

    'Login'
  ]
  return (
    <div style={{ background: '#F5F8FD' }}>
      <Navbar />
      <div id={'Home'} />

      <HeroSection />

      <div style={{ marginBlock: '100px' }}></div>
      <AlertDemoSection />
      <div id={'How It Works'}  style={{ marginBlock: '100px' }}></div>
      <GuideSection />
      <div id={'Quick Tips'} style={{ marginBlock: '100px' }}></div>
      <TipsSection />
      <div id={'Testimonials'} style={{ marginBlock: '100px' }}  ></div>
      <TestimonialsSection />

      <div id={'Featured Course'} />

      <InsightsSection />



      <div style={{ marginBlock: '100px' }}></div>
      <Footer />


      {/* <div style={{ paddingBottom: '200px' }} ></div> */}
    </div>
  )
}

export default Landingpage