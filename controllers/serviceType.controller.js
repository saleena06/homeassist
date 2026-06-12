const { ServiceType } = require("../models");

exports.createServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceType.create(req.body);

    res.status(201).json(serviceType);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceType.findAll();

    res.status(200).json(serviceTypes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
