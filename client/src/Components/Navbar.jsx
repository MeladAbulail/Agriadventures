import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import Cookies from 'js-cookie';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const tokenExists = Cookies.get('token');
    setLoggedIn(tokenExists);
  }, [isLoggedIn]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  console.log('Rendering with isLoggedIn:', isLoggedIn);

  return (
    <div>
      <div className="flex flex-wrap place-items-center">
        <section className="relative mx-auto">
          <nav className="flex justify-between w-screen text-black bg-white">
            <div className="flex items-center w-full px-5 py-6 xl:px-12">
              <Link to="/">
                <a className="text-3xl font-bold font-heading">
                  Agriadventures
                </a>
              </Link>

              <ul className="hidden px-4 mx-auto space-x-12 text-sm font-semibold uppercase md:flex font-heading">
                <Link to="/">
                  <li>
                    <a className="hover:text-[#a3e635] ">Home</a>
                  </li>
                </Link>
                <Link to="/Category">
                  <li>
                    <a className="hover:text-[#a3e635] ">Category</a>
                  </li>
                </Link>
                <Link to="/Store">
                  <li>
                    <a className="hover:text-[#a3e635] ">Shop</a>
                  </li>
                </Link>
                <Link to="/Gallery">
                  <li>
                    <a className="hover:text-[#a3e635] ">Gallery</a>
                  </li>
                </Link>
                <Link to="/Aboutus">
                  <li>
                    <a className="hover:text-[#a3e635] ">About us</a>
                  </li>
                </Link>
                <Link to="/Contactus">
                  <li>
                    <a className="hover:text-[#a3e635] ">Contact Us</a>
                  </li>
                </Link>
              </ul>

              <div className="items-center hidden space-x-5 xl:flex">
                <Link to="/cart">
                  <a className="hover:text-[#a3e635]">
                    <FaShoppingCart size={24} />
                  </a>
                </Link>

                {isLoggedIn ? (<Link to="/Profile">
                  <a className="flex items-center hover:text-[#a3e635]">
                    <FaUser size={24} />
                    <span className="ml-2">Profile</span>
                  </a>
                </Link>
                ) : (
                  <Link to="/Signin">
                    <a className="uppercase hover:text-[#a3e635] flex flex-row ">
                      <FaSignInAlt size={24} />
                      <span className="ml-2 ">Sign In</span>
                    </a>
                  </Link>
                )}
              </div>
            </div>

            <a
              className="flex items-center mr-6 xl:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              <span className="absolute flex ml-4 -mt-5">
                <span className="absolute inline-flex w-3 h-3 bg-pink-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-3 h-3 bg-pink-500 rounded-full"></span>
              </span>
            </a>
          </nav>
        </section>
      </div>

      <div className={`xl:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="p-4 text-black bg-white">
          <Link to="/">
            <li>
              <a className="uppercase hover:text-[#a3e635]">Home</a>
            </li>
          </Link>
          <Link to="/Category">
            <li>
              <a className="uppercase hover:text-[#a3e635]">Category</a>
            </li>
          </Link>
          <Link to="/Store">
            <li>
              <a className="uppercase hover:text-[#a3e635]">Shop</a>
            </li>
          </Link>
          <Link to="/Gallery">
            <li>
              <a className="uppercase hover:text-[#a3e635]">Gallery</a>
            </li>
          </Link>
          <Link to="/Signin">
            <li>
              <a className="uppercase hover:text-[#a3e635]">
                {isLoggedIn ? "Profile" : "Sign In"}
              </a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;