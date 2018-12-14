const { Credentials, Routes } = require('../../config');
const qs = require('querystring');
const randomString = require('randomstring');
const request = require('request-promise');

/**
 * @description Composes redirect URL for OAuth operations based on request data
 * @param {Express.Request} request
 */
function composeRedirectURI(request) {
  return `http://${request.headers.host}${Routes.getAuthenticationRoutes().redirect}`;
}

/**
 * Set of methods for controlling application authentication
 * @class LoginController
 */
class LoginController {
  /**
   * Process request for login
   * @static
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @memberof LoginController
   */
  static handleLogin(req, res) {
    req.session.csrf_string = randomString.generate();
    const queryString = qs.stringify({
      client_id: Credentials.getClientID(),
      redirect_uri: composeRedirectURI(req),
      state: req.session.csrf_string
    });
    const githubAuthUrl = `${Credentials.getGithubOAuthURL()}${queryString}`;
    res.redirect(githubAuthUrl);
  }
  /**
   *
   * @description Handle authentication response from GitHub
   * @static
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @memberof LoginController
   */
  static handleRedirect(req, res) {
    const code = req.query.code;
    const returnedState = req.query.state;
    if (req.session.csrf_string === returnedState) {
      const requestOptions = {
        url:
          'https://github.com/login/oauth/access_token?' +
          qs.stringify({
            client_id: Credentials.getClientID(),
            client_secret: Credentials.getClientSecret(),
            code: code,
            redirect_uri: Credentials.get,
            state: req.session.csrf_string
          })
      };
      request
        .post(requestOptions)
        .then(response => {
          req.session.access_token = qs.parse(response).access_token;
        })
        .then(() => {
          request
            .get({
              url: 'https://api.github.com/user',
              headers: {
                Authorization: 'token ' + req.session.access_token,
                'User-Agent': 'Login-App'
              }
            })
            .then(response => {
              const data = JSON.parse(response);
              res.cookie('user_name', data.name);
              res.redirect('/user');
            });
        })
        .catch(err => {
          res.redirect('/');
          throw err;
        });
    } else {
      res.redirect('/');
    }
  }
  /**
   *
   * @description Handle application logout request
   * @static
   * @param {Express.Request} request
   * @param {Express.Response} res
   * @memberof LoginController
   */
  static handleLogout(request, response) {
    request.session.destroy(() => {
      response.redirect('/');
    });
  }
}

module.exports = LoginController;
