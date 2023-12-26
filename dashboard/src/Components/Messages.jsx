import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageTable() {
  const [messages, setMessages] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [readabilityMessage, setReadabilityMessage] = useState([])

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
      const response = await axios.get(`http://localhost:4000/Get_All_Messages_PAGINATION?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
      console.log('Response data:', response.data);
      setMessages(response.data.messages); 
      console.log(response.data.messages);
      setTotalPages(Math.ceil(response.data.totalMessages / itemsPerPage));
      setReadabilityMessage(response.data.messagesReadable);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Messages:', error);
      setLoading(false);
    }
  };
  
  const deleteMessage = (contactUsId) => {
    const apiUrl = 'http://localhost:4000/Delete_By_Id';
    axios.delete(`${apiUrl}/${contactUsId}`)
      .then(response => {
        if (response.status === 200) {
          setMessages(messages.filter(message => message.contactUsId !== contactUsId));
        }
      })
      .catch(error => console.error('Error deleting message:', error));
  };

  const readabilityMessages = (contactUsId) => {
    axios.put(`http://localhost:4000/Update_Message_Readability/${contactUsId}`)
    .then(res => {
      setReadabilityMessage([...readabilityMessage, contactUsId]);
    })
    .catch(err => {
      console.log("Error Readability Message:", err);
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const notReadabilityMessage = (contactUsId) => {
    axios.put(`http://localhost:4000/Update_Message_Not_Readability/${contactUsId}`)
    .then(res => {
      setReadabilityMessage(readabilityMessage.filter(readabilityMessageId => readabilityMessageId !== contactUsId));
    })
    .catch(err => {
      console.log("Error Readability Message:", err);
    });
  };

  const filteredMessages = messages.filter((message) =>
    message.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full mt-16">
      <div className="flex flex-col ">
        <div className="p-4 ">
          <div>
            <h2 className="mb-4 text-xl font-bold">Messages</h2>
            <table className="min-w-full border rounded-lg table-fixed">
              <thead className="text-white bg-gray-600">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2 w-80">Message</th>
                  <th className="px-4 py-2">Message Delete</th>
                  <th className="px-4 py-2">Message Readable</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message.contactUsId} className={message.contactUsId % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}>
                    <td className="px-4 py-2 text-center sm:text-xs">{message.contactUsId}</td>
                    <td className="px-4 py-2 text-center sm:text-xs">
                      {message.username}
                    </td>
                    <td className="px-4 py-2 text-center sm:text-xs">{message.email}</td>
                    <td className="px-4 py-2 text-center break-all sm:text-xs">{message.message}</td>
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => deleteMessage(message.contactUsId)}
                        className="cursor-pointer w-full p-3 text-center text-red-500 rounded-full sm:text-xs hover:text-red-600"
                      >
                        Delete
                      </a>
                    </td>
                    {readabilityMessage.includes(message.contactUsId) ? (
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => notReadabilityMessage(message.contactUsId)}
                        className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                      >
                        Readable
                      </a>
                    </td>
                  ) : (
                    <td className="text-center sm:text-xs">
                      <a
                        onClick={() => readabilityMessages(message.contactUsId)}
                        className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                      >
                        Not Readable
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

export default MessageTable;