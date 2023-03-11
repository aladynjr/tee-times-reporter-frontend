import React from 'react'
import DeleteAlertPreferences from '../utilities/DeleteAlertPreferences'
function CreatedAlerts({
    golferData,
    setGolferData,
    golferUUID,
    ShowNotification

}) {

    var selectedAlertPreferences;

    return (
        <div>
            {!golferData?.golfer_preferences_list.length &&
                <div className="flex justify-center">
                    <div className="block p-6 pt-4 rounded-lg shadow-lg bg-white mt-6 pb-64  " style={{ width: '90%', maxWidth: '540px', zIndex: '1' }}>
                        <p className="text-gray-500  text-lg flex content-center " style={{ margin: 'auto', marginBlock: '18px' }}>
                            You have not created any alerts yet
                        </p>
                    </div>
                </div>}

            {(golferData?.golfer_preferences_list?.length > 0) && <div className="flex justify-center flex-col items-center mt-12 mb-64">
                {golferData?.golfer_preferences_list.map((alertPreferences, i) => {
                    return <div key={i} className="block p-6 pt-4 rounded-lg shadow-lg bg-white mt-12  " style={{ width: '90%', maxWidth: '400px', zIndex: '1' }}>

                        <div className='flex flex-col'>

                            <h5 className="text-gray-500 text-xl leading-tight font-medium mb-8">Active Alert</h5>
                            {/* {alertPreferences} */}

                            {/* {Object.keys(alertPreferences).map((key, i) => {
                                    //make key first letter uppercase, and if there's a _ replace it with a space
                                    var cleanedKey = key.replace(/_/g, ' ')
                                    cleanedKey = cleanedKey.charAt(0).toUpperCase() + cleanedKey.slice(1)

            
                                    var date = new Date(alertPreferences?.[key])


                                    return <div key={i} className="flex  items-center mb-4 mb-4   pb-3" style={{ borderBottom: '#e7e4e4 1px solid', marginTop: '-5px' }}>
                                        <div className='capitalize'>{cleanedKey} </div>
                                        <div className='font-semibold ml-2 capitalize' > {alertPreferences?.[key]?.replace('_',' ')}{(key == 'start_time' || key == 'end_time') && ':00'} </div>



                                        {key == "date" && <span className="text-gray-500 text-xs ml-2">({
                                            new Date(date.toLocaleString('en-US', { timeZone: 'UTC' })).toLocaleDateString('en-US', {
                                                weekday: 'long', // long, short, narrow
                                                year: 'numeric', // numeric, 2-digit
                                                month: 'long', // numeric, 2-digit, long, short, narrow
                                                day: 'numeric' // numeric, 2-digit
                                            })
                                        })</span>}



                                    </div>
                                })}  */}

                            <div className="flex  items-center mb-4 mb-4   pb-3" style={{ borderBottom: '#e7e4e4 1px solid', marginTop: '-5px' }}>
                                <div className='capitalize'>Course </div>
                                <div className='font-semibold ml-2 capitalize' > {alertPreferences?.['course']?.replace('_', ' ')}</div>
                            </div>

                            <div className="flex  items-center mb-4 mb-4   pb-3" style={{ borderBottom: '#e7e4e4 1px solid', marginTop: '-5px' }}>
                                <div className='capitalize'>Players </div>
                                <div className='font-semibold ml-2 capitalize' > {alertPreferences?.['players']?.replace('_', ' ')}</div>
                            </div>

                            <div className="flex  items-center mb-4 mb-4   pb-3" style={{ borderBottom: '#e7e4e4 1px solid', marginTop: '-5px' }}>
                                <div className='capitalize'>Date & Time </div>
                                <div className='font-semibold ml-2 capitalize' >
                                    <span  >{alertPreferences?.['date']}</span> <span style={{ opacity: '0.5', paddingInline: '5px' }} >/</span>
                                    {new Date(`2023-02-17T${(alertPreferences?.['start_time']).padStart(2, '0')}:00`).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                                    <span style={{ opacity: '0.5', paddingInline: '5px' }} >to</span>
                                    {new Date(`2023-02-17T${(alertPreferences?.['end_time']).padStart(2, '0')}:00`).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}

                                </div>
                            </div>

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

                                    DeleteAlertPreferences(golferData, setGolferData, selectedAlertPreferences, golferUUID, ShowNotification)

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

export default CreatedAlerts