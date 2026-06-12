const express = require("express");
const router = express.Router();
const ProviderController = require("../controllers/provider.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, ProviderController.createProvider);

router.get("/", authMiddleware, ProviderController.getAllProviders);

router.get("/:id", authMiddleware, ProviderController.getProviderById);

router.put("/:id", authMiddleware, ProviderController.updateProvider);

router.delete("/:id", authMiddleware, ProviderController.deleteProvider);

module.exports = router;
