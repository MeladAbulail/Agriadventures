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
    <div className='m-32'>
      <div className="flex p-4 px-32 py-20">
        {/* Image Section on the left with adjusted height and width */}
        <div className="w-1/2">
  <img
    src={location.imageUrl}
    alt={location.locationName}
    className="object-cover w-500 h-500" // Set the height to 900px
  />
</div>

        {/* Product Details Section on the right */}
        <div className="flex flex-col justify-between w-1/2 p-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold">{location.locationName}</h2>
            {/* <p className="mb-2 text-lg">{`Category: ${product.category}`}</p> */}
            <p className="mb-2 text-lg">{`Price: ${location.price}$`}</p>
            {/* Add more details as needed */}
          </div>

          {/* Purchase Button at the bottom right */}
          <div className="flex justify-end">
            <button className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={handleBook}
            >
              Book
            </button>
          </div>
        </div>
      </div>

      {/* Product Description Section under everything else */}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold">Activity Description</h3>
        <p>{location.description}</p>
      </div>
      <ActivityRating
        locationId={location.locationId}
        locationName={location.locationName}
      />
      <DisplayActivityComment/>
    </div>
  );
};

export default ActivitiesDetails;