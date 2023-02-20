import React, { useEffect, useState, useReducer } from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase-config";

import { IoTimeSharp } from 'react-icons/io5'
import { IoGolf } from 'react-icons/io5'
import globalVal from '../globalVal'
import { useNavigate } from 'react-router-dom';
import LoggedInOrNot from '../utilities/LoggedInOrNot';
import GenerateDatesForNext7Days from '../utilities/GenerateDatesForNext7Days';
import FetchCoursesData from '../utilities/FetchCoursesData';
import FetchGolferData from '../utilities/FetchGolferData';
function Homepage() {

    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);

        localStorage.removeItem('isUserLoggedIn');
        navigate("/")

    };

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    useEffect(() => {
        setIsUserLoggedIn(LoggedInOrNot())
    }, [])

    if (!isUserLoggedIn) {
        //  console.log('%c user is not logged in !', 'color: red; font-size: 20px;')
        navigate('/login')
    } else {
        //  console.log('%c user is logged in !', 'color: green; font-size: 20px;')
    }

    const [golferUUID, setGolferUUID] = useState(null)
    const [golferData, setGolferData] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setGolferUUID(currentUser.uid)
            }
        });

    }, [auth])


    useEffect(() => {
        if (!golferUUID) return;
        const GetGolferData = async () => {
            const golferData = await FetchGolferData(golferUUID)
            setGolferData(golferData)
        }
        GetGolferData()
    }, [golferUUID])


    const [courses, setCourses] = useState(null)
    const [selectedCourseID, setSelectedCourseID] = useState(null)


    useEffect(() => {
        const GetCoursesData = async () => {
            const courses = await FetchCoursesData()
            setCourses(courses)
            // setSelectedCourseID(courses[0]?.course_id)
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

    // console.log({ preferences })
    const [, forceUpdate] = useReducer(x => x + 1, 0);


    const CheckForDuplicateAlerts = () => {
        setAddNewAlertError('')
        var golferPreferencesList = golferData?.golfer_preferences_list

        //check that none of the preferences are the same as preferences state without comparing each element in the object
        var duplicateFound = false
        golferPreferencesList?.forEach((golferPreference) => {
            if (JSON.stringify(golferPreference) === JSON.stringify(preferences)) duplicateFound = true
        }
        )

        return duplicateFound
    }


    const [addNewAlertLoading, setAddNewAlertLoading] = useState(false)
    const [addNewAlertError, setAddNewAlertError] = useState('')

    const AddNewAlertPreferences = async (golfer_id, preferences) => {


        //setAddNewAlertLoading(true)
        setAddNewAlertError('')



        try {
            let response = await fetch(`${globalVal.host}/api/golfer/preferences/add`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: golfer_id, preferences: preferences })
            })
            console.log('%c alert preferences added successfully ', 'color: green')
            ShowNotification()
            const golferData = await FetchGolferData(golferUUID)
            setGolferData(golferData)


        }
        catch (e) {
            console.log("error when trying to add alert preferences ")
            console.log(e.message)
            setAddNewAlertError(e.message)
        }
        finally {
            // setAddNewAlertLoading(false)
        }
    }


    const [reachedAlertsCap, setReachedAlertsCap] = useState(false)
    useEffect(() => {
        if (golferData?.golfer_preferences_list?.length >= 5) setReachedAlertsCap(true)
        else setReachedAlertsCap(false)
    }, [golferData?.golfer_preferences_list?.length])

    var selectedAlertPreferences;

    const DeleteAlertPreferences = async (golfer_id, preferences) => {
        try {
            let response = await fetch(`${globalVal.host}/api/golfer/preferences/delete`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: golfer_id, preferences: preferences })
            })
            console.log('%c alert preferences deleted successfully ', 'color: green')
            const golferData = await FetchGolferData(golferUUID)
            setGolferData(golferData)


        }
        catch (e) {
            console.log("error when trying to delete alert preferences ")
            console.log(e.message)
        }
        finally {
            // setAddNewAlertLoading(false)
        }


    }

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

    const [showNotification, setShowNotification] = useState(false)

    const ShowNotification = () => {
        setShowNotification(true)
        clearTimeout()

        setTimeout(() => {
            setShowNotification(false)
        }
            , 5000)
    }


    useEffect(() => {
        if (!golferData?.golfer_id) return

        //if preferences exist in session storage, add an alert with those preferenes then clear session storage 
        if (sessionStorage.getItem('preferences')) {
            var preferences = JSON.parse(sessionStorage.getItem('preferences'))
            AddNewAlertPreferences(golferData?.golfer_id, preferences)
            sessionStorage.removeItem('preferences')
        }


    }, [golferData?.golfer_id])

    return (
        <div style={{ backgroundColor: '#fafafa' }} >
            {/* <button onClick={() => {
                ShowNotification()
            }}> ALEEEEEEEEERT</button>  */}
            {showNotification && <div id="toast-top-right"
                className="fixed flex items-center w-full max-w-xs p-4 text-white bg-blue-500 rounded-lg 
            shadow-xl top-5 right-5  z-10 animate__animated animate__fadeInDown animate__faster" role="alert">
                <div class="text-sm font-normal">Alert Created</div>
            </div>}
            <div>
                {/* Homepage: YOU ARE LOGGED IN ! {golferData.golfer_first_name} */}
                {/* <img src={selectedCourse?.course_image} alt="" className="w-full object-cover  absolute" style={{maxHeight:'500px'}} /> */}
                <div className="flex justify-center" id={"main"}>

                    <div className="block  rounded-lg shadow-lg bg-white mt-20  " style={{ width: '90%', maxWidth: '540px', zIndex: '1', /*background: 'linear-gradient(0deg, #ffffff 91%, #16a34a 40%)' */ }}>
                        <h5 className="text-gray-900 text-white text-xl leading-tight  mb-2 flex items-center content-center "
                            style={{ fontWeight: '300', color: 'white', padding: '20px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', background: '#16a34a' }}>
                            <IoTimeSharp style={{ marginRight: '12px' }} /> Create a Tee Time Alert
                        </h5>
                        {!(golferData && courses?.length) && <div>
                            <div role="status" class="pulse1 ">
                                    <div class="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-4 " style={{width:'90%', margin:'auto', marginBlock:'20px'}} ></div>
                                    <div class="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-4 " style={{width:'90%', margin:'auto', marginBlock:'20px'}} ></div>
                                    <div class="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-4 " style={{width:'90%', margin:'auto', marginBlock:'20px'}} ></div>
                                    <div class="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-4 " style={{width:'90%', margin:'auto', marginBlock:'20px'}} ></div>
                                    
                                    <div class="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-4 " style={{width:'60%', margin:'auto', marginBlock:'20px', marginTop:'40px'}} ></div>

                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>}
                        {golferData && courses?.length && <div className='options  mt-2 p-6 pt-4' >
                            <div className="mb-3  flex items-center pb-5" style={{ borderBottom: '#e7e4e4 1px solid' }}>
                                <IoGolf style={{ fontSize: '23px', marginRight: '10px' }} />

                                <label className="block  text-lg text-gray-700 whitespace-nowrap">Course</label>
                                <select onChange={(e) => setSelectedCourseID(e.target.value)}
                                    // className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                    className="  block w-full px-3 py-1.5 text-lg font-semibold text-gray-900 bg-white bg-clip-padding cursor-pointer outline-none caret-pink-500 "

                                    aria-label="Default select example">
                                    {/* <option >Golf course</option>  */}
                                    <option value={null}>Select your course</option>
                                    {courses && courses.map((course, i) => {
                                        return <option key={i} value={course.course_id}>{course.course_fullname}</option>
                                    })}


                                </select>
                            </div>
                            {!selectedCourse &&
                                <div>


                                    {defaultCourseFieldsAndOptions.map((fieldAndOptions, i) => {
                                        //dont show field if it has a fixed option 


                                        return (<div key={i} className='mb-4 flex items-center pt-1 pb-5' style={{ borderBottom: '#e7e4e4 1px solid' }} >
                                            <label className="block  text-lg text-gray-700 whitespace-nowrap ">{fieldAndOptions.field_fullname}</label>
                                            <select

                                                className="  block w-full px-3 py-1.5 text-lg font-semibold text-gray-900 bg-white bg-clip-padding cursor-pointer outline-none "
                                                aria-label="Default select example">
                                                {fieldAndOptions?.field_options.map((option, i) => {

                                                    return <option key={i} value={option.option_name} >{option.option_fullname}</option>
                                                })}

                                            </select>
                                        </div>)
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
                                            <div key={i} className='mb-4 flex items-center pt-1 pb-5' style={{ borderBottom: '#e7e4e4 1px solid' }} >
                                                <label className="block  text-lg text-gray-700 whitespace-nowrap "  >{fieldAndOptions.field_fullname}</label>
                                                <select
                                                    onChange={(e) => {
                                                        var newPreferences = preferences
                                                        newPreferences[fieldAndOptions.field_name] = e.target.value
                                                        setPreferences(newPreferences)
                                                        console.log({ preferences })
                                                    }}
                                                    name={fieldAndOptions.field_name}
                                                    className="  block w-full px-3 py-1.5 text-lg font-semibold text-gray-900 bg-white bg-clip-padding cursor-pointer outline-none "
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


                                    return (<div key={i} className='mb-4 flex items-center pt-1 pb-5' style={{ borderBottom: '#e7e4e4 1px solid' }} >
                                        <label className="block  text-lg text-gray-700 whitespace-nowrap ">{fieldAndOptions.field_fullname}</label>
                                        <select
                                            onChange={(e) => {
                                                var newPreferences = preferences
                                                newPreferences[fieldAndOptions.field_name] = e.target.value
                                                setPreferences(newPreferences)
                                                console.log({ preferences })
                                            }}

                                            name={fieldAndOptions.field_name}
                                            //className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                            className="  block w-full px-3 py-1.5 text-lg font-semibold text-gray-900 bg-white bg-clip-padding cursor-pointer outline-none "
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
                            <div className="flex space-x-2 justify-center mt-12 mb-4">
                                <button type="button"
                                    /* onClick={() => {
                                        // UpdateGolferRecord(golferData.golfer_id, ["golfer_preferences"], [JSON.stringify(preferences)])
                                        //AddNewAlertPreferences(golferData.golfer_id, (preferences))
                                     }}*/

                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    style={{
                                        opacity: addNewAlertLoading ? '0.5' : '1',
                                        backgroundColor: reachedAlertsCap && '#e7e4e4',
                                        color: reachedAlertsCap && '#a8a8a8',
                                        pointerEvents: reachedAlertsCap && 'none'
                                    }}

                                    className="inline-block px-10 py-4 bg-green-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-[100%] mb-2">
                                    Create Alert
                                </button>
                            </div>
                            {addNewAlertError && <p className="text-red-400 text-sm text-center mb-6"> {addNewAlertError} </p>}
                            {reachedAlertsCap && <p className="text-gray-600  text-sm mb-6">
                                Maximum number of active alerts attained, please delete an alert to create a new one
                            </p>}
                        </div>}
                    </div>
                </div>



                {!golferData?.golfer_preferences_list.length && <div className="flex justify-center">
                    <div className="block p-6 pt-4 rounded-lg shadow-lg bg-white mt-6 mb-64  " style={{ width: '90%', maxWidth: '540px', zIndex: '1' }}>
                        <p className="text-gray-500  text-lg flex content-center " style={{ margin: 'auto', marginBlock: '18px' }}>
                            You have not created any alerts yet
                        </p>
                    </div>
                </div>}



                {golferData?.golfer_preferences_list.length && <div className="flex justify-center flex-col items-center mt-12 mb-64">
                    {golferData?.golfer_preferences_list.map((alertPreferences, i) => {
                        return <div key={i} className="block p-6 pt-4 rounded-lg shadow-lg bg-white mt-12  " style={{ width: '90%', maxWidth: '400px', zIndex: '1' }}>

                            <div className='flex flex-col'>

                                <h5 className="text-gray-500 text-xl leading-tight font-medium mb-8">Active Alert</h5>
                                {/* {alertPreferences} */}

                                {Object.keys(alertPreferences).map((key, i) => {
                                    //make key first letter uppercase, and if there's a _ replace it with a space
                                    var cleanedKey = key.replace(/_/g, ' ')
                                    cleanedKey = cleanedKey.charAt(0).toUpperCase() + cleanedKey.slice(1)



                                    var date = new Date(alertPreferences[key])


                                    return <div key={i} className="flex  items-center mb-4 mb-4   pb-3" style={{ borderBottom: '#e7e4e4 1px solid', marginTop: '-5px' }}>
                                        <div className='capitalize'>{cleanedKey} </div>
                                        <div className='font-semibold ml-2 capitalize' > {alertPreferences[key]}{(key == 'start_time' || key == 'end_time') && ':00'} </div>



                                        {key == "date" && <span className="text-gray-500 text-xs ml-2">({
                                            new Date(date.toLocaleString('en-US', { timeZone: 'UTC' })).toLocaleDateString('en-US', {
                                                weekday: 'long', // long, short, narrow
                                                year: 'numeric', // numeric, 2-digit
                                                month: 'long', // numeric, 2-digit, long, short, narrow
                                                day: 'numeric' // numeric, 2-digit
                                            })
                                        })</span>}



                                    </div>
                                })}

                                <div className="flex space-x-2 justify-center mt-4 mb-3">
                                    <button type="button"
                                        onClick={() => {
                                            //  UpdateGolferRecord(golferData.golfer_id, ["golfer_preferences"], [JSON.stringify(preferences)])
                                            selectedAlertPreferences = alertPreferences
                                        }}

                                        data-bs-toggle="modal" data-bs-target="#exampleModal2"
                                        className="inline-block px-10 py-2 bg-red-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-[100%] mb-2">
                                        Delete Alert
                                    </button>
                                </div>
                            </div>


                        </div>

                    })}

                </div>}





                <button type="button"
                    onClick={() => {

                        logout()

                    }}
                    data-bs-dismiss="modal"
                    className="px-3 py-1 m-6 bg-red-900 ml-6 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                    LOGOUT</button>

            </div>



            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Create a tee time alert</h5>
                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4 text-gray-500">
                            We will send you an email and a text message the moment a tee time is available according to your preferences
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button" className="px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out opacity-80" data-bs-dismiss="modal">Close</button>
                            <button type="button"
                                onClick={() => {
                                    if (CheckForDuplicateAlerts()) {
                                        setAddNewAlertError('a duplicate alert already exists!')
                                        return;
                                    }
                                    if (!selectedCourse) {

                                        return;
                                    }
                                    // UpdateGolferRecord(golferData.golfer_id, ["golfer_preferences"], [JSON.stringify(preferences)])
                                    AddNewAlertPreferences(golferData.golfer_id, (preferences))

                                }}
                                data-bs-dismiss="modal"
                                className="px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                Create</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Delete a tee time alert</h5>
                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4 text-gray-500">
                            You will no longer receive an alert when a Tee Time is available according to your preferences
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button" className="px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out opacity-80" data-bs-dismiss="modal">Close</button>
                            <button type="button"
                                onClick={() => {

                                    // UpdateGolferRecord(golferData.golfer_id, ["golfer_preferences"], ['null'])

                                    DeleteAlertPreferences(golferData.golfer_id, selectedAlertPreferences)

                                }}
                                data-bs-dismiss="modal"
                                className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                Delete</button>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Homepage