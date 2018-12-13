var express = require('express');
const request = require('request');
var router = express.Router();
const randomString = require('randomstring');
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

router.get('/login', (req, res) => {
  req.session.csrf_string = randomString.generate();
  const githubAuthUrl =
    'https://github.com/login/oauth/authorize?' +
    qs.stringify({
      client_id: credentials.clientID,
      redirect_uri: redirect_uri,
      state: req.session.csrf_string,
      scope: ''
    });
  res.redirect(githubAuthUrl);
});

router.all('/redirect', (req, res) => {
  const code = req.query.code;
  const returnedState = req.query.state;
  if (req.session.csrf_string === returnedState) {
    request.post(
      {
        url:
          'https://github.com/login/oauth/access_token?' +
          qs.stringify({
            client_id: credentials.clientID,
            client_secret: credentials.clientSecret,
            code: code,
            redirect_uri: redirect_uri,
            state: req.session.csrf_string
          })
      },
      (error, response, body) => {
        req.session.access_token = qs.parse(body).access_token;
        res.redirect('/user');
      }
    );
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
  request.get(
    {
      url: 'https://api.github.com/user',
      headers: {
        Authorization: 'token ' + req.session.access_token,
        'User-Agent': 'Login-App'
      }
    },
    (error, response, body) => {
      const data = Object.entries(JSON.parse(body));
      console.log(data);
      res.render('user', { user: data });
    }
  );
});

module.exports = router;
