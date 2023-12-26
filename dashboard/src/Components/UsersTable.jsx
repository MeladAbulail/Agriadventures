import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
  const [bannedUsers, setBannedUsers] = useState([]);
  const [adminOrUser, setadminOrUser] = useState([]);
  
  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/Get_All_Users_PAGINATION?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
      console.log('Response data:', response.data);
      setUsers(response.data.users); 
      setBannedUsers(response.data.usersBan)
      setadminOrUser(response.data.admins)
      setTotalPages(Math.ceil(response.data.totalUsers / itemsPerPage));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
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

  const banUser = (userId) => {
    axios.put(`http://localhost:4000/Ban_User_By_Id/${userId}`)
      .then(res => {
        setBannedUsers([...bannedUsers, userId]); 
      })
      .catch(err => {
        console.log("Error banning user:", err);
      });
  };

  const unbanUser = (userId) => {
    axios.put(`http://localhost:4000/UnBan_User_By_Id/${userId}`)
    .then(res => {
      setBannedUsers(bannedUsers.filter(bannedUserId => bannedUserId !== userId));
    })
    .catch(err => {
      console.log("Error banning user:", err);
    });
  };

  const userToAdmin = (userId) => {
    axios.put(`http://localhost:4000/Make_User_Admin/${userId}`)
      .then(res => {
        setadminOrUser([...adminOrUser, userId]); 
      })
      .catch(err => {
        console.log("Error adminOrUser user:", err);
      });
  };

  const adminToUser = (userId) => {
    axios.put(`http://localhost:4000/Make_Admin_User/${userId}`)
    .then(res => {
      setadminOrUser(adminOrUser.filter(adminOrUserId => adminOrUserId !== userId));
    })
    .catch(err => {
      console.log("Error adminOrUser user:", err);
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
        setUsers((prevUsers) => [...prevUsers, response.data.user]); 
        setUserForm(initialUserFormState);
        setShowAddUserForm(false);
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const toggleAddUserForm = () => {
    setShowAddUserForm(!showAddUserForm);
  };

  const filteredUsers = users
  ? users.filter((user) => user && user.email && user.email.toLowerCase().includes(searchUserEmail.toLowerCase()))
  : [];

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
                User Delete
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-white sm:text-xs"
              >
                User Role
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-white sm:text-xs"
              >
                User Block
              </th>
            </tr>
          </thead>
          {filteredUsers.map((user, index) => (
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
              {adminOrUser.includes(user.userId) ? (
                <td className="text-center sm:text-xs">
                  <a
                    onClick={() => adminToUser(user.userId)}
                    className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                  >
                    Admin
                  </a>
                </td>
              ) : (
                <td className="text-center sm:text-xs">
                  <a
                    onClick={() => userToAdmin(user.userId)}
                    className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                  >
                    User
                  </a>
                </td>
              )}
              {bannedUsers.includes(user.userId) ? (
                <td className="text-center sm:text-xs">
                  <a
                    onClick={() => unbanUser(user.userId)}
                    className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                  >
                    Unban
                  </a>
                </td>
              ) : (
                <td className="text-center sm:text-xs">
                  <a
                    onClick={() => banUser(user.userId)}
                    className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                  >
                    Ban
                  </a>
                </td>
              )}
            </tr>
          ))}
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
  );
}

export default UserTable;