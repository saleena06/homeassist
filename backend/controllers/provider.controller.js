const { Provider, ServiceType ,ServiceRequest, User} = require("../models");
const getPagination = require('../utils/pagination');
exports.getPaginatedProviders = async (req, res) => {
  try {
    const { limit, offset, page } = getPagination(req);

    const providers = await Provider.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: ServiceType,
        },
      ],
    });

    res.status(200).json({
      totalRecords: providers.count,
      currentPage: page,
      totalPages: Math.ceil(providers.count / limit),
      data: providers.rows,
    });
    console.log(req.query);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.createProvider = async (req, res) => {
  try {
    const provider = await Provider.create(req.body);

    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllProviders = async (req, res) => {
  try {
    const { serviceid } = req.query;
  console.log("Received service query:", serviceid);
    // If no service is provided, return all providers
    if (!serviceid) {
      const providers = await Provider.findAll({
        include: [
          {
            model: ServiceType,
          },
        ],
      });

      return res.status(200).json(providers);
    }
   
   
    
    // Get providers of that service
    const providers = await Provider.findAll({
      where: {
        service_type_id: serviceid,
      },
      include: [
        {
          model: ServiceType,
        },
      ],
    });

    res.status(200).json(providers);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}; 

exports.getProviderBookings = async (req, res) => {
  try {
    const bookings = await ServiceRequest.findAll({
      where: {
        provider_id: req.user.id,
      },
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["date", "DESC"]],
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateBookingStatus = async (req, res) => {
  try {
    const request = await ServiceRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await request.update({
      status: req.body.status,
    });

    res.status(200).json({
      success: true,
      booking: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id, {
      include: [ServiceType],
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    await provider.update(req.body);

    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    await provider.destroy();

    res.status(200).json({
      message: "Provider deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
