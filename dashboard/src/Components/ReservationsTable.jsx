import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

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
    Swal.fire({
      title: "Are You Sure",
      text: "Deleting the reservation.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const apiUrl = 'http://localhost:4000/Delete_Reservations';
          await axios.delete(`${apiUrl}/${reservationId}`);
  
          setReservations(reservations.filter(reservation => reservation.reservationId !== reservationId));
  
          console.log('Deletion success');
          Swal.fire({
            title: 'Success!',
            text: 'The reservation has been deleted successfully.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Deletion error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete the reservation. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };
  

  const complete = (reservationId) => {
    Swal.fire({
      title: "Are You Sure",
      text: "Marking the reservation as complete.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, mark it as complete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:4000/Update_Reservations_Complete/${reservationId}`);
          setcompleteOrIncomplete([...completeOrIncomplete, reservationId]);
  
          console.log('Marking as complete success');
          Swal.fire({
            title: 'Success!',
            text: 'The reservation has been marked as complete successfully.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Marking as complete error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to mark the reservation as complete. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };
  

  const incomplete = (reservationId) => {
    Swal.fire({
      title: "Are You Sure",
      text: "Marking the reservation as incomplete.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, mark it as incomplete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:4000/Update_Reservations_In_Complete/${reservationId}`);
          setcompleteOrIncomplete(completeOrIncomplete.filter(completeOrIncompleteId => completeOrIncompleteId !== reservationId));
  
          console.log('Marking as incomplete success');
          Swal.fire({
            title: 'Success!',
            text: 'The reservation has been marked as incomplete successfully.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Marking as incomplete error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to mark the reservation as incomplete. Please try again.',
            icon: 'error',
          });
        }
      }
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
                  <th className="px-4 py-2">Delete</th>
                  <th className="px-4 py-2">Complete</th>
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