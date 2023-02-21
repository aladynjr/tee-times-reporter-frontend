import React, { useState, useEffect } from 'react'
import * as yup from 'yup';
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import AddNewGolferToDatabase from '../utilities/AddNewGolferToDatabase'
import LoggedInOrNot from '../utilities/LoggedInOrNot';
import "yup-phone";

function Joinpage() {
    const navigate = useNavigate();


   const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

   useEffect(()=>{
     setIsUserLoggedIn(LoggedInOrNot())
   },[])
   
   if (!isUserLoggedIn) {
    // console.log('%c user is not logged in !', 'color: red; font-size: 20px;')
     //  navigate('/login')
     } else{
      // console.log('%c user is logged in !', 'color: green; font-size: 20px;')
     navigate('/home')

   }
 

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const  [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [errorMessage, setErrorMessage] = useState('')


    let userSchema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email().required('Email is required'),
        phoneNumber: yup.string()
        //.phone('USA', false, 'Phone number must be a valid US number')
        .matches(/^[0-9]{10}$/, "Please enter a valid phone number")
        .required('Phone number is required'),
        password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const [joinLoading, setJoinLoading] = useState(false);
    const HandleJoin = async () => {
        setJoinLoading(true);


        var user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            rememberMe: rememberMe
        }

       // console.log(user)

        const isValid = await userSchema.validate(user).catch(err => setErrorMessage(err.errors[0]))
        

        if (!isValid) {setJoinLoading(false);  return}
        else setErrorMessage('')

        console.log('user is valid, creating account...')
        
        
        //add user to firebase
        try {
            const newUser = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(newUser.user);

            await AddNewGolferToDatabase(firstName, lastName , email?.trim()?.toLowerCase(),phoneNumber, newUser.user.uid)

            localStorage.setItem('isUserLoggedIn', JSON.stringify(true));

            //reload the page to update the state
            navigate('/home');
            window.location.reload();
            
                } catch (error) {
            if (error.message == 'Firebase: Error (auth/email-already-in-use).') { setErrorMessage('Email is already used for another account'); }

            console.log(error.message);
            setJoinLoading(false); 

        }
        finally {
            setJoinLoading(false); 
        }


    }

    return (
        <div>
            <div className='JoinForm' >

                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md m-auto w-[90%] mt-[75px]">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sign up</h1>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group mb-6">
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123" aria-describedby="emailHelp123" placeholder="First name" />
                            </div>
                            <div className="form-group mb-6">
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124" aria-describedby="emailHelp124" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="form-group mb-6">
                            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                placeholder="Email address" />
                        </div>
                        <div className="form-group mb-6 flex items-center">
                            <div className='mr-2 text-gray-500' >+1</div>
                            <input type="tel" value={phoneNumber} onChange={
                                (e) => setPhoneNumber((e.target.value)?.replace(/[^0-9]/g, ''))
                                
                            
                            } className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                                placeholder="Phone Number" />
                        </div>
                        <div className="form-group mb-6">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                                placeholder="Password" />
                        </div>
                        <div className="form-group form-check text-left mb-6">
                            <input type="checkbox"

                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                                id="exampleCheck25" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="form-check-label inline-block text-gray-800 text-left" htmlFor="exampleCheck25">Remember me</label>
                        </div>
                        <p className="text-red-500 text-xs text-center mb-1">{errorMessage}</p>
                        <button 
                        style={{opacity: joinLoading ? '0.5': '1'}}
                        onClick={() => {
                            HandleJoin()
                            }} className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign up</button>
                        <p className="text-gray-800 mt-6 text-center">Already a member? <a href="#!"
                            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out" onClick={()=>{navigate('/login');}}>Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Joinpage