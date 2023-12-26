import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConfirmPlace() {
  const [confirmedData, setConfirmedData] = useState([]);
  const [confirmOrCancelConfirm, setconfirmOrCancelConfirm] = useState([]);

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/Get_All_Locations_PAGINATION?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
      console.log('Response data:', response.data);
      setConfirmedData(response.data.Locations);
      setTotalPages(Math.ceil(response.data.totalItems  / itemsPerPage));
      setconfirmOrCancelConfirm(response.data.locationsConfirm)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Locations:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const confirm = async (locationId) => {
    try {
      await axios.put(`http://localhost:4000/View_The_Place/${locationId}`);
      setconfirmOrCancelConfirm([...confirmOrCancelConfirm, locationId]);
    } catch (err) {
      console.log("Error Confirm Message:", err);
    }
  };
  
  const cancelConfirm = async (locationId) => {
    try {
      await axios.put(`http://localhost:4000/Not_View_The_Place/${locationId}`);
      setconfirmOrCancelConfirm(confirmOrCancelConfirm.filter((id) => id !== locationId));
    } catch (err) {
      console.log("Error cancelConfirm Message:", err);
    }
  };
  
  const handleDelete = async (location) => {
    try {
      // Delete data from Confirmplace by updating isDeleted to true
      await axios.delete(`http://localhost:4000/Delete_Location_By_Id/${location.locationId}`);

      // Update local state to remove confirmed data
      setConfirmedData((prevData) => prevData.filter((item) => item.locationId !== location.locationId));

      console.log('Deletion success');
      // Handle success or redirect as needed
    } catch (error) {
      console.error('Deletion error:', error);
      // Handle error
    }
  };

  return (
    <div className="w-full mt-16">
      <h1 className="mb-4 text-3xl font-bold">Confirm Place</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden border rounded-lg table-auto">
          <thead className="text-white bg-gray-600">
            <tr>
              <th className="px-4 py-2 sm:text-xs">ID</th>
              <th className="px-4 py-2 sm:text-xs">Location Name</th>
              <th className="px-4 py-2 sm:text-xs">Description</th>
              <th className="px-4 py-2 sm:text-xs">Ticket Price Per Person</th>
              <th className="px-4 py-2 sm:text-xs">View Or Not</th>
              <th className="px-4 py-2 sm:text-xs">Delete Product</th>
            </tr>
          </thead>
          <tbody>
            {confirmedData.map((location) => (
              <tr key={location.locationId} className={location.locationId % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}>
                <td className="px-4 py-2 text-center sm:text-xs">{location.locationId}</td>
                <td className="px-4 py-2 text-center sm:text-xs">{location.locationName}</td>
                <td className="px-4 py-2 text-center break-all w-80 sm:text-xs">{location.description}</td>
                <td className="px-4 py-2 text-center sm:text-xs">${location.TicketPricePerPerson}</td>
                <td className="flex items-center px-4 py-2 space-x-2 sm:text-xs">
                {confirmOrCancelConfirm.includes(location.locationId) ? (
                  <a
                    onClick={() => cancelConfirm(location.locationId)}
                    className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                  >
                    Cancel Confirm
                  </a>
                ) : (
                  <a
                    onClick={() => confirm(location.locationId)}
                    className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                  >
                    Confirm
                  </a>
                )}
              </td>
              <td className="px-4 py-2 text-center sm:text-xs">
              <a
                  onClick={() => handleDelete(location)}
                  className="cursor-pointer w-full p-3 text-center text-red-500 rounded-full sm:text-xs hover:text-red-600"
                >
                  Delete
                </a>
              </td>
              </tr>
            ))}
          </tbody>
          
        </table>
          {/* Pagination Controls */}
          <div className="flex items-center justify-center mt-4">
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
      </div>

    </div>
    
  );
  
}

export default ConfirmPlace;
