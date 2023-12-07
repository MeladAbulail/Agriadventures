const { Ratings_And_Reviews, User, Reservation } = require('../Models/Tables');

//! Get all ratings and reviews According locationId
const getRatingsAndReviewsByLocationId = async (req, res) => {
  const locationId = req.params.locationId
  try {
    const ratingsAndReviews = await Ratings_And_Reviews.findAll({
      where: { locationId: locationId, isDeleted: false }
    });
    res.json({
      success: true,
      Message: "Ratings And Reviews Retrieved Successfully",
      ratingsAndReviews: ratingsAndReviews
    });
  } catch (error) {
    console.error('An error occurred while fetching Ratings And Reviews:', error);
    res.status(500).json({
      success: false,
      Message: "An error occurred while fetching Ratings And Reviews",
      Error: message.error
    });
  }
};

//! Get rating and review by UserId
const getRatingAndReviewByUserId = async (req, res) => {
  const userId = req.user.userId
  if(!userId) {
    return "You Must Log In First"
  }
  try {
    const ratingAndReview = await Ratings_And_Reviews.findAll({
      where: { userId: userId, isDeleted: false }
    });
    res.json({
      success: true,
      Message: "Rating And Review According By UserId Retrieved Successfully",
      ratingAndReview: ratingAndReview
    });
  } catch (error) {
    console.error('An error occurred while Fetching Ratings And Reviews By UserId:', error);
    res.status(500).json({
      success: false,
      Message: "An error occurred while Fetching Ratings And Reviews By UserId",
      Error: message.error
    });
  }
};

//! Add New Rating And Review
const addNewRatingAndReview = async (req, res) => {
  const { locationId, locationName, comment, rating, postDate } = req.body;
  const userId = req.user.userId;
  if(!userId) {
    return "You Must Log In First"
  }
  const reservation = await Reservation.findByPk(userId)
  if (!reservation) {
    return res.status(400).json({ 
      message: "You have not visited the place yet and cannot rate or comment", 
      reservation: reservation
    });
  }
  try {
    const userData = await User.findByPk(userId)
    const newRatingAndReview = await Ratings_And_Reviews.create({
      locationId,
      userId,
      locationName, 
      comment,
      rating,
      postDate,
      imageUrl:userData.imageUrl,
      firstName: userData.firstName,
      lastName: userData.lastName
    });
    res.status(200).json({
      success: true,
      Message: "New Rating And Review Retrieved Successfully",
      newRatingAndReview: newRatingAndReview
    });
  } catch (error) {
    console.error('An error occurred while Add New Ratings And Reviews:', error);
    res.status(500).json({
      Success: false,
      Message: "An error occurred while Add New Ratings And Reviews",
      Error: error.Message
    });
  }
};

//! Update rating and review
const updateRatingAndReview = async (req, res) => {
  const ratingsAndReviewsId = req.params.ratingsAndReviewsId;
  const { comment, rating } = req.body; // Assuming comment and rating are part of the request body

  try {
    const updateRatingAndReview = await Ratings_And_Reviews.findByPk(ratingsAndReviewsId);

    if (!updateRatingAndReview) {
      return res.status(404).json({ error: 'Rating and Review not found' });
    }

    //! Update the comment if provided
    if (comment) {
      updateRatingAndReview.comment = comment;
    }

    //! Update the rating if provided
    if (rating) {
      updateRatingAndReview.rating = rating;
    }

    //! Save the changes
    await updateRatingAndReview.save();

    res.status(200).json({
      success: true,
      message: "Rating and Review updated successfully",
      updatedRatingAndReview: updateRatingAndReview
    });
  } catch (error) {
    console.error('An error occurred while updating Rating and Review', error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating Rating and Review",
      error: error.message
    });
  }
};


//! Delete rating and review
const deleteRatingAndReview = async (req, res) => {
  const ratingsAndReviewsId = req.params.ratingsAndReviewsId;
  try {
    const ratingAndReview = await Ratings_And_Reviews.findByPk(ratingsAndReviewsId);
    if (!ratingAndReview) {
      return res.status(404).json({ error: 'Rating and Review not found' });
    }
    ratingAndReview.isDeleted = true
    await ratingAndReview.save();
    res.json({ 
      Success: true,
      message: 'Rating and Review deleted successfully',
      ratingAndReview: ratingAndReview
    });
  } catch (error) {
    console.error("An error occurred while deleted Rating and Review", error);
    res.status(500).json({
      Success: false,
      message: 'An error occurred while deleted Rating and Review',
      Error: message.error
    });
  }
};

module.exports = {
  getRatingsAndReviewsByLocationId,
  getRatingAndReviewByUserId,
  addNewRatingAndReview,
  updateRatingAndReview,
  deleteRatingAndReview,
};
