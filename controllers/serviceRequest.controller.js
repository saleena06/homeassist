const {
    ServiceRequest,
    User,
    Provider
  } = require('../models');
  
  exports.createRequest = async (req, res) => {
    try {
  
      const request =
        await ServiceRequest.create(req.body);
  
      res.status(201).json(request);
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
  
  exports.getAllRequests = async (req, res) => {
    try {
  
      const requests =
        await ServiceRequest.findAll({
          include: [
            User,
            Provider
          ]
        });
  
      res.status(200).json(requests);
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
  
  exports.updateStatus = async (req, res) => {
    try {
  
      const request =
        await ServiceRequest.findByPk(req.params.id);
  
      if (!request) {
        return res.status(404).json({
          message: 'Request not found'
        });
      }
  
      await request.update({
        status: req.body.status
      });
  
      res.status(200).json(request);
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };