const express = require('express');
const helpers = require('./helpers');
const fs = require('fs');

const router = express.Router({
  mergeParams: true,
});

router.all('/', function(req, res, next) {
  console.log(req.method, 'for', req.params.username);
  next();
});

router.get('/', helpers.verifyUser, function(req, res) {
  const username = req.params.username;
  const user = helpers.getUser(username);
  res.render('user', {
    user: user,
    address: user.location,
  });
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
