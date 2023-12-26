import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function AddPlace() {
  const [formData, setFormData] = useState({
    owner: '',
    phone: '',
    email: '',
    locationName: '',
    TicketPricePerPerson: '',
    description: '',
    location: '',
    workdays: [],
    image: null,
    TheBeginningAndEndOfTheJourney: {
      startTime: '',
      endTime: '',
    },
  });

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/ConfirmPlace');
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;

    // Update the formData state when a checkbox is checked or unchecked
    setFormData((prevData) => {
      if (prevData.workdays.includes(value)) {
        // If the value is already in the array, remove it
        return {
          ...prevData,
          workdays: prevData.workdays.filter((day) => day !== value),
        };
      } else {
        // If the value is not in the array, add it
        return {
          ...prevData,
          workdays: [...prevData.workdays, value],
        };
      }
    });
  };

  const handleTimeChange = (e, field) => {
    const { value } = e.target;

    // Update the formData state when the time input changes
    setFormData((prevData) => ({
      ...prevData,
      TheBeginningAndEndOfTheJourney: {
        ...prevData.TheBeginningAndEndOfTheJourney,
        [field]: value,
      },
    }));
  };

  const token = Cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataForUpload = new FormData();
  
    for (const key in formData) {
      if (key === 'TheBeginningAndEndOfTheJourney') {
        // Handle the nested object for time separately
        formDataForUpload.append('TheBeginningAndEndOfTheJourney', JSON.stringify(formData.TheBeginningAndEndOfTheJourney));
      } else if (key === 'workdays') {
        // Join the array of workdays into a comma-separated string
        formDataForUpload.append(key, formData.workdays.join(','));
      } else if (key === 'image') {
        // Handle file separately
        formDataForUpload.append(key, formData[key]);
      } else {
        formDataForUpload.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.post('http://localhost:4000/Add_New_Location', formDataForUpload, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Post success:', response.data);
      handleRedirect();
    } catch (error) {
      console.error('Post error:', error);
    }
  };

  return (
    <div className="max-w-2xl p-8 mx-auto my-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Add Place</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

      <div className="flex flex-col">
          <label htmlFor="owner" className="text-sm font-medium">
            Owner:
          </label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="locationName" className="text-sm font-medium">
            Location Name:
          </label>
          <input
            type="text"
            id="locationName"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
            className="p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location:</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.location}
            id="location"
            name="location"
            onChange={handleChange}
          >
            <option>Select Location</option>
            <option value="Zarqa" >Zarqa</option>
            <option value="Amman">Amman</option>
            <option value="Aqaba">Aqaba</option>
            <option value="Ajloun">Ajloun</option>
            <option value="Irbid">Irbid</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="TicketPricePerPerson" className="text-sm font-medium">
          Ticket Price Per Person:
          </label>
          <input
            type="number"
            id="TicketPricePerPerson"
            name="TicketPricePerPerson"
            value={formData.TicketPricePerPerson}
            onChange={handleChange}
            className="p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Workdays:</label>
          <div>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <label key={day} className="mr-4">
                <input
                  type="checkbox"
                  name="workdays"
                  value={day}
                  checked={formData.workdays.includes(day)}
                  onChange={handleCheckboxChange}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="TheBeginningAndEndOfTheJourney" className="text-sm font-medium">
            Working Hours:
          </label>
          <div>
            <label>
              From
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.TheBeginningAndEndOfTheJourney.startTime}
                onChange={(e) => handleTimeChange(e, 'startTime')}
                className="p-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </label>
            <label>
              To
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.TheBeginningAndEndOfTheJourney.endTime}
                onChange={(e) => handleTimeChange(e, 'endTime')}
                className="p-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPlace;