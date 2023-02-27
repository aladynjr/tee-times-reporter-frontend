import React, {useEffect, useState} from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { signOut, onAuthStateChanged, updateEmail, reauthenticateWithCredential, EmailAuthProvider, getAuth } from "firebase/auth";
import clsx from 'clsx';

import UpdateGolferRecord from '../utilities/UpdateGolferRecord';

function EditAccountDetails({
    golferData,
    setGolferData,
    ShowNotification
}) {
    const auth = getAuth()
    const [settingsTab, setSettingsTab] = useState('profile')


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const [allowSMS, setAllowSMS] = useState(false)
    const [allowEmail, setAllowEmail] = useState(false)

    useEffect(() => {
        if (!golferData) return
        setFirstName(golferData.golfer_first_name)
        setLastName(golferData.golfer_last_name)
        setEmail(golferData.golfer_email)
        setPhoneNumber(golferData.golfer_phone_number)

        setAllowSMS(golferData.golfer_allow_sms)
        setAllowEmail(golferData.golfer_allow_email)
    }, [golferData])

    const [allowSavingChanges, setAllowSavingChanges] = useState(false)
    useEffect(() => {
        if (!golferData) return
        if (golferData.golfer_first_name == firstName
            && golferData.golfer_last_name == lastName
            && golferData.golfer_email == email
            && golferData.golfer_phone_number == phoneNumber
            && golferData.golfer_allow_email == allowEmail
            && golferData.golfer_allow_sms == allowSMS)
             setAllowSavingChanges(false)
        else setAllowSavingChanges(true)
    },[
        firstName,
        lastName,
        email,
        phoneNumber,
        allowEmail,
        allowSMS
    ])

    //update firebase auth email
    const UpdateFirebaseAuthEmail = async () => {

        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )

        try {
            await reauthenticateWithCredential(
                auth.currentUser,
                credential
            )
            await updateEmail(auth.currentUser, email)
            console.log('email updated successfully on firebase')
            return true

        } catch (error) {
            console.log('error updating email : ' + error.message)
            return false
        }





    }

    const UpdateEditDetailsChanges = async () => {

        if (email != golferData.golfer_email) {
            const result = await UpdateFirebaseAuthEmail()

            if (!result) {
                console.log('something went wrong when updating email on firebase')
                ShowNotification('Something went wrong when updating email!', 'error')
                return
            }
        }

        try {
            await UpdateGolferRecord(golferData?.golfer_id, ['golfer_first_name', 'golfer_last_name', 'golfer_email', 'golfer_phone', 'golfer_allow_email', 'golfer_allow_sms'], [firstName, lastName, email, phoneNumber, allowEmail, allowSMS])

            var newGolferData = golferData;
            newGolferData.golfer_first_name = firstName
            newGolferData.golfer_last_name = lastName
            newGolferData.golfer_email = email
            newGolferData.golfer_phone_number = phoneNumber
            newGolferData.golfer_allow_email = allowEmail
            newGolferData.golfer_allow_sms = allowSMS

            setGolferData(newGolferData)

            console.log('details updated succesfully')
            ShowNotification('Details updated!', 'success')

        } catch (e) {
            console.log(e.message)
            ShowNotification('Something went wrong when updating your details!', 'error')

        }


    }
    return (
        <div>
            <button type="button"
                data-bs-toggle="modal" data-bs-target="#exampleModal3"
                style={{ fontWeight: '700', color: 'rgb(41, 47, 77)', position: 'absolute' }}
                className="inline-block rounded px-4 pt-3 pb-2 text-sm text-gray-500 font-bold uppercase leading-normal  focus:ring-0 ">
                <div className='flex items-center'>   <div>Edit details</div> <AiFillEdit style={{ marginLeft: '5px' }} /></div>
            </button>


            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                <div className="modal-dialog modal-lg relative w-auto pointer-events-none" >
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
                    >
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">

                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <ul className="flex flex-wrap xl:flex-nowrap  -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <li className="mr-2 w-fit xl:w-full">
                                    <a href="#" onClick={() => setSettingsTab('profile')} className={clsx('flex justify-center w-full', settingsTab == 'profile' ? 'inline-flex p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-green-500 dark:border-green-500 group' : 'inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group')}>
                                        <svg aria-hidden="true" className={clsx(settingsTab == 'profile' ? 'w-5 h-5 mr-2 text-green-600 dark:text-green-500' : "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300")} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>Profile
                                    </a>
                                </li>
                                <li className="mr-2 w-fit xl:w-full">
                                    <a href="#" onClick={() => setSettingsTab('preferences')} className={clsx('flex justify-center w-full', settingsTab == 'preferences' ? 'inline-flex p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-green-500 dark:border-green-500 group' : 'inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group')} aria-current="page">
                                        <svg aria-hidden="true" className={clsx(settingsTab == 'preferences' ? 'w-5 h-5 mr-2 text-green-600 dark:text-green-500' : "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300")} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Preferences
                                    </a>
                                </li>
                                <li className="mr-2 w-fit xl:w-full">
                                    <a href="#" onClick={() => setSettingsTab('account')} className={clsx('flex justify-center w-full', settingsTab == 'account' ? 'inline-flex p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-green-500 dark:border-green-500 group' : 'inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group')} >
                                        <svg aria-hidden="true" className={clsx(settingsTab == 'account' ? 'w-5 h-5 mr-2 text-green-600 dark:text-green-500' : "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300")} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Account
                                    </a>
                                </li>
                                <li className="mr-2 w-fit xl:w-full">
                                    <a href="#" onClick={() => setSettingsTab('billing')} className={clsx('flex justify-center w-full', settingsTab == 'billing' ? 'inline-flex p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-green-500 dark:border-green-500 group' : 'inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group')}>
                                        <svg aria-hidden="true" className={clsx(settingsTab == 'billing' ? 'w-5 h-5 mr-2 text-green-600 dark:text-green-500' : "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300")} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>Billing
                                    </a>
                                </li>
                                {/* <li>
                                <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
                                </li> */}
                            </ul>
                        </div>
                        <div className="modal-body relative p-6 text-gray-500 transition ease-in-out delay-150" style={{ maxWidth: '500px', paddingBlock: '30px' }}>
                            <h5 className="text-2xl font-medium leading-normal pb-8" id="exampleModalLabel">
                                {settingsTab == 'profile' && 'Profile details'}
                                {settingsTab == 'preferences' && 'Alerts preferences'}
                                {settingsTab == 'account' && 'Account Settings'}
                                {settingsTab == 'billing' && 'Billing information'}
                            </h5>
                            {settingsTab == "profile" && <div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group mb-8">
                                        <label className='text-sm test-gray-200 p-2 pr-0' > First name </label>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123" aria-describedby="emailHelp123" placeholder="First name" />
                                    </div>
                                    <div className="form-group mb-8">
                                        <label className='text-sm test-gray-200 p-2 pr-0' > Last name </label>

                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124" aria-describedby="emailHelp124" placeholder="Last name" />
                                    </div>
                                </div>
                                <div className="form-group mb-10">
                                    <label className='text-sm test-gray-200 p-2 pr-0' > Email* </label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                        placeholder="Email address" />
                                    <div
                                        className="absolute w-full text-xs text-neutral-500 dark:text-neutral-200"
                                        data-te-input-helper-ref>
                                        *email will also be changed for Login
                                    </div>
                                </div>
                                {(email !== golferData?.golfer_email) && <div className="form-group mb-8">
                                    <label className='text-sm test-gray-200 p-2 pr-0' > Password verification </label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                        placeholder="Password" />

                                </div>}
                                <div className="form-group mb-8 ">
                                    <label className='text-sm test-gray-200 p-2 pr-0' > Phone number </label>

                                    <div className=" flex items-center">

                                        <div className='mr-2 text-gray-500' >+1</div>
                                        <input type="tel" value={phoneNumber} onChange={
                                            (e) => setPhoneNumber((e.target.value)?.replace(/\s/g, ''))


                                        } className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                            placeholder="Phone Number" />
                                    </div>
                                </div>
                            </div>}

                            {settingsTab == 'preferences' && <div style={{paddingTop:'5px', paddingLeft:'12px'}}>
                                    <div className="form-check form-switch pb-10">
                                        <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" style={{ transform: 'scale(1.5)' }} 
                                        checked={allowEmail}
                                        onChange={(e)=>{
                                            setAllowEmail(e.target.checked)
                                        }}
                                         type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                        <label className="form-check-label inline-block pl-10 text-gray-800" for="flexSwitchCheckDefault">Send via <b>email</b></label>
                                    </div>
                                    <div className="form-check form-switch pb-10">
                                        <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" style={{ transform: 'scale(1.5)' }} 
                                        checked={allowSMS}
                                        onChange={(e)=>{
                                            setAllowSMS(e.target.checked)
                                        }}
                                        type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                        <label className="form-check-label inline-block pl-10 text-gray-800" for="flexSwitchCheckDefault">Send via <b>SMS</b></label>
                                    </div>
                            </div>}
                            {settingsTab == "billing" && <div>
                                                                    <p className='text-gray-400 p-10 m-auto' >Coming soon!</p>
                                                                    </div>}
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button" className="px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out opacity-80" data-bs-dismiss="modal">Close</button>
                            <button type="button"
                                data-bs-dismiss="modal"
                                className={clsx("px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1", !allowSavingChanges && 'opacity-50 ')} style={{

                                    pointerEvents: allowSavingChanges ? 'all' : 'none'
                                }}
                                onClick={async () => {
                                    if (allowSavingChanges) {

                                        UpdateEditDetailsChanges()

                                    }
                                }}
                            >
                                Save</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditAccountDetails