const express = require("express");
const router = express.Router();
const ProviderController = require("../controllers/provider.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const providerSchema = require("../validations/provider.validation");

router.post("/", validate(providerSchema), ProviderController.createProvider);


router.get(
  "/",
 // validate(providerSchema),
  authMiddleware,
  ProviderController.getAllProviders
);
router.get(
    "/paginated",
    authMiddleware,
    ProviderController.getPaginatedProviders
);
router.get(
  "/bookings",
  authMiddleware,
  ProviderController.getProviderBookings
);

router.put(
  "/bookings/:id",
  authMiddleware,
  ProviderController.updateBookingStatus
);

router.get(
  "/:id",
 // validate(providerSchema),
  authMiddleware,
  ProviderController.getProviderById
);

router.put(
  "/:id",
  validate(providerSchema),
  authMiddleware,
  ProviderController.updateProvider
);

router.delete(
  "/:id",
  validate(providerSchema),
  authMiddleware,
  ProviderController.deleteProvider
);

module.exports = router;
