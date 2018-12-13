const express = require('express');
const router = express.Router();
const routes = require('./routing');

/**
 * Authentication validator
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`/auth/${routes.login}`);
}

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('user', { user: req.user });
});

module.exports = router;
