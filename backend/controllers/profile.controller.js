const { User, Provider, ServiceType } = require("../models");

// User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Provider Profile
const getProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.user.id, {
      include: [
        {
          model: ServiceType,
          attributes: ["service_name"],
        },
      ],
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    return res.status(200).json({
      success: true,
      provider: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        city: provider.city,
        address: provider.address,
        experience: provider.experience_years,
       service_type: provider.ServiceType?.service_name,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
  getProviderProfile,
};