import React, { useState, useEffect } from 'react'
import * as yup from 'yup';
import { auth, db } from "../firebase-config";
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import LoggedInOrNot from '../utilities/LoggedInOrNot';
function LoginPage() {
  const navigate = useNavigate();



 const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

 useEffect(()=>{
  const HandleSession = async () => {
    setIsUserLoggedIn(await LoggedInOrNot())

}
HandleSession() },[])
 
 if (!isUserLoggedIn) {
  // console.log('%c user is not logged in !', 'color: red; font-size: 20px;')
     //navigate('/login')
   } else{
    // console.log('%c user is logged in !', 'color: green; font-size: 20px;')
     navigate('/user')

 }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMessage, setErrorMessage] = useState('')

  let schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });


const [loginLoading, setLoginLoading] = useState(false);
  const HandleLogin = async () => {
    setLoginLoading(true);
    var user = {
      email: email,
      password: password,
      rememberMe: rememberMe

    }

    const isValid = await schema.validate(user).catch(err => setErrorMessage(err.errors[0]))

    console.log(isValid)

    if (!isValid) {setLoginLoading(false); return}
    else setErrorMessage('')

    try {

      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user.user.uid + '  logged in ') 

        //localStorage.clear();
        localStorage.setItem('isUserLoggedIn', 'true');
        navigate('/user');
        
        const HandleSession = async () => {
          setIsUserLoggedIn(await LoggedInOrNot())

      }
      HandleSession()
    

      // history.push("/Home")
      //window.location.reload()
      //navigate('/user')
    } catch (error) {
      console.log(error.message);
      if (error.message == 'Firebase: Error (auth/user-not-found).') { setErrorMessage('User not found');  }
      if (error.message == 'Firebase: Error (auth/invalid-email).') { setErrorMessage('Please re-check the e-mail'); }
      if (error.message == 'Firebase: Error (auth/wrong-password).') {setErrorMessage('Wrong password');}
      if(error.message == 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){setErrorMessage('Access to this account is temporarily disabled');}
    }
    finally {
      setLoginLoading(false);
    }

  }

  return (
    <div>
      <div className='LoginForm' >
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm m-auto w-[90%] mt-[75px]">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Login</h1>

            <div className="form-group mb-6">
              <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail((e.target.value))} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2" placeholder="Password" />
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="form-group form-check">
                <input type="checkbox"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  id="exampleCheck2" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
              </div>
              <a href="#!"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Forgot
                password?</a>
            </div>
            <p className="text-red-500 text-xs text-center mb-1">{errorMessage}</p>
            <button 
            style={{opacity: loginLoading ? '0.5' : '1'}}
            onClick={() => HandleLogin()} className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign in</button>
            <p className="text-gray-800 mt-6 text-center">Not a member? <a href="#!"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out" onClick={()=>{navigate('/join');}} >Register</a>
            </p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default LoginPage