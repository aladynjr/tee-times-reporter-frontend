import React from 'react'
import Logo from '../assets/images/logo.svg'
import MenuIcon from '../assets/images/menu-icon.svg'
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

    
const navLinks = [
    'Home',
    'Alerts',
    'Work',
    'Quick Tips',
    'Testimonials',
    'Case Study' ,
    'Our Study',
  ]
  return (
    <div>

      <nav
        className="relative w-full flex flex-wrap items-center justify-between py-3 bg-white text-gray-200 border-b  xl:border-none navbar navbar-expand-xl navbar-light"
        style={{background:'white', color:'rgba(41, 47, 77, 1)', borderColor:'rgba(223, 238, 255, 1)', borderBottomWidth:'2px'}}
      >
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6 max-w-7xl m-auto" style={{width:'95%', maxWidth:'2000px'}}>
           <button
            className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline 
            py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
            w-full flex justify-end
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            
            <img src={MenuIcon} alt="logo" className="  " style={{height:'20px'}} />
          </button> 
          <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
            {/* <a className="text-xl  pr-2 font-semibold" href="#">Navbar</a> */}
            <img src={Logo} alt="logo" className="pr-2  desktop-logo " />
            {/* <!-- Left links --> */}
            <ul className="navbar-nav flex flex-col pl-0 list-style-none ml-auto mobile-nav-list " style={{marginRight:'20px'}}>
              {navLinks.map((link, index) => (
                <li className="nav-item p-2" key={index}>

                  <a className="nav-link text-xs xl:text-sm 2xl:text-base   hover:text-green-500  transition duration-100 ease-in-out " href="#" >{link}</a>
                        <span className="nav-line  bottom-0 bg-green-500  transition-all duration-200 ease-in-out" ></span>

                </li>
              ))}
            </ul>
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
              focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mobile-cta-button"
              style={{ padding: '14px 28px', width: '202px', height: '52px', background: '#03314bcc', borderRadius: '12px', color: '#F5F8FD', fontSize: '16px', fontWeight: '700', lineHeight: '150%' }}
              onClick={()=>{
                navigate('/join')
               }}
            >SET UP ALERT NOW</button>
            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}

          {/* <!-- Right elements --> */}

          <div className="flex items-center relative mobile-logo " style={{position:'absolute', left:'20px', top:'10px'}}>
          <img src={Logo} alt="logo" className="pr-2 " style={{height:'45px'}}

          //hide if navbar is not collapsed
          

          />

            {/* <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              style={{ padding: '14px 28px', width: '202px', height: '52px', background: '#03314bcc', borderRadius: '12px', color: '#F5F8FD', fontSize: '16px', fontWeight: '700', lineHeight: '150%', marginInline:'20px' }}
            >SET UP ALERT NOW</button> */}

        
          </div>
          {/* <!-- Right elements --> */}
        </div>
      </nav>



    </div>  )
}

export default Navbar