import React from 'react'
import { Link } from 'react-router-dom';
import myVideo from './Video.mp4';

function Aboutussection() {
  return (
    <section class="bg-[#fcf9f3] mt-20 mb-32 mx-10">
      <div className='w-4/5 h-1 mx-auto bg-[#a5afa2] '></div>
      <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div className="mt-12 md:mt-0">
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/897958085?badge=0&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;player_id=0&amp;app_id=58479"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                className=''
                title="Aboutus"
              ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
            {/* <video autoPlay loop muted playsInline className='max-h-[600px] w-[600] float-right'>
              <source src={myVideo} type='video/mp4' />
            </video> */}

          </div>
          <div class="max-w-lg">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Us
            </h2>
            <p class="mt-4 text-base text-gray-600 xl:text-lg">
              Welcome to Agriadventures, your passport to a captivating journey through the vibrant tapestry of agriculture and rural life. As a pioneering agritourism platform, Agriadventures invites you to step into the heart of farms, where traditions thrive, and the land tells its story.
            </p>
            <p className="mt-4 text-base text-gray-600 xl:text-lg">

            Embark on a journey with Agriadventures, your gateway to the vibrant world of agriculture. Step into the heart of farms, where traditions thrive, and let the land weave its captivating story.            </p>

            <div class="mt-8">
              <Link to="/Aboutus">
                <button
                  href="#"
                  class="text-[#fcf9f3] hover:text-[#b5b492] font-medium bg-[#224229] rounded-full px-4 py-3"
                >
                  Learn more
                  <span class="ml-2">&#8594;</span>
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
      <div className='w-3/5 h-1 mx-auto bg-[#a5afa2] '></div>
    </section>
  );
}

export default Aboutussection