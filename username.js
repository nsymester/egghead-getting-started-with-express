// https://expressjs.com/en/guide/using-middleware.html
// Middleware needed for any app:
//  app
//  router
//  error

const express = require('express');
const helpers = require('./helpers');
const fs = require('fs');

const User = require('./db').User;

const router = express.Router({
  mergeParams: true,
});

// router level middleware
// router.all('/', function(req, res, next) {
//   console.log(req.method, 'for', req.params.username);
//   next();
// });

router.use(function(req, res, next) {
  console.log(req.method, 'for', req.params.username, ' at ' + req.path);
  next();
});

router.get('/', function(req, res) {
  const username = req.params.username;
  User.findOne({ username: username }, function(err, user) {
    res.render('user', {
      user: user,
      address: user.location,
    });
  });
});

// error handling middleware
// this replaces the built in error handler
// will not be shown if app is run in production mode
// i.e. NODE_ENV=produZtion
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

router.put('/', function(req, res) {
  const username = req.params.username;

  User.findOneAndUpdate(
    { username: username },
    { location: req.body },
    function(err, user) {
      res.end();
    }
  );
});

router.delete('/', function(req, res) {
  let fp = helpers.getUserFilePath(req.params.username);
  fs.unlinkSync(fp);
  res.sendStatus(200);
});

module.exports = router;
