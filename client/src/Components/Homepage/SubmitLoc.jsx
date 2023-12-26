import React, { useState } from 'react';
import Cookies from 'js-cookie';

const SubmitLoc = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddLocationClick = () => {
    const token = Cookies.get('token');

    if (!token) {
      setShowPopup(true);
    } else {
      window.location.href = './AddPlace';
    }
  };

  const handleAddProductClick = () => {
    const token = Cookies.get('token');

    if (!token) {
      setShowPopup(true);
    } else {
      window.location.href = './AddProduct';
    }
  };

  const handleSignInClick = () => {
    window.location.href = './SignIn';
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  return (
    <section
      className="w-full py-8 bg-[#fcf9f3]"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1492185244344-91fde303149e?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container flex flex-col items-center mx-auto text-white">
        <p className="mb-4 text-lg">Know a place? Add it from here</p>
        <div className='flex flex-row '>
          <button
            className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleAddLocationClick}
          >
            Add Location
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleAddProductClick}
          >
            Add Product
          </button>
        </div>

        {showPopup && (
          <div className="p-4 mt-4 bg-white rounded shadow-md">
            <p className="mb-4 text-black">You need to sign in first</p>
            <button
              className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubmitLoc;