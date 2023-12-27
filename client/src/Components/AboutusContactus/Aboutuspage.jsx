import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ayoub from "./Ayoub.png";
import Melad from "./Melad.JPG"
import Logo from "../Logo.png"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



function Aboutuspage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='z-0 flex flex-col'>
      <div className="my-2 ml-4 lg:ml-32">
        <ol class="flex items-center whitespace-nowrap" aria-label="Breadcrumb">
          <li class="inline-flex items-center">
            <Link to="/"><a
              class="flex items-center text-lg	 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
              href="#"
            >
              Home
            </a></Link>
            <svg
              class="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400 "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li class="inline-flex items-center">
            <Link to="/Aboutus"><a
              class="flex items-center text-lg	 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
              href="#"
            >
              About us
            </a></Link>
          </li>
        </ol>
      </div>


      <div>
        <div class="sm:flex items-center max-w-screen-xl">
          <div class="sm:w-1/2 p-10">
            <div class="image object-center text-center float-right">
              <img src={Logo}></img>
            </div>
          </div>
          <div class="sm:w-1/2 p-5">
            <div class="text">
              <span class="text-gray-500 border-b-2 border-[#224229] uppercase">About us</span>
              <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">About <span class="text-[#224229]">Our Company</span>
              </h2>
              <div><p className="border-[#224229]">
                Welcome to Agriadventures, your premier agriculture tourism destination. We go beyond traditional travel, offering an immersive experience in the heart of farms and their rich cultural heritage. At Agriadventures, you don't just observe – you actively participate in farm activities, gaining a hands-on understanding of rural life.
              </p>
                <p className="border-[#224229] mt-4">Discover the uniqueness of Agriadventures through our on-site stores, where you can conveniently purchase high-quality farm products, fostering a direct connection between consumers and local farmers. This not only guarantees authenticity but also supports sustainable and community-focused agriculture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div>
        <section class="bg-[#fcf9f3]pb-6">
          <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div class="container mx-auto px-6 p-6 bg-[#fcf9f3]">


              <div class="mb-16 text-center">
                <p class="mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-[#224229]">How we change the game
                </p>
              </div>


              <div class="flex flex-wrap my-12">


                <div class="w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8">
                  <div class="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20"
                      fill="currentColor" class="h-6 w-6 text-indigo-500">
                      <path
                        d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z">
                      </path>
                    </svg>
                    <div class="ml-4 text-xl text-[#224229]">Wide Range of Activities</div>
                  </div>
                  <p class="leading-loose text-[#224229]"> Explore a diverse array of agro-tourism experiences with our wide range of activities, from farm tours and harvesting adventures to hands-on workshops, providing an immersive journey into the heart of agriculture.
                  </p>
                </div>



                <div class="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8">
                  <div class="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20"
                      fill="currentColor" class="h-6 w-6 text-indigo-500">
                      <path
                        d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z">
                      </path>
                    </svg>
                    <div class="ml-4 text-xl text-[#224229]">Security</div>
                  </div>
                  <p class="leading-loose text-[#224229]">Rest easy as we prioritize the security of your data, employing robust encryption and advanced measures to ensure a safe and confidential agro-tourism booking experience on our platform.</p>
                </div>



                <div class="w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8">
                  <div class="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20"
                      fill="currentColor" class="h-6 w-6 text-indigo-500">
                      <path
                        d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z">
                      </path>
                    </svg>
                    <div class="ml-4 text-xl text-[#224229]">High Quality Products</div>
                  </div>
                  <p class="leading-loose text-[#224229]">Indulge in the finest agro-tourism experience with our commitment to high-quality products, showcasing the bounty of local farms through farm-to-table offerings and artisanal goods that embody the essence of sustainable agriculture.
                  </p>
                </div>



                <div class="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8">
                  <div class="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20"
                      fill="currentColor" class="h-6 w-6 text-indigo-500">
                      <path
                        d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z">
                      </path>
                    </svg>
                    <div class="ml-4 text-xl text-[#224229]">Family-Friendly Atmosphere</div>
                  </div>
                  <p class="leading-loose text-[#224229]">Create lasting memories in a family-friendly atmosphere, where agro-tourism adventures cater to all ages, offering a perfect blend of entertainment, education, and relaxation for the entire family.
                  </p>
                </div>



                <div class="w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8">
                  <div class="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20"
                      fill="currentColor" class="h-6 w-6 text-indigo-500">
                      <path
                        d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z">
                      </path>
                    </svg>
                    <div class="ml-4 text-xl text-[#224229]">Post and Sell</div>
                  </div>
                  <p class="leading-loose text-[#224229]">Empower your agro-tourism experience by creating your own personalized activities or showcasing your unique products on our platform, fostering a collaborative community where visitors can actively contribute to the diverse tapestry of agricultural adventures and offerings.
                  </p>
                </div>



                <div class="w-full md:w-1/2 lg:w-1/3 p-8">
                  <div class="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20"
                      fill="currentColor" class="h-6 w-6 text-indigo-500">
                      <path
                        d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13c0-1.398-.188-2.793-.688-4.094L26.688 13.5c.2.8.313 1.602.313 2.5 0 6.102-4.898 11-11 11S5 22.102 5 16 9.898 5 16 5c3 0 5.695 1.195 7.594 3.094L25 6.688C22.7 4.386 19.5 3 16 3zm11.281 4.281L16 18.563l-4.281-4.282-1.438 1.438 5 5 .719.687.719-.687 12-12z">
                      </path>
                    </svg>
                    <div class="ml-4 text-xl text-[#224229]">Harvest of Reviews</div>
                  </div>
                  <p class="leading-loose text-[#224229]">Harvest Insights: Cultivate a community of feedback and comments, sharing experiences and recommendations in our vibrant agro-tourism community.
                  </p>
                </div>



              </div>
            </div>
          </div>
        </section>
      </div>



      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-[#224229] uppercase rounded-full bg-teal-accent-400">
              Core Team
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-[#224229] sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="1d4040f3-9f3e-4ac7-b117-7d4009658ced"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#1d4040f3-9f3e-4ac7-b117-7d4009658ced)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Welcome</span>
            </span>{' '}
            our talented team of professionals
          </h2>
          <p className="text-base text-[#224229] md:text-lg">
            Welcome our talented team of professionals, where innovation meets expertise. Together, we're dedicated to creating exceptional experiences and driving success.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
          <div>
            <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover w-full min-h-56 md:h-64 lg:h-96 xl:h-[500px]"
                src={Melad}
                alt="Person"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                <p className="mb-1 text-lg font-bold text-gray-100">
                  Melad Abulail
                </p>
                <p className="mb-4 text-xs text-gray-100">Front-end Developer</p>
                <p className="mb-4 text-xs tracking-wide text-gray-400">
                  Introducing Melad Abulail, our front-end wizard! Transforming designs into user-friendly magic, he craft captivating digital experiences with code and creativity.
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <a
                    href="https://github.com/MeladAbulail"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <FaGithub size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/meladabulail"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <FaLinkedin size={22} />

                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover w-full min-h-56 md:h-64 lg:h-96 xl:h-[500px]"
                src={Ayoub}
                alt="Person"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                <p className="mb-1 text-lg font-bold text-gray-100">
                  Ayoub Husein
                </p>
                <p className="mb-4 text-xs text-gray-100">Back-end Developer</p>
                <p className="mb-4 text-xs tracking-wide text-gray-400">
                  Say hello to Ayoub Husein, our back-end maestro! Crafting the unseen gears that power our digital world, he turn code into the backbone of seamless functionality.
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <a
                    href="https://github.com/Ayoub-Haj-Husein"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <FaGithub size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ayoub-husein-659b54254/"
                    className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                  >
                    <FaLinkedin size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Aboutuspage;