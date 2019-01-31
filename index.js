const express = require("express");

const app = express();

// req = request
// res = result
app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/yo", function(req, res) {
  res.send("YO");
});

var server = app.listen(3000, function() {
  console.log(`Server at http://localhost:${server.address().port}`);
});
