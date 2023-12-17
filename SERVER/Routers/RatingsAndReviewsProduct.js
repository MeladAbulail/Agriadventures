const express = require('express');
const Router = express.Router();
const RatingsAndReviewsProduct = require('../Controllers/RatingsAndReviewsProduct');
const { authorize } = require('../Middleware/Authorization');

Router.get('/Get_Ratings_And_Reviews_By_ProductId/:productId', authorize(["user", "Admin"]), RatingsAndReviewsProduct.getRatingsAndReviewsByProduct);
Router.get('/Get_Ratings_And_Reviews_Product_By_UserId', authorize(["user", "Admin"]), RatingsAndReviewsProduct.getRatingAndReviewByUserId);
Router.post('/Add_Ratings_And_Reviews_Product', authorize(["user", "Admin"]), RatingsAndReviewsProduct.addNewRatingAndReview);
Router.put('/Update_Ratings_And_Reviews_Product/:ratingsAndReviewsProductId', RatingsAndReviewsProduct.updateRatingAndReview);
Router.delete('/Delete_Ratings_And_Reviews_Product/:ratingsAndReviewsProductId', RatingsAndReviewsProduct.deleteRatingAndReview);

module.exports = Router;
