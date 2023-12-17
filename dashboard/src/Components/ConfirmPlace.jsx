import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConfirmPlace() {
  const [confirmedData, setConfirmedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Get_Location_By_ViewThePlace');
        setConfirmedData(response.data.locations);
      } catch (error) {
        console.error('Error fetching confirmed data:', error);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async (location) => {
    try {
      // Send data to Locations and update viewThePlace to true
      await axios.put(`http://localhost:4000/View_The_Place/${location.locationId}`, {
        viewThePlace: true
      });
  
      // Update local state to remove confirmed data
      setConfirmedData((prevData) => prevData.filter((item) => item.locationId !== location.locationId));
  
      console.log('Confirmation success');
      // Handle success or redirect as needed
    } catch (error) {
      console.error('Confirmation error:', error);
      // Handle error
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
              <th className="px-4 py-2 sm:text-xs">Price</th>
              <th className="px-4 py-2 sm:text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {confirmedData.map((location) => (
              <tr key={location.locationId} className={location.locationId % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}>
                <td className="px-4 py-2 text-center sm:text-xs">{location.locationId}</td>
                <td className="px-4 py-2 text-center sm:text-xs">{location.locationName}</td>
                <td className="px-4 py-2 text-center break-all w-80 sm:text-xs">{location.description}</td>
                <td className="px-4 py-2 text-center sm:text-xs">${location.price}</td>
                <td className="flex items-center px-4 py-2 space-x-2 sm:text-xs">
                  <a
                    onClick={() => handleConfirm(location)}
                    className="w-full text-center text-green-500 sm:text-xs green-full hover:text-green-600"
                  >
                    Confirm
                  </a>
                  <a
                    onClick={() => handleDelete(location)}
                    className="w-full p-3 text-center text-red-500 rounded-full sm:text-xs hover:text-red-600"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConfirmPlace;
