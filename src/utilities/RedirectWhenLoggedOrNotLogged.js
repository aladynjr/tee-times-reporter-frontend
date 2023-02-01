import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  
  } from "firebase/auth";
  import { auth } from "../firebase-config";
  
function RedirectWhenLoggedOrNotLogged( NavigateToIfLoggedIN, NavigateToIfNotLoggedIN) {
    const navigate = useNavigate();
   /* useEffect(() => {
      if (localStorage.getItem('isLogged')) {

        if(!NavigateToIfLoggedIN) return;

        navigate(NavigateToIfLoggedIN);

      } else {
        if(!NavigateToIfNotLoggedIN) return;

        navigate(NavigateToIfNotLoggedIN);
  
      }
    }, [])
  
    useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {

        if(!NavigateToIfLoggedIN) return;
        
        navigate(NavigateToIfLoggedIN);
      }
  
    });

  }, [])*/


  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setIsUserLoggedIn(true);
          localStorage.setItem('isUserLoggedIn', JSON.stringify(true));
        } else {
          setIsUserLoggedIn(false);
          localStorage.setItem('isUserLoggedIn', JSON.stringify(false));
        }
      });
    };

    
    const storedValue = localStorage.getItem('isUserLoggedIn');

    if (storedValue) {
      console.log('storedValue: ', storedValue);
      setIsUserLoggedIn(JSON.parse(storedValue));
    } else {
      console.log('storedValue: ', storedValue);
      checkIfUserIsLoggedIn();
    }
  }, []);



  if (isUserLoggedIn === null) {
    return null;
  }
  

  if (!isUserLoggedIn) {
    navigate(NavigateToIfNotLoggedIN)
  } else {
    navigate(NavigateToIfLoggedIN)
  }


}

export default RedirectWhenLoggedOrNotLogged