import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Signinpage() {
  const loginUrl = 'http://localhost:4000/Login';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(loginUrl, {
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

        redirectToLanding();
      } else {
        console.log('Invalid email or password');
      }
    } catch (error) {
      console.error('Error signing in:', error.response);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  const redirectToLanding = () => {
    window.location.href = '/';
  };


  return (
    <section>
      <div className="flex items-stretch min-h-screen text-[#224229] bg-[#fcf9f3]">
        {/* Left Section */}
        <div className="relative items-center hidden w-1/2 bg-gray-500 bg-no-repeat bg-cover lg:flex" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
          <div className="z-10 w-full px-24">
            <h1 className="text-5xl font-bold tracking-wide text-left text-[#fcf9f3]">Keep it special</h1>
            <p className="my-4 text-3xl text-[#fcf9f3]">Capture your personal memory in a unique way, anywhere.</p>
          </div>
          {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-4 text-center">
            <span>
              <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
            </span>
            <span>
              <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
            </span>
            <span>
              <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </span>
          </div> */}
        </div>

        {/* Right Section */}
        <div className="w-full px-6 py-16 mx-auto my-auto lg:w-1/2">
          <div className="max-w-md mx-auto">
            <h2 className="mb-8 text-3xl font-bold text-gray-800">Login to your account</h2>
            <form>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input  type="email" id="email" name="email" autoComplete="email" required className="w-full p-3 mt-1 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password" name="password" autoComplete="current-password" required className="w-full p-3 mt-1 border border-gray-300 rounded-md" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <input type="checkbox" id="remember-me" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">Remember me</label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                </div>
              </div>

              <div className="mt-6">
                <button type="submit" className="w-full p-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signinpage;