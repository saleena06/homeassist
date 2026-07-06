const { ServiceRequest, User, Provider,Mybookings } = require("../models");
const getPagination = require('../utils/pagination');
exports.getPaginatedRequests = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req);

    const requests = await ServiceRequest.findAndCountAll({
      limit,
      offset,
      include: [User, Provider],
    });

    res.status(200).json({
      success: true,
      totalRecords: requests.count,
      currentPage: page,
      totalPages: Math.ceil(requests.count / limit),
      data: requests.rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// exports.createRequest = async (req, res) => {
//   try {
//     const request = await ServiceRequest.create(req.body);

//     res.status(201).json(request);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
exports.createRequest = async (req, res) => {
  try {
    const {
      user_id,
      provider_id,
      date,
      description,
    } = req.body;

    const request = await ServiceRequest.create({
      user_id,
      provider_id,
      date,
      description,
      status: "Pending",
    });
    await Mybookings.create({
      customer_id: user_id,
      provider_id: provider_id,
      service: description,
      booking_date: date,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Booking request created successfully.",
      data: request,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.findAll({
      include: [User, Provider],
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const request = await ServiceRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    await request.update({
      status: req.body.status,
    });
    await Mybookings.update(
      {
        status:
          req.body.status.charAt(0).toUpperCase() +
          req.body.status.slice(1),
      },
      {
        where: {
          customer_id: request.user_id,
          provider_id: request.provider_id,
          booking_date: request.date,
        },
      }
    );

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
