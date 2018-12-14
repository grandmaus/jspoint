var express = require('express');
const request = require('request-promise');
var router = express.Router();
const qs = require('querystring');

const redirect_uri = `http://localhost:3000/redirect`;

const credentials = {
  clientID: 'b978b2ec529679e70446',
  clientSecret: 'a9ab79de3b49391095f6e12b3df065782a8c5b7a'
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.all('/redirect', (req, res) => {
  const code = req.query.code;
  const returnedState = req.query.state;
  if (req.session.csrf_string === returnedState) {
    const requestOptions = {
      url:
        'https://github.com/login/oauth/access_token?' +
        qs.stringify({
          client_id: credentials.clientID,
          client_secret: credentials.clientSecret,
          code: code,
          redirect_uri: redirect_uri,
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
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.get('/user', (req, res) => {
  if (!req.session.access_token) {
    res.redirect('/');
    return;
  }
  res.render('user', { user: { name: req.cookies.user_name } });
});

module.exports = router;
