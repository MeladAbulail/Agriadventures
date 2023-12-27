import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import Cookies from 'js-cookie';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const tokenExists = Cookies.get('token');
    setLoggedIn(tokenExists);
  }, [isLoggedIn]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    window.location.href = '/';
  };

  const isSignInOrRegisterPageNavbar =
    location.pathname === '/Signin' || location.pathname === '/Register';

  return (
    <div className={`w-full ${isSignInOrRegisterPageNavbar ? "hidden" : ""} bg-[#fcf9f3]`}>
      <nav className={`flex justify-between text-[#224229] bg-[#fcf9f3] fixed w-full top-0 z-50 border-b-2 border-[#e2e0da]	`}>
        <div className="flex items-center w-full py-6 sm:px-5 xl:px-12" >

          <Link to="/">
            <a className="ml-3 text-xl font-bold lg:text-3xl font-heading ">
              Agriadventures
            </a>
          </Link>

          <ul className="hidden px-4 mx-auto text-sm font-semibold uppercase xl:space-x-12 md:flex font-heading md:space-x-3">
            <Link to="/">
              <li>
                <a className="hover:text-[#018347] ">Home</a>
              </li>
            </Link>
            <Link to="/Category">
              <li>
                <a className="hover:text-[#018347] ">Category</a>
              </li>
            </Link>
            <Link to="/Store">
              <li>
                <a className="hover:text-[#018347] ">Shop</a>
              </li>
            </Link>
            <Link to="/Gallery">
              <li>
                <a className="hover:text-[#018347] ">Gallery</a>
              </li>
            </Link>
            <Link to="/Aboutus">
              <li>
                <a className="hover:text-[#018347] ">About us</a>
              </li>
            </Link>
            <Link to="/Contactus">
              <li>
                <a className="hover:text-[#018347] ">Contact Us</a>
              </li>
            </Link>
          </ul>

          <div className='flex flex-row '>
            <div className="items-center hidden space-x-5 lg:flex ">
              <Link to="/cart">
                <a className="hover:text-[#018347]  ">
                  <FaShoppingCart size={24} />
                </a>
              </Link>

              {isLoggedIn ? (<Link to="/Profile">
                <a className="flex items-center hover:text-[#018347]">
                  <FaUser size={24} />
                  <span className="ml-2">Profile</span>
                </a>
              </Link>
              ) : (
                <Link to="/Signin">
                  <a className="uppercase hover:text-[#018347] flex flex-row ">
                    <FaSignInAlt size={24} />
                    <span className="ml-2 ">Sign In</span>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>


        <a
          className="flex items-center mr-6 lg:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          <span className="absolute flex ml-4 -mt-5">
            <span className="absolute inline-flex w-3 h-3 bg-[#224229] rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-3 h-3 bg-[#224229] rounded-full"></span>
          </span>
        </a>
      </nav>


      <div className={`xl:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-[84px] `}>
        <ul className="p-4 text-[#224229] bg-[#fcf9f3]  fixed w-full top-16 z-50">
          <Link to="/">
            <li >
              <a className="uppercase hover:text-[#018347]">Home</a>
            </li>
          </Link>
          <div className='bg-[#224229] h-[0.5px]'></div>
          <Link to="/Category">
            <li className='mt-2'>
              <a className="uppercase hover:text-[#018347]">Category</a>
            </li>
            <div className='bg-[#224229] h-[0.5px]'></div>
          </Link>

          <Link to="/Store">
            <li className='mt-2'>
              <a className="uppercase hover:text-[#018347]">Shop</a>
            </li>
          </Link>
          <div className='bg-[#224229] h-[0.5px]'></div>
          <Link to="/Gallery">
            <li className='mt-2'>
              <a className="uppercase hover:text-[#018347]">Gallery</a>
            </li>
            <div className='bg-[#224229] h-[0.5px]'></div>
          </Link>
          <Link to="/Aboutus">
            <li className='mt-2'>
              <a className="uppercase hover:text-[#018347]">About us</a>
            </li>
            <div className='bg-[#224229] h-[0.5px]'></div>
          </Link>
          <Link to="/Contactus">
            <li className='mt-2'>
              <a className="uppercase hover:text-[#018347]">Contact us</a>
            </li>
            <div className='bg-[#224229] h-[0.5px]'></div>
          </Link>
          {!isSignInOrRegisterPageNavbar && (
            <>
              <Link to={isLoggedIn ? '/Profile' : '/Signin'}>
                <li className='mt-2'>
                  <a className="uppercase hover:text-[#018347]">
                    {isLoggedIn ? 'Profile' : 'Sign In'}
                  </a>
                </li>
                <div className='bg-[#224229] h-[0.5px]'></div>
              </Link>

              <Link to={isLoggedIn ? '/' : ""}>
                <li className='mt-2'>
                  <a className="uppercase hover:text-[#018347]" onClick={isLoggedIn ? handleLogout : undefined}>
                    {isLoggedIn ? 'Logout' : ''}
                  </a>
                </li>
                <div className='bg-[#224229] h-[0.5px]'></div>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;