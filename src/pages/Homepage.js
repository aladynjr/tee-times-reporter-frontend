import React, { useEffect, useState, useReducer } from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase-config";

import RedirectWhenLoggedOrNotLogged from '../utilities.js/RedirectWhenLoggedOrNotLogged'

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
            preferences[fieldAndOptions.field_name] = null
        })
        setPreferences(preferences)
    }, [selectedCourse])

    console.log({ preferences })
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    return (
        <div>
            {golferData && <div>
                Homepage: YOU ARE LOGGED IN ! {golferData.golfer_first_name}


                <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                        <select onChange={(e) => setSelectedCourseID(e.target.value)} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                            <option >Choose a golf course</option>
                            {courses && courses.map((course, i) => {
                                return <option key={i} value={course.course_id}>{course.course_fullname}</option>
                            })}


                        </select>
                    </div>



                </div>

                {selectedCourse && <div className="flex flex-col justify-center items-center">
                    {selectedCourse.course_fields_and_options.map((fieldAndOptions, i) => {
                        return <div key={i}>
                            <label className="block text-sm font-medium text-gray-700">{fieldAndOptions.field_fullname}</label>
                            <select
                                onChange={(e) => {
                                    var newPreferences = preferences
                                    newPreferences[fieldAndOptions.field_name] = e.target.value
                                    setPreferences(newPreferences)
                                    console.log({ preferences })
                                    forceUpdate()
                                }}

                                name={fieldAndOptions.field_name} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                <option >{fieldAndOptions.field_fullname}</option>
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

                                    return (
                                        <option key={i} value={option.option_name} >{option.option_fullname} + {JSON.stringify(option.conditions)} </option>
                                    )
                                })}

                            </select>

                        </div>
                    })}
                </div>}

            </div>}
        </div>
    )
}

export default Homepage