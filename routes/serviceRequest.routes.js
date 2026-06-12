const express = require("express");
const router = express.Router();
const ServiceRequestController = require("../controllers/serviceRequest.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, ServiceRequestController.createRequest);

router.get("/", authMiddleware, ServiceRequestController.getAllRequests);

router.patch(
  "/:id/status",
  authMiddleware,
  ServiceRequestController.updateStatus
);

module.exports = router;
