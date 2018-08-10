'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _data = require('./data');

var _env = require('./env');

var _routes = require('./src/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get(_routes.AppRoutes[0].path, _routes.AppRoutes[0].action);
router.get(_routes.AppRoutes[1].path, _routes.AppRoutes[1].action);
router.post(_routes.AppRoutes[2].path, _routes.AppRoutes[2].action);
router.get(_routes.AppRoutes[3].path, _routes.AppRoutes[3].action);

router.post('/sessions', function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  if (!email || !password || email === 'error' || email !== _env.temporaryUsername || password !== _env.temporaryPassword) {
    res.statusMessage = 'Invalid email or password';
    res.status(401).end();
  } else {
    var name = email.split('@')[0].replace(/\.|_/, ' '); // simulated
    var now = new Date();
    var token = 'token-' + now.getTime(); // simulated
    var session = {
      email: email,
      name: name,
      token: token
    };
    (0, _data.addSession)(token, session);
    res.json(session);
  }
});

router.get('/task', function (req, res) {
  (0, _data.getTasks)(req.query).then(function (tasks) {
    return res.json(tasks);
  });
});

router.get('/task/:id', function (req, res) {
  (0, _data.getTask)(req.params.id).then(function (result) {
    if (!result.task) {
      res.status(404).end();
    } else {
      res.json(result);
    }
  });
});

router.delete('/sessions/*', function (req, res) {
  res.json(undefined);
});

module.exports = router;
//# sourceMappingURL=api.js.map