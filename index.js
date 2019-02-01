const express = require("express");
const app = express();

const fs = require("fs");
const _ = require("lodash");
let users = [];

fs.readFile("users.json", { encoding: "utf8" }, function(err, data) {
  if (err) throw err;

  JSON.parse(data).forEach(function(user) {
    user.name.full = _.startCase(`${user.name.first} ${user.name.last}`);
    users.push(user);
  });
});

// req = request
// res = result
app.get("/", function(req, res) {
  let buffer = "";

  users.forEach(function(user) {
    buffer += `<a href="/${user.username}">${user.name.full}</a> <br/>`;
  });
  res.send(buffer);
});

// define a route matching a regular expression
app.get(/big.*/, function(req, res, next) {
  console.log("BIG USER ACCESS");
  // next() passes control onto the next control handler
  next();
});

app.get(/.*dog.*/, function(req, res, next) {
  console.log("DOGS GO WOOF");
  next();
});

// :usernmae - the colon tells express that its a path variable
app.get("/:username", function(req, res) {
  let username = req.params.username;
  res.send(username);
});

const server = app.listen(3000, function() {
  console.log(`Server at http://localhost:${server.address().port}`);
});
