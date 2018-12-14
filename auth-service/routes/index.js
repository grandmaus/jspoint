var express = require('express');
var router = express.Router();
const { AuthenticationController, PresentationController } = require('../controllers');
const { Routes } = require('../config');

/* GET home page. */
router
  .get(Routes.getApplicationRoot(), PresentationController.getIndexPage)
  .get(Routes.getAuthenticationRoutes().login, AuthenticationController.handleLogin)
  .get(Routes.getAuthenticationRoutes().logout, AuthenticationController.handleLogout)
  .all(Routes.getAuthenticationRoutes().redirect, AuthenticationController.handleRedirect);

module.exports = router;
