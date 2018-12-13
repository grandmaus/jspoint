const express = require('express');
const router = express.Router();

/**
 * Login page routing
 */
router.get(routes.login, (req, res) => {
  res.render('login', { title: 'Please sign in with:' });
});

/**
 * Logout page routing
 */
router.get(routes.logout, (req, res) => {
  res.logout();
  res.redirect('/');
});

router.get('/github', passportGitHub.authenticate('github');

router.get(
  '/github/callback',
  passportGitHub.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
