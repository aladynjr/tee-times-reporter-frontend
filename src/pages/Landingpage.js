import React, { useEffect, useState } from 'react'

import { auth } from "../firebase-config";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AlertDemoSection from '../components/AlertDemoSection';
import GuideSection from '../components/GuideSection';
import TipsSection from '../components/TipsSection';
import TestimonialsBG from '../assets/images/testimonials-bg.svg'
import Footer from '../components/Footer';
import GolfPlayers from '../assets/images/golf-players.svg'
import Blob from '../assets/images/blob.svg'

function Landingpage() {
  // RedirectWhenLoggedOrNotLogged( '/home', false)



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

      {/* <div style={{ height: '50px', background: "rgba(3, 49, 75, 1)", borderTopRightRadius: "100%", borderTopLeftRadius: '100%' }} ></div>
    <div  className='testimonials' >
    <div className=' alert-title ' style={{ color:'white', width: 'fit-content', margin: 'auto', paddingBlock: '75px' }} > What Golfers Are Saying </div>
    </div> */}

      <div>
        <div style={{ background: 'white', paddingBlock:'170px', paddingBottom:'70px' }} >
          <img src={Blob} alt="blob" className='insights-blob'  />

          <div className='insights-wrapper'  >
            <div>
              <img src={GolfPlayers} alt="golf players" style={{ width: '90%', maxWidth: '1200px', height: 'auto', position: 'relative', zIndex: '1', margin: 'auto' }} />
            </div>
            <div style={{ width: '90%', maxWidth: '700px' }} >
              <div className=' alert-title ' style={{ color: 'rgba(44, 60, 85, 1)', paddingBlock: '25px' }} > Why This Works </div>

              <div className='alert-description' dangerouslySetInnerHTML={{
                __html: `Working with the head pro at one of the most popular courses in San Diego, we found that there were nearly 60 cancellations on average per DAY!!
           
           Most golf courses don’t penalize you for cancelling as long as you let them know 24-48 hours in advance, so golfers take advantage of this policy by proactively booking but cancelling the week of as their plans change.
        
           When looking at the data, we found that 50% of the time it was just one spot canceling, 20% of the time it was 2 slots, 3% of the time it was 3 slots and 27% of the time the entire foursome canceled.
`.replace(/\n/g, "<br />")
              }} />
            </div>
          </div>
        </div>
        <div style={{ height: '50px', background: "white", borderBottomRightRadius: "100%", borderBottomLeftRadius: '100%' }} ></div>

      </div>

      <div style={{ marginBlock: '100px' }}></div>
      <Footer />
      <div style={{ marginBlock: '100px' }}></div>


      {/* <div style={{ paddingBottom: '200px' }} ></div> */}
    </div>
  )
}

export default Landingpage