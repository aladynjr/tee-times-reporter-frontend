import React, { useEffect, useState } from 'react'

import { auth } from "../firebase-config";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AlertDemoSection from '../components/AlertDemoSection';
import GuideSection from '../components/GuideSection';
import TipsSection from '../components/TipsSection';
import TestimonialsBG from '../assets/images/testimonials-bg.svg'
import GolfCart from '../assets/images/golf-cart.svg'
import GolfCartShadow from '../assets/images/golf-cart-shadow.svg'

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
      <div style={{ marginBlock: '100px' }}></div>

      <div style={{display:'flex', width:'90%', maxWidth:'1200px', margin:'auto'}} >
        <div style={{width:'90%', maxWidth:'700px', margin:'auto'}} >


          <div className=' alert-title ' style={{ width: 'fit-content', margin: 'auto' }} > Our Story </div>
          <div className='alert-description text-center'  >Tee Time Alerts was born out of our own frustration with the tee times booking process. We hope you find this tool as helpful as we have. Our golf game has thanked us for it.</div>
          <button
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="inline-block px-6 py-2.5  text-white font-medium text-xs leading-tight bg-green-500 uppercase rounded  hover:bg-green-600 hover:shadow-lg  focus:shadow-lg 
          focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out  hero-button-mobile"
          style={{ display:'flex', margin:'auto', padding: '14px 28px', width: '202px', height: '52px', borderRadius: '12px', color: '#F5F8FD', fontSize: '16px', fontWeight: '700', lineHeight: '150%', marginTop: '25px' }}
        >SET UP ALERT NOW</button>
        </div>
        <div>
          <img src={GolfCartShadow} alt="hero" style={{position:'absolute', right:'15%', left:'70%', width: '90%', maxWidth: '470px', margin: 'auto', marginTop: '266px', marginRight:'-152px', mixBlendMode:'multiply' }} />
        <img src={GolfCart} alt="hero" style={{position:'absolute', right:'5%', left:'70%', width: '90%', maxWidth: '400px', margin: 'auto', marginTop: '120px' }} />


        </div>
      </div>

<div style={{width:'100%', height:'400px' ,marginTop:'130px', background:'rgba(3, 49, 75, 1)'}} >

</div>


      {/* <div style={{ paddingBottom: '200px' }} ></div> */}
    </div>
  )
}

export default Landingpage