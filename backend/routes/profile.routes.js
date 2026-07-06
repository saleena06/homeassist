const express = require("express");
const router = express.Router();


const ProfileController = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, ProfileController.getProfile);
router.get("/provider", authMiddleware, ProfileController.getProviderProfile);
module.exports = router;