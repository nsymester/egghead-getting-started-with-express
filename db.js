const uri = 'mongodb://localhost:27017/test';

const mongoose = require('mongoose');
mongoose.connect(uri);

const _ = require('lodash');
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
  },
  location: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
});

// getter
userSchema.virtual('name.full').get(function() {
  return _.startCase(`${this.name.first} ${this.name.last}`);
});

// setter
userSchema.virtual('name.full').set(function(value) {
  const bits = value.split(' ');
  this.name.first = bits[0];
  this.name.last = bits[1];
});

exports.User = mongoose.model('User', userSchema);

// Assertion
// exports.User.find({}, function(err, users) {
//   console.log(users);
// });
