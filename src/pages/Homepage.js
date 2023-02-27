import React, { useEffect, useState, useRef } from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth";
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


    return (
        <div style={{ backgroundColor: '#fafafa' }} >

            {showNotification && <div key={notificationText} id="toast-top-right"
                className={clsx("fixed flex items-center w-full max-w-xs p-4 text-white  rounded-lg shadow-xl top-5 right-5  z-10 animate__animated animate__fadeInDown animate__faster", notificationType == 'success' && 'bg-blue-500', notificationType == 'error' && 'bg-red-500')} role="alert">
                <div className="text-sm font-normal">{notificationText}</div>
            </div>}


                {golferData && <EditAccountDetails
                    golferData={golferData}
                    setGolferData={setGolferData}
                    ShowNotification={ShowNotification} />}

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


                <button type="button" onClick={logout} style={{ marginLeft: '14px' }} className="px-3  py-1 m-6 bg-red-900 ml-6 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                    LOGOUT</button>


        </div>
    )
}

export default Homepage