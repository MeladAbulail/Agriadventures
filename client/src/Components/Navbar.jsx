import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function check() {
    if (window.localStorage.getItem('token')) {
      console.log("S");
      return true;
    } else {
      return false;
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-white">
      <header>
        {/* <!-- lg+ --> */}
        <div className="bg-white">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between h-14 lg:h-18 ">
              <div className="hidden lg:flex lg:items-center lg:space-x-10 ">
              <Link to="/" title="" className="text-2xl font-bold text-black ">
                  {" "}
                  Adgriadventure{" "}
                </Link>
                <Link to="/" title="" className="text-base font-medium text-black">
                  {" "}
                  Home{" "}
                </Link>
                <Link to="/Category" title="" className="text-base font-medium text-black">
                  {" "}
                  Category
                </Link>
                <Link to="/Store" title="" className="text-base font-medium text-black">
                  {" "}
                  Store
                </Link>
                <Link to="Gallery" title="" className="text-base font-medium text-black">
                  {" "}
                  Gallery
                </Link>
                <Link to="/Aboutus" title="" className="text-base font-medium text-black">
                  {" "}
                  About us
                </Link>
                <Link to="/Contactus" title="" className="text-base font-medium text-black">
                  {" "}
                  Contact us
                </Link>
              </div>
              <div className="flex items-center ml-auto space-x-10">
                {check() ? (
                  <Link
                    to="/Profile"
                    title=""
                    className="flex items-center justify-center w-10 h-10 text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>{" "}
                  </Link>
                  
                ) : (
                  <Link
                    to="/Signin"
                    title=""
                    className="text-base font-medium text-black"
                  >
                    {" "}
                    Sign in
                  </Link>
                )}
                <Link
                  to="/Cart"
                  title=""
                  className="flex items-center justify-center w-10 h-10 text-black"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>{" "}
              </div>
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>

        {/* <!-- xs to lg --> */}
        <nav
          className={`py-4 bg-transparent lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div class="px-4 mx-auto sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Menu
              </p>

              <button
                type="button"
                class="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class={`mt-6 ${isMenuOpen ? "block" : "hidden"}`}>
              <div class="flex flex-col space-y-2">
                <Link to="/"><a
                  href="#"
                  title=""
                  class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  {" "}
                  Home
                </a>
                </Link>

                <Link to="/Category"><a
                  href="#"
                  title=""
                  class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  {" "}
                  Category
                </a>
                </Link>

                <Link to="/"><a
                  href="#"
                  title=""
                  class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  {" "}
                  Store
                </a>
                </Link>

                <Link to="/Profile"><a
                  href="#"
                  title=""
                  class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  {" "}
                  Profile
                </a>
                </Link>
              </div>

              <hr class="my-4 border-gray-200" />

              <div class="flex flex-col space-y-2">
                <Link to="Signin"><a
                  href="#"
                  title=""
                  class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  {" "}
                  Login
                </a>
                </Link>
              </div>
            </div>
          </div>
          
        </nav>
      </header>
    </div>
  );
};

export default Nav;