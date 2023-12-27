import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

function ConfirmPlace() {
  const [confirmedData, setConfirmedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Get_All_Products_Not_View');
        setConfirmedData(response.data.products);
      } catch (error) {
        console.error('Error fetching confirmed data:', error);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async (location) => {
    Swal.fire({
      title: "Are You Sure",
      text: "Confirming the view of the product.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send data to Locations and update viewThePlace to true
          await axios.put(`http://localhost:4000/View_The_Product/${location.productId}`, {
            viewThePlace: true
          });
      
          // Update local state to remove confirmed data
          setConfirmedData((prevData) => prevData.filter((item) => item.productId !== location.productId));
      
          console.log('Confirmation success');
          Swal.fire({
            title: 'Success!',
            text: 'The product view has been confirmed successfully.',
            icon: 'success',
          });
          // Handle success or redirect as needed
        } catch (error) {
          console.error('Confirmation error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to confirm the view of the product. Please try again.',
            icon: 'error',
          });
          // Handle error
        }
      }
    });
  };
  
  const handleDelete = async (location) => {
    Swal.fire({
      title: "Are You Sure",
      text: "Deleting the product.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Delete data from Confirmplace by updating isDeleted to true
          await axios.delete(`http://localhost:4000/Delete_Product_By_Id/${location.productId}`);
  
          // Update local state to remove confirmed data
          setConfirmedData((prevData) => prevData.filter((item) => item.productId !== location.productId));
  
          console.log('Deletion success');
          Swal.fire({
            title: 'Success!',
            text: 'The product has been deleted successfully.',
            icon: 'success',
          });
          // Handle success or redirect as needed
        } catch (error) {
          console.error('Deletion error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete the product. Please try again.',
            icon: 'error',
          });
          // Handle error
        }
      }
    });
  };
  

  return (
    <div className="w-full p-4 mt-16 ">
      <h1 className="mb-4 text-2xl font-bold ">Confirm Product</h1>
      <div className="overflow-x-auto">
        {Array.isArray(confirmedData) && confirmedData.length > 0 ? (
          <table className="min-w-full overflow-hidden border rounded-lg table-auto">
            <thead className="text-white bg-gray-600">
              <tr>
                <th className="px-4 py-2 sm:text-xs">ID</th>
                <th className="px-4 py-2 sm:text-xs">Location Name</th>
                <th className="px-4 py-2 sm:text-xs">Description</th>
                <th className="px-4 py-2 sm:text-xs">Price</th>
                <th className="px-4 py-2 sm:text-xs">Confirm</th>
                <th className="px-4 py-2 sm:text-xs">Delete</th>
              </tr>
            </thead>
            <tbody>
              {confirmedData.map((location) => (
                <tr key={location.productId} className={location.productId % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}>
                  <td className="px-4 text-center sm:text-xs">{location.productId}</td>
                  <td className="px-4 text-center sm:text-xs">{location.productName}</td>
                  <td className="px-4 py-2 text-center break-all w-80 sm:text-xs">{location.description}</td>
                  <td className="px-4 text-center sm:text-xs">${location.price}</td>
                  <td className="px-4 text-center sm:text-xs">
                    <a
                      onClick={() => handleConfirm(location)}
                      className="cursor-pointer w-full text-center text-green-500 sm:text-xs green-full hover:text-green-600"
                    >
                      Confirm
                    </a>
                  </td>
                  <td className="px-4 text-center sm:text-xs">
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
        ) : (
          <p>No confirmed data available.</p>
        )}
      </div>
    </div>
  );
}

export default ConfirmPlace;