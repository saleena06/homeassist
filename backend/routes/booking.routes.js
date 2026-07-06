const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// router.post("/", authMiddleware, bookingController.createBooking);

router.get("/", authMiddleware, bookingController.getMyBookings);

router.get("/:id", authMiddleware, bookingController.getBookingById);

router.delete("/:id", authMiddleware, bookingController.deleteBooking);

module.exports = router;