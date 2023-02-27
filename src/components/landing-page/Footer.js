import React from 'react'
import GolfCart from '../../assets/images/golf-cart.svg'
import GolfCartShadow from '../../assets/images/golf-cart-shadow.svg'
import Logo from '../../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <div>
          <div style={{ display: 'flex', width: '90%', maxWidth: '1200px', margin: 'auto' }} >
        <div style={{ width: '90%', maxWidth: '700px', margin: 'auto' }} >


          <div className=' alert-title ' style={{ width: 'fit-content', margin: 'auto' }} > Our Story </div>
          <div className='alert-description text-center'  >Tee Time Alerts was born out of our own frustration with the tee times booking process. We hope you find this tool as helpful as we have. Our golf game has thanked us for it.</div>
          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5  text-white font-medium text-xs leading-tight bg-green-500 uppercase rounded  hover:bg-green-600 hover:shadow-lg  focus:shadow-lg 
          focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out  hero-button-mobile"
            style={{ display: 'flex', margin: 'auto', padding: '14px 28px', width: '202px', height: '52px', borderRadius: '12px', color: '#F5F8FD', fontSize: '16px', fontWeight: '700', lineHeight: '150%', marginTop: '25px' }}
            onClick={()=>{
              navigate('/join')
             }}
          >SET UP ALERT NOW</button>
        </div>
        <div>
          <img src={GolfCartShadow} alt="hero" className='cart-shadow'  />
          <img src={GolfCart} alt="hero" className='cart' />

        </div>
      </div>

      <div style={{ width: '100%', height: 'fit-content', paddingBlock:'80px 20px', marginTop: '210px', background: 'rgba(3, 49, 75, 1)' }} >
        <div className='footer-wrapper' >
          <div className='footer-column' >
            <img src={Logo} alt="logo" className="pr-2 " style={{ height: '55px', marginBottom:'20px' }} />
            <div className='footer-slogan' >More golfing. Less planning.</div>
          </div>

          <div className='footer-column'>
            <div className='footer-links-title'  >Quick Links</div>
            <div>
              <div className='footer-link' >Home </div>
              <div className='footer-link' >Alerts </div>
              <div className='footer-link' >Work </div>
              <div className='footer-link' >Quick Tips </div>
              <div className='footer-link' >Testimonial </div>
              <div className='footer-link' >Case Study </div>
              <div className='footer-link' >Our Story </div>
            </div>
          </div>
          <div className='footer-column'>
            <div className='footer-links-title'  >Contact Us</div>
            <div>
              <div className='footer-link' > Address: 4455 Landing Lange, APT 4 Louisville, KY 40018 </div>
              <div className='footer-link' >Phone: (666) 478-9530 </div>
              <div className='footer-link' >Email: hi@teatimealerts.co </div>

            </div>
          </div>
          <div className='footer-column'>
            <div className='footer-links-title'  >Get Social</div>
            <div>
              <div className='footer-link' >Instagram </div>
              <div className='footer-link' >Facebook </div>
              <div className='footer-link' >Twitter </div>
            </div>
          </div>

        </div>
        <div className='footer-link' style={{fontSize:'14px', width:'fit-content', margin:'auto', paddingTop:'30px'}} >Copyright ©  2023 TEATIME ALERTS </div>
      </div>
    </div>
  )
}

export default Footer