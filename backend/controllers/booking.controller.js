const db = require("../models");
const Booking = db.Mybookings;


// ==========================
// Create Booking
// ==========================
exports.createBooking = async (req, res) => {
  try {
    const { provider_id, service, booking_date } = req.body;

    if (!provider_id || !service || !booking_date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const booking = await Booking.create({
      customer_id: req.user.id,
      provider_id,
      service,
      booking_date,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// ==========================
// Get All Bookings of Logged-in Customer
// ==========================
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        customer_id: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Get Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// ==========================
// Get Single Booking
// ==========================
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: {
        id: req.params.id,
        customer_id: req.user.id,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Get Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// ==========================
// Delete Booking
// ==========================
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: {
        id: req.params.id,
        customer_id: req.user.id,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    await booking.destroy();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};