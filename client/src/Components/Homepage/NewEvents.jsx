import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function NewEvents() {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Get_Location_By_Date');
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
    <div className="flex flex-col mx-0 mt-5 md:mx-40 bg-[#fcf9f3]" >
      <div className="mb-4">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">New Activities</h1>
      </div>

      <div
        ref={containerRef}
        className="flex overflow-x-hidden scrolling-touch"
        style={{ cursor: "grab", width: "100%" }}
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
              draggable="false"
              style={{ textDecoration: "none" }}
            >
              <article
                className="relative flex flex-col justify-end flex-shrink-0 w-64 h-64 px-4 pt-24 pb-4 mx-2 overflow-hidden md:px-8 md:mx-4 rounded-2xl md:w-96"
                draggable="false"
              >
                <img
                  src={location.imageUrl}
                  alt={`Image ${location.locationName}`}
                  className="absolute inset-0 object-cover w-full h-full"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-2 text-xl font-bold text-white md:text-3xl">
                  {location.locationName}
                </h3>
              </article>
            </Link>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="mt-5 mb-10 ml-auto">
        
        <div className="flex items-center">
        <Link to='./Category'><img
            className="w-6 h-6 grayscale"
            draggable="false"
            src="https://img.icons8.com/flat-round/000000/arrow-right"
            alt="arrow-right"/></Link>
            
          <Link to='./Category'><p className="ml-2 text-lg md:text-xl">Explore all Activities</p></Link>
        </div>
      </div>
      
    </div>
  );
}

export default NewEvents;
