import React,{useEffect} from 'react'

import RedirectWhenLoggedOrNotLogged from '../utilities.js/RedirectWhenLoggedOrNotLogged'
import { auth } from "../firebase-config";


function Landingpage() {
    RedirectWhenLoggedOrNotLogged(auth, '/home', false)

  return (
    <div>Landingpage : you are not logged in</div>
  )
}

export default Landingpage