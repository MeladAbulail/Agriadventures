import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  ActivityRating from './ActivityRating'
import DisplayActivityComment from './DisplayActivityComment'

const ActivitiesDetails = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Get_Location_By_Id/${locationId}`);
        setLocation(response.data.Location);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [locationId]); 

  const handleBook = () => {
    console.log("Handling checkout...");
      navigate("/Book", { state: { price: location.price, locationId: location.locationId, visitDate: location.visitDate, locationName: location.locationName}});
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 mb-32 ml-10 ">
      <div className="flex p-4 pb-20">
        <div className="w-1/2 h-[600px] ">
          <img
            src={location.imageUrl}
            alt={location.locationName}
            className="object-cover w-[600px] h-[600px] mx-auto rounded-[20px]"
          />
        </div>
        <div className="flex flex-col justify-between w-1/2 p-4">
          <div>
            <h2 className="mb-2 text-5xl font-bold">{location.locationName}</h2>
            <p className="mt-10 text-lg">{`Owner: ${location.owner}`}</p>
            <p className="mt-2 text-lg">{`Location: ${location.location}`}</p>
            <p className="mt-2 text-lg">{`Price: $${location.price}`}</p>
          </div>
          <div className="flex flex-row justify-end">
            <p className='mt-1 mr-2 lg:text-2xl md:text-xl'>Don't Miss Out – Book Your Activity Today! </p>
            <button
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              onClick={handleBook}
            >
              Book now!
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold">Activity Description</h3>
        <p>{location.description}</p>
      </div>
      <ActivityRating
        locationId={location.locationId}
        locationName={location.locationName}
      />
      <DisplayActivityComment />
    </div>
  );
};

export default ActivitiesDetails;