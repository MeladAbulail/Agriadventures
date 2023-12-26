import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReservationsTable() {
  const [reservations, setReservations] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [completeOrIncomplete, setcompleteOrIncomplete] = useState([])

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/Get_All_Reservations_PAGINATION?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
      console.log('Response data:', response.data);
      setReservations(response.data.reservations); 
      setTotalPages(Math.ceil(response.data.totalreservations / itemsPerPage));
      setcompleteOrIncomplete(response.data.reservationsComplete);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Reservations:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const deletereservation = (reservationId) => {
    const apiUrl = 'http://localhost:4000/Delete_Reservations';
    axios.delete(`${apiUrl}/${reservationId}`)
      .then(response => {
        if (response.status === 200) {
          setReservations(reservations.filter(reservation => reservation.reservationId !== reservationId));
        }
      })
      .catch(error => console.error('Error deleting reservation:', error));
  };

  const complete = (reservationId) => {
    axios.put(`http://localhost:4000/Update_Reservations_Complete/${reservationId}`)
    .then(res => {
      setcompleteOrIncomplete([...completeOrIncomplete, reservationId]);
    })
    .catch(err => {
      console.log("Error Readability reservation:", err);
    });
  };

  const incomplete = (reservationId) => {
    axios.put(`http://localhost:4000/Update_Reservations_In_Complete/${reservationId}`)
    .then(res => {
      setcompleteOrIncomplete(completeOrIncomplete.filter(completeOrIncompleteId => completeOrIncompleteId !== reservationId));
    })
    .catch(err => {
      console.log("Error Readability reservation:", err);
    });
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.locationName.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full mt-16">
      <div className="flex flex-col ">
        <div className="p-4 ">
          <div>
            <h2 className="mb-4 text-xl font-bold">Reservations</h2>
            <table className="min-w-full border rounded-lg table-fixed">
              <thead className="text-white bg-gray-600">
                <tr>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Number Of Visitors</th>
                  <th className="px-4 py-2">Location Name</th>
                  <th className="px-4 py-2 w-80">Price</th>
                  <th className="px-4 py-2">Reservation Delete</th>
                  <th className="px-4 py-2">Reservation Complete</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.reservationId} className={reservation.reservationId % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}>
                    <td className="px-4 py-2 text-center sm:text-xs">{reservation.email}</td>
                    <td className="px-4 py-2 text-center sm:text-xs">
                      {reservation.numberOfVisitors}
                    </td>
                    <td className="px-4 py-2 text-center sm:text-xs">{reservation.locationName}</td>
                    <td className="px-4 py-2 text-center break-all sm:text-xs">${reservation.price}</td>
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => deletereservation(reservation.reservationId)}
                        className="cursor-pointer w-full p-3 text-center text-red-500 rounded-full sm:text-xs hover:text-red-600"
                      >
                        Delete
                      </a>
                    </td>
                    {completeOrIncomplete.includes(reservation.reservationId) ? (
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => incomplete(reservation.reservationId)}
                        className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                      >
                        Complete
                      </a>
                    </td>
                  ) : (
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => complete(reservation.reservationId)}
                        className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                      >
                        Not Complete
                      </a>
                    </td>
                  )}
                  </tr>
                ))}
              </tbody>
            </table>
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

export default ReservationsTable;