import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Registerpage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '', // New state for gender
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return Object.keys(errors).length === 0;
  };

  const redirectToLogin = () => {
    window.location.href = '/Signin'; // Assuming '/Signin' is the route for sign-in
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, ...formDataToSend } = formData;

      // Add createdAt and default updatedAt
      // formDataToSend.createdAt = new Date().toISOString();
      // formDataToSend.updatedAt = 'NOT UPDATED';

      try {
        const url = 'http://localhost:4000/Register';
        console.log('Sending request with data:', formDataToSend);

        const response = await axios.post(url, formDataToSend);
        console.log('User created successfully:', response.data);

        const token = response.data.token;
        const userId = response.data.userId;
  
        // Save the token and userId in cookies with a 1-hour expiration
        Cookies.set('token', token, { expires: 1 / 24 });
        Cookies.set('userId', userId, { expires: 1 / 24 });
        
        axios.defaults.headers.common['Authorization'] = token;

        setRegistrationSuccess(true);

        // Auto redirect after 3 seconds
        setTimeout(() => {
          redirectToLogin();
        }, 3000);
      } catch (error) {
        console.error('Error creating user:', error.message);
      }
    }
  };

  const closePopup = () => {
    setRegistrationSuccess(false);
    redirectToLogin(); // Redirect immediately if the user closes the popup manually
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen px-4 my-32">
      <div className="w-full max-w-sm space-y-5 text-gray-600">
        <div className="pb-8 text-center">
          <div className="mt-5">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Register New Account
            </h3>
          </div>
        </div>
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="font-medium">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-2 mb-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none b focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="font-medium">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-2 mb-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none b focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="font-medium">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="font-medium">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button className="w-full px-4 py-2 font-medium text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-600">
            Register
          </button>
        </form>
        {/* Popup for successful registration */}
        {registrationSuccess && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-transparent" onClick={closePopup}></div>
            <div className="p-5 bg-white rounded-md shadow-md">
              <p className="text-lg font-bold text-green-600">User Registered Successfully!</p>
              <p className="text-gray-600">Redirecting in 3 seconds...</p>
              <button
                onClick={closePopup}
                className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* ... (other UI elements) ... */}
      </div>
    </main>
  );
};

export default Registerpage;