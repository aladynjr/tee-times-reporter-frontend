import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  
  } from "firebase/auth";
  import { auth } from "../firebase-config";
  
function RedirectWhenLoggedOrNotLogged(auth, NavigateToIfLoggedIN, NavigateToIfNotLoggedIN) {
    const navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem('isLogged')) {

        if(!NavigateToIfLoggedIN) return;

        navigate(NavigateToIfLoggedIN);

      } else {
        if(!NavigateToIfNotLoggedIN) return;

        navigate(NavigateToIfNotLoggedIN);
  
      }
    }, [])
  
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {

        if(!NavigateToIfLoggedIN) return;
        
        navigate(NavigateToIfLoggedIN);
      }
  
    });

}

export default RedirectWhenLoggedOrNotLogged