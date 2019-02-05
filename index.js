// https://expressjs.com/en/guide/using-middleware.html
// Middleware needed for any app:
//  app
//  router
//  error

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const JSONStream = require('JSONStream');
const engines = require('consolidate');
const bodyParser = require('body-parser');

const User = require('./db').User;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

// serve static directory without any prefix
// express level middleware
app.use('/profilepics', express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/favicon.ico', function(req, res) {
  res.end();
});

// app level middleware
app.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.render('index', { users: users });
  });
});

app.get('*.json', function(req, res) {
  res.download(`./users/${req.path}`, 'virus.exe'); // rename doesnt' work
});

app.get('/data/:username', function(req, res) {
  const username = req.params.username;
  const readable = fs.createReadStream(`./users/${username}.json`);
  readable.pipe(res);
});

app.get('/users/by/:gender', function(req, res) {
  const gender = req.params.gender;
  const readable = fs.createReadStream('users.json');

  readable
    .pipe(
      JSONStream.parse('*', function(user) {
        if (user.gender === gender) return user.name;
      })
    )
    .pipe(JSONStream.stringify('[\n  ', ',\n  ', '\n]\n'))
    .pipe(res);
});

app.get('/error/:username', function(req, res) {
  res.status(404).send(`No user named ${req.params.username} found`);
});

const userRouter = require('./username');
app.use('/:username', userRouter);

const server = app.listen(3000, function() {
  console.log(`Server at http://localhost:${server.address().port}`);
});
