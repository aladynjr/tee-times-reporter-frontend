import React from 'react'
import GolfCart from '../../assets/images/golf-cart.svg'
import GolfCartShadow from '../../assets/images/golf-cart-shadow.svg'
import Logo from '../../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleClickScroll = (link) => {
    const element = document.getElementById(link);
    console.log(element)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


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
                  

              <div className='footer-link hover:cursor-pointer' onClick={()=>handleClickScroll('Home')} >Home </div>
              <div className='footer-link hover:cursor-pointer' onClick={()=>handleClickScroll('How It Works')} >How It Works </div>
              <div className='footer-link hover:cursor-pointer' onClick={()=>handleClickScroll('Quick Tips')} >Quick Tips </div>
              <div className='footer-link hover:cursor-pointer' onClick={()=>handleClickScroll('Testimonials')} >Testimonials </div>
              <div className='footer-link hover:cursor-pointer' onClick={()=>handleClickScroll('Featured Course')} >Featured Course </div>
              <div className='footer-link hover:cursor-pointer ' style={{fontWeight:'500'}} onClick={()=>navigate('/login')} >Login </div>
            </div>
          </div>
          <div className='footer-column'>
            <div className='footer-links-title'  >Contact Us</div>
            <div>
              <div className='footer-link' >Email: info@teetimealerts.io </div>

            </div>
          </div>
          <div className='footer-column'>
            <div className='footer-links-title'  >Get Social</div>
            <div>
              <a className='footer-link' target={'_blank'}  href={"https://www.instagram.com/teetimealerts/"} >Instagram </a>
              <a className='footer-link' target={'_blank'}  href={'https://www.facebook.com/teetimealerts/'} >Facebook </a>
            </div>
          </div>

        </div>
        <div className='footer-link' style={{fontSize:'14px', width:'fit-content', margin:'auto', paddingTop:'30px'}} >Copyright ©  2023 TEATIME ALERTS </div>
      </div>
    </div>
  )
}

export default Footer