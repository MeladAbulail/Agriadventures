import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const [visitHistory, setVisitHistory] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    password: '',
    image: '', 
  });

  useEffect(() => {
    const token = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Get_User_By_Id', config);
        setUserData(response.data.user);
        console.log(response.data.user)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Get_Order_By_userId`, config);
        setOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    const fetchVisitHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Get_Reservations_By_UserId`, config);
        setVisitHistory(response.data);
      } catch (error) {
        console.error('Error fetching visit history:', error);
      }
    };

    fetchUserData();
    fetchOrderHistory();
    fetchVisitHistory();
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Get_User_By_Id', config);
        setUserData(response.data.user);
        console.log(response.data.user)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userData.image_url, userData.firstName, userData.lastName, userData.gender]);

  const handleEditClick = () => {
    setEditing(!editing);
    setEditedUserData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender || '',
      password: '',
      image: userData.image_url || '',
      email: userData.email,
    });
  };

  const handleInputChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'file' ? e.target.files[0] : e.target.value;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  

  const handleSaveClick = async () => {

    try {
      const formData = new FormData();
      Object.entries(editedUserData).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      console.log('Before axios.put - formData:', formData);
      const response = await axios.put(`http://localhost:4000/Update_User_By_Id`, formData, config);
      console.log(config)
      console.log('After axios.put - response:', response);
  
      if (response.status === 200) {
        // Update userData with the edited data
        setUserData(response.data.User);
        // Close the form
        setEditing(false);
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col min-h-screen mx-2 my-20 text-gray-800 bg-white lg:flex-row">
      {/* Left Section */}
      <div className="hidden p-6 lg:w-1/4 lg:block">
      <img
        src={userData.imageUrl}
        alt={userData.firstName}
        className="object-cover w-32 h-32 mx-auto mb-6 rounded-full"
      />
        <ul className="space-y-2">
          <li>
            <button
              className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-2 overflow-hidden">
        {/* User Data */}
        <div className="p-2 mb-2 overflow-x-auto bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-2 text-2xl font-semibold">Personal Information</h2>
          {Object.keys(userData).length > 0 ? (
            editing ? (
              <div className="flex flex-col space-y-4">
                <label className="flex flex-col">
                  <span className="text-gray-700">First Name</span>
                  <input
                    type="text"
                    name="firstName"
                    value={editedUserData.firstName}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-gray-700">Last Name</span>
                  <input
                    type="text"
                    name="lastName"
                    value={editedUserData.lastName}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-gray-700">Password</span>
                  <input
                    type="password"
                    name="password"
                    value={editedUserData.password}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-gray-700">Gender</span>
                  <select
                    name="gender"
                    value={editedUserData.gender}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md focus:outline-none focus:border-indigo-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
                <label className="flex flex-col">
                  <span className="text-gray-700">Image</span>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleInputChange}
                    className="p-2 border rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </label>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <p>
                  <span className="font-semibold text-gray-700">First Name:</span>{" "}
                  {userData.firstName}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Last Name:</span>{" "}
                  {userData.lastName}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Gender:</span>{" "}
                  {userData.gender || "Not specified"}
                </p>
                {/* Assuming there is an email property in userData */}
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  {userData.email}
                </p>
              </div>
            )
          ) : (
            <p>Loading user data...</p>
          )}
          <div className="flex mt-2 space-x-2">
            <button
              className={`px-2 py-1 text-white ${
                editing ? "bg-red-500" : "bg-indigo-500"
              } rounded focus:outline-none`}
              onClick={handleEditClick}
            >
              {editing ? "Cancel" : "Edit"}
            </button>
            {editing && (
              <button
                className="px-2 py-1 text-white bg-green-500 rounded focus:outline-none"
                onClick={handleSaveClick}
              >
                Save Edit
              </button>
            )}
          </div>
        </div>

        {/* Order History Table */}
        <div className="p-2 mb-2 overflow-x-auto text-gray-800 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-2 text-2xl font-semibold">Order History</h2>
          <table className="w-full bg-white border border-collapse border-gray-300 table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Order ID</th>
                {/* <th className="p-2 border">Product</th>
                <th className="p-2 border">Quantity</th> */}
                <th className="p-2 border">Total Price</th>
                <th className="p-2 border">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 border">{order.orderId}</td>
                  {/* Replace 'product' with the actual property name in your data */}
                  {/* <td className="p-2 border">{order.productName}</td>
                  <td className="p-2 border">{order.quantity}</td> */}
                  <td className="p-2 border">${order.totalPrice}</td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  {/* .toFixed(2) */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visit History Table */}
        <div className="p-2 mb-2 overflow-x-auto text-gray-800 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-2 text-2xl font-semibold">Visit History</h2>
          <table className="w-full bg-white border border-collapse border-gray-300 table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Visit ID</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Number Of Visitors</th>
                <th className="p-2 border">Visit Date</th>
              </tr>
            </thead>
            <tbody>
              {visitHistory.map((visit) => (
                <tr key={visit.id}>
                  <td className="p-2 border">{visit.reservationId}</td>
                  <td className="p-2 border">{visit.locationName}</td>
                  <td className="p-2 border">{visit.price}</td>
                  <td className="p-2 border">{visit.numberOfVisitors}</td>
                  <td className="p-2 border">
                    {new Date(visit.visitDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Logout Button */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
