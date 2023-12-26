import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logo from './Logo.png';

function LoginPage({ setLoggedIn }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/Login_Admin', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Response from server:', response.data);
  
      if (response.data) {
        console.log('User authenticated successfully');
  
        // Save the token in cookies with a 1-hour expiration
        const token = response.data.token;
        const userId = response.data.userId;

        Cookies.set('token', token, { expires: 1 / 24 });
        Cookies.set('userId', userId, { expires: 1 / 24 });
  
        // Include the token in the request headers for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        // Update the login state
        setLoggedIn(true);
  
        // Navigate to DashboardCounter after successful login
        navigate('/DashboardCounter');
      } else {
        console.log('Invalid email or password');
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error signing in:', error.response);
    }
  };
  
  return (
    <div>
      <div className="bg-white ">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Dashboard
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Confirm that you are admin by logging in using your admin email
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src={Logo}
                    alt=""
                  ></img>
                </div>

                <p className="mt-3 text-gray-500">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleSignIn}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Password
                      </label>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                
              </div>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="fixed p-4 text-center text-red-800 transform -translate-x-1/2 -translate-y-1/2 bg-red-200 rounded-md top-1/2 left-1/2">
          {errorMessage}
        </div>
      )}

      {showPopup && (
        <div className="p-4 mt-4 bg-white rounded shadow-md">
          <p className="mb-4">You are not an admin and cannot log in</p>
          <button
            className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
        )}
    </div>
  );
}

export default LoginPage;