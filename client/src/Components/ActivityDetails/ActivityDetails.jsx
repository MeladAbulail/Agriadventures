import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import ActivityRating from './ActivityRating';
import DisplayActivityComment from './DisplayActivityComment';
import Swal from 'sweetalert2'

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
        const authToken = Cookies.get('token');
    
        // Check if there's no token (visitor)
        if (!authToken) {
          // Handle the case for visitors (non-authenticated users)
          console.log('Visitor Mode: Fetching location details without authentication.');
    
          const response = await axios.get(`http://localhost:4000/Get_Location_By_Id/${locationId}`);
          setLocation(response.data.Location);
          // No need to check favorites or handle authentication-specific logic for visitors
          return;
        }
    
        // If there's a token, proceed with authentication-related logic
        console.log('Authenticated User: Fetching location details with authentication.');
    
        const response = await axios.get(`http://localhost:4000/Get_Location_By_Id/${locationId}`, {
          headers: {
            Authorization: authToken,
          },
        });
    
        setLocation(response.data.Location);
        await checkIfActivityInFavorites();
      } catch (err) {
        setError('Error fetching location: ' + err.message);
      }
    };
  
    fetchLocation();
  }, [locationId]);
  

  const checkIfActivityInFavorites = async () => {
    try {
      if (!token) {
        throw new Error('User not authenticated. Cannot check if activity is in favorites.');
      }

      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.get(`http://localhost:4000/Get_Favorites_Locations_By_LocationId/${locationId}`, config);
      setIsFavorite(response.data.length > 0);
    } catch (error) {
      setError('Error checking if activity is in favorites: ' + error.message);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (!token) {
        Swal.fire({
          title: "Please login to Add.",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        return
      }

      const config = {
        headers: {
          Authorization: token,
        },
      };

      if (isFavorite) {
        await axios.delete(`http://localhost:4000/Delete_Favorites_Locations/${locationId}`, config);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Removed Sucessfully",
          showConfirmButton: false,
          timer: 1500
        });
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Added to Favorite",
          showConfirmButton: false,
          timer: 1500
        });
        await axios.post(`http://localhost:4000/Add_New_Favorites_Locations/${locationId}`, {}, config);
      }
      setError(null); 
      
    } catch (err) {
      setError('Error toggling favorite: ' + err.message);
    }
  };

  const handleBook = () => {
    if (!token) {
      Swal.fire({
        title: "Please login to Book.",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      return
    }
    navigate('/Book', {
      state: {
        TicketPricePerPerson: location.TicketPricePerPerson,
        locationId: location.locationId,
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
  
  const workdaysArray = location.workdays.split(',');

  return (
    <div>
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
            <Link to="/Category"><a
              class="flex items-center text-lg	 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
              href="#"
            >
              Category
            </a></Link>
          </li>
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
          <li class="inline-flex items-center">
            <Link to={`/ActivitiesDetails/${location.locationId}`}><a
              class="flex items-center text-lg	 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
              href="#"
            >
              {location.locationName}
            </a></Link>
          </li>
        </ol>
      </div>
    <div className="mt-10 mb-32 md:ml-10">
      <div className="flex flex-col p-4 pb-20 md:flex-row">
        <div className="w-full md:w-3/6 h-[600px] ">
          <img
            src={location.imageUrl}
            alt={location.locationName}
            className="object-cover md:min-w-[300px] md:min-h-[300px] mx-auto rounded-lg w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between w-1/2 p-4">
          <div>
            <h2 className="mb-2 text-5xl font-bold">{location.locationName}</h2>
            <p className="mt-10 text-lg">{`Owner: ${location.owner}`}</p>
            <p className="mt-2 text-lg">{`Location: ${location.location}`}</p>
            <p className="mt-2 text-lg">{`Workdays: ${workdaysArray.join(' | ')}`}</p>
            <p className="mt-2 text-lg">{`Ticket Price Per Person: $${location.TicketPricePerPerson}`}</p>
            <p className="mt-2 text-lg">{`Evaluation: ${(location.evaluation).toFixed(1)}`}</p>
            <p className="mt-2 text-lg">{`description: ${location.description}`}</p>
            
            <p className="mt-2 text-lg">{`The Beginning: ${location.TheBeginningAndEndOfTheJourney.startTime}AM End Of The Journey: ${location.TheBeginningAndEndOfTheJourney.endTime}PM`}</p>
          </div>
          <div className="flex flex-col justify-end space-y-4 md:flex-row">
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
        <div className='w-4/5 h-1 mr-auto bg-[#a5afa2] '></div>
        <p>{location.description}</p>
      </div>
      <div className='flex flex-col xl:flex-row'><ActivityRating
        locationId={location.locationId}
        locationName={location.locationName}
      />
      <DisplayActivityComment />
    </div>
    </div>
    </div>
  );
};

export default ActivitiesDetails;