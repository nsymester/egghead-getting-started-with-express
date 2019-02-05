const uri = 'mongodb://localhost:27017/test';

const mongoose = require('mongoose');
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('yay');
});

const userSchema = mongoose.Schema({
  username: String,
  gender: String,
  name: {
    title: String,
    first: String,
    last: String,
    full: String,
  },
  location: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
});

exports.User = mongoose.model('User', userSchema);

// Assertion
// exports.User.find({}, function(err, users) {
//   console.log(users);
// });