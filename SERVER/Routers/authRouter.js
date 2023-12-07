const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();

router.get('/authenticateWithGoogle', authController.authenticateWithGoogle);
router.get('/auth/google', authController.googleLogin);
router.get('/auth/google/callback', authController.googleLoginCallback);
router.get('/auth/google/success', authController.registerUserByGoogle);
router.get('/auth/google/failure', authController.fail);
router.get('/logout', authController.logout);

module.exports = router;