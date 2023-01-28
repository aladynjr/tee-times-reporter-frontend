import React, { useEffect, useState, useReducer } from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase-config";

import RedirectWhenLoggedOrNotLogged from '../utilities.js/RedirectWhenLoggedOrNotLogged'
import {IoTimeSharp} from 'react-icons/io5'
import {IoGolf} from 'react-icons/io5'

function Homepage() {

    RedirectWhenLoggedOrNotLogged(auth, false, '/')

    const [golferUUID, setGolferUUID] = useState(null)
    const [golferData, setGolferData] = useState(null)

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setGolferUUID(currentUser.uid)
        }
    });


    const FetchGolferData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/golfer/uuid/${golferUUID}`);
            const jsonData = await response.json();

            setGolferData(jsonData);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        if (!golferUUID) return;
        FetchGolferData()
    }, [golferUUID])


    const [courses, setCourses] = useState(null)

    const FetchCoursesData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/course/`);
            const jsonData = await response.json();

            setCourses(jsonData);
            setSelectedCourseID(jsonData[0].course_id)

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        FetchCoursesData()
    }, [])


    const [selectedCourseID, setSelectedCourseID] = useState(null)

    const [selectedCourse, setSelectedCourse] = useState(null)
    useEffect(() => {
        if (!selectedCourseID) return;
        const selectedCourse = courses.find(course => course.course_id == selectedCourseID)
        setSelectedCourse(selectedCourse)
    }, [selectedCourseID])
    console.log({ selectedCourse })


    const [preferences, setPreferences] = useState(null)
    useEffect(() => {
        if (!selectedCourse) return;
        var preferences = {}
        selectedCourse.course_fields_and_options.forEach(fieldAndOptions => {
            preferences[fieldAndOptions.field_name] = fieldAndOptions.field_options[0].option_name
        })
        setPreferences(preferences)

    }, [selectedCourse])

    // console.log({ preferences })
    const [, forceUpdate] = useReducer(x => x + 1, 0);


    const GenerateDatesDuring7Days = (date) => {
        //receive a date like 01-27-2023 then geenrate dates for the following days, the first one should be 01-28-2023, the last one should be 02-03-2023
        var dates = []
        for (var i = 0; i < 7; i++) {
            var newDate = new Date(date)
            newDate.setDate(newDate.getDate() + i)

            //output in form of 01-28-2023
            var month = newDate.getMonth() + 1
            var day = newDate.getDate()
            var year = newDate.getFullYear()
            newDate = month + "-" + day + "-" + year


            dates.push(newDate)
        }
        return dates
    }


    const SavePreferencesToGolferRecord = async (id, columns, new_values) => {
        //update duration inside db using PUT with route /api/dashboard 
        try {
            let response = await fetch(`http://localhost:8080/api/golfer`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, columns: columns, new_values: new_values })
                //body: JSON.stringify({ id: [1], column: ["download_thumbnail_duration"], new_value: [(totalDuration) / 1000] })
            })
            console.log('%c golfer  updated successfully ', 'color: green')
        } catch (e) {
            console.log("error when trying to update download ")
            console.log(e)
        }
    }

    return (
        <div style={{ backgroundColor: '#fafafa' }} >
            {golferData && <div>
                {/* Homepage: YOU ARE LOGGED IN ! {golferData.golfer_first_name} */}
                {/* <img src={selectedCourse?.course_image} alt="" className="w-full object-cover  absolute" style={{maxHeight:'500px'}} /> */}
                <div className="flex justify-center">
                    <div className="block p-6 pt-4 rounded-lg shadow-lg bg-white mt-20 mb-64  " style={{ width: '90%', maxWidth: '540px', zIndex: '1', background: 'linear-gradient(0deg, #ffffff 92%, #16a34a 40%)' }}>
                        <h5 className="text-gray-900 text-white text-xl leading-tight font-medium mb-2 flex items-center content-center " style={{justifyContent:'center'}}>Create a tee time alert <IoTimeSharp style={{marginLeft:'12px'}} /></h5>
                        {/* <p className="text-gray-700 text-white text-base mb-4">
                            We well send you an email and a text message when a tee time is available with your preferences
                        </p> */}

                        <div className='options  mt-12' >
                            <div className="mb-3  flex items-center pb-5" style={{borderBottom:'#e7e4e4 1px solid'}}>
                            <IoGolf style={{fontSize:'23px', marginRight:'10px'}} />

                                <label className="block  text-lg text-gray-700 whitespace-nowrap">Course</label>
                                <select onChange={(e) => setSelectedCourseID(e.target.value)}
                                    // className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                    className="  block w-full px-3 py-1.5 text-lg font-semibold text-gray-900 bg-white bg-clip-padding cursor-pointer outline-none caret-pink-500 "

                                    aria-label="Default select example">
                                    {/* <option >Golf course</option>  */}
                                    {courses && courses.map((course, i) => {
                                        return <option key={i} value={course.course_id}>{course.course_fullname}</option>
                                    })}


                                </select>
                            </div>

                            {selectedCourse && <div>


                                {selectedCourse.course_fields_and_options.map((fieldAndOptions, i) => {
                                    return <div key={i} className='mb-4 flex items-center pt-1 pb-5' style={{borderBottom:'#e7e4e4 1px solid'}} >
                                        <label className="block  text-lg text-gray-700 whitespace-nowrap ">{fieldAndOptions.field_fullname}</label>
                                        <select
                                            onChange={(e) => {
                                                var newPreferences = preferences
                                                newPreferences[fieldAndOptions.field_name] = e.target.value
                                                setPreferences(newPreferences)
                                                console.log({ preferences })
                                                forceUpdate()
                                            }}

                                            name={fieldAndOptions.field_name}
                                            //className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                            className="  block w-full px-3 py-1.5 text-lg font-semibold text-gray-900 bg-white bg-clip-padding cursor-pointer outline-none "
                                            aria-label="Default select example">
                                            {/* <option >{fieldAndOptions.field_fullname}</option> */}
                                            {fieldAndOptions.field_options.map((option, i) => {
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
                                                    return GenerateDatesDuring7Days(option.option_name).map((date, i) => {
                                                        return <option key={i} value={date} >{
                                                            //show date in legible format
                                                            new Date(date).toLocaleDateString("en-US", {
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

                                    </div>
                                })}


                                <div className="flex space-x-2 justify-center mt-12">
                                    <button type="button"
                                        onClick={() => {
                                            SavePreferencesToGolferRecord(golferData.golfer_id, ["golfer_preferences"], [JSON.stringify(preferences)])
                                        }}

                                        className="inline-block px-10 py-4 bg-green-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-[100%] mb-12">
                                        Create Alert
                                    </button>
                                </div>

                            </div>}
                        </div>
                    </div>
                </div>





            </div>}
        </div>
    )
}

export default Homepage