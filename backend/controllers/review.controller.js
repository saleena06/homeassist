const { Review, User, Provider } = require("../models");
const getPagination = require('../utils/pagination');
exports.getPaginatedReviews = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req);

    const reviews = await Review.findAndCountAll({
      limit,
      offset,
      include: [User, Provider],
    });

    res.status(200).json({
      success: true,
      totalRecords: reviews.count,
      currentPage: page,
      totalPages: Math.ceil(reviews.count / limit),
      data: reviews.rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [User, Provider],
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await review.destroy();

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
