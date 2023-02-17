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

function Landingpage() {

  return (
    <div style={{ background: '#F5F8FD' }}>
      <Navbar />
      <HeroSection />

      <div style={{ marginBlock: '100px' }}></div>
      <AlertDemoSection />
      <div style={{ marginBlock: '100px' }}></div>
      <GuideSection />
      <div style={{ marginBlock: '100px' }}></div>
      <TipsSection />
      <div style={{ marginBlock: '100px' }}></div>
      <TestimonialsSection />


      <InsightsSection />



      <div style={{ marginBlock: '100px' }}></div>
      <Footer />


      {/* <div style={{ paddingBottom: '200px' }} ></div> */}
    </div>
  )
}

export default Landingpage