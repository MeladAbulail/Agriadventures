// NewEvents.js
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PackageEvents() {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Get_All_Locations');
        console.log('API Response:', response.data.Locations);

        if (Array.isArray(response.data.Locations) && response.data.Locations.length > 0) {
          setLocations(response.data.Locations);
        } else {
          console.error('No data or invalid data structure:', response.data.Locations);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Locations in Render:', locations);

  const handleMouseDown = (e) => {
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!startX) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 0.6;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setStartX(0);
  };

  const handleMouseLeave = () => {
    setStartX(0);
  };

  return (
    <div className="flex mt-32 ml-32 mr-10">
      <div className="flex flex-col ml-10">
        <h1 className="mb-10 text-6xl font-black">Activities</h1>
        <p className="items-center mt-auto text-3xl font-medium mb-11">
          Here is some of our Activities
        </p>
        <div className="flex items-center mt-auto">
          <img
            className="w-10 h-10 grayscale"
            draggable="false"
            src="https://img.icons8.com/flat-round/000000/arrow-right"
            alt="arrow-right"
          />
          <p className="ml-2 text-3xl font-medium">Explore all Activities</p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex overflow-x-hidden scrolling-touch"
        style={{ cursor: 'grab', width: '100%' }}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={() => handleMouseUp()}
        onMouseLeave={() => handleMouseLeave()}
      >
        {locations.length > 0 ? (
          locations.map((location) => (
            <Link
              key={location.locationId}
              to={`/ActivitiesDetails/${location.locationId}`}
              draggable="false" // Disable dragging on the Link element
              style={{ textDecoration: 'none' }} // Optional: Remove the default link styling
            >
              <article
                className="relative flex flex-col justify-end flex-shrink-0 px-8 pt-40 pb-8 mx-4 overflow-hidden rounded-2xl w-96"
                draggable="false" // Disable dragging on the article element
              >
                <img
                  src={location.imageUrl}
                  alt={`Image ${location.locationName}`}
                  className="absolute inset-0 object-cover w-full h-full"
                  draggable="false" // Disable dragging on the image element
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{location.locationName}</h3>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{location.activityName}</h3>
              </article>
            </Link>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default PackageEvents;