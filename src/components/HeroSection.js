

import React from 'react'
import HeroIllustration from '../assets/images/hero.svg'
import { useNavigate } from 'react-router-dom';


function HeroSection() {
  const navigate = useNavigate();

  return (
    <div>
              <div style={{ background: 'white', paddingBottom:'75px' }} >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '90%', maxWidth: '2000px', margin: 'auto', paddingTop: '60px' }} className='flex-col-reverse xl:flex-row hero-section-mobile' >

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '390px', width: '90%', maxWidth: '550px' }} >
            <div className=' hero-title ' > Get Alerted When Tee Times Cancel </div>
            <div className='hero-description' >Struggling to get tee times? We’re here to fix that. No more excessive planning, waiting up till midnight, or obsessively refreshing tee sheets.</div>
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5  text-white font-medium text-xs leading-tight bg-green-500 uppercase rounded  hover:bg-green-600 hover:shadow-lg  focus:shadow-lg 
              focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out  hero-button-mobile"
              style={{ padding: '14px 28px', width: '202px', height: '52px', borderRadius: '12px', color: '#F5F8FD', fontSize: '16px', fontWeight: '700', lineHeight: '150%' }}
           onClick={()=>{
            navigate('/join')
           }}
           >SET UP ALERT NOW</button>
          </div>

          <img src={HeroIllustration} alt="hero" style={{ width: '90%', maxWidth: '500px', maxHeight: '50%' }} />

        </div>
      </div>
      <div style={{ height: '50px', background: "white", borderBottomRightRadius: "100%", borderBottomLeftRadius: '100%' }} ></div>

    </div>
  )
}

export default HeroSection