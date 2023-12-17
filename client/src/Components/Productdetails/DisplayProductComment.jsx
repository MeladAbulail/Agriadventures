import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function DisplayActivityComment() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleComments, setVisibleComments] = useState(5);
  const { productId } = useParams();
  const [editingComment, setEditingComment] = useState(null);

  const token = Cookies.get("token");
  const userId = parseInt(Cookies.get("userId"));

  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Get_Ratings_And_Reviews_By_ProductId/${productId}`, config);
        setComments(response.data.ratingsAndReviews)

      } catch (error) {
        console.error('Error fetching comments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);



  const handleShowMore = () => {
    setVisibleComments((prevVisible) => prevVisible + 5);
  };

  const handleEditComment = (comment) => {
    setEditingComment({ ...comment });
  };

  if (loading) {
    return <div className="mt-8 text-center">Loading comments...</div>;
  }

  const handleDeleteComment = async (ratingsAndReviewsProductId) => {
    try {
      await axios.delete(`http://localhost:4000/Delete_Ratings_And_Reviews_Product/${ratingsAndReviewsProductId}`);
      setComments((prevComments) => prevComments.filter((comment) => comment.ratingAndReview !== ratingsAndReviewsProductId));
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      await axios.put(`http://localhost:4000/Update_Ratings_And_Reviews_Product/${editingComment.ratingsAndReviewsProductId}`, {
        rating: editingComment.rating,
        comment: editingComment.comment,
      });

      // Update the local state with the edited comment
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.ratingsAndReviewsProductId === editingComment.ratingsAndReviewsProductId ? { ...comment, ...editingComment } : comment
        )
      );

      // Reset the editing state
      setEditingComment(null);
    } catch (error) {
      console.error('Error updating comment', error);
    }
  };

  return (
    <div className="p-8 mt-8 bg-gray-100 rounded shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Comments</h2>

      {comments.length === 0 ? (
        <p>No comments available for this activity.</p>
      ) : (
        <div>
          <ul>
            {comments.slice(0, visibleComments).map((comment) => (
              <li key={comment.ratingsAndReviewsProductId} className="p-4 mb-4 bg-white rounded shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Add the image here */}
                    <img
                      src={comment.imageUrl}  
                      alt={`${comment.firstNAme}'s profile`}
                      className="mr-4 rounded-full"
                      width={80}
                      height={80}
                    />
                    
                    <div>
                      <p className="mb-2 font-bold">{comment.userName}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5).keys()].map((index) => (
                            <span
                              key={index}
                              className="mr-1 text-lg text-yellow-400 cursor-pointer"
                              onClick={() => setEditingComment((prev) => ({ ...prev, rating: index + 1 }))}
                            >
                              <FontAwesomeIcon
                                icon={faStar}
                                color={index < (editingComment?.ratingsAndReviewsProductId === comment.ratingsAndReviewsProductId ? editingComment.rating : comment.rating) ? '#FFD700' : '#D3D3D3'}
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                      {editingComment?.ratingsAndReviewsProductId === comment.ratingsAndReviewsProductId ? (
                        <div>
                          {/* Editing form */}
                          <textarea
                            value={editingComment.comment}
                            onChange={(e) => setEditingComment((prev) => ({ ...prev, comment: e.target.value }))}
                            className="w-full p-2 mb-2 border rounded"
                          ></textarea>
                          <div className="flex justify-end">
                            <button
                              className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                              onClick={handleUpdateComment}
                            >
                              Update
                            </button>
                            <button
                              className="px-4 py-2 text-gray-700 bg-gray-300 rounded"
                              onClick={() => setEditingComment(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mb-2">{comment.comment}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="mr-4 text-sm text-gray-500">{comment.postDate}</p>
                    {comment.userId === userId && (
                      <div className="flex space-x-2">
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleEditComment(comment)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </span>
                        <span
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDeleteComment(comment.ratingsAndReviewsProductId)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {visibleComments < comments.length && (
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded cursor-pointer"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default DisplayActivityComment;









