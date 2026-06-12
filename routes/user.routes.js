const express = require('express');
const router = express.Router();
const UserController =
require('../controllers/user.controller');

const authMiddleware =
require('../middlewares/auth.middleware');  
router.get(
    '/',
    authMiddleware,
    UserController.getAllUsers
  );




router.get('/:id', authMiddleware,UserController.getUserById);

router.put('/:id',authMiddleware, UserController.updateUser);

router.delete('/:id',authMiddleware, UserController.deleteUser);

module.exports = router;


