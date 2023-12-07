import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filters, setFilters] = useState({
    activityName: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    maxRating: '',
    location: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:4000/Get_All_Locations')
      .then((response) => {
        setActivities(response.data.Locations);
        
        // Check for location query parameter and apply filter
        const searchParams = new URLSearchParams(location.search);
        const locationParam = searchParams.get('location');
  
        if (locationParam) {
          setFilters((prevFilters) => ({ ...prevFilters, location: locationParam }));
          applyFilters(); // Apply filters when locationParam is present
        } else {
          setFilteredActivities(response.data.Locations);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = [...activities];

    if (filters.activityName !== '') {
      filtered = filtered.filter((activity) =>
        activity.locationName?.toLowerCase().includes(filters.activityName.toLowerCase())
      );
    }

    if (filters.minPrice !== '') {
      filtered = filtered.filter((activity) => activity.price >= parseInt(filters.minPrice, 10));
    }

    if (filters.maxPrice !== '') {
      filtered = filtered.filter((activity) => activity.price <= parseInt(filters.maxPrice, 10));
    }

    if (filters.minRating !== '') {
      filtered = filtered.filter((activity) => activity.rating >= parseFloat(filters.minRating));
    }

    if (filters.maxRating !== '') {
      filtered = filtered.filter((activity) => activity.rating <= parseFloat(filters.maxRating));
    }

    if (filters.location !== '') {
      filtered = filtered.filter((activity) => activity.category === filters.location);
    }

    setFilteredActivities(filtered);
  };

  const clearFilters = () => {
    setFilters({
      activityName: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      maxRating: '',
      location: '',
    });
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncated = words.slice(0, 12).join(' '); // Show up to 12 words
    return truncated + (words.length > 12 ? '...' : ''); // Add ellipsis if truncated
  };

  const handleReadMoreClick = (id) => {
    navigate(`/ActivitiesDetails/${id}`);
  };

  return (
    <div className="flex flex-col py-20 mx-20 md:flex-row">
      <div className="w-full p-4 md:w-1/4">
        <h2 className="mb-4 text-xl font-bold">Filter</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Activity Name</label>
          <input
            type="text"
            name="activityName"
            value={filters.activityName}
            onChange={handleFilterChange}
            className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Min Rating</label>
          <input
            type="number"
            step="0.1"
            name="minRating"
            value={filters.minRating}
            onChange={handleFilterChange}
            className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Max Rating</label>
          <input
            type="number"
            step="0.1"
            name="maxRating"
            value={filters.maxRating}
            onChange={handleFilterChange}
            className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Location</label>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Location</option>
            <option value="Amman">Amman</option>
            <option value="Zarqa">Zarqa</option>
            <option value="Irbid">Irbid</option>
            <option value="Aqaba">Aqaba</option>
            <option value="Ma'an">Ma'an</option>
            <option value="Jerash">Jerash</option>
            <option value="Kerak">Kerak</option>
            <option value="Ajloun">Ajloun</option>
          </select>
        </div>
        <button
          onClick={clearFilters}
          className="p-2 mx-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        >
          Clear Filters
        </button>
      </div>
      <div className="w-full p-4 md:w-3/4">
        <h2 className="mb-4 text-xl font-bold">Locations</h2>
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex flex-col items-center p-4 mb-4 border rounded-md md:flex-row">
            <img
              src={activity.imageUrl}
              alt={activity.locationName}
              className="mb-4 rounded-md md:mr-4 md:mb-0"
              style={{ width: '100px', height: 'auto' }}
            />
            <div className="md:flex-grow">
              <h3 className="text-lg font-semibold">{activity.locationName}</h3>
              <p className="mb-2 text-gray-600">{truncateDescription(activity.description)}</p>
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div>
                  <p className="text-gray-600">Price: ${activity.price}</p>
                </div>
                <button
                  onClick={() => handleReadMoreClick(activity.locationId)}
                  className="p-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 md:mt-0"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
