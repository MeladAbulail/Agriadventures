const express = require('express');
const AuthByGoogle = require('../Controllers/AuthByGoogle');
const Router = express.Router();

Router.get('/auth/google', AuthByGoogle.googleLogin);
Router.get('/auth/google/callback', AuthByGoogle.googleLoginCallback);
Router.get('/auth/google/success', AuthByGoogle.registerUserByGoogle);
Router.get('/auth/google/failure', AuthByGoogle.fail);
Router.get('/logout', AuthByGoogle.logout);

module.exports = Router;