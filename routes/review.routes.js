const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/review.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const reviewSchema = require("../validations/review.validation");

router.post("/", validate(reviewSchema), ReviewController.createReview);

router.post(
  "/",
  validate(reviewSchema),
  authMiddleware,
  ReviewController.createReview
);

router.get(
  "/",
 // validate(reviewSchema),
  authMiddleware,
  ReviewController.getAllReviews
);
router.get(
    "/paginated",
    authMiddleware,
    ReviewController.getPaginatedReviews
);

router.delete(
  "/:id",
  validate(reviewSchema),
  authMiddleware,
  ReviewController.deleteReview
);

module.exports = router;
