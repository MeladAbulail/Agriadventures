const express = require('express');
const router = express.Router();
const ratingsAndReviewsController = require('../Controllers/ratingsAndReviewsController');
const { authorize } = require('../Middleware/authorization');

router.get('/Get_Ratings_And_Reviews_By_LocationId/:locationId', authorize("user"), ratingsAndReviewsController.getRatingsAndReviewsByLocationId);
router.get('/Get_Ratings_And_Reviews_By_UserId', authorize("user"), ratingsAndReviewsController.getRatingAndReviewByUserId);
router.post('/Add_Ratings_And_Reviews', authorize("user"), ratingsAndReviewsController.addNewRatingAndReview);
router.put('/Update_Ratings_And_Reviews/:ratingsAndReviewsId', ratingsAndReviewsController.updateRatingAndReview);
router.delete('/Delete_Ratings_And_Reviews/:ratingsAndReviewsId', ratingsAndReviewsController.deleteRatingAndReview);

module.exports = router;
