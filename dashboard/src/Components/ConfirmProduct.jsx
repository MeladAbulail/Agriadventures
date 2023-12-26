import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConfirmPlace() {
  const [confirmedData, setConfirmedData] = useState([]);
  const [confirmOrCancelConfirm, setconfirmOrCancelConfirm] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/Get_All_Products_Pagination?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
      console.log('Response data:', response.data);
      setConfirmedData(response.data.products);
      setTotalPages(Math.ceil(response.data.totalItems / itemsPerPage));
      setconfirmOrCancelConfirm(response.data.productsConfirm);
    } catch (error) {
      console.error('Error fetching confirmed data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const confirm = async (productId) => {
    try {
      await axios.put(`http://localhost:4000/View_The_Product/${productId}`);
      setconfirmOrCancelConfirm([...confirmOrCancelConfirm, productId]);
    } catch (err) {
      console.log("Error Confirm Message:", err);
    }
  };

  const cancelConfirm = async (productId) => {
    try {
      await axios.put(`http://localhost:4000/Not_View_The_Product/${productId}`);
      setconfirmOrCancelConfirm(confirmOrCancelConfirm.filter((id) => id !== productId));
    } catch (err) {
      console.log("Error cancelConfirm Message:", err);
    }
  };

  const handleDelete = async (location) => {
    try {
      await axios.delete(`http://localhost:4000/Delete_Product_By_Id/${location.productId}`);
      setConfirmedData((prevData) => prevData.filter((item) => item.productId !== location.productId));
      console.log('Deletion success');
    } catch (error) {
      console.error('Deletion error:', error);
    }
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
                <th className="px-4 py-2 sm:text-xs">View Or Not</th>
                <th className="px-4 py-2 sm:text-xs">Delete Product</th>
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
                  {Array.isArray(confirmOrCancelConfirm) && confirmOrCancelConfirm.length > 0 ? (
                      <a
                        onClick={() => cancelConfirm(location.productId)}
                        className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                      >
                        Cancel Confirm
                      </a>
                    ) : (
                      <a
                        onClick={() => confirm(location.productId)}
                        className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                      >
                        Confirm
                      </a>
                    )}
                  </td>
                  <td className="flex items-center px-4 py-2 space-x-2 sm:text-xs">
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded ${currentPage === page ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
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
