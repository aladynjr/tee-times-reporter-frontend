import React, { useEffect, useState, useReducer } from 'react'
import globalVal from '../globalVal'
import FetchCoursesData from '../utilities/FetchCoursesData'
import GenerateDatesForNext7Days from '../utilities/GenerateDatesForNext7Days'

import { useNavigate } from 'react-router-dom';

function AlertDemoSection() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState(null)
  const [selectedCourseID, setSelectedCourseID] = useState(null)



  useEffect(() => {
    const GetCoursesData = async () => {
      const courses = await FetchCoursesData()
      setCourses(courses)
    }
    GetCoursesData()
  }, [])

  console.log({ courses })

  const [selectedCourse, setSelectedCourse] = useState(null)
  useEffect(() => {
    if (!selectedCourseID) return;
    const selectedCourse = courses.find(course => course.course_id == selectedCourseID)
    setSelectedCourse(selectedCourse)
  }, [selectedCourseID])

  console.log({ selectedCourseID })
  console.log({ selectedCourse })

  const [preferences, setPreferences] = useState({})
  console.log({ preferences })
  useEffect(() => {
    if (!selectedCourse) {
      setPreferences({})
      return;
    }


    var preferences = {}
    selectedCourse.course_fields_and_options.forEach(fieldAndOptions => {

      //check if we have a field where an option is always fixed and not changeable for the users(for example: booking class in the first golf course)
      if (fieldAndOptions?.field_fixed_option) {
        preferences[fieldAndOptions.field_name] = fieldAndOptions.field_fixed_option
        return;
      }
      preferences[fieldAndOptions.field_name] = fieldAndOptions.field_options?.[0]?.option_name
      //if field is start_time set it to 00, if field is end_time set it to 23
      if (fieldAndOptions.field_name == 'start_time') preferences[fieldAndOptions.field_name] = '6'
      if (fieldAndOptions.field_name == 'end_time') preferences[fieldAndOptions.field_name] = '17'
      if (fieldAndOptions.field_name == 'date') {
        var date = fieldAndOptions.field_options?.[0]?.option_name
        preferences[fieldAndOptions.field_name] = date?.split('-')[2] + '-' + (date?.split('-')[0])?.toString().padStart(2, '0') + '-' + date?.split('-')[1]?.toString().padStart(2, '0')
      }
    })
    setPreferences(preferences)

  }, [selectedCourse])

  const defaultCourseFieldsAndOptions = [
    {
      "field_options": [
        {
          "option_fullname": "Select Date"
        }
      ],
      "field_fullname": "Date"
    },
    {
      "field_options": [
        {
          "option_fullname": "Select Time"
        }
      ],
      "field_fullname": "Time"
    },
    {
      "field_options": [
        {
          "option_fullname": "Select Group Size"
        }
      ],
      "field_fullname": "Group Size"
    }


  ]


  const [errorMessage, setErrorMessage] = useState('')
 const SavePreference = () => {
  setErrorMessage('')
  if(!selectedCourse){
    setErrorMessage('Please select a course first!')
    return;
  }
    
  sessionStorage.setItem('preferences', JSON.stringify(preferences))
  //redirect to join page
  navigate('/join')
 }
  //save prefereces to session storage 

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '90%', maxWidth: '1300px', margin: 'auto', paddingTop: '60px' }} className='flex-col-reverse xl:flex-row alert-section-mobile' >


      <div className='block p-6 rounded-lg shadow-lg xl:shadow-2xl bg-white' style={{ width: '90%', maxWidth: '450px', margin: 'auto' }}>
        <div style={{ margin: 'auto' }}>
          <div className='options'>
            <div className="mb-3 ">
              <label
                className="form-label alert-form-select-label inline-block mb-2 text-gray-700 text-sm"
              >Course</label>
              <select onChange={(e) => setSelectedCourseID(e.target.value)} className="form-select alert-form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                <option value={null}>Select your course</option>
                {courses && courses.map((course, i) => {
                  return <option key={i} value={course.course_id}>{course.course_fullname}</option>
                })}
              </select>

            </div>

            {!selectedCourse && <div>
              {defaultCourseFieldsAndOptions.map((fieldAndOptions, i) => {
                return <div className="mb-3 ">
                  <label
                    className="form-label alert-form-select-label inline-block mb-2 text-gray-700 text-sm">{fieldAndOptions.field_fullname}</label>
                  <select className="form-select alert-form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                    {fieldAndOptions?.field_options.map((option, i) => {

                      return <option key={i} value={option.option_name} >{option.option_fullname}</option>
                    })}
                  </select>

                </div>

              })}





            </div>}
            {selectedCourse && <div>


              {selectedCourse.course_fields_and_options.map((fieldAndOptions, i) => {
                //dont show field if it has a fixed option 
                if (fieldAndOptions?.field_fixed_option) {
                  return null
                }

                if ((fieldAndOptions.field_name == 'start_time') || fieldAndOptions.field_name == 'end_time') {
                  //create an array that contains from 00 to 23 
                  let hours = []
                  for (let i = 6; i <= 17; i++) {
                    hours.push(i)
                  }

                  return (
                    <div key={i} className='mb-3' >
                      <label className="form-label alert-form-select-label inline-block mb-2 text-gray-700 text-sm "  >{fieldAndOptions.field_fullname}</label>
                      <select
                        onChange={(e) => {
                          var newPreferences = preferences
                          newPreferences[fieldAndOptions.field_name] = e.target.value
                          setPreferences(newPreferences)
                          console.log({ preferences })
                        }}
                        name={fieldAndOptions.field_name}
                        className="form-select alert-form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        defaultValue={preferences[fieldAndOptions.field_name]}
                      >

                        {hours.map((hour, i) => {
                          var displayHour = hour
                          //change hour to am or pm 
                          if (hour > 12) {
                            displayHour = hour - 12 + ':00 PM'
                          } else {
                            displayHour = hour + ':00 AM'
                          }

                          return <option
                            key={i}
                            value={hour}

                          >{displayHour}</option>
                        })

                        }
                      </select>



                    </div>)
                }


                return (<div key={i} className='mb-3'  >
                  <label className="form-label alert-form-select-label inline-block mb-2 text-gray-700 text-sm ">{fieldAndOptions.field_fullname}</label>
                  <select
                    onChange={(e) => {
                      var newPreferences = preferences
                      newPreferences[fieldAndOptions.field_name] = e.target.value
                      setPreferences(newPreferences)
                      console.log({ preferences })
                    }}

                    name={fieldAndOptions.field_name}
                    className="form-select alert-form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                    {/* <option >{fieldAndOptions.field_fullname}</option> */}
                    {fieldAndOptions?.field_options.map((option, i) => {
                      var showThisOption = true
                      var optionConditions = option?.conditions

                      optionConditions?.forEach(condition => {
                        //condition 
                        var conditionField = condition?.field
                        var conditionValue = condition?.value

                        //make sure value of this condition in preferences is equal to conditionValue
                        if (conditionField && conditionValue) {
                          if (preferences?.[conditionField] != conditionValue) {
                            showThisOption = false
                          }
                        }
                      })


                      if (!showThisOption) return null

                      //if field name is date, then generate dates for the next 7 days
                      if (fieldAndOptions.field_name == "date") {
                        return GenerateDatesForNext7Days(option.option_name).map((date, i) => {
                          return <option key={i} value={date} >{
                            //show date in legible format
                            new Date(date.toLocaleString('en-US', { timeZone: 'UTC' })).toLocaleDateString('en-US', {
                              weekday: 'long', // long, short, narrow
                              year: 'numeric', // numeric, 2-digit
                              month: 'long', // numeric, 2-digit, long, short, narrow
                              day: 'numeric' // numeric, 2-digit
                            })

                          }</option>
                        })
                      } else {
                        return <option key={i} value={option.option_name} >{option.option_fullname}</option>
                      }



                    })}


                  </select>

                </div>)
              })}




            </div>}
          </div>

          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5  text-white font-medium text-xs leading-tight bg-green-500 uppercase rounded  hover:bg-green-600 hover:shadow-lg  focus:shadow-lg 
          focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out  hero-button-mobile"
            style={{ padding: '14px 28px', width: '202px', height: '52px', borderRadius: '12px', color: '#F5F8FD', fontSize: '16px', fontWeight: '700', lineHeight: '150%', marginTop: '25px' }}
            onClick={()=>{
              SavePreference()
             
            }}
            >
            SET UP ALERT NOW</button>

{
  errorMessage && <div className='text-red-500 text-sm mt-2' >{errorMessage}</div>

}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '250px', width: '90%', maxWidth: '550px' }} >
        <div className=' alert-title ' > Create an Alert </div>
        <div className='alert-description'  >Our software constantly crawls golf booking sites looking for cancellations. Once a tee time opens up that meets your criteria, we will send you an email and/or text with a link to book.</div>

      </div>

    </div>)
}

export default AlertDemoSection