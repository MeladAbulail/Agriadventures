const { Ratings_And_Reviews_Product, User, Cart, Products } = require('../Models/Tables');

//! Get all ratings and reviews According productId
const getRatingsAndReviewsByProduct = async (req, res) => {
  const productId = req.params.productId
  try {
    const ratingsAndReviews = await Ratings_And_Reviews_Product.findAll({
      where: { productId: productId, isDeleted: false }
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
    const ratingAndReview = await Ratings_And_Reviews_Product.findAll({
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
  try {
    const { productId, productName, comment, rating, postDate } = req.body;
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "You must log in first" });
    }

    const cart = await Cart.findOne({
      where: { userId: userId, productId: productId },
    });

    if (!cart) {
      return res.status(400).json({ success: false, message: "You have not visited the place yet and cannot rate or comment" });
    }

    const userData = await User.findByPk(userId);

    const newRatingAndReview = await Ratings_And_Reviews_Product.create({
      productId,
      userId,
      productName,
      comment,
      rating,
      postDate,
      imageUrl: userData.imageUrl,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });

    const products = await Products.findByPk(productId);

    const numberOfResidents = (( products.numberOfResidents) + 1)
    const totalStars = products.totalStars + rating;
    const evaluation = (totalStars / numberOfResidents).toFixed(1)

    await products.update({ evaluation: evaluation, numberOfResidents: numberOfResidents, totalStars: totalStars });

    await products.save();

    res.status(200).json({
      success: true,
      message: "New Rating And Review Retrieved Successfully",
      newRatingAndReview: newRatingAndReview,
    });
  } catch (error) {
    console.error('An error occurred while adding new ratings and reviews:', error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding new ratings and reviews",
      error: error.message,
    });
  }
};


//! Update rating and review
const updateRatingAndReview = async (req, res) => {
  const ratingsAndReviewsProductId = req.params.ratingsAndReviewsProductId;
  const { comment, rating } = req.body; // Assuming comment and rating are part of the request body

  try {
    const updateRatingAndReview = await Ratings_And_Reviews_Product.findByPk(ratingsAndReviewsProductId);

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
  const ratingsAndReviewsProductId = req.params.ratingsAndReviewsProductId;
  try {
    const ratingAndReview = await Ratings_And_Reviews_Product.findByPk(ratingsAndReviewsProductId);
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
  getRatingsAndReviewsByProduct,
  getRatingAndReviewByUserId,
  addNewRatingAndReview,
  updateRatingAndReview,
  deleteRatingAndReview,
};
