import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialUserFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
};


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchUserEmail, setSearchUserEmail] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [userForm, setUserForm] = useState(initialUserFormState);
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  
  const ITEMS_PER_PAGE = 5;

  const redirectToHome = () => {
    navigate.push('/UsersTable');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCurrentPage(1);
        setTotalPages(1);
        const response = await axios.get(`http://localhost:4000/Get_All_Users_PAGINATION?page=${currentPage}`);
        setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
        setTotalPages(response.data.totalPages || Math.ceil(response.data.totalItems / response.data.itemsPerPage));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Get_All_Users_PAGINATION?page=${currentPage}`);
        setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
        setTotalPages(response.data.totalPages || Math.ceil(response.data.totalItems / response.data.itemsPerPage));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchData();
  }, [currentPage, userForm]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:4000/Delete_User_By_Id/${userId}`)
      .then(res => {
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
  
    axios.post("http://localhost:4000/Register", userForm)
      .then(response => {
        console.log('User added successfully:', response.data);
        setUsers(response.data.users);
        setUserForm(initialUserFormState); 
        setShowAddUserForm(false);
        redirectToHome()
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
  const currentUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      console.log('Changing to Previous Page:', currentPage - 1);
      handlePageChange(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      console.log('Changing to Next Page:', currentPage + 1);
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="w-full min-h-full p-4 mt-16 overflow-x-auto text-black ">
      <h1 className="mb-4 text-3xl font-bold">Users Table</h1>

      <div className="flex mb-4">
        <form className="w-90">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium sr-only"
          >
            Search
          </label>
          <div className="relative flex w-full">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-2 text-sm text-black border border-gray-300 rounded-lg xl:w-[600px] ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search User by Email"
              value={searchUserEmail}
              onChange={(e) => setSearchUserEmail(e.target.value)}
              required
            />
          </div>
        </form>

        <button
          type="button"
          className="w-16 px-4 py-2 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg w-30 hover:bg-green-800 focus:ring-4 focus:outline-none"
          onClick={toggleAddUserForm}
        >
          Add
        </button>
      </div>

      {showAddUserForm && (
        <div className="fixed p-6 text-black transform -translate-x-1/2 border border-green-500  bottom1/3  bg-white rounded-lg   animate__animated animate__backInRight min-w-[300px]">
          <h2 className="mb-4 text-2xl font-bold">Add User</h2>
          <div className="flex flex-row">
            <div className="flex flex-col mr-4">
              <div><label
                htmlFor="firstName"
                className="block text-sm font-medium text-black"
              >
                First Name:
              </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userForm.firstName}
                  onChange={(e) =>
                    setUserForm({ ...userForm, firstName: e.target.value })
                  }
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-black"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userForm.lastName}
                onChange={(e) =>
                  setUserForm({ ...userForm, lastName: e.target.value })
                }
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <label
            htmlFor="email"
            className="block mt-4 text-sm font-medium text-black"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />

          <label
            htmlFor="password"
            className="block mt-4 text-sm font-medium text-black"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userForm.password}
            onChange={(e) =>
              setUserForm({ ...userForm, password: e.target.value })
            }
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />

          <label
            htmlFor="confirmPassword"
            className="block mt-4 text-sm font-medium text-black"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userForm.confirmPassword}
            onChange={(e) =>
              setUserForm({ ...userForm, confirmPassword: e.target.value })
            }
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />

          <label
            htmlFor="gender"
            className="block mt-4 text-sm font-medium text-black"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={userForm.gender}
            onChange={(e) =>
              setUserForm({ ...userForm, gender: e.target.value })
            }
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
            className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-green-600"
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
                className="px-4 py-2 text-white sm:text-xs"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-white sm:text-xs"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-white sm:text-xs"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-white sm:text-xs"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-white sm:text-xs"
              >
                Action
              </th>
            </tr>
          </thead>
          {currentUsers.map((user, index) => (
            <tr
              key={user.userId}
              className={index % 2 === 0 ? "bg-[#e5e7eb]" : "bg-[#d1d5db]"}
            >
              {/* <tr key={user.userId} className={"bg-white text-black"}> */}
              <td className="text-center sm:text-xs">
                {user.userId}
              </td>
              <td className="text-center sm:text-xs">
                {user.firstName}
              </td>
              <td className="text-center sm:text-xs">
                {user.lastName}
              </td>
              <td className="text-center sm:text-xs">
                {user.email}
              </td>
              <td className="flex items-center space-x-2 sm:text-xs">
                <a
                  onClick={() => deleteUser(user.userId)}
                  className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </table>

        <div className="flex items-center justify-between mt-4">
  <div>
    <span className="text-lg font-semibold">
      Page {currentPage} of {totalPages}
    </span>
  </div>
  <div className="flex space-x-2">
    <button
      onClick={handlePrevPage}
      className={`px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600`}
    >
      Previous
    </button>
    {pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={`px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600 ${
          currentPage === number ? 'bg-blue-600' : ''
        }`}
      >
        {number}
      </button>
    ))}
    <button
      onClick={handleNextPage}
      className={`px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600`}
    >
      Next
    </button>
  </div>
</div>
    </div>
    </div>
  );
}

export default UserTable;