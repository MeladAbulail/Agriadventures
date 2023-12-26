import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function NavSpace() {

    const location = useLocation();
    const isSignInOrRegisterPageNavbar =
    location.pathname === '/Signin' || location.pathname === '/Register';

  return (
    <div className={`w-full ${isSignInOrRegisterPageNavbar ? "hidden" : ""} h-[84px]`}>

    </div>
  )
}

export default NavSpace