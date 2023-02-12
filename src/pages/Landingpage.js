import React, { useEffect } from 'react'

import { auth } from "../firebase-config";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
function Landingpage() {
  // RedirectWhenLoggedOrNotLogged( '/home', false)


  return (
    <div style={{ background: '#F5F8FD' }}>
      <Navbar />
      <HeroSection />
      <div style={{ marginBlock: '100px' }}></div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '90%', maxWidth: '2000px', margin: 'auto', paddingTop: '60px' }} className='flex-col-reverse xl:flex-row alert-section-mobile' >


      <div className='block p-6 rounded-lg shadow-lg xl:shadow-2xl bg-white' style={{ width: '90%', maxWidth: '450px', margin: 'auto' }}>
        <div style={{ margin: 'auto' }}>
          <div className="mb-3 ">
            <label
              className="form-label alert-form-select-label inline-block mb-2 text-gray-700 text-sm"
            >Course</label>
            <select className="form-select alert-form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
              <option selected>Select your course</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3 ">
            <label
              className="form-label alert-form-select-label inline-block mb-2 text-gray-700 text-sm"
            >Date</label>
            <select className="form-select alert-form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
              <option selected>Select Date</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3 ">
            <label
              className="form-label alert-form-select-label inline-block mb-2 text-gray-700 text-sm"
            >Time</label>
            <select className="form-select alert-form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
              <option selected>Select Time</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3 ">
            <label
              className="form-label alert-form-select-label inline-block mb-2 text-gray-700 text-sm"
            >Group Size</label>
            <select className="form-select alert-form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
              <option selected>Select Group Size</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5  text-white font-medium text-xs leading-tight bg-green-500 uppercase rounded  hover:bg-green-600 hover:shadow-lg  focus:shadow-lg 
              focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out  hero-button-mobile"
            style={{ padding: '14px 28px', width: '202px', height: '52px', borderRadius: '12px', color: '#F5F8FD', fontSize: '16px', fontWeight: '700', lineHeight: '150%', marginTop: '25px' }}
          >SET UP ALERT NOW</button>

        </div>
      </div>

    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '250px', width: '90%', maxWidth: '550px' }} >
        <div className=' alert-title ' > Create an Alert </div>
        <div className='alert-description'  >Our software constantly crawls golf booking sites looking for cancellations. Once a tee time opens up that meets your criteria, we will send you an email and/or text with a link to book.</div>

      </div>

      </div>
      <div style={{ paddingBottom: '200px' }} ></div>
    </div>
  )
}

export default Landingpage