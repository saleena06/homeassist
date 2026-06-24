const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.routes"));

router.use("/users", require("./user.routes"));

router.use("/providers", require("./provider.routes"));

router.use("/service-types", require("./serviceType.routes"));

router.use("/service-requests", require("./serviceRequest.routes"));

router.use("/reviews", require("./review.routes"));

module.exports = router;
