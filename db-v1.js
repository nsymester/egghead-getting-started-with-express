const uri = 'mongodb://localhost:27017';
const dbName = 'test';

const MongoClient = require('mongodb').MongoClient;

const findUsers = function(db, callback) {
  const cursor = db.collection('users').find();
  cursor.each(function(err, doc) {
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};

MongoClient.connect(uri, function(err, client) {
  if (err) throw err;
  findUsers(client.db(dbName), function() {
    client.close();
  });
});
