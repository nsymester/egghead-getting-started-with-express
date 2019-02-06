# Use virtual properties with Mongoose and MongoDB

Sometimes we need a property that doesn't exist, so we can create our own from the data we have.

The `full` property in`user_list.json`has been removed.

now replace the data in the database by executing the following command:

```bash
mongoimport --db test --collection users --drop --file user_list.json 
```

Remove the `full` property from `db.js`



Add the following _getter_ code to `db.js` to add the `full` property:

```javascript
userSchema.virtual('name.full').get(function() {
  return `${this.name.first} ${this.name.last}`;
});
```

Add the following _setter_ code to `db.js`to save the `name.first` and `name.last` properties:

```javascript
userSchema.virtual('name.full').set(function(value) {
  const bits = value.split(' ');
  this.name.first = bits[0];
  this.name.last = bits[1];
});
```






