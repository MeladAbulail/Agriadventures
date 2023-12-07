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
      await axios.put(`http://localhost:4000/View_The_Place/${location.locationId}`, {
        viewThePlace: true
      });

      setConfirmedData((prevData) => prevData.filter((item) => item.locationId !== location.locationId));
      console.log('Confirmation success');
    } catch (error) {
      console.error('Confirmation error:', error);
    }
  };

  const handleDelete = async (location) => {
    try {
      await axios.delete(`http://localhost:4000/Delete_Location_By_Id/${location.locationId}`);
      setConfirmedData((prevData) => prevData.filter((item) => item.locationId !== location.locationId));
      console.log('Deletion success');
    } catch (error) {
      console.error('Deletion error:', error);
    }
  };

  return (
    <div className="flex flex-col mt-32 ml-4 mr-20 overflow-y-hidden">
      <h1 className='mb-10 text-4xl'> Confirm Place</h1>
      <div className="overflow-x-auto  bg-white p-1.5 w-full inline-block align-middle">
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-black divide-y divide-gray-200">
            <thead className="bg-gray-600">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left uppercase"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left uppercase"
                >
                  Location Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left uppercase"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left uppercase"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right uppercase "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {confirmedData.map((location) => (
                <tr key={location.locationId}>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    {location.locationId}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {location.locationName}
                  </td>
                  <td className="px-6 py-4 text-sm break-all whitespace-nowrap w-80">
                    {location.description}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    ${location.price}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-2 text-sm">
                    <button
                      onClick={() => handleConfirm(location)}
                      className="w-full p-3 text-white bg-green-500 rounded-full hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleDelete(location)}
                      className="w-full p-3 text-white bg-red-500 rounded-full hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPlace;