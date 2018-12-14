/**
 * Session cookie manager
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function sessionCookiesManager(req, res, next) {
  if (!req.session.access_token && req.cookies.user_name) {
    res.clearCookie('user_name');
  } else if (req.cookies.user_name) {
    req.userData = { name: req.cookies.user_name };
  }
  next();
}

module.exports = sessionCookiesManager;
