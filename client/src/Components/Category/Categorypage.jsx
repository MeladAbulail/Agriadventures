import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CircularPagination } from './CircularPagination'; // Update the path based on your project structure

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    activityName: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    maxRating: '',
    location: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios
      .get('http://localhost:4000/Get_All_Locations')
      .then((response) => {
        setActivities(response.data.Locations);

        const searchParams = new URLSearchParams(location.search);
        const locationParam = searchParams.get('location');
        setTotalResults(response.data.Locations.length);

        if (locationParam) {
          setFilters((prevFilters) => ({ ...prevFilters, location: locationParam }));
          applyFilters();
        } else {
          setFilteredActivities(response.data.Locations);
        }
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [filters, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1);
  };


  const applyFilters = () => {
    let filtered = [...activities];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
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
      filtered = filtered.filter((activity) => activity.evaluation >= parseFloat(filters.minRating));
    }

    if (filters.maxRating !== '') {
      filtered = filtered.filter((activity) => activity.evaluation <= parseFloat(filters.maxRating));
    }

    if (filters.location !== '') {
      filtered = filtered.filter((activity) => activity.category === filters.location);
    }
    setFilteredActivities(filtered.slice(startIndex, endIndex));
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
    setCurrentPage(1);
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncated = words.slice(0, 12).join(' '); // Show up to 12 words
    return truncated + (words.length > 12 ? '...' : ''); // Add ellipsis if truncated
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, minRating: value, maxRating: value }));
    setCurrentPage(1);
  };



  const handleReadMoreClick = (id) => {
    navigate(`/ActivitiesDetails/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(pageNumber)
  };

  return (
    <section>
      <div className="text-center text-container">
        <h1
          className="relative z-10 font-bold text-transparent"
          style={{
            fontSize: '6rem',
            background: `url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            margin: '0 auto',
            display: 'inline-block',
            backgroundSize: 'cover',
            userSelect: 'none',
          }}
        >
          Activities
        </h1>
      </div>

      <div className="flex flex-col py-20 mx-20 md:flex-row ">

        <div className="w-full h-screen p-4 border-2 rounded-lg md:w-1/4 md:h-auto ">
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
          <div className='h-[0.3px] my-1  bg-[#d4d4d4]'></div>
          <div className="flex mb-4">
            <div className="mr-4">
              <label className="block text-sm font-medium text-gray-600">Min Price</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <div className="h-[0.3px] my-1 bg-[#d4d4d4]"></div>
            <div className="flex mb-4">
              <div className="mr-4">
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
              <div>
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
            </div>
          </div>
          <div className='h-[0.3px] my-1  bg-[#d4d4d4]'></div>
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
            className="w-full p-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Clear Filters
          </button>
        </div>
        <div className="w-full p-4 md:w-3/4">
          <h2 className="mb-4 text-xl font-bold">
            Results <span className="text-gray-600">({totalResults} items)</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="relative flex flex-col bg-white border border-white shadow-lg border-3 md:flex-row">
                <div className="grid w-full py-4 pl-4 md:w-fit">
                  <img
                    src={activity.imageUrl}
                    alt={activity.locationName}
                    className="rounded-xl"
                    style={{ width: '250px', height: '250px' }}
                  />
                </div>
                <div className="flex flex-col w-full p-3 space-y-2 md:w-2/3">
                  <h3 className="text-xl font-black text-gray-800 md:text-3xl">{activity.locationName}</h3>
                  <p className="text-base text-gray-500 md:text-lg line-clamp-4">{activity.description}</p>


                  <div className="flex items-end justify-between">
                    <div>
                      <p className="hidden font-medium text-gray-500 md:block">{activity.category}</p>
                      <div className="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="ml-1 text-base font-bold text-gray-600">
                          {activity.rating}
                          <span className="text-lg font-normal text-gray-500"> ({activity.totalStars} reviews)</span>
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 right-0 flex flex-row mb-4 mr-4" >
                      <p className="mr-4 text-3xl font-black text-gray-800">
                        ${activity.price}
                        <span className="static bottom-0 text-base font-normal text-gray-600">/Person</span>
                      </p>
                      <button
                        onClick={() => handleReadMoreClick(activity.locationId)}
                        className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                      >
                        Read more
                      </button>
                    </div>


                  </div>


                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <CircularPagination
              active={currentPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(filteredActivities.length / itemsPerPage)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
