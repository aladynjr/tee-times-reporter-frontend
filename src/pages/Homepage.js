import React, { useEffect, useState, useRef } from 'react'
import { signOut, onAuthStateChanged , getAuth} from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from 'react-router-dom';
import LoggedInOrNot from '../utilities/LoggedInOrNot';
import FetchCoursesData from '../utilities/FetchCoursesData';
import FetchGolferData from '../utilities/FetchGolferData';
import clsx from 'clsx';
import CreateTeeTimeAlert from '../components/CreateTeeTimeAlert';
import AddNewAlertPreferences from '../utilities/AddNewAlertPreferences';
import EditAccountDetails from '../components/EditAccountDetails';
import CreatedAlerts from '../components/CreatedAlerts';
import { FiLogOut } from 'react-icons/fi'
import Logo from '../assets/images/logo.svg'
import Navbar from '../components/landing-page/Navbar';
import { AiFillEdit } from 'react-icons/ai'
import {RiListSettingsFill} from 'react-icons/ri'

function Homepage() {

    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);

        localStorage.removeItem('isUserLoggedIn');
        navigate("/")

    };

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    useEffect( () => {
        const HandleSession = async () => {
            setIsUserLoggedIn(await LoggedInOrNot())

        }
        HandleSession()
          
    }, [])

    if (!isUserLoggedIn) {
        navigate('/login')
    } else {
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
        const HandleFetchCoursesData = async () => {
            const courses = await FetchCoursesData()
            setCourses(courses)
        }
        HandleFetchCoursesData()
    }, [])


    const [selectedCourse, setSelectedCourse] = useState(null)
    useEffect(() => {
        if (!selectedCourseID) return;
        const selectedCourse = courses.find(course => course.course_id == selectedCourseID)
        setSelectedCourse(selectedCourse)
    }, [selectedCourseID])


    useEffect(() => {
        if (!golferData?.golfer_id) return
        //if preferences exist in session storage, add an alert with those preferenes then clear session storage 
        if (sessionStorage.getItem('preferences')) {
            var preferences = JSON.parse(sessionStorage.getItem('preferences'))
            AddNewAlertPreferences(golferData, setGolferData, preferences, golferUUID, () => { }, ShowNotification)
            sessionStorage.removeItem('preferences')
        }

    }, [golferData?.golfer_id])


    const [showNotification, setShowNotification] = useState(false)
    const [notificationText, setNotificationText] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const timeoutRef = useRef(null);

    const ShowNotification = (text, type) => {
        setNotificationText(text)
        setNotificationType(type)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowNotification(true);
        timeoutRef.current = setTimeout(() => {
            setShowNotification(false);
        }, 5000);
    };


    const inputRef = useRef(null)


    return (
        <div style={{ backgroundColor: '#fafafa' }} >

            <div style={{ background:'white', paddingBottom:'5px'}} className='shadow-sm'>
                <div style={{width:'90%', maxWidth:'1700px', display:'flex', justifyContent: 'space-between', margin:'auto'}}>
                <img src={Logo} alt="logo" style={{ marginLeft: '20px', marginTop: '10px', }} onClick={() => navigate('/welcome')} className=' w-[180px] cursor-pointer' />

                <div className="dropdown " style={{ marginRight: '5px', marginTop: '20px', width:'fit-content' }} >
                    <button
                        className=" dropdown-toggle px-4 py-2 bg-[#054468] hover:bg-[#075D8D] text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <RiListSettingsFill style={{color:'white', fontSize:'18px'}}/>

                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                        </svg>
                    </button>
                    <ul // min-w-max absolute   
                        className="dropdown-menu hidden  bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1  m-0 bg-clip-padding border-none"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <li>
                            <a
                                className=" dropdown-item text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                href="#"
                                onClick={()=>{
                                    inputRef.current.click()

                                }}
                                >
                                  <AiFillEdit style={{ display:'inline-block', marginRight: '5px', }} />  Edit Account Settings </a>
                        </li>
                        <li>
                            <a
                                className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                href="#"
                                onClick={logout} 
                            ><FiLogOut className="inline-block" style={{ marginRight: '5px' }} /> Logout </a>
                        </li>
          

                        {/* <li>
                            {golferData && <EditAccountDetails
                                golferData={golferData}
                                setGolferData={setGolferData}
                                ShowNotification={ShowNotification} />}
                        </li> */}
                    </ul>
                </div>

                </div>
            </div>

            {showNotification && <div key={notificationText} id="toast-top-right"
                className={clsx("fixed flex items-center w-full max-w-xs p-4 text-white  rounded-lg shadow-xl top-5 right-5  z-10 animate__animated animate__fadeInDown animate__faster", notificationType == 'success' && 'bg-blue-500', notificationType == 'error' && 'bg-red-500')} role="alert">
                <div className="text-sm font-normal">{notificationText}</div>
            </div>}


            {/* <Navbar /> */}
            {/* {golferData && <button type="button" onClick={logout} style={{ position: 'absolute', top: '20px', right: '25px' }}
                className="px-3  py-1 my-6  ml-6  font-semibold text-gray-800 hover:text-white text-xs leading-tight uppercase rounded  hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                LOGOUT <FiLogOut className="inline-block" style={{ marginLeft: '5px' }} />
            </button>} */}

            {golferData && <EditAccountDetails
                golferData={golferData}
                setGolferData={setGolferData}
                ShowNotification={ShowNotification}
                inputRef={inputRef} />} 


            <CreateTeeTimeAlert
                golferData={golferData}
                setGolferData={setGolferData}
                golferUUID={golferUUID}
                courses={courses}
                
                setSelectedCourseID={setSelectedCourseID}
                selectedCourse={selectedCourse}
                ShowNotification={ShowNotification}
            />

            <CreatedAlerts golferData={golferData} setGolferData={setGolferData} golferUUID={golferUUID} ShowNotification={ShowNotification} />





        </div>
    )
}

export default Homepage