import React from 'react'
import { Link } from 'react-router-dom';

function Aboutussection() {
  return (
    <section class="bg-gray-100 mt-20 mb-32">
      <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div class="max-w-lg">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Us
            </h2>
            <p class="mt-10 text-gray-600 text-lg">
              Welcome to AdgriAdventure, where agriculture and tradition
              converge in a charming embrace.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Immerse yourself in the rural allure, reconnecting with the land
              and unearthing the essence of the old world. Our unique
              agri-tourism experience invites you to stroll through lush fields,
              savor farm-fresh delights, and engage in hands-on activities,
              breathing life into the timeless farming lifestyle. Come join us
              on this journey where every visit is an opportunity to meet the
              roots and rediscover the beauty of the past.
            </p>

            <div class="mt-8">
              <Link to="/Aboutus">
                <a
                  href="#"
                  class="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Learn more about us
                  <span class="ml-2">&#8594;</span>
                </a>
              </Link>
            </div>
          </div>
          <div class="mt-12 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
              alt="About Us Image"
              class="object-cover rounded-lg shadow-md"
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aboutussection