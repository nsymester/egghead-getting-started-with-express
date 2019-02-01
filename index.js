const express = require("express");
const app = express();

const fs = require("fs");
const _ = require("lodash");
const engines = require("consolidate");

let users = [];

fs.readFile("users.json", { encoding: "utf8" }, function(err, data) {
  if (err) throw err;

  JSON.parse(data).forEach(function(user) {
    user.name.full = _.startCase(`${user.name.first} ${user.name.last}`);
    users.push(user);
  });
});

app.engine("hbs", engines.handlebars);

app.set("views", "./views");
app.set("view engine", "hbs");

// req = request
// res = result
// not to be used in a real application
app.get("/", function(req, res) {
  res.render("index", { users: users });
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
