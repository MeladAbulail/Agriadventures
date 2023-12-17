import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Signinpage() {
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

  const handleGoogleLogin = () => {
    // Redirect to the server route for Google authentication
    window.location.href = 'http://localhost:4000/auth/google';
  };

  const redirectToLanding = () => {
    window.location.href = '/';
  };

  const loginUrl = 'http://localhost:4000/Login';

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

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen px-4">
      <div className="w-full max-w-sm space-y-5 text-gray-600">
        <div className="pb-8 text-center">
          <div className="mt-5">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="****"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-2 text-gray-500 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                id="remember-me-checkbox"
                className="hidden checkbox-item peer"
              />
              <label
                htmlFor="remember-me-checkbox"
                className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
              ></label>
              <span>Remember me</span>
            </div>
            <a
              href="javascript:void(0)"
              className="text-center text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
          <button className="w-full px-4 py-2 font-medium text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-600">
            Sign in
          </button>
        </form>
        <div>
          <button onClick={handleGoogleLogin}> Login with Google </button>
        </div>
        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/Register">
            <a
              href="javascript:void(0)"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signinpage;