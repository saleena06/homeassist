const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const validate =
require('../middlewares/validate.middleware');


const {
    signUpSchema,
    signInSchema
  } = require('../validations/auth.validation');


  router.post(
    '/signup',
    validate(signUpSchema),
    AuthController.signUp
  );
  
  router.post(
    '/signin',
    validate(signInSchema),
    AuthController.signIn
  );



module.exports = router;
