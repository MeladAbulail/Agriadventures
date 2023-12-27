import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Gallerypage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('http://localhost:4000/Get_All_Locations')
      .then(response => {
        setEvents(response.data.locations);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const getRandomSize = () => {
    const sizes = ['1/2', '1/2', '1/3', '1/4'];
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
  };

  const handleImageClick = (locationId) => {
    navigate(`/ActivitiesDetails/${locationId}`);
  };

  return (
    <div>
      <div className="my-2 ml-4 lg:ml-32">
        <div >
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
              <Link to="/Gallery"><a
                class="flex items-center text-lg	 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
                href="#"
              >
                Gallery
              </a></Link>
            </li>
          </ol>
        </div>
      </div>

      <div className="mx-auto mb-20 max-w-xs md:max-w-xl xl:max-w-screen-xl bg-[#fcf9f3]">
        <div className="flex flex-wrap justify-center">
          {events.map((event) => (
            <div
              key={event.locationId}
              className={`w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 m-5 max-w-[500px] min-h-[100px] max-h-[500px]`}
            >
              <img
                alt={event.locationName}
                className="block object-cover object-center w-full h-full rounded-lg cursor-pointer"
                src={event.imageUrl}
                onClick={() => handleImageClick(event.locationId)}
              />
              <div className="mt-2 text-center">{event.locationName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallerypage;