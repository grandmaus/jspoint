const randomString = require('randomstring');
const session = require('express-session');

/**
 * Create session instance for application
 * @param {Express} application
 */
function sessionInstantiator(application) {
  application.use(
    session({
      secret: randomString.generate(),
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false
    })
  );
}

module.exports = sessionInstantiator;
