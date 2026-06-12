const express = require('express');
const router = express.Router();

const ServiceTypeController =
require('../controllers/serviceType.controller');

router.post(
  '/',
  ServiceTypeController.createServiceType
);

router.get(
  '/',
  ServiceTypeController.getAllServiceTypes
);

module.exports = router;