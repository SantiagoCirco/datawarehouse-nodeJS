const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/auth-controller');
const { middlewares } = require('../middlewares');

router.post(
    '/register',
    middlewares.auth.validateAdminAuthorization,
    middlewares.auth.validateRegisterFields,
    middlewares.auth.validateUserIfExists,
    authController.signUp
);

router.post(
    '/login',
    middlewares.auth.validateLoginfields,
    middlewares.auth.validateUserLogin,
    authController.login
);

module.exports = router;