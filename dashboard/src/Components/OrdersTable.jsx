import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const apiUrl = 'http://localhost:4000/Delete_Order';
    axios.delete(`${apiUrl}/${orderId}`)
      .then(response => {
        if (response.status === 200) {
          setorders(orders.filter(message => message.orderId !== orderId));
        }
      })
      .catch(error => console.error('Error deleting message:', error));
  };

  const received = (orderId) => {
    axios.put(`http://localhost:4000/Update_Order_Received/${orderId}`)
    .then(res => {
      setreceivedOrNot([...receivedOrNot, orderId]);
    })
    .catch(err => {
      console.log("Error Received Or Not Received Order:", err);
    });
  };

  const notReceived = (orderId) => {
    axios.put(`http://localhost:4000/Update_Order_Not_Received/${orderId}`)
    .then(res => {
      setreceivedOrNot(receivedOrNot.filter(receivedOrNotId => receivedOrNotId !== orderId));
    })
    .catch(err => {
      console.log("Error Received Or Not Received Order:", err);
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
                  <th className="px-4 py-2">order Delete</th>
                  <th className="px-4 py-2">Received Or Not</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((message) => (
                  <tr key={message.orderId} className={message.orderId % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}>
                    <td className="px-4 py-2 text-center sm:text-xs">{message.email}</td>
                    <td className="px-4 py-2 text-center sm:text-xs">
                      ${message.totalPrice}
                    </td>
                    <td className="px-4 py-2 text-center sm:text-xs">{message.address}</td>
                    <td className="px-4 py-2 text-center break-all sm:text-xs">{message.cardholder}</td>
                    <td className="text-center sm:text-xs">
                      <a
                        // onClick={() => deleteOrder(message.orderId)}4444
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