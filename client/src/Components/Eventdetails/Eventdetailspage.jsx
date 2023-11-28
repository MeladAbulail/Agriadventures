import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Activity/${id}`);
        setActivity(response.data); // Assuming that the response is a JSON object with activity details
      } catch (err) {
        setError(err.message);
      }
    };

    fetchActivity();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div className='m-32'>
      <div className="flex p-4 px-32 py-20">
        {/* Image Section on the left with adjusted height and width */}
        <div className="w-1/2">
          <img
            src={activity.imageUrl} // Replace 'imageUrl' with the actual property name in your data
            alt="Activity Image"
            className="object-cover w-2/4 1/2" // Adjusted height to 120, you can modify as needed
          />
        </div>

        {/* Activity Details Section on the right */}
        <div className="flex flex-col justify-between w-1/2 p-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold">{activity.name}</h2>
            <p className="mb-2 text-lg">{`Location: ${activity.location}`}</p>
            <p className="mb-2 text-lg">{`Owner: ${activity.ownerName}`}</p>
            <p className="mb-2 text-lg">{`Date: ${activity.date}`}</p>
            <p className="mb-2 text-lg">{`Time: ${activity.time}`}</p>
            <p className="mb-2 text-lg">{`Price: ${activity.price}$`}</p>
          </div>

          {/* Book Button at the bottom right */}
          <div className="flex justify-end">
            <button className="px-4 py-2 text-white bg-blue-500 rounded">
              Book now
            </button>
          </div>
        </div>
      </div>

      {/* Event Description Section under everything else */}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold">Event Description</h3>
        <p>{activity.description}</p>
      </div>
    </div>
  );
};

export default EventDetailsPage;