import React,{useEffect} from 'react'

  import { auth } from "../firebase-config";

  import RedirectWhenLoggedOrNotLogged from '../utilities.js/RedirectWhenLoggedOrNotLogged'

function Homepage() {

    RedirectWhenLoggedOrNotLogged(auth, false, '/')



    return (
        <div>
            <div>
                Homepage: YOU ARE LOGGED IN
            </div>
        </div>
    )
}

export default Homepage