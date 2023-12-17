import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ActivitiesTable() {
  const [locations, setLocations] = useState([]);
  const [searchLocationName, setSearchLocationName] = useState('');
  const [editLocation, setEditLocation] = useState(null);
  const [editedLocationData, setEditedLocationData] = useState({
    owner: '',
    phone: '',
    email: '',
    locationName: '',
    price: '',
    description: '',
    location: '',
    openingHours: '',
    visitDate: '',
    image: null,
  });
  const navigate = useNavigate();
  

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/Get_All_Locations';
    axios.get(apiUrl)
      .then(response => {
        console.log('Fetched locations:', response.data.Locations);
        if (Array.isArray(response.data.Locations)) {
          setLocations(response.data.Locations);
        } else {
          console.error('Invalid data format:', response.data.Locations);
        }
      })
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const filteredLocations = locations && locations.filter((location) => {
    if (!location || !location.locationName) {
      console.error('Invalid location data:', location);
      return false;
    }
    return location.locationName.toLowerCase().includes(searchLocationName.toLowerCase());
  });

  

  const deleteLocation = (locationId) => {
    const apiUrl = `http://localhost:4000/Delete_Location_By_Id/${locationId}`;
    axios.delete(apiUrl)
      .then(response => {
        if (response.status === 200) {
          setLocations(locations.filter(location => location.locationId !== locationId));
        }
      })
      .catch(error => console.error('Error deleting location:', error));
  };

  const handleEditLocation = (location) => {
    setEditLocation(location);
    setEditedLocationData({
      locationId: location.locationId,
      locationName: location.locationName,
      owner: location.owner,
      description: location.description,
      location: location.location,
      price: location.price,
      image: location.image,
      openingHours: location.openingHours,
      phone: location.phone,
      email: location.email,
      visitDate: location.visitDate,
    });
  };

  const handleSaveEdit = () => {
    if (isNaN(editedLocationData.locationId)) {
      console.error('Invalid locationId:', editedLocationData.locationId);
      return;
    }

    const apiUrl = `http://localhost:4000/Update_Location_By_Id/${editedLocationData.locationId}`;

    const formData = new FormData();
    formData.append('locationName', editedLocationData.locationName);
    formData.append('owner', editedLocationData.owner);
    formData.append('description', editedLocationData.description);
    formData.append('location', editedLocationData.location);
    formData.append('price', editedLocationData.price);
    formData.append('image', editedLocationData.image);
    formData.append('openingHours', editedLocationData.openingHours);
    formData.append('visitDate', new Date(editedLocationData.visitDate));
    formData.append('phone', new Date(editedLocationData.phone));
    formData.append('email', new Date(editedLocationData.email));
    formData.append('visitDate', new Date(editedLocationData.visitDate));

    axios.put(apiUrl, formData)
      .then(response => {
        if (response.status === 200) {
          setLocations(locations.map(location =>
            location.locationId === editedLocationData.locationId ? response.data : location
          ));
          setEditLocation(null);
        }
      })
      .catch(error => console.error('Error saving edited location:', error));
  };

  

  const refreshLocationsData = () => {
    const apiUrl = 'http://localhost:4000/Get_All_Locations';
    axios.get(apiUrl)
      .then(response => {
        if (Array.isArray(response.data.Locations)) {
          setLocations(response.data.Locations);
        } else {
          console.error('Invalid data format:', response.data.Locations);
        }
      })
      .catch(error => console.error('Error fetching locations:', error));
  };
  
  const handleAddActivity = () =>{
    navigate('/AddPlace');
  }

  return (
    <div className="w-full min-h-full p-4 mt-16 overflow-x-auto text-black ">
      <h1 className="mb-4 text-3xl font-bold ">Activities Table</h1>

      <div className="flex mb-4 ">
        <form className="w-90">
          <label
            htmlFor="activity-search"
            className="mb-2 text-sm font-medium sr-only"
          >
            Search by Activity Name:
          </label>
          <div className="relative flex w-full">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="activity-search"
              className="block p-2 text-sm text-black border border-gray-300 rounded-lg xl:w-[600px] ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by Activity Name"
              value={searchLocationName}
              onChange={(e) => setSearchLocationName(e.target.value)}
              required
            />
          </div>
        </form>

        <button
          type="button"
          className="w-16 px-4 py-2 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg w-30 hover:bg-green-800 focus:ring-4 focus:outline-none"
          onClick={handleAddActivity}
        >
          Add
        </button>
      </div>

      <table className="min-w-full overflow-hidden border rounded-lg ">
        <thead className="text-white bg-gray-600">
          <tr>
            <th className="px-4 py-2 sm:text-xs">ID</th>
            <th className="px-4 py-2 sm:text-xs">Activity Name</th>
            <th className="px-4 py-2 sm:text-xs">Owner</th>
            <th className="px-4 py-2 sm:text-xs">Description</th>
            <th className="px-4 py-2 sm:text-xs">Location</th>
            <th className="px-4 py-2 sm:text-xs">Price</th>
            <th className="px-4 py-2 sm:text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map(
            (location) =>
              location && (
                <tr
                  key={location.locationId} className={location.locationId % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}>
                  <td className="px-4 text-center sm:text-xs">
                    {location.locationId}
                  </td>
                  <td className="px-4 text-center sm:text-xs">
                    {location.locationName}
                  </td>
                  <td className="px-4 text-center sm:text-xs">
                    {location.owner}
                  </td>
                  <td className="px-4 text-center sm:text-xs">
                    {location.description}
                  </td>
                  <td className="px-4 text-center sm:text-xs">
                    {location.location}
                  </td>
                  <td className="px-4 text-center sm:text-xs">
                    $ {location.price}
                  </td>
                  <td className="flex items-center px-4 py-2 sm:text-xs">
                    <a
                      onClick={() => handleEditLocation(location)}
                      className="w-full text-center text-green-500 sm:text-xs green-full hover:text-green-600"
                    >
                      Edit
                    </a>
                    <a
                      onClick={() => deleteLocation(location.locationId)}
                      className="w-full p-3 text-center text-red-500 rounded-full sm:text-xs hover:text-red-600"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>

      {/* Edit Form */}
      {editLocation && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-full p-8 bg-white rounded-md md:w-96">
            <h2 className="mb-4 text-xl font-bold">Edit Activity</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Location Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editedLocationData.locationName}
                onChange={(e) =>
                  setEditedLocationData({
                    ...editedLocationData,
                    locationName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Owner:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editedLocationData.owner}
                onChange={(e) =>
                  setEditedLocationData({
                    ...editedLocationData,
                    owner: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                className="w-full p-2 border rounded"
                value={editedLocationData.description}
                onChange={(e) =>
                  setEditedLocationData({
                    ...editedLocationData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">location:</label>
              <select
                className="w-full p-2 border rounded"
                value={editedLocationData.location}
                onChange={(e) =>
                  setEditedLocationData({
                    ...editedLocationData,
                    location: e.target.value,
                  })
                }
              >
                <option value="Zarqa">Zarqa</option>
                <option value="Amman">Amman</option>
                <option value="Aqaba">Aqaba</option>
                <option value="Ajloun">Ajloun</option>
                <option value="Madaba">Madaba</option>
                <option value="Irbid">Irbid</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={editedLocationData.price}
                onChange={(e) =>
                  setEditedLocationData({
                    ...editedLocationData,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location Image:</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setEditedLocationData({
                    ...editedLocationData,
                    image: e.target.files[0],
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditLocation(null)}
                className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivitiesTable;