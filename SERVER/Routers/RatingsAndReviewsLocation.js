const express = require('express');
const Router = express.Router();
const RatingsAndReviewsLocation = require('../Controllers/RatingsAndReviewsLocation');
const { authorize } = require('../Middleware/Authorization');

Router.get('/Get_Ratings_And_Reviews_By_LocationId/:locationId', RatingsAndReviewsLocation.getRatingsAndReviewsByLocationId);
Router.get('/Get_Ratings_And_Reviews_By_UserId', authorize(["User", "Admin"]), RatingsAndReviewsLocation.getRatingAndReviewByUserId);
Router.post('/Add_Ratings_And_Reviews', authorize(["User", "Admin"]), RatingsAndReviewsLocation.addNewRatingAndReview);
Router.put('/Update_Ratings_And_Reviews/:ratingsAndReviewsLocationsId', RatingsAndReviewsLocation.updateRatingAndReview);
Router.delete('/Delete_Ratings_And_Reviews/:ratingsAndReviewsLocationsId', RatingsAndReviewsLocation.deleteRatingAndReview);

module.exports = Router;
