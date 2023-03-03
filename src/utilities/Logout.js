import React from 'react'
import { signOut, onAuthStateChanged , getAuth} from "firebase/auth";
import { useNavigate } from 'react-router-dom';



async function Logout() {
    const navigate = useNavigate();

        const auth = getAuth();
        if(!auth.currentUser) return;

        await signOut(auth);
        localStorage.removeItem('isUserLoggedIn');
        navigate("/")
    
}

export default Logout