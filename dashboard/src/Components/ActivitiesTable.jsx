import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

function ActivitiesTable() {
  const [locations, setLocations] = useState([]);
  const [searchLocationName, setSearchLocationName] = useState('');
  const [editLocation, setEditLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editedLocationData, setEditedLocationData] = useState({
    locationId: '',
    locationName: '',
    owner: '',
    description: '',
    location: '',
    TicketPricePerPerson: '',
    image: null,
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Get_All_Locations_PAGINATION?page=${currentPage}&itemsPerPage=${itemsPerPage}`
      );
      setLocations(response.data.locationsConfirmOnly);
      setTotalPages(Math.ceil(response.data.totalItems / itemsPerPage));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const filteredLocations = locations && locations.filter((location) => {
    if (!location || !location.locationName) {
      console.error('Invalid location data:', location);
      return false;
    }
    return location.locationName.toLowerCase().includes(searchLocationName.toLowerCase());
  });

  const deleteLocation = (locationId) => {
    Swal.fire({
      title: "Are You Sure",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `http://localhost:4000/Delete_Location_By_Id/${locationId}`;
        axios
          .delete(apiUrl)
          .then((response) => {
            if (response.status === 200) {
              setLocations(locations.filter((location) => location.locationId !== locationId));
              Swal.fire({
                title: 'Deleted!',
                text: 'The location has been deleted.',
                icon: 'success',
              });
            }
          })
          .catch((error) => {
            console.error('Error deleting location:', error);
            Swal.fire({
              title: 'Error',
              text: 'An unexpected error occurred. Please try again.',
              icon: 'error',
            });
          });
      }
    });
  };
  

  const handleEditLocation = (location) => {
    setEditLocation(location);
    setEditedLocationData({
      locationId: location.locationId,
      locationName: location.locationName,
      owner: location.owner,
      description: location.description,
      location: location.location,
      TicketPricePerPerson: location.TicketPricePerPerson,
      image: location.image,
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
    formData.append('TicketPricePerPerson', editedLocationData.TicketPricePerPerson);
    formData.append('image', editedLocationData.image);

    axios
      .put(apiUrl, formData)
      .then((response) => {
        if (response.status === 200) {
          setLocations((locations) =>
            locations.map((location) =>
              location.locationId === editedLocationData.locationId ? response.data : location
            )
          );
          setEditLocation(null);
          fetchData();
        }
      })
      .catch((error) => console.error('Error saving edited location:', error));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchData();
    }
  };

  const handleAddActivity = () => {
    navigate('/AddPlace');
  };

  const cancelConfirm = async (locationId) => {
    Swal.fire({
      title: "Are You Sure",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, mark as not viewed!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`http://localhost:4000/Not_View_The_Place/${locationId}`);
  
          if (response.data.success) {
            setLocations(locations.filter((location) => location.locationId !== locationId));
            Swal.fire({
              title: 'Success!',
              text: 'The place has been marked as not viewed successfully.',
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Failed to mark the place as not viewed. Please try again.',
              icon: 'error',
            });
          }
        } catch (err) {
          console.log("Error cancelConfirm Message:", err);
          Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };
  
  

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="w-full min-h-full p-4 mt-16 overflow-x-auto text-black">
      <h1 className="mb-4 text-3xl font-bold">Activities Table</h1>

      <div className="flex mb-4">
        <form className="w-90">
          <label htmlFor="activity-search" className="mb-2 text-sm font-medium sr-only">
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
      <table className="min-w-full overflow-hidden border rounded-lg">
        <thead className="text-white bg-gray-600">
          <tr>
            <th className="px-4 py-2 sm:text-xs">ID</th>
            <th className="px-4 py-2 sm:text-xs">Activity Name</th>
            <th className="px-4 py-2 sm:text-xs">Owner</th>
            <th className="px-4 py-2 sm:text-xs">Description</th>
            <th className="px-4 py-2 sm:text-xs">Location</th>
            <th className="px-4 py-2 sm:text-xs">Ticket Price Per Person</th>
            <th className="px-4 py-2 sm:text-xs">Edit</th>
            <th className="px-4 py-2 sm:text-xs">Cancel View</th>
            <th className="px-4 py-2 sm:text-xs">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map(
            (location) =>
              location && (
                <tr
                  key={location.locationId}
                  className={location.locationId % 2 === 0 ? 'bg-[#e5e7eb]' : 'bg-[#d1d5db]'}
                >
                  <td className="px-4 py-2 text-center sm:text-xs">{location.locationId}</td>
                  <td className="px-4 py-2 text-center sm:text-xs">{location.locationName}</td>
                  <td className="px-4 py-2 text-center sm:text-xs">{location.owner}</td>
                  <td className="px-4 py-2 text-center sm:text-xs">{location.description}</td>
                  <td className="px-4 py-2 text-center sm:text-xs">{location.location}</td>
                  <td className="px-4 py-2 text-center sm:text-xs">$ {location.TicketPricePerPerson}</td>
                  <td className="px-4 py-2 text-center sm:text-xs">
                    <a
                      onClick={() => handleEditLocation(location)}
                      className="cursor-pointer w-full text-center text-green-500 sm:text-xs green-full hover:text-green-600"
                    >Edit</a>
                  </td>
                  <td className="px-4 text-center sm:text-xs">
                    <a
                      onClick={() => cancelConfirm(location.locationId)}
                      className="cursor-pointer w-full text-center text-green-500 sm:text-xs green-full hover:text-green-600"
                    >Cancel</a>
                  </td>
                  <td className="px-4 text-center sm:text-xs">
                    <a
                      onClick={() => deleteLocation(location.locationId)}
                      className="cursor-pointer w-full p-3 text-center text-red-500 rounded-full sm:text-xs hover:text-red-600"
                    >Delete</a>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>

          <div className="flex justify-center mt-4 mx-auto">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded ${
                  currentPage === page ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

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
              <label className="block text-gray-700">Location:</label>
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
              <label className="block text-gray-700">TicketPricePerPerson:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={editedLocationData.TicketPricePerPerson}
                onChange={(e) =>
                  setEditedLocationData({
                    ...editedLocationData,
                    TicketPricePerPerson: e.target.value,
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
