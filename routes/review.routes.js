const express = require('express');
const router = express.Router();
const ReviewController =
require('../controllers/review.controller');
const authMiddleware =
require('../middlewares/auth.middleware');

router.post(
  '/',
  authMiddleware,
  ReviewController.createReview
);





router.get('/',authMiddleware, ReviewController.getAllReviews);

router.delete('/:id',authMiddleware, ReviewController.deleteReview);

module.exports = router;

