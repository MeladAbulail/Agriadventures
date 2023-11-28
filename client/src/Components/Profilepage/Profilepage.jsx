import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [cancelSettings, setCancelSettings] = useState(false);

  // Retrieve token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUserData(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [token]);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSaveClick = () => {
    axios
      .patch(
        'http://localhost:5000/users/updateUserData',
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          gender: userData.gender,
          email: userData.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        setConfirmationMessage('Data Updated');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      })
      .finally(() => {
        setEditing(false);
        setSettingsOpen(false);
      });
  };

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
    setCancelSettings(false);
  };

  const handleCancelSettingsClick = () => {
    setSettingsOpen(false);
    setCancelSettings(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setSettingsOpen(false);
    navigate('/');
  };

  const handleSettingsSaveClick = () => {
    if (cancelSettings) {
      setSettingsOpen(false);
      return;
    }

    if (passwordData.oldPassword !== userData.password) {
      console.error('Old password is incorrect.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.error('New password and confirm password do not match.');
      return;
    }

    axios
      .patch(
        'http://localhost:5000/users/updatePassword',
        { newPassword: passwordData.newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSettingsOpen(false);
        navigate('/profile');
      })
      .catch((error) => {
        console.error('Error updating password:', error);
      });
  };

  return (
    <div className="flex flex-col h-screen my-20 ml-2 mr-2 bg-gray-100 lg:flex-row lg:ml-10 lg:mr-32">
      {/* Left Section */}
      <div className="w-full p-6 bg-white border-b border-gray-300 lg:w-1/4 lg:border-r lg:h-full">
        {/* Profile Image */}
        <img
          src="https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png"
          alt="Profile"
          className="object-cover w-32 h-32 mx-auto mb-6 rounded-full"
        />

        {/* Navigation List */}
        <ul className="space-y-2">
          <li>
            <a
              href="/profile"
              className="block text-blue-500 hover:underline"
            >
              Profile
            </a>
          </li>
          <li>
            <button
              className="block text-blue-500 hover:underline focus:outline-none"
              onClick={handleSettingsClick}
            >
              Change Password
            </button>
          </li>
          <li>
            <a href="#" className="block text-blue-500 hover:underline">
              Order History
            </a>
          </li>
          <li>
            <a href="#" className="block text-blue-500 hover:underline">
              Activities
            </a>
          </li>
          <li>
            <a href="#" className="block text-red-500 hover:underline">
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-6 bg-white">
        {/* User Data */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">User Data</h2>
          {editing ? (
            // Content when editing is true
            <>
              <label className="block mb-2">
                First Name:
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300"
                />
              </label>
              <label className="block mb-2">
                Last Name:
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300"
                />
              </label>
              <label className="block mb-2">
                Gender:
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      gender: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="mb-2">
                <strong>First Name:</strong> {userData.firstName}
              </p>
              <p className="mb-2">
                <strong>Last Name:</strong> {userData.lastName}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="mb-2">
                <strong>Gender:</strong> {userData.gender}
              </p>
            </>
          )}
        </div>

        {/* Edit and Logout Buttons */}
        <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={handleEditClick}
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Settings Sidebar */}
      {settingsOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full p-6 bg-white border-r border-gray-300 lg:w-1/4">
            <h2 className="mb-4 text-2xl font-semibold">Change Password</h2>
            <label className="block mb-2">
              Old Password:
              <input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300"
              />
            </label>
            <label className="block mb-2">
              New Password:
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300"
              />
            </label>
            <label className="block mb-2">
              Confirm Password:
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300"
              />
            </label>
            <button
              className="px-4 py-2 mx-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleSettingsSaveClick}
            >
              Save
            </button>
            <button
              className="px-4 py-2 mx-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleCancelSettingsClick}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;