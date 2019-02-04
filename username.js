// https://expressjs.com/en/guide/using-middleware.html
// Middleware needed:
//  app
//  router
//  error

const express = require('express');
const helpers = require('./helpers');
const fs = require('fs');

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
  const user = helpers.getUser(username);
  res.render('user', {
    user: user,
    address: user.location,
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
  const user = helpers.getUser(username);
  user.location = req.body;
  helpers.saveUser(username, user);
  res.end();
});

router.delete('/', function(req, res) {
  let fp = helpers.getUserFilePath(req.params.username);
  fs.unlinkSync(fp);
  res.sendStatus(200);
});

module.exports = router;
