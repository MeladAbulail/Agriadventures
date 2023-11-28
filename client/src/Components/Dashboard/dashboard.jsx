import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000'; // Your local API endpoint
    axios.get(`${apiUrl}/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (userId) => {
    const apiUrl = 'http://localhost:5000';
    axios.delete(`${apiUrl}/users/${userId}`)
      .then(response => {
        if (response.status === 200) {
          setUsers(users.filter(user => user.id !== userId));
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  // Add, Edit, and other functions can be added as needed

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-800">
        {/* Sidebar content goes here */}
      </div>

      <div className="w-3/4 p-4">
        <div>
          <h2 className="mb-4 text-xl font-bold">Users</h2>
          <table className="min-w-full overflow-hidden border rounded-lg">
            <thead className="text-white bg-gray-800">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => deleteUser(user.id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
