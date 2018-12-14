var express = require('express');
const randomString = require('randomstring');
var router = express.Router();
const qs = require('querystring');
const Credentials = require('../config');
const Routing = require('../config/routes');

router.get('/', (req, res) => {
  req.session.csrf_string = randomString.generate();
  const redirect_uri = `http://${req.headers.host}${Routing.getAuthenticationRoute().redirect}`;
  const queryString = qs.stringify({
    client_id: Credentials.getClientID(),
    redirect_uri,
    state: req.session.csrf_string,
    scope: ''
  });
  const githubAuthUrl = `${Credentials.getGithubOAuthURL()}${queryString}`;
  res.redirect(githubAuthUrl);
});

module.exports = router;
