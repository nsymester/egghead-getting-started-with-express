const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const engines = require("consolidate");

const bodyParser = require("body-parser");

function getUserFilePath(username) {
  return path.join(__dirname, "users", username) + ".json";
}

function getUser(username) {
  var user = JSON.parse(
    fs.readFileSync(getUserFilePath(username), { encoding: "utf8" })
  );
  user.name.full = _.startCase(user.name.first + " " + user.name.last);
  _.keys(user.location).forEach(function(key) {
    user.location[key] = _.startCase(user.location[key]);
  });
  return user;
}

function saveUser(username, data) {
  var fp = getUserFilePath(username);
  fs.unlinkSync(fp); // delete the file
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), { encoding: "utf8" });
}

app.engine("hbs", engines.handlebars);

app.set("views", "./views");
app.set("view engine", "hbs");

// serve static directory without any prefix
app.use("/profilepics", express.static("images"));
app.use(bodyParser.urlencoded({ extended: true }));

// not to be used in a real application
app.get("/", function(req, res) {
  let users = [];

  fs.readdir("users", function(err, files) {
    files.forEach(function(file) {
      fs.readFile(
        path.join(__dirname, "users", file),
        { encoding: "utf8" },
        function(err, data) {
          let user = JSON.parse(data);
          user.name.full = _.startCase(`${user.name.first} ${user.name.last}`);
          users.push(user);
          if (users.length === files.length) {
            res.render("index", { users: users });
          }
        }
      );
    });
  });
});

// :usernmae - the colon tells express that its a path variable
app.get("/:username", function(req, res) {
  const username = req.params.username;
  const user = getUser(username);
  res.render("user", {
    user: user,
    address: user.location
  });
});

app.put("/:username", function(req, res) {
  const username = req.params.username;
  const user = getUser(username);
  user.location = req.body;
  saveUser(username, user);
  res.end();
});

app.delete("/:username", function(req, res) {
  let fp = getUserFilePath(req.params.username);
  fs.unlinkSync(fp);
  res.sendStatus(200);
});

const server = app.listen(3000, function() {
  console.log(`Server at http://localhost:${server.address().port}`);
});
