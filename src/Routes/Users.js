const express = require('express');
const router = express.Router();

const { userController } = require('../controllers/user-controller');
const { middlewares } = require('../Middlewares');

router.get(
    '/',
    middlewares.auth.validateAdminAuthorization,
    userController.getAllUsers,
);

router.get(
    '/:id',
    middlewares.auth.validateAdminAuthorization,
    userController.getUserById
);
router.put(
    '/:id',
    middlewares.auth.validateAdminAuthorization,
    userController.updateUserById
);
router.delete(
    '/:id',
    middlewares.auth.validateAdminAuthorization,
    userController.deleteUserById
);

module.exports = router;