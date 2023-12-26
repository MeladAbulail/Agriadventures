import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import ActivityRating from './ActivityRating';
import DisplayActivityComment from './DisplayActivityComment';

const ActivitiesDetails = () => {
  const { locationId } = useParams(); 
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Get_Location_By_Id/${locationId}`);
          setLocation(response.data.Location);  
          checkIfActivityInFavorites()
      } catch (err) {
        console.err(err)
      }
    };
    fetchLocation();
  }, []);
  

  const checkIfActivityInFavorites = async () => {
    try {
      if (!token) {
        setError('User not authenticated. Cannot check if activity is in favorites.');
        return false;
      }
  
      const config = {
        headers: {
          Authorization: token,
        },
      };
  
      const response = await axios.get(`http://localhost:4000/Get_Favorites_Locations_By_LocationId/${locationId}`, config);
      if (response.data.length > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      setError('Error checking if activity is in favorites: ' + error.message);
      return false;
    }
  };
  
  const handleToggleFavorite = async () => {
    try {
      if (!token) {
        setError('User not authenticated. Cannot toggle favorite status.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: token,
        },
      };
  
      if (isFavorite) {
        await axios.delete(`http://localhost:4000/Delete_Favorites_Locations/${locationId}`, config);
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
        await axios.post(`http://localhost:4000/Add_New_Favorites_Locations/${locationId}`, {}, config);
      }
  
      setError(null); 
    } catch (err) {
      setError('Error toggling favorite: ' + err.message);
    }
  };
  

  const handleBook = () => {
    console.log('Handling checkout...');
    navigate('/Book', {
      state: {
        price: location.price,
        locationId: location.locationId,
        visitDate: location.visitDate,
        locationName: location.locationName,
      },
    });
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
              className={`px-4 py-2 text-white ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} rounded hover:${isFavorite ? 'bg-red-600' : 'bg-blue-600'}`}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button
              className="px-4 py-2 ml-4 text-white bg-green-500 rounded hover:bg-green-600"
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