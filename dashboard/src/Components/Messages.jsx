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
    <div className="flex flex-col mt-32 ml-4 mr-20">
      <h1 className='my-10 text-4xl'> Messages</h1>
      <div className="overflow-x-auto bg-white p-1.5 w-full inline-block align-middle ">
        <div className="overflow-auto border rounded-lg">
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
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left uppercase"
                >
                  Message
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right uppercase"
                >
                  Delete
                </th>
              </tr>
            </thead>
            
              {filteredMessages.map((message) => (
                <tr key={message.contactUsId}>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    {message.contactUsId}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {message.email}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {message.message}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <button
                      onClick={() => deleteMessage(message.contactUsId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            
          </table>
        </div>
      </div>
    </div>
  );
}

export default MessageTable;
