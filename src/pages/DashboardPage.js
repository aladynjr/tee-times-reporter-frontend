import React, { useEffect, useState, useRef } from 'react'
import { signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from 'react-router-dom';
import LoggedInOrNot from '../utilities/LoggedInOrNot';
import FetchCoursesData from '../utilities/FetchCoursesData';
import FetchGolferData from '../utilities/FetchGolferData';
import clsx from 'clsx';
import globalVal from '../globalVal';

import ReactApexChart from "react-apexcharts";

function DashboardPage() {

    const navigate = useNavigate();


    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    useEffect(() => {
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

    useEffect(() => {
        if (!golferData) return;

        if (golferData?.golfer_admin == false) navigate('/')

    }, [golferData])


    //TRACKING DATA 
    const [coursesAlertsByHour, setCoursesAlertsByHour] = useState(null)

    const GetCoursesAlertsByHour = async () => {
        const response = await fetch(globalVal.host + '/api/tracking/alerts_by_hour')

        const data = await response.json()

        setCoursesAlertsByHour(data)
    }

    useEffect(() => {
        GetCoursesAlertsByHour()
    }, [])

    console.log({ coursesAlertsByHour })
    const [chartData, setChartData] = useState(null)

    //turn object coursesAlertsByHour into array of objects in one liner 
    //console.log(Object.keys(coursesAlertsByHour)?.map((key) => ({ name: key, data: Object.keys(coursesAlertsByHour?.[key])?.map((key2) => ({ name: key2, data: coursesAlertsByHour?.[key]?.[key2] })) })));
    useEffect(() => {
        if (!coursesAlertsByHour) return;

        let highestValue = 0;

        for (const courseName in coursesAlertsByHour) {
            const courseData = coursesAlertsByHour[courseName];
            for (const hour in courseData) {
                const visitors = courseData[hour];
                if (visitors > highestValue) {
                    highestValue = visitors;
                }
            }
        }
        setChartData({

            series: [
                {
                    name: 'Saint Mark',
                    data: Array(24).fill(0).map((_, i) => ({ x: ((i?.length == 1) ? '0' + i : i + ':00'), y: coursesAlertsByHour?.['saint_mark']?.[i] || 0 }))

                },
                {
                    name: 'Riverwalk',
                    data: Array(24).fill(0).map((_, i) => ({ x: ((i?.length == 1) ? '0' + i : i + ':00'), y: coursesAlertsByHour?.['riverwalk']?.[i] || 0 }))
                },
                {
                    name: 'Encinitas',
                    data: Array(24).fill(0).map((_, i) => ({ x: ((i?.length == 1) ? '0' + i : i + ':00'), y: coursesAlertsByHour?.['encinitas']?.[i] || 0 }))
                },
                {
                    name: 'Torrey Pines',
                    data: Array(24).fill(0).map((_, i) => ({ x: ((i?.length == 1) ? '0' + i : i + ':00'), y: coursesAlertsByHour?.['torrey_pines']?.[i] || 0 }))
                },
                {
                    name: 'Coronado',
                    data: Array(24).fill(0).map((_, i) => ({ x: ((i?.length == 1) ? '0' + i : i + ':00'), y: coursesAlertsByHour?.['coronado']?.[i] || 0 }))
                },
                {
                    name: 'Balboa',
                    data: Array(24).fill(0).map((_, i) => ({ x: ((i?.length == 1) ? '0' + i : i + ':00'), y: coursesAlertsByHour?.['balboa']?.[i] || 0 }))
                },
                {
                    name: 'Crossings',
                    data: Array(24).fill(0).map((_, i) => ({ x: ((i?.length == 1) ? '0' + i : i + ':00'), y: coursesAlertsByHour?.['crossings']?.[i] || 0 }))
                },
                {
                    name: 'Rancho Bernardo',
                    data: Array(24).fill(0).map((_, i) => ({ x: ((i?.length == 1) ? '0' + i : i + ':00'), y: coursesAlertsByHour?.['rancho_bernardo']?.[i] || 0 }))
                },

            ],
            options: {
                chart: {
                    height: 350,
                    type: 'heatmap',
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#008FFB"],

                yaxis: {
                    labels: {

                    }
                },

                plotOptions: {
                    heatmap: {
                        colorScale: {
                            ranges: [
                                {
                                    from: 0,
                                    to: 0,
                                    color: '#d3dbf6',
                                    name: 'None',
                                },
                                {
                                    from: 0.1,
                                    to: (40 * highestValue / 100),
                                    color: '#67b7dc',
                                    name: 'Lowest',
                                },
                                {
                                    from: (40 * highestValue / 100),
                                    to: (70 * highestValue / 100),
                                    color: '#6771dc',
                                    name: 'Low',
                                },
                                {
                                    from: (70 * highestValue / 100),
                                    to: (90 * highestValue / 100),
                                    color: '#a367dc',
                                    name: 'High',
                                },
                                {
                                    from: (90 * highestValue / 100),
                                    to: highestValue,
                                    color: '#E620A0',
                                    name: 'Highest',
                                },

                            ]
                        }
                    }
                }
            }
        }
        )

    }, [coursesAlertsByHour])
    return (
        <div>

            <div id="chart" className='block py-6 pb-0 rounded-xl shadow-sm bg-white mx-auto my-8' style={{ width: '90%', maxWidth: '1600px', margin: 'auto', marginBlock: '64px', paddingBottom: '10px' }}>
                <h1 className='text-2xl font-medium text-slate-500 p-6'>Cancelled (or Released) TeeTimes for each Course </h1>

                {!(coursesAlertsByHour && chartData) && <div role="status" className=" pulsing mb-8" style={{ height: '350px' }}>
                    <div className=" bg-gray-200 rounded-xl dark:bg-gray-700  " style={{ height: '350px', width: '90%', margin: 'auto' }}></div>
                </div>}

                {(coursesAlertsByHour && chartData) && <div>

                    <div className='px-8'>
                        {(golferData && chartData) && <ReactApexChart options={chartData?.options} series={chartData?.series} type="heatmap" height={350} />}
                    </div>
                </div>}
            </div>
        </div>


    )
}

export default DashboardPage