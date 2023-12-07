import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [searchUserEmail, setSearchUserEmail] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const initialUserFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
  };

  const [userForm, setUserForm] = useState(initialUserFormState);
  const [passwordMatchError, setPasswordMatchError] = useState('');

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/Get_All_Users';
    axios.get(apiUrl)
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (userId) => {
    const apiUrl = 'http://localhost:4000/Delete_User_By_Id';
    axios.delete(`${apiUrl}/${userId}`)
      .then(res => {
        console.log("Deleted:", res.data.users);
        setUsers(users.filter(user => user.userId !== userId));
      })
      .catch(err => {
        console.log("Error deleting user:", err);
      });
  };

  const addUser = () => {
    if (userForm.password !== userForm.confirmPassword) {
      setPasswordMatchError('Password and Confirm Password must match');
      return;
    }

    setPasswordMatchError('');

    const apiUrl = 'http://localhost:4000/Register';
    axios.post(apiUrl, userForm)
      .then(response => {
        console.log('User added successfully:', response.data);

        // Assuming the server returns the updated user list, update the state
        setUsers(response.data.users);

        // Clear the form after adding the user
        setUserForm(initialUserFormState);
        setShowAddUserForm(false);
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const toggleAddUserForm = () => {
    setShowAddUserForm(!showAddUserForm);
  };

  const filteredUsers = users ? users.filter((user) =>
    user.email && user.email.toLowerCase().includes(searchUserEmail.toLowerCase())
  ) : [];

  // Add state variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPage = Math.ceil(filteredUsers.length / usersPerPage);

  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  // Update the filteredUsers to display only the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="w-full min-h-full p-4 overflow-x-auto text-black ">
      <h1 className="mt-10 mb-4 text-5xl font-bold">Users</h1>

      <div className="flex mb-4">
        <form className="w-90">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">
            Search
          </label>
          <div className="relative flex w-full">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 text-sm text-black border border-gray-300 rounded-lg w-[600px] ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search User by Email"
              value={searchUserEmail}
              onChange={(e) => setSearchUserEmail(e.target.value)}
              required
            />
          </div>
        </form>

        <button
          type="button"
          className="w-16 px-4 py-2 ml-2 text-sm font-medium bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={toggleAddUserForm}
        >
          Add
        </button>
      </div>

      {showAddUserForm && (
        <div className="fixed p-6 text-black transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
          <h2 className="mb-4 text-2xl font-bold">Add User</h2>

          <label htmlFor="firstName" className="block text-sm font-medium text-black">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userForm.firstName}
            onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />

          <label htmlFor="lastName" className="block mt-4 text-sm font-medium text-black">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userForm.lastName}
            onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />

          <label htmlFor="email" className="block mt-4 text-sm font-medium text-black">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />

          <label htmlFor="password" className="block mt-4 text-sm font-medium text-black">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userForm.password}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />

          <label htmlFor="confirmPassword" className="block mt-4 text-sm font-medium text-black">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userForm.confirmPassword}
            onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />

          <label htmlFor="gender" className="block mt-4 text-sm font-medium text-black">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={userForm.gender}
            onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {passwordMatchError && (
            <p className="mt-2 text-red-500">{passwordMatchError}</p>
          )}

          <button
            type="button"
            onClick={addUser}
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add User
          </button>

          <button
            type="button"
            onClick={() => {
              setUserForm(initialUserFormState);
              toggleAddUserForm();
            }}
            className="px-4 py-2 mt-4 ml-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
      <table className="min-w-full text-black divide-y divide-gray-200">
          <thead className="bg-gray-600">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-center uppercase"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-center uppercase"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-center uppercase"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-center uppercase"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-center uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          {currentUsers.map((user, index) => (
            // <tr key={user.userId} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}> changed to another 
            <tr key={user.userId} className={"bg-white text-black"}>
              <td className="px-4 py-2 text-xs text-center sm:text-lg">{user.userId}</td>
              <td className="px-4 py-2 text-xs text-center sm:text-lg">{user.firstName}</td>
              <td className="px-4 py-2 text-xs text-center sm:text-lg">{user.lastName}</td>
              <td className="px-4 py-2 text-xs text-center sm:text-lg">{user.email}</td>
              <td className="flex items-center px-4 py-2 space-x-2 sm:text-xs">
                <a
                  onClick={() => deleteUser(user.userId)}
                  className="w-full p-3 text-center text-red-500 rounded-full hover:text-red-600"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </table>
        
        {/* Pagination component */}
        <nav aria-label="Page navigation example">
          <ul className="flex items-center h-8 -space-x-px text-sm">
            <li>
              <button
                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
              </button>
            </li>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                  number === currentPage
                    ? 'border-blue-500 bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                {number}
              </button>
            ))}
            <li>
              <button
                onClick={() => setCurrentPage(currentPage < totalPage ? currentPage + 1 : totalPage)}
                className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserTable;