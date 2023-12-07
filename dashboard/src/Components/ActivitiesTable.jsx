import React, { useState, useEffect } from 'react';
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
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);
  const [newActivityData, setNewActivityData] = useState({
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewActivityData(prevState => ({ ...prevState, image: file }));
  };

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

  const handleAddActivity = () => {
    const formData = new FormData();
    formData.append('locationName', newActivityData.locationName);
    formData.append('owner', newActivityData.owner);
    formData.append('description', newActivityData.description);
    formData.append('location', newActivityData.location);
    formData.append('price', newActivityData.price);
    formData.append('image', newActivityData.image);
    formData.append('openingHours', newActivityData.openingHours);
    formData.append('visitDate', new Date(newActivityData.visitDate));
    formData.append('phone', newActivityData.phone);
    formData.append('email', newActivityData.email);

    axios.post('http://localhost:4000/Add_New_Location', formData)
      .then(response => {
        if (response.status === 201) {
          console.log('Successfully added activity:', response.data);
          refreshLocationsData();
          setShowAddActivityForm(false);
          setNewActivityData({
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
        }
      })
      .catch(error => {
        console.error('Error adding activity:', error);
      });
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

  return (
    <div className="w-full min-h-full p-4 overflow-x-auto text-black ">
      <div className="flex flex-col w-full p-4 overflow-x-auto md:flex-row">
        <div className='w-full'>
          <h1 className="mb-4 text-5xl font-bold">Activities</h1>
          <label className="text-black">Search by Activity Name:</label>
          <input
            type="text"
            className="w-full p-2 my-2 ml-2 border rounded md:w-60"
            value={searchLocationName}
            onChange={(e) => setSearchLocationName(e.target.value)}
            placeholder="Enter Activity Name"
          />
          <button
            onClick={() => setShowAddActivityForm(true)}
            className="px-4 py-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg w-30 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Add Activity
          </button>


          
          <table className="min-w-full overflow-hidden border rounded-lg table-auto ">
            <thead className="text-white bg-gray-600">
              <tr>
                <th className="px-4 py-2 sm:text-xs">ID</th>
                <th className="px-4 py-2 sm:text-xs">Activity Name</th>
                <th className="px-4 py-2 sm:text-xs">Owner</th>
                <th className="px-4 py-2 sm:text-xs">Description</th>
                <th className="px-4 py-2 sm:text-xs">location</th>
                <th className="px-4 py-2 sm:text-xs">Price</th>
                <th className="px-4 py-2 sm:text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((location) => (
                location && (
                  <tr key={location.locationId} >
                    <td className="px-4 py-2 text-xs text-center sm:text-lg">{location.locationId}</td>
                    <td className="px-4 py-2 text-xs text-center sm:text-lg">{location.locationName}</td>
                    <td className="px-4 py-2 text-xs text-center sm:text-lg">{location.owner}</td>
                    <td className="px-4 py-2 text-xs text-center sm:text-lg">{location.description}</td>
                    <td className="px-4 py-2 text-xs text-center sm:text-lg">{location.location}</td>
                    <td className="px-4 py-2 text-xs text-center sm:text-lg">$ {location.price}</td>
                    <td className="flex items-center px-4 py-2 space-x-2 sm:text-xs">
                      <a
                        onClick={() => handleEditLocation(location)}
                        className="w-full p-3 text-lg text-center text-blue-500 rounded-full hover:text-blue-600"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => deleteLocation(location.locationId)}
                        className="w-full p-3 text-lg text-center text-red-500 rounded-full hover:text-red-600"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
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
                onChange={(e) => setEditedLocationData({ ...editedLocationData, locationName: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Owner:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editedLocationData.owner}
                onChange={(e) => setEditedLocationData({ ...editedLocationData, owner: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                className="w-full p-2 border rounded"
                value={editedLocationData.description}
                onChange={(e) => setEditedLocationData({ ...editedLocationData, description: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">location:</label>
              <select
                className="w-full p-2 border rounded"
                value={editedLocationData.location}
                onChange={(e) => setEditedLocationData({ ...editedLocationData, location: e.target.value })}
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
                onChange={(e) => setEditedLocationData({ ...editedLocationData, price: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location Image:</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) => setEditedLocationData({ ...editedLocationData, image: e.target.files[0] })}
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
  
      {/* Add Form */}
      {showAddActivityForm && (
  <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div className="w-full max-w-2xl p-8 bg-white rounded-md">
      <h2 className="mb-4 text-xl font-bold">Add Activity</h2>

      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <label className="block text-gray-700">Owner:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newActivityData.owner}
            onChange={(e) => setNewActivityData({ ...newActivityData, owner: e.target.value })}
          />
        </div>

        <div className="w-1/2 pl-2">
          <label className="block text-gray-700">Phone:</label>
          <input
            type="tel"
            className="w-full p-2 border rounded"
            value={newActivityData.phone}
            onChange={(e) => setNewActivityData({ ...newActivityData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <label className="block text-gray-700">Location Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newActivityData.locationName}
            onChange={(e) => setNewActivityData({ ...newActivityData, locationName: e.target.value })}
          />
        </div>

        <div className="w-1/2 pl-2">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={newActivityData.email}
            onChange={(e) => setNewActivityData({ ...newActivityData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/3 pr-2">
          <label className="block text-gray-700">Opening Hours:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={newActivityData.openingHours}
            onChange={(e) => setNewActivityData({ ...newActivityData, openingHours: e.target.value })}
          />
        </div>

        <div className="w-1/3 px-2">
          <label className="block text-gray-700">Rating:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={newActivityData.rating}
            onChange={(e) => setNewActivityData({ ...newActivityData, rating: e.target.value })}
          />
        </div>

        <div className="w-1/3 pl-2">
          <label className="block text-gray-700">Price:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={newActivityData.price}
            onChange={(e) => setNewActivityData({ ...newActivityData, price: e.target.value })}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description:</label>
        <textarea
          className="w-full p-2 border rounded"
          value={newActivityData.description}
          onChange={(e) => setNewActivityData({ ...newActivityData, description: e.target.value })}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAddActivity}
          className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-full md:w-auto md:mt-0 md:ml-2 hover:bg-green-600"
        >
          Add Activity
        </button>

        <button
          onClick={() => setShowAddActivityForm(false)}
          className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-full md:w-auto md:mt-0 hover:bg-red-600"
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