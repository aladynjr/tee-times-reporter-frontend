import React, { useEffect } from 'react'

import RedirectWhenLoggedOrNotLogged from '../utilities/RedirectWhenLoggedOrNotLogged'
import { auth } from "../firebase-config";
import Logo from '../assets/images/logo.svg'

function Landingpage() {
  // RedirectWhenLoggedOrNotLogged( '/home', false)

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
        className="relative w-full flex flex-wrap items-center justify-between py-3 bg-white text-gray-200 border-b-2   lg:border-none navbar navbar-expand-xl navbar-light"
        style={{background:'white', color:'rgba(41, 47, 77, 1)', borderColor:'rgba(223, 238, 255, 1)'}}
      >
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6 max-w-7xl m-auto" style={{width:'95%', maxWidth:'2000px'}}>
           <button
            className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </button> 
          <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
            {/* <a className="text-xl  pr-2 font-semibold" href="#">Navbar</a> */}
            <img src={Logo} alt="logo" className="pr-2 " />
            {/* <!-- Left links --> */}
            <ul className="navbar-nav flex flex-col pl-0 list-style-none ml-auto ">
              {navLinks.map((link, index) => (
                <li className="nav-item p-2" key={index}>

                  <a className="nav-link text-xs 2xl:text-base   hover:text-green-500  transition duration-100 ease-in-out " href="#" >{link}</a>
                        <span className="nav-line absolute bottom-0 bg-green-500  transition-all duration-200 ease-in-out" ></span>

                </li>
              ))}
            </ul>
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              style={{ padding: '14px 28px', width: '202px', height: '52px', background: '#03314bcc', borderRadius: '12px', color: '#F5F8FD', fontSize: '16px', fontWeight: '700', lineHeight: '150%', marginInline:'20px' }}
            >SET UP ALERT NOW</button>
            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}

          {/* <!-- Right elements --> */}

          <div className="flex items-center relative">
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



    </div>
  )
}

export default Landingpage