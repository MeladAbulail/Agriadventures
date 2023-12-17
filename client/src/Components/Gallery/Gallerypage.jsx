import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Gallerypage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event data from the specified URL (http://localhost:5000/Activity)
    axios.get('http://localhost:4000/Get_All_Locations')
      .then(response => {
        setEvents(response.data.Locations); // Assuming data is an array of events
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const getRandomSize = () => {
    const sizes = ['1/4', '1/3', '1/2', '2/3']; // Adjust as needed
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
  };

  const handleImageClick = (locationId) => {
    // Redirect to the Eventdetailspage with the clicked event's id
    navigate(`/ActivitiesDetails/${locationId}`);
  };

  return (
    <div className="container px-5 py-2 mx-auto mb-20 ml-10 mr-10 lg:px-32 lg:pt-24">
      <div className="flex flex-wrap -m-1 md:-m-2">
        {events.map((event) => (
          <div key={event.locationId} className={`w-${getRandomSize()} p-1 md:p-2`}>
            <img
              alt={event.locationName}
              className="block object-cover object-center w-full h-full rounded-lg cursor-pointer"
              src={event.imageUrl}
              onClick={() => handleImageClick(event.locationId)}
            />
            <div className="mt-2 text-center">
              {event.locationName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallerypage;