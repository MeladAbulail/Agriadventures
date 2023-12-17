import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageTable() {
  const [messages, setMessages] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/Get_All_Messages';
    axios.get(apiUrl)
      .then(response => setMessages(response.data.messages))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

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
                  <th className="px-4 py-2">Actions</th>
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
                    <td className="px-4 py-2">
                      <a
                        onClick={() => deleteMessage(message.contactUsId)}
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
      </div>
    </div>
  );
}

export default MessageTable;