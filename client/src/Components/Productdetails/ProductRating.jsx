import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

function ProductRating({ productId, productName }) {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const getCurrentDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const token = Cookies.get("token");

  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  const submitRating = async () => {
    try {
      setLoading(true);
  
      if (!token) {
        setPopupVisibility(true);
        return;
      }
  
      const postDate = getCurrentDate();
      console.log(postDate)
  
      const response = await axios.post('http://localhost:4000/Add_Ratings_And_Reviews_Product', 
      {
        productId: productId,
        productName: productName,
        rating: rating,
        comment: comment,
        postDate: postDate,
      }, config);
  
      console.log('Rating submitted successfully', response.data);
  
      setRating(4);
      setComment('');
    } catch (error) {
      console.error('Error submitting rating', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePopupClose = () => {
    setPopupVisibility(false);
  };

  return (
    <div className="max-w-md p-4 mx-auto ">
      <h1 className="w-full mb-4 text-2xl font-semibold">Submit a Rating</h1>
      <div className="flex items-center mb-4 space-x-2">
        <label className="text-sm font-bold text-gray-700">Rating</label>
        <div className="rating rating-lg">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className="text-2xl text-yellow-400 cursor-pointer"
              onClick={() => handleRatingChange(value)}
            >
              <FontAwesomeIcon icon={faStar} color={value <= rating ? '#FFD700' : '#D3D3D3'} />
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="comment">
          Comment
        </label>
        <textarea
          id="comment"
          className="w-full p-2 border rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        className="p-2 text-white bg-blue-500 rounded"
        onClick={submitRating}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Rating'}
      </button>

      {isPopupVisible && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded shadow-md">
            <p className="mb-4">Please login to comment.</p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                onClick={() => {
                  window.location.href = '/Signin';
                }}
              >
                Go to Sign in
              </button>
              <button
                className="px-4 py-2 text-gray-700 bg-gray-300 rounded"
                onClick={handlePopupClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductRating;