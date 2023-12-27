import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

function OrdersTable() {
  const [orders, setorders] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [receivedOrNot, setreceivedOrNot] = useState([]);

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/Get_All_Orders_PAGINATION?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
      console.log('Response data:', response.data);
      setorders(response.data.orders); 
      setTotalPages(Math.ceil(response.data.totalFqa / itemsPerPage));
      setreceivedOrNot(response.data.ordersReceived);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const deleteOrder = (orderId) => {
    Swal.fire({
      title: "Are You Sure",
      text: "Deleting the order.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const apiUrl = 'http://localhost:4000/Delete_Order';
          await axios.delete(`${apiUrl}/${orderId}`);
          setorders(orders.filter(message => message.orderId !== orderId));
  
          console.log('Deletion success');
          Swal.fire({
            title: 'Success!',
            text: 'The order has been deleted successfully.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Deletion error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete the order. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };
  

  const received = (orderId) => {
    Swal.fire({
      title: "Are You Sure",
      text: "Marking the order as received.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark it as received!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:4000/Update_Order_Received/${orderId}`);
          setreceivedOrNot([...receivedOrNot, orderId]);
  
          console.log('Marked as received successfully');
          Swal.fire({
            title: 'Success!',
            text: 'The order has been marked as received successfully.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Marking as received error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to mark the order as received. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };
  
  const notReceived = (orderId) => {
    Swal.fire({
      title: "Are You Sure",
      text: "Marking the order as not received.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark it as not received!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:4000/Update_Order_Not_Received/${orderId}`);
          setreceivedOrNot(receivedOrNot.filter(receivedOrNotId => receivedOrNotId !== orderId));
  
          console.log('Marked as not received successfully');
          Swal.fire({
            title: 'Success!',
            text: 'The order has been marked as not received successfully.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Marking as not received error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to mark the order as not received. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };
  

  const filteredOrders = orders.filter((message) =>
    message.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full mt-16">
      <div className="flex flex-col ">
        <div className="p-4 ">
          <div>
            <h2 className="mb-4 text-xl font-bold">orders</h2>
            <table className="min-w-full border rounded-lg table-fixed">
              <thead className="text-white bg-gray-600">
                <tr>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2 w-80">Card holder</th>
                  <th className="px-4 py-2">Delete</th>
                  <th className="px-4 py-2">Received</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((message) => (
                  <tr key={message.orderId} className={message.orderId % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}>
                    <td className="px-4 py-2 text-center sm:text-xs">{message.email}</td>
                    <td className="px-4 py-2 text-center sm:text-xs">
                      ${(message.totalPrice).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center sm:text-xs">{message.address}</td>
                    <td className="px-4 py-2 text-center break-all sm:text-xs">{message.cardholder}</td>
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => deleteOrder(message.orderId)}
                        className="cursor-pointer w-full p-3 text-center text-red-500 rounded-full sm:text-xs hover:text-red-600"
                      >
                        Delete
                      </a>
                    </td>
                    {receivedOrNot.includes(message.orderId) ? (
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => notReceived(message.orderId)}
                        className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                      >
                        Received
                      </a>
                    </td>
                  ) : (
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => received(message.orderId)}
                        className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                      >
                        Not Received
                      </a>
                    </td>
                  )}
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
      </div>
    </div>
  );
}

export default OrdersTable;